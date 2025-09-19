// form
import { useForm } from 'react-hook-form';
// @mui
import { Button, Card, Grid, InputAdornment, Stack } from '@mui/material';
// @types
import type { IUserSocialLink } from '@/shared/interfaces/IUser';
// components
import FormProvider, { RHFTextField } from '@/components/hook-form';
import Iconify from '@/components/iconify';
import useCopyToClipboard from '@/hooks/useCopyToClipboard';
import { useUserSocialPath } from '@/queries/user/social/path/useUserPath';
import { userSocialSchema, type IUserSocialSchema } from '@/schemas/social-schema';
import { SOCIAL_LINKS } from '@/shared/constants/socials_links';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

// ----------------------------------------------------------------------

type FormValuesProps = IUserSocialSchema;

type Props = {
  social_links?: IUserSocialLink;
  user_id?: string;
  tenant_id?: string;
};

export default function AccountSocialLinks({ social_links, user_id }: Props) {
  const { mutate, isPending } = useUserSocialPath();

  const methods = useForm<IUserSocialSchema>({
    resolver: zodResolver(userSocialSchema),
    defaultValues: social_links,
  });

  const { handleSubmit, reset, watch } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    mutate(
      { ...data, user_id },
      {
        onSuccess: () => {
          toast.success('Update success!');
        },
      },
    );
  };

  const { copy } = useCopyToClipboard();

  const handleCopy = (field: string) => {
    const fieldKey = field as keyof IUserSocialSchema;
    const link = SOCIAL_LINKS.find((l) => l.value === fieldKey);
    if (!link) return;

    const fieldValue = watch(fieldKey) ?? '';

    if (!fieldValue) {
      toast.warn('Nothing to copy');
      return;
    }

    const finalValue = `${link.path}${fieldValue}`;

    copy(finalValue);
    toast.info('Copied!');
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ p: 3 }}>
        <Stack spacing={3} alignItems="flex-end">
          {SOCIAL_LINKS.map((link) => (
            <RHFTextField
              key={link.value}
              name={link.value}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment
                      sx={{
                        mr: 0,
                      }}
                      position="start"
                    >
                      <Iconify
                        icon={link.icon}
                        sx={{
                          mr: 1,
                          color: link.color,
                        }}
                      />
                      {link.path}
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment
                      id={link.value}
                      onClick={() => handleCopy(link.value)}
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
          ))}
          <Grid display={'flex'} gap={2}>
            <Button type="button" variant="contained" onClick={() => reset()} loading={isPending}>
              reset
            </Button>

            <Button type="submit" variant="contained" loading={isPending}>
              Save Changes
            </Button>
          </Grid>
        </Stack>
      </Card>
    </FormProvider>
  );
}
