import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { Card, Stack } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import type { z } from 'zod';
import InvoiceNewEditAddress from './InvoiceNewEditAddress';
import InvoiceNewEditDetails from './InvoiceNewEditDetails';
import InvoiceNewEditStatusDate from './InvoiceNewEditStatusDate';
import { _invoiceAddressFrom, _invoiceAddressTo } from '@/_mock/arrays';
import FormProvider from '@/components/hook-form';
import { PATH_DASHBOARD } from '@/routes/paths';
import { NewInvoiceSchema } from '@/schemas/new-invoice-schema';

type FormValuesProps = z.infer<typeof NewInvoiceSchema>;

type Props = {
  isEdit?: boolean;
  currentInvoice?: FormValuesProps;
};

export default function InvoiceNewEditForm({ isEdit, currentInvoice }: Props) {
  const navigate = useNavigate();

  const [loadingSave, setLoadingSave] = useState(false);

  const [loadingSend, setLoadingSend] = useState(false);

  const defaultValues = useMemo(
    () => ({
      invoiceNumber: currentInvoice?.invoiceNumber ?? '17099',
      createDate: currentInvoice?.createDate ?? new Date(),
      dueDate: currentInvoice?.dueDate ?? undefined,
      taxes: currentInvoice?.taxes ?? 0,
      status: currentInvoice?.status ?? 'draft',
      discount: currentInvoice?.discount ?? 0,
      invoiceFrom: currentInvoice?.invoiceFrom ?? _invoiceAddressFrom[0],
      invoiceTo: currentInvoice?.invoiceTo ?? _invoiceAddressTo[0],
      items: currentInvoice?.items ?? [
        { title: '', description: '', service: '', quantity: 1, price: 0, total: 0 },
      ],
      totalPrice: currentInvoice?.totalPrice ?? 0,
    }),
    [currentInvoice],
  );

  const methods = useForm<FormValuesProps>({
    resolver: zodResolver(NewInvoiceSchema),
    defaultValues,
    mode: 'onChange',
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;
  useEffect(() => {
    if (isEdit && currentInvoice) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentInvoice]);

  const handleSaveAsDraft = async (data: FormValuesProps) => {
    setLoadingSave(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      setLoadingSave(false);
      navigate(PATH_DASHBOARD.invoice.list);
      console.log('DATA', JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(error);
      setLoadingSave(false);
    }
  };

  const handleCreateAndSend = async (data: FormValuesProps) => {
    setLoadingSend(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      setLoadingSend(false);
      // utilsnavigate(PATH_DASHBOARD.invoice.list);
      console.log('DATA', JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(error);
      setLoadingSend(false);
    }
  };

  return (
    <FormProvider methods={methods}>
      <Card>
        <InvoiceNewEditAddress />

        <InvoiceNewEditStatusDate />

        <InvoiceNewEditDetails />
      </Card>

      <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
        <LoadingButton
          size="large"
          variant="soft"
          loading={loadingSave && isSubmitting}
          onClick={handleSubmit(handleSaveAsDraft)}
          disabled={!isValid}
        >
          Save as Draft
        </LoadingButton>

        <LoadingButton
          size="large"
          variant="contained"
          loading={loadingSend && isSubmitting}
          onClick={handleSubmit(handleCreateAndSend)}
          disabled={!isValid}
        >
          {isEdit ? 'Update' : 'Create'} & Send
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
