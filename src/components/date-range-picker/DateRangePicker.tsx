import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Paper,
  Stack,
} from '@mui/material';
import { DateCalendar, DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import type { DateRangePickerProps } from './types';
import useResponsive from '../../hooks/useResponsive';

export default function DateRangePicker({
  title = 'Select date range',
  variant = 'input',
  //
  startDate,
  endDate,
  //
  onChangeStartDate,
  onChangeEndDate,
  //
  open,
  onClose,
  //
  isError,
}: DateRangePickerProps) {
  const isDesktop = useResponsive('up', 'md');

  const isCalendarView = variant === 'calendar';

  return (
    <Dialog
      fullWidth
      maxWidth={isCalendarView ? false : 'xs'}
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            ...(isCalendarView && {
              maxWidth: 720,
            }),
          },
        },
      }}
    >
      <DialogTitle sx={{ pb: 2 }}>{title}</DialogTitle>

      <DialogContent
        sx={{
          ...(isCalendarView &&
            isDesktop && {
              overflow: 'unset',
            }),
        }}
      >
        <Stack
          spacing={isCalendarView ? 3 : 2}
          direction={isCalendarView && isDesktop ? 'row' : 'column'}
          justifyContent="center"
          sx={{
            pt: 1,
            '& .MuiCalendarPicker-root': {
              ...(!isDesktop && {
                width: 'auto',
              }),
            },
          }}
        >
          {isCalendarView ? (
            <>
              <Paper
                variant="outlined"
                sx={{ borderRadius: 2, borderColor: 'divider', borderStyle: 'dashed' }}
              >
                <DateCalendar
                  value={startDate ? dayjs(startDate) : null}
                  onChange={(newValue: Dayjs | null) => {
                    onChangeStartDate(newValue ? newValue.toDate() : null);
                  }}
                  maxDate={endDate ? dayjs(endDate) : undefined}
                />
              </Paper>

              <Paper
                variant="outlined"
                sx={{ borderRadius: 2, borderColor: 'divider', borderStyle: 'dashed' }}
              >
                <DateCalendar
                  value={endDate ? dayjs(endDate) : null}
                  onChange={(newValue: Dayjs | null) => {
                    onChangeEndDate(newValue ? newValue.toDate() : null);
                  }}
                  minDate={startDate ? dayjs(startDate) : undefined}
                />
              </Paper>
            </>
          ) : (
            <>
              <DatePicker
                label="Start date"
                value={startDate ? dayjs(startDate) : null}
                onChange={(newValue: Dayjs | null) => {
                  onChangeStartDate(newValue ? newValue.toDate() : null);
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    helperText: null,
                  } as any,
                }}
              />
              <DatePicker
                label="End date"
                value={endDate ? dayjs(endDate) : null}
                onChange={(newValue: Dayjs | null) => {
                  onChangeEndDate(newValue ? newValue.toDate() : null);
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: 'small',
                    helperText: null,
                  },
                }}
              />
            </>
          )}
        </Stack>

        {isError && (
          <FormHelperText error sx={{ px: 2 }}>
            End date must be later than start date
          </FormHelperText>
        )}
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" color="inherit" onClick={onClose}>
          Cancel
        </Button>

        <Button disabled={isError} variant="contained" onClick={onClose}>
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
}
