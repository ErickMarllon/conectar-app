import FormProvider, {
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
} from '@/components/hook-form';
import Label from '@/components/label';
import { useFetchAddressByZip } from '@/hooks/useAddressByZip';
import { useUserCreate } from '@/queries/user/create/useUserCreate';
import { useUserPath } from '@/queries/user/path/useUserPath';
import { useUserPathStatus } from '@/queries/user/pathStatus/useUserPath';
import { PATH_DASHBOARD } from '@/routes/paths';
import type { IAddressSchema } from '@/schemas/address-schema';
import { userSchema, type IUserSchema } from '@/schemas/user-schema';
import type { IUserAccountGeneral } from '@/shared/interfaces/IUser';
import { useAuthStore } from '@/stores/userAuth.store';
import { fData } from '@/utils/formatNumber';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  Card,
  FormControlLabel,
  Grid,
  MenuItem,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AddressForm } from './AddressForm';
import AddressManager from './AddressManager';
import { ROLE_OPTIONS } from './constants/userRoles';
import { statusColorMap } from './constants/userStatusColor';
import { getChangedFields } from './utils/getChangedFields';

// ----------------------------------------------------------------------

type FormValuesProps = IUserSchema;

type Props = {
  isEdit?: boolean;
  currentUser?: IUserAccountGeneral;
};

export default function UserNewEditForm({ isEdit = false, currentUser }: Props) {
  console.log('🚀 ~ UserNewEditForm ~ currentUser:', currentUser);
  const { user } = useAuthStore();
  const { mutate: handlePath, isPending: isLoadingPath } = useUserPath();
  const { mutate: handleCreate, isPending: isLoadingCreate } = useUserCreate();
  const { mutate: handlePathStatus } = useUserPathStatus();
  const isLoading = isLoadingPath || isLoadingCreate;

  const defaultValues: FormValuesProps = {
    ...((currentUser?.id && { id: currentUser?.id }) ?? {}),
    first_name: currentUser?.first_name ?? '',
    last_name: currentUser?.last_name ?? '',
    email: currentUser?.email ?? '',
    phone_number: currentUser?.phone_number ?? '',
    avatar: currentUser?.avatar_url ?? undefined,
    is_verified: currentUser?.is_verified ?? false,
    status: currentUser?.status,
    role: currentUser?.role?.toLowerCase() ?? 'user',
  };

  const methods = useForm<FormValuesProps>({
    resolver: zodResolver(userSchema),
    defaultValues,
  });

  const { watch, control, setValue, handleSubmit } = methods;

  const formValues = watch();

  const navigate = useNavigate();

  const onSubmit = async (data: FormValuesProps) => {
    if (isEdit) {
      const userData = getChangedFields(defaultValues, formValues);
      return handlePath(userData, {
        onSuccess: () => {
          toast.success('Update success!');
        },
        onError: () => {
          toast.error('Update failed!');
        },
      });
    }

    return handleCreate(data, {
      onSuccess: (response) => {
        toast.success('Create success!');
        navigate(PATH_DASHBOARD.user.editSlug.replace(':slug', response.data.id));
      },
      onError: () => {
        toast.error('Create failed!');
      },
    });
  };

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

  const handleToggleStatusRow = (id: string) => {
    handlePathStatus(id, {
      onSuccess: () => {
        toast.success('Update success!');
      },
      onError: () => {
        toast.error('Update failed!');
      },
    });
  };

  return (
    <FormProvider
      methods={methods}
      onSubmit={handleSubmit(onSubmit)}
      key={currentUser?.id ?? 'new-user'}
    >
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            {isEdit && (
              <Label
                color={
                  statusColorMap[formValues.status ? formValues.status.toLowerCase() : 'default']
                }
                sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
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
            {isEdit && (
              <>
                <FormControlLabel
                  labelPlacement="start"
                  control={
                    <Controller
                      name="status"
                      control={control}
                      render={({ field }) => (
                        <Switch
                          {...field}
                          checked={field.value === 'banned'}
                          onChange={(event) => {
                            field.onChange(event.target.checked ? 'banned' : 'active');
                            if (currentUser?.id) handleToggleStatusRow(currentUser.id);
                          }}
                        />
                      )}
                    />
                  }
                  label={
                    <>
                      <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                        Banned
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Apply disable account
                      </Typography>
                    </>
                  }
                  sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
                />

                <RHFSwitch
                  name="is_verified"
                  labelPlacement="start"
                  label={
                    <>
                      <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                        Email Verified
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Disabling this will automatically send the user a verification email
                      </Typography>
                    </>
                  }
                  sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
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
                userId={currentUser.id}
                addresses={currentUser?.addresses}
              />
            ) : (
              <AddressForm onBlur={handleFocusZipCode} />
            )}
            <Stack alignItems="flex-end">
              <Button type="submit" variant="contained" color="success" loading={isLoading}>
                {!isEdit ? 'Create User' : 'Save Changes'}
              </Button>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
