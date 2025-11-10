import {
  Box,
  Button,
  Divider,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import sum from 'lodash/sum';
import { useCallback, useEffect, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import type { IInvoiceItem } from '@/shared/interfaces/IInvoice';
import { RHFSelect, RHFTextField } from '@/components/hook-form';
import Iconify from '@/components/iconify';
import { fCurrency } from '@/utils/formatNumber';

const SERVICE_OPTIONS = [
  { id: 1, name: 'full stack development', price: 90.99 },
  { id: 2, name: 'backend development', price: 80.99 },
  { id: 3, name: 'ui design', price: 70.99 },
  { id: 4, name: 'ui/ux design', price: 60.99 },
  { id: 5, name: 'front end development', price: 40.99 },
];

export default function InvoiceNewEditDetails() {
  const { control, setValue, watch, resetField, trigger } = useFormContext();
  const [discountType, setDiscountType] = useState<string>('fixed');
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const values = watch();

  const totalOnRow = values.items.map((item: IInvoiceItem) => item.quantity * item.price);

  let discountAmount = 0;

  if (discountType === 'percent') {
    discountAmount = ((values.discount || 0) * sum(totalOnRow)) / 100;
  } else {
    discountAmount = values.discount || 0;
  }

  const totalPrice = sum(totalOnRow) - discountAmount + (values.taxes || 0);

  useEffect(() => {
    setValue('totalPrice', totalPrice);
    setValue('subTotalPrice', sum(totalOnRow));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValue, totalPrice]);

  const handleAdd = () => {
    append({
      title: '',
      description: '',
      service: '',
      quantity: 1,
      price: 0,
      total: 0,
    });
  };

  const handleRemove = (index: number) => {
    remove(index);
  };

  const handleClearService = useCallback(
    (index: number) => {
      resetField(`items[${index}].quantity`);
      resetField(`items[${index}].price`);
      resetField(`items[${index}].total`);
    },
    [resetField],
  );

  const handleSelectService = useCallback(
    (index: number, option: string) => {
      setValue(
        `items[${index}].price`,
        SERVICE_OPTIONS.find((service) => service.name === option)?.price,
      );
      setValue(
        `items[${index}].total`,
        values.items.map((item: IInvoiceItem) => item.quantity * item.price)[index],
      );
      trigger();
    },
    [setValue, trigger, values.items],
  );

  const handleChangeQuantity = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
      setValue(`items[${index}].quantity`, Number(event.target.value));
      setValue(
        `items[${index}].total`,
        values.items.map((item: IInvoiceItem) => item.quantity * item.price)[index],
      );
      trigger();
    },
    [setValue, trigger, values.items],
  );

  const handleChangePrice = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
      setValue(`items[${index}].price`, Number(event.target.value));
      setValue(
        `items[${index}].total`,
        values.items.map((item: IInvoiceItem) => item.quantity * item.price)[index],
      );
      trigger();
    },
    [setValue, trigger, values.items],
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
        Details:
      </Typography>

      <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
        {fields.map((item, index) => (
          <Stack key={item.id} alignItems="flex-end" spacing={1.5}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
              <RHFTextField
                size="small"
                name={`items[${index}].title`}
                label="Title"
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />

              <RHFTextField
                size="small"
                name={`items[${index}].description`}
                label="Description"
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />

              <RHFSelect
                name={`items[${index}].service`}
                size="small"
                label="Service"
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                sx={{ maxWidth: { md: 160 } }}
              >
                <MenuItem
                  value=""
                  onClick={() => handleClearService(index)}
                  sx={{ fontStyle: 'italic', color: 'text.secondary' }}
                >
                  None
                </MenuItem>

                <Divider />

                {SERVICE_OPTIONS.map((service) => (
                  <MenuItem
                    key={service.id}
                    value={service.name}
                    onClick={() => handleSelectService(index, service.name)}
                  >
                    {service.name}
                  </MenuItem>
                ))}
              </RHFSelect>

              <RHFTextField
                size="small"
                type="number"
                name={`items[${index}].quantity`}
                label="Quantity"
                placeholder="0"
                onChange={(event) => handleChangeQuantity(event, index)}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                sx={{ maxWidth: { md: 96 } }}
              />

              <RHFTextField
                size="small"
                type="number"
                name={`items[${index}].price`}
                label="Price"
                placeholder="0"
                onChange={(event) => handleChangePrice(event, index)}
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    style: { maxWidth: `${String(totalOnRow[index]).length + 3}ch`, minWidth: 96 },
                  },
                }}
                sx={{ maxWidth: { md: `${String(totalOnRow[index]).length + 3}ch` }, minWidth: 96 }}
              />

              <RHFTextField
                disabled
                size="small"
                name={`items[${index}].total`}
                label="Total"
                placeholder="0"
                value={totalOnRow[index]}
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    style: { maxWidth: `${String(totalOnRow[index]).length + 3}ch`, minWidth: 96 },
                  },
                }}
                sx={{ maxWidth: { md: `${String(totalOnRow[index]).length + 3}ch` }, minWidth: 96 }}
              />
            </Stack>

            <Button
              size="small"
              color="error"
              startIcon={<Iconify icon="eva:trash-2-outline" />}
              onClick={() => handleRemove(index)}
            >
              Remove
            </Button>
          </Stack>
        ))}
      </Stack>

      <Divider sx={{ my: 3, borderStyle: 'dashed' }} />

      <Stack
        spacing={2}
        direction={{ xs: 'column-reverse', md: 'row' }}
        alignItems={{ xs: 'flex-start', md: 'center' }}
      >
        <Button
          size="small"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleAdd}
          sx={{ flexShrink: 0 }}
        >
          Add Item
        </Button>

        <Stack
          spacing={2}
          justifyContent="flex-end"
          direction={{ xs: 'column', md: 'row' }}
          sx={{ width: 1 }}
        >
          <TextField
            size="small"
            label="Discount"
            value={values.discount}
            onChange={(event) => {
              let value = Number(event.target.value);

              if (discountType === 'percent' && value >= 100) {
                value = 100;
              }

              setValue('discount', value);
            }}
            sx={{ maxWidth: { md: 200 } }}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />

          <TextField
            label="Discount type"
            size="small"
            select
            value={discountType || 'fixed'}
            onChange={(e) => setDiscountType(e.target.value)}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
              select: {
                MenuProps: {
                  PaperProps: {
                    sx: {
                      '& .MuiMenuItem-root': {
                        borderRadius: 0.75,
                        typography: 'body2',
                        textTransform: 'capitalize',
                      },
                    },
                  },
                },
                sx: { textTransform: 'capitalize' },
              },
            }}
          >
            {[
              { value: 'fixed', label: 'Fixed' },
              { value: 'percent', label: 'Percent' },
            ].map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <RHFTextField
            size="small"
            label="Taxes"
            name="taxes"
            onChange={(event) => setValue('taxes', Number(event.target.value))}
            sx={{ maxWidth: { md: 200 } }}
          />
        </Stack>
      </Stack>

      <Stack spacing={2} sx={{ mt: 3 }}>
        <Stack direction="row" justifyContent="flex-end" gap={1}>
          <Typography>Subtotal :</Typography>
          <Typography
            sx={{
              textAlign: 'right',
              minWidth: 120,
              width: `${String(sum(totalOnRow)).length + 3}ch`,
            }}
          >
            {fCurrency(sum(totalOnRow)) || '-'}
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent="flex-end" gap={1}>
          <Typography>Discount :</Typography>
          <Typography
            sx={{
              textAlign: 'right',
              minWidth: 120,
              width: `${String(sum(totalOnRow)).length + 3}ch`,
              ...(values.discount && { color: 'error.main' }),
            }}
          >
            {values.discount ? `- ${fCurrency(discountAmount)}` : '-'}
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent="flex-end" gap={1}>
          <Typography>Taxes :</Typography>
          <Typography
            sx={{
              textAlign: 'right',
              minWidth: 120,
              width: `${String(sum(totalOnRow)).length + 3}ch`,
            }}
          >
            {values.taxes ? fCurrency(values.taxes) : '-'}
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent="flex-end" gap={1}>
          <Typography variant="h6">Total price :</Typography>
          <Typography
            variant="h6"
            sx={{
              textAlign: 'right',
              minWidth: 120,
              width: `${String(sum(totalOnRow)).length + 3}ch`,
            }}
          >
            {fCurrency(totalPrice) || '-'}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
