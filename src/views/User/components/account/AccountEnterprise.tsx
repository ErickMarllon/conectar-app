import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Card, Grid, InputAdornment, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import type { IAddressSchema } from '@/schemas/address-schema';
import { AddressForm } from '../AddressForm';
import AddressManager from '../AddressManager';
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUpload,
  RHFUploadAvatar,
} from '@/components/hook-form';
import Iconify from '@/components/iconify';
import Loading from '@/components/loading';
import { useFetchAddressByZip } from '@/hooks/useAddressByZip';
import useCopyToClipboard from '@/hooks/useCopyToClipboard';
import { useFileDrop } from '@/hooks/useFileDrop';
import { useTenantPath } from '@/queries/tenant/path/useTenantPath';
import { useGetTenant } from '@/queries/tenant/useGet/useGetTenant';
import { tenantSchema, type ITenantSchema } from '@/schemas/tenant-schema';
import { diffObjects } from '@/utils/diffObjects';
import { fData } from '@/utils/formatNumber';
import { generateSlug } from '@/utils/generate-slug';

type FormValuesProps = ITenantSchema;

export default function AccountEnterprise() {
  const { data: tenantData, isLoading: isLoadingTenant } = useGetTenant();
  const { mutate: handlePath, isPending: isLoadingPatchTenant } = useTenantPath();
  const { handleFileDrop } = useFileDrop<FormValuesProps>();
  const { copy } = useCopyToClipboard();
  const isLoading = isLoadingTenant || isLoadingPatchTenant;
  const parsedDefaultValues = useMemo(
    () => ({
      id: tenantData?.id ?? '',
      name: tenantData?.name ?? '',
      slug: tenantData?.slug ?? '',
      email: tenantData?.email ?? '',
      phone_number: tenantData?.phone_number ?? '',
      whatsapp: tenantData?.whatsapp ?? '',
      logo: tenantData?.logo_url,
      cover: tenantData?.cover_url,
      status: tenantData?.status ?? '',
      about: tenantData?.about ?? '',
      is_public: tenantData?.is_public ?? false,
      enable_google_calendar: tenantData?.enable_google_calendar ?? false,
      enable_service_schedule: tenantData?.enable_service_schedule ?? false,
    }),
    [tenantData],
  );

  const methods = useForm<FormValuesProps>({
    resolver: zodResolver(tenantSchema),
    defaultValues: parsedDefaultValues,
  });

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { isValid },
    reset,
  } = methods;
  const formValues = watch();

  const { diffForm, hasDiff } = useMemo(
    () => diffObjects<any>(parsedDefaultValues, formValues),
    [parsedDefaultValues, formValues],
  );

  const onSubmit = async (data: FormValuesProps) => handlePath({ ...diffForm, id: data.id });

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
    if (isLoadingTenant === false) reset(parsedDefaultValues);
  }, [parsedDefaultValues, isLoadingTenant, reset]);

  const handleBlurLink = () => {
    if (!formValues?.name) return;
    const url = `${window.location.origin}/${generateSlug(formValues?.name)}`;
    setValue('slug', url);
  };

  const handleCopy = () => {
    const fieldValue = watch('slug') ?? '';
    if (!fieldValue) return;

    copy(fieldValue);
    toast.info('Copied!');
  };

  return (
    <FormProvider
      methods={methods}
      onSubmit={handleSubmit(onSubmit)}
      key={tenantData?.id ?? 'enterprise'}
    >
      {isLoading && <Loading mode="global" />}
      <Grid container spacing={3} position={'relative'}>
        <Grid size={{ xs: 12 }}>
          <Card sx={{ p: 3 }}>
            <RHFUpload
              name="cover"
              placeholderTitle="Upload image"
              placeholderDescription="Drag and drop an image here or click browse to select from your device"
              maxSize={3145728}
              onDrop={(files) => handleFileDrop(files, 'cover', setValue)}
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
              onDrop={(files) => handleFileDrop(files, 'logo', setValue)}
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
              name="is_public"
              labelPlacement="start"
              label="Public Profile"
              switchProps={{
                checked: formValues.is_public,
                onChange: (_, checked) => {
                  setValue('is_public', checked);
                  if (formValues?.id) {
                    handlePath({ id: formValues.id, is_public: checked });
                  }
                },
              }}
            />

            <RHFSwitch
              name="enable_service_schedule"
              labelPlacement="start"
              label="Enable Service Schedule"
              switchProps={{
                checked: formValues.enable_service_schedule,
                onChange: (_, checked) => {
                  setValue('enable_service_schedule', checked);
                  if (formValues?.id) {
                    handlePath({
                      id: formValues.id,
                      enable_service_schedule: checked,
                      enable_google_calendar: checked ? formValues.enable_google_calendar : false,
                    });
                  }
                },
              }}
            />
            {formValues.enable_service_schedule && (
              <RHFSwitch
                name="enable_google_calendar"
                labelPlacement="start"
                label="Enable Google Calendar"
                switchProps={{
                  checked: formValues.enable_google_calendar,
                  onChange: (_, checked) => {
                    setValue('enable_google_calendar', checked);
                    if (formValues?.id) {
                      handlePath({ id: formValues.id, enable_google_calendar: checked });
                    }
                  },
                }}
              />
            )}
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

              <RHFTextField
                name="slug"
                label="Link"
                disabled
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment
                        id="slug"
                        onClick={handleCopy}
                        sx={{
                          mr: 0,
                          cursor: 'pointer',
                        }}
                        position="end"
                      >
                        <Iconify icon="eva:link-2-fill" />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <RHFTextField name="phone_number" label="Phone Number" />

              <RHFTextField name="whatsapp" label="Whatsapp" />

              <RHFTextField name="email" label="Email Address" />
            </Box>
            {tenantData?.addresses && tenantData?.addresses?.length > 0 ? (
              <AddressManager tenant_id={tenantData.id} addresses={tenantData?.addresses} />
            ) : (
              <AddressForm onBlur={handleFocusZipCode} />
            )}
            <RHFTextField id="about" name="about" multiline rows={4} label="About" />
            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
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
                  Save Changes
                </Button>
              </Grid>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
