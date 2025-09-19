import FormProvider, { RHFTextField, RHFUploadAvatar } from '@/components/hook-form';
import Loading from '@/components/loading';
import { useFetchAddressByZip } from '@/hooks/useAddressByZip';
import { useUserById } from '@/queries/useUserById/useUserById';
import { useUserPath } from '@/queries/user/path/useUserPath';
import type { IAddressSchema } from '@/schemas/address-schema';
import { userSchema } from '@/schemas/user-schema';
import { useAuthStore } from '@/stores/userAuth.store';
import { fData } from '@/utils/formatNumber';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Card, Grid, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import type { z } from 'zod';
import { AddressForm } from '../AddressForm';
import AddressManager from '../AddressManager';
import { diffObjects } from '@/utils/diffObjects';
import { formatPhoneNumber } from '@/utils/format/formatPhone';
import { useParams } from 'react-router-dom';
import { parseIdentifier } from '@/utils/parseIdentifierSlug';

type FormValuesProps = z.infer<typeof userSchema>;

export default function AccountGeneral() {
  const { user } = useAuthStore();
  const { slug } = useParams<{ slug: string }>();
  const { id } = parseIdentifier(slug);
  const { data, isLoading } = useUserById(id ?? user?.id);
  const { mutate: handlePath, isPending: isLoadingPath } = useUserPath();

  const isAddress = data?.addresses?.find((a) => a.is_default);

  const parsedDefaultValues = useMemo(
    () => ({
      id: data?.id,
      avatar: data?.avatar_url,
      first_name: data?.first_name,
      last_name: data?.last_name,
      email: data?.email,
      role: data?.role,
      phone_number: formatPhoneNumber(data?.phone_number),

      ...(!isAddress && {
        address: {
          is_default: true,
        },
      }),
    }),
    [isAddress, data],
  );

  const methods = useForm<FormValuesProps>({
    resolver: zodResolver(userSchema),
    defaultValues: parsedDefaultValues,
  });

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { isValid },
    reset,
  } = methods;

  useEffect(() => {
    reset(parsedDefaultValues);
  }, [reset, parsedDefaultValues]);

  const formValues = watch();

  const { diffForm, hasDiff } = useMemo(() => {
    const diffForm = diffObjects<any>(parsedDefaultValues, formValues);
    const diffCount = Object.keys(diffForm).length;
    const hasDiff = diffCount > 0;
    return { diffForm, hasDiff };
  }, [parsedDefaultValues, formValues]);

  const onSubmit = async (dataForm: FormValuesProps) => {
    return handlePath(
      {
        ...diffForm,
        id: dataForm.id,
      },
      {
        onSuccess: () => {
          toast.success('Update success!');
        },
        onError: () => {
          toast.error('Update failed!');
        },
      },
    );
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

  if (isLoading) return <Loading mode="global" />;

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} key={data?.id ?? 'account'}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
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
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ p: 3, display: 'grid', gap: 3 }}>
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

              <RHFTextField
                name="phone_number"
                label="Phone Number"
                onBlur={(e) => setValue('phone_number', formatPhoneNumber(e.target.value))}
                onFocus={(e) => setValue('phone_number', formatPhoneNumber(e.target.value))}
              />
            </Box>
            {data?.addresses && data?.addresses?.length > 0 ? (
              <AddressManager userId={data.id} addresses={data?.addresses} />
            ) : (
              <AddressForm onBlur={handleFocusZipCode} />
            )}
            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                loading={isLoadingPath}
                disabled={!hasDiff || !isValid}
              >
                Save Changes
              </Button>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
