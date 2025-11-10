import { InputAdornment, TextField, type TextFieldProps } from '@mui/material';
import { useState } from 'react';
import Iconify from '@/components/iconify';

type IUserSearch = TextFieldProps & {
  onSearch: (value?: string) => void;
  onCleanChange: VoidFunction;
};
export default function UserSearch({ onSearch, onCleanChange, ...other }: IUserSearch) {
  const [search, setSearch] = useState<string | undefined>(undefined);

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch(search);
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onSearch(value);
    setSearch(value);
  };

  const handleCleanChange = () => {
    onCleanChange();
    setSearch('');
  };

  return (
    <TextField
      placeholder="Search..."
      onKeyUp={handleKeyUp}
      onChange={handleChange}
      value={search ?? ''}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment
              position="start"
              sx={{ cursor: 'pointer' }}
              onClick={() => onSearch(search)}
            >
              <Iconify icon="eva:search-fill" sx={{ ml: 1, color: 'text.disabled' }} />
            </InputAdornment>
          ),
          endAdornment: search && (
            <InputAdornment position="end" onClick={handleCleanChange} sx={{ cursor: 'pointer' }}>
              <Iconify icon="eva:close-fill" sx={{ mr: 1, color: 'text.disabled' }} />
            </InputAdornment>
          ),
        },
      }}
      {...other}
    />
  );
}
