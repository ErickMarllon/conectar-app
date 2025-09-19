import Iconify from '@/components/iconify';
import type { IUserAccountGeneral } from '@/shared/interfaces/IUser';
import { InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';

interface IUserSearch {
  data?: IUserAccountGeneral[];
  onSearch: (value?: string) => void;
  onCleanChange: VoidFunction;
}
export default function UserSearch({ onSearch, onCleanChange }: IUserSearch) {
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
      size="small"
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
    />
  );
}
