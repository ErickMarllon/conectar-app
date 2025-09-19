import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUpload,
  RHFUploadAvatar,
} from '@/components/hook-form';
import Loading from '@/components/loading';
import { useFetchAddressByZip } from '@/hooks/useAddressByZip';
import { useUserById } from '@/queries/useUserById/useUserById';
import { useUserPath } from '@/queries/user/path/useUserPath';
import type { IAddressSchema } from '@/schemas/address-schema';
import { useAuthStore } from '@/stores/userAuth.store';
import { fData } from '@/utils/formatNumber';
import { Box, Button, Card, Grid, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import type { z } from 'zod';
import { AddressForm } from '../AddressForm';
import AddressManager from '../AddressManager';
import { tenantSchemaWithAddress, type ITenantSchemaWithAddress } from '@/schemas/tenant-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateSlug } from '../generate-slug';

type FormValuesProps = z.infer<typeof tenantSchemaWithAddress>;

export default function AccountEnterprise() {
  const { user } = useAuthStore();
  const { data, isLoading } = useUserById(user?.id);
  const { mutate: handlePath } = useUserPath();

  const AddressDefault = data?.addresses?.find((a) => a.is_default);
  const parsedDefaultValues = useMemo(
    () => ({
      id: data?.id ?? '',
      logo: data?.avatar_url ?? '',
      first_name: data?.first_name ?? '',
      last_name: data?.last_name ?? '',
      cover: '',
      // cover: 'http://localhost:5170/assets/images/covers/cover_2.jpg',
      email: data?.email ?? '',
      role: data?.role ?? '',
      phone_number: data?.phone_number ?? '',
      address: {
        ...AddressDefault,
        is_default: AddressDefault?.is_default ?? true,
      },
    }),
    [AddressDefault, data],
  );

  const methods = useForm<ITenantSchemaWithAddress>({
    resolver: zodResolver(tenantSchemaWithAddress),
    defaultValues: parsedDefaultValues,
  });

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;
  console.log('🚀 ~ AccountEnterprise ~ watch:', watch());

  const onSubmit = async (data: FormValuesProps) => {
    return handlePath(data, {
      onSuccess: () => {
        toast.success('Update success!');
      },
      onError: () => {
        toast.error('Update failed!');
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
        setValue('logo', newFile, { shouldValidate: true });
      }
    },
    [setValue],
  );
  const handleDropCover = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('cover', newFile, { shouldValidate: true });
      }
    },
    [setValue],
  );

  const formValues = watch();
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

  useEffect(() => {
    reset(parsedDefaultValues);
  }, [reset, parsedDefaultValues]);

  if (isLoading) return <Loading mode="global" />;

  const handleBlurLink = () => {
    if (!formValues?.name) return;
    const url = `${window.location.origin}/${generateSlug(formValues?.name)}`;
    setValue('slug', url);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} key={data?.id ?? 'account'}>
      <Grid container spacing={3} position={'relative'}>
        <Grid size={{ xs: 12 }}>
          <Card sx={{ p: 3 }}>
            <RHFUpload
              name="cover"
              placeholderTitle="Upload image"
              placeholderDescription="Drag and drop an image here or click browse to select from your device"
              maxSize={3145728}
              onDrop={handleDropCover}
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
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
            <RHFUploadAvatar
              name="logo"
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
            <RHFSwitch
              name="isPublic"
              labelPlacement="start"
              label="Public Profile"
              sx={{ mt: 5 }}
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
              <RHFTextField name="name" label="Name" onBlur={handleBlurLink} />

              <RHFTextField name="slug" label="Link" disabled />

              <RHFTextField name="phone_number" label="Phone Number" />

              <RHFTextField name="whatsapp" label="Whatsapp" />

              <RHFTextField name="email" label="Email Address" />
            </Box>
            {data?.addresses && data?.addresses?.length > 0 ? (
              <AddressManager userId={data.id} addresses={data?.addresses} />
            ) : (
              <AddressForm onBlur={handleFocusZipCode} />
            )}
            <RHFTextField name="about" multiline rows={4} label="About" />
            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <Button type="submit" variant="contained" loading={isSubmitting}>
                Save Changes
              </Button>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
