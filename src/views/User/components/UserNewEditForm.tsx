import FormProvider, {
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
} from '@/components/hook-form';
import Label from '@/components/label';
import Loading from '@/components/loading';
import { useFetchAddressByZip } from '@/hooks/useAddressByZip';
import { useUserCreate } from '@/queries/user/create/useUserCreate';
import { useUserPath } from '@/queries/user/path/useUserPath';
import { useUserPathStatus } from '@/queries/user/pathStatus/useUserPath';
import { useUserById } from '@/queries/user/useUserById/useUserById';
import { PATH_DASHBOARD } from '@/routes/paths';
import type { IAddressSchema } from '@/schemas/address-schema';
import { userSchema, type IUserSchema } from '@/schemas/user-schema';
import { UserStatus } from '@/shared/enums';
import { useAuthStore } from '@/stores/userAuth.store';
import { diffObjects } from '@/utils/diffObjects';
import { fData } from '@/utils/formatNumber';
import { parseIdentifier } from '@/utils/parseIdentifierSlug';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Card, Grid, MenuItem, Typography } from '@mui/material';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { AddressForm } from './AddressForm';
import AddressManager from './AddressManager';
import { ROLE_OPTIONS } from './constants/userRoles';
import { statusColorMap } from './constants/userStatusColor';

// ----------------------------------------------------------------------

type FormValuesProps = IUserSchema;

type Props = {
  isEdit?: boolean;
  isLoadingUser?: boolean;
};

// ----------------------------------------------------------------------

export default function UserNewEditForm({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { slug } = useParams<{ slug: string }>();
  const { id: idParams } = parseIdentifier(slug);
  const userId = isEdit ? (idParams ?? user?.id) : undefined;
  const { data: currentUser, isPending: isLoadingUser } = useUserById(userId);
  const { mutate: handlePath, isPending: isLoadingPath } = useUserPath();
  const { mutate: handleCreate, isPending: isLoadingCreate } = useUserCreate();
  const { mutate: handlePathStatus, isPending: isLoadingStatus } = useUserPathStatus();
  const isLoading = isLoadingPath || isLoadingCreate || isLoadingStatus || isLoadingUser;

  const defaultValues = useMemo(
    () => ({
      id: currentUser?.id ?? '',
      first_name: currentUser?.first_name ?? '',
      last_name: currentUser?.last_name ?? '',
      email: currentUser?.email ?? '',
      phone_number: currentUser?.phone_number ?? '',
      avatar: currentUser?.avatar_url ?? undefined,
      is_verified: currentUser?.is_verified ?? false,
      status: currentUser?.status ?? UserStatus.PENDING,
      role: currentUser?.role?.toLowerCase() ?? 'user',
    }),
    [currentUser],
  );

  const methods = useForm<FormValuesProps>({
    resolver: zodResolver(userSchema),
    defaultValues,
  });

  const {
    watch,
    setValue,
    reset,
    handleSubmit,
    formState: { isValid },
  } = methods;

  const formValues = watch();

  const { diffForm, hasDiff } = useMemo(
    () => diffObjects<any>(defaultValues, formValues),
    [defaultValues, formValues],
  );

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('avatar', newFile, { shouldValidate: true });
      }
    },
    [setValue],
  );

  const { fetchAddress } = useFetchAddressByZip();

  const handleFocusZipCode = useCallback(() => {
    fetchAddress({
      zip: formValues?.address?.zip_code,
    }).then((addr) => {
      if (addr) {
        const updateAddress = {
          ...formValues?.address,
          ...addr,
          is_default: true,
        };

        setValue('address', updateAddress as IAddressSchema);
      }
    });
  }, [fetchAddress, formValues?.address, setValue]);

  const handleToggleStatusRow = (id: string) => handlePathStatus(id);

  const handleToggleEmail = (id: string, is_verified: boolean) => handlePath({ id, is_verified });

  const handleCreateUser = (data: FormValuesProps) =>
    handleCreate(data, {
      onSuccess: (response) => {
        navigate(PATH_DASHBOARD.user.editSlug(response.data.id));
      },
    });

  const handlePathUser = (id: string) => handlePath({ ...diffForm, id });

  const onSubmit = async (data: FormValuesProps) => {
    if (isEdit && data.id) return handlePathUser(data.id);
    if (!isEdit) return handleCreateUser(data);
  };

  useEffect(() => {
    if (isLoadingUser === false) reset(defaultValues);
  }, [defaultValues, isEdit, isLoadingUser, reset]);

  return (
    <FormProvider
      methods={methods}
      onSubmit={handleSubmit(onSubmit)}
      key={currentUser?.id ?? 'new-user'}
    >
      {isLoading && <Loading mode="global" />}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            {isEdit && (
              <Label
                color={statusColorMap[formValues.status ?? 'DEFAULT']}
                sx={{
                  textTransform: 'uppercase',
                  position: 'absolute',
                  top: 24,
                  right: 24,
                  minWidth: 25,
                }}
              >
                {formValues.status}
              </Label>
            )}

            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="avatar"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.secondary',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Box>
            {isEdit && idParams && user?.id !== idParams && (
              <>
                <RHFSwitch
                  name="status"
                  labelTitle="Banned"
                  labelDescription="Apply disable account"
                  labelPlacement="start"
                  switchProps={{
                    checked: formValues.status === UserStatus.ACTIVE,
                    onChange: (_, checked) => {
                      setValue('status', checked ? UserStatus.ACTIVE : UserStatus.BANNED);
                      if (currentUser?.id) {
                        handleToggleStatusRow(currentUser.id);
                      }
                    },
                  }}
                />
                <RHFSwitch
                  name="is_verified"
                  labelTitle="Email Verified"
                  labelDescription="Disabling this will automatically send the user a verification email"
                  labelPlacement="start"
                  switchProps={{
                    checked: formValues.is_verified,
                    onChange: (_, checked) => {
                      setValue('is_verified', checked);
                      if (currentUser?.id) {
                        handleToggleEmail(currentUser.id, checked);
                      }
                    },
                  }}
                />
              </>
            )}
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ p: 3, gap: 3, display: 'grid' }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="first_name" label="First Name" />
              <RHFTextField name="last_name" label="Last Name" />
              <RHFTextField name="email" label="Email Address" />
              <RHFTextField name="phone_number" label="Phone Number" />
              {user?.role?.toLocaleLowerCase() === 'admin' && (
                <RHFSelect name="role" label="Role">
                  {ROLE_OPTIONS.map((option) => (
                    <MenuItem
                      key={option}
                      value={option}
                      sx={{
                        mx: 1,
                        borderRadius: 0.75,
                        typography: 'body2',
                        textTransform: 'capitalize',
                      }}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </RHFSelect>
              )}
            </Box>

            {currentUser?.addresses && currentUser?.addresses?.length > 0 ? (
              <AddressManager
                isEdit={isEdit}
                user_id={currentUser.id}
                addresses={currentUser?.addresses}
              />
            ) : (
              <AddressForm onBlur={handleFocusZipCode} />
            )}
            <Grid display={'flex'} justifyContent={'flex-end'} gap={2}>
              <Button
                type="button"
                variant="contained"
                onClick={() => reset()}
                disabled={!hasDiff}
                color="success"
              >
                reset
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={!hasDiff || !isValid}
                color="success"
              >
                {!isEdit ? 'Create User' : 'Save Changes'}
              </Button>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
