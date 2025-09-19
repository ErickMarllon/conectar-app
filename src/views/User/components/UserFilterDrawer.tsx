import { ColorMultiPicker } from '@/components/color-utils';
import {
  RHFMultiCheckbox,
  RHFRadioGroup,
  RHFRating,
  RHFSelect,
  RHFSlider,
  RHFTextField,
} from '@/components/hook-form';
import Iconify from '@/components/iconify';
import Scrollbar from '@/components/scrollbar';
import { NAV } from '@/configs/global';
import {
  alpha,
  Badge,
  Button,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Input,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

export type IFormOptions = {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  options?: { label: string; value: any }[];
  range?: number | number[];
  step?: number;
};
type Props = {
  open: boolean;
  isDefault: boolean;
  onOpen: VoidFunction;
  onClose: VoidFunction;
  onResetFilter: VoidFunction;
  options: IFormOptions[];
  onSubmit: VoidFunction;
  filtersCount?: number;
};

export default function UserFilterDrawer({
  open,
  onOpen,
  onClose,
  onResetFilter,
  options,
  filtersCount,
  onSubmit,
}: Props) {
  console.log('🚀 ~ UserFilterDrawer ~ filtersCount:', filtersCount);
  const { control } = useFormContext();

  const generateMarks = (min: number, max: number, step: number) => {
    const marks = [];
    for (let value = min; value <= max; value += step) {
      marks.push({
        value,
        label: value % (step * 4) === 0 ? `$${value}` : '',
      });
    }
    return marks;
  };

  const getSelected = (selectedItems: string[], item: string) =>
    selectedItems.includes(item)
      ? selectedItems.filter((value) => value !== item)
      : [...selectedItems, item];

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        endIcon={<Iconify icon="ic:round-filter-list" />}
        onClick={onOpen}
      >
        Filters
      </Button>

      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        slotProps={{
          backdrop: {
            invisible: true,
          },
          paper: {
            sx: { width: NAV.W_BASE },
          },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ pl: 2, pr: 1, py: 2 }}
        >
          <Badge
            badgeContent={filtersCount}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            color="primary"
            sx={{
              '& .MuiBadge-badge': {
                top: '50%',
                transform: 'translateY(-50%)',
                right: -24,
              },
            }}
          >
            <Typography variant="subtitle1">Filters</Typography>
          </Badge>

          <IconButton onClick={onClose}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 2.5 }}>
            {options.map((option) => (
              <Stack key={option.name}>
                {option.type === 'text' && (
                  <RHFTextField size="small" name={option.name} label={option.label} isClean />
                )}
                {option.type === 'select' && (
                  <RHFSelect size="small" name={option.name} label={option.label}>
                    {option?.options?.map((opt) => (
                      <MenuItem
                        key={`${opt.label}`}
                        id={`${option.name}-${opt.label}`}
                        value={opt.value}
                      >
                        {opt.label}
                      </MenuItem>
                    ))}
                  </RHFSelect>
                )}

                {option.type === 'checkbox' && option.options?.length && (
                  <RHFMultiCheckbox row={true} name={option.name} options={option.options} />
                )}

                {option.type === 'radio' && option.options?.length && (
                  <RHFRadioGroup row={true} name={option.name} options={option.options} />
                )}

                {option.type === 'radio' && option.options?.length && (
                  <RHFRadioGroup row={true} name={option.name} options={option.options} />
                )}
                {option.type === 'color' && option.options?.length && (
                  <Controller
                    name="colors"
                    control={control}
                    render={({ field }) => (
                      <ColorMultiPicker
                        selected={field.value ?? []}
                        colors={option.options?.map((e) => String(e.value)) || []}
                        onChangeColor={(color) => field.onChange(getSelected(field.value, color))}
                        sx={{ maxWidth: 36 * 4 }}
                      />
                    )}
                  />
                )}

                {option.type === 'range' && option?.range && (
                  <Stack gap={1}>
                    <Stack direction="row" spacing={2}>
                      <InputRange type="min" name={option.name} range={option.range} />
                      <InputRange type="max" name={option.name} range={option.range} />
                    </Stack>
                    <RHFSlider
                      name={option.name}
                      step={option.step ?? 10}
                      min={Array.isArray(option.range) ? option.range[0] : (option.range ?? 0)}
                      max={Array.isArray(option.range) ? option.range[1] : (option.range ?? 100)}
                      marks={generateMarks(
                        Array.isArray(option.range) ? option.range[0] : (option.range ?? 0),
                        Array.isArray(option.range) ? option.range[1] : (option.range ?? 100),
                        option.step ?? 10,
                      )}
                      getAriaValueText={(value) => `$${value}`}
                      valueLabelFormat={(value) => `$${value}`}
                      sx={{ alignSelf: 'center', width: `calc(100% - 20px)` }}
                    />
                  </Stack>
                )}

                {option.type === 'rating' && <RHFRating name={option.name} label={option.label} />}
              </Stack>
            ))}
          </Stack>
        </Scrollbar>

        <Grid display={'grid'} gridTemplateColumns="repeat(2, 1fr)" sx={{ p: 2.5, gap: 2 }}>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="primary"
            variant="contained"
            onClick={() => {
              onSubmit();
              onOpen();
            }}
            startIcon={<Iconify icon="eva:search-fill" />}
            sx={{ gridColumn: !filtersCount ? '1 / span 2' : 'auto' }}
          >
            Buscar
          </Button>
          {filtersCount && filtersCount > 0 ? (
            <Button
              fullWidth
              size="large"
              type="submit"
              color="inherit"
              variant="outlined"
              onClick={onResetFilter}
              startIcon={<Iconify icon="eva:trash-2-outline" />}
            >
              Clear
            </Button>
          ) : null}
        </Grid>
      </Drawer>
    </>
  );
}

// ----------------------------------------------------------------------
type InputRangeProps = {
  type: 'min' | 'max';
  name: string;
  range?: number | number[];
};

function InputRange({ type, name, range }: InputRangeProps) {
  const { control, setValue } = useFormContext();
  const rangeMin = Array.isArray(range) ? range[0] : (range ?? 0);
  const rangeMax = Array.isArray(range) ? range[1] : (range ?? 1);

  const handleBlurInputRange = (value: [number, number]) => {
    const [min, max] = value;
    const newMin = Math.max(rangeMin, Math.min(min, max));
    const newMax = Math.min(rangeMax, Math.max(min, max));
    setValue(name, [newMin, newMax]);
  };

  return (
    <Controller
      name="priceRange"
      control={control}
      render={({ field }) => {
        const isMin = type === 'min';

        const min = field.value[0];

        const max = field.value[1];

        return (
          <Stack direction="row" spacing={0.5} alignItems="center" sx={{ width: 1 }}>
            <Typography
              variant="caption"
              sx={{
                flexShrink: 0,
                color: 'text.disabled',
                textTransform: 'capitalize',
                fontWeight: 'fontWeightBold',
              }}
            >
              {`${type} ($)`}
            </Typography>

            <Input
              disableUnderline
              fullWidth
              size="small"
              value={isMin ? min : max}
              onChange={(event) =>
                isMin
                  ? field.onChange([Number(event.target.value), max])
                  : field.onChange([min, Number(event.target.value)])
              }
              onBlur={() => handleBlurInputRange(field.value)}
              inputProps={{
                step: 10,
                min: 0,
                max: 200,
                type: 'number',
                'aria-labelledby': 'input-slider',
              }}
              sx={{
                pr: 1,
                py: 0.5,
                borderRadius: 0.75,
                typography: 'body2',
                bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
                '& .MuiInput-input': { p: 0, textAlign: 'right' },
              }}
            />
          </Stack>
        );
      }}
    />
  );
}
