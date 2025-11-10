import { Autocomplete, InputAdornment, Link, Typography } from '@mui/material';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { paramCase } from 'param-case';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { IProduct } from '@/shared/interfaces/IProduct';
import { CustomTextField } from '@/components/custom-input';
import Iconify from '@/components/iconify';
import Image from '@/components/image';
import SearchNotFound from '@/components/search-not-found';
import { useListProducts } from '@/queries/products/useList/useListProducts';
import { PATH_DASHBOARD } from '@/routes/paths';
import { OrderDirection } from '@/shared/enums/orderDirection';

export default function ShopProductSearch() {
  const navigate = useNavigate();
  const [searchProducts, setSearchProducts] = useState<string | undefined>('');
  const [searchResults, setSearchResults] = useState<IProduct[]>([]);
  const { data } = useListProducts({
    params: {
      searchTerm: searchProducts,
      page: 1,
      limit: 10,
      orderBy: OrderDirection.DESC,
    },
  });

  const handleChangeSearch = async (value: string) => {
    try {
      setSearchProducts(value);
      if (data?.data) {
        setSearchResults(data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleGotoProduct = (name?: string) => {
    if (!name) return;
    navigate(PATH_DASHBOARD.eCommerce.view(paramCase(name)), { replace: true });
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleGotoProduct(searchProducts);
    }
  };

  return (
    <Autocomplete
      size="small"
      autoHighlight
      popupIcon={null}
      options={searchResults}
      onInputChange={(_, value) => handleChangeSearch(value)}
      getOptionLabel={(product: IProduct) => product.name}
      noOptionsText={<SearchNotFound query={searchProducts} />}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      slotProps={{
        popper: {
          sx: {
            width: `280px !important`,
          },
        },
        paper: {
          sx: {
            '& .MuiAutocomplete-option': {
              px: `8px !important`,
            },
          },
        },
      }}
      renderInput={(params) => (
        <CustomTextField
          {...params}
          width={220}
          placeholder="Search..."
          onKeyUp={handleKeyUp}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ ml: 1, color: 'text.disabled' }} />
                </InputAdornment>
              ),
            },
          }}
        />
      )}
      renderOption={(props, product, { inputValue }) => {
        const { name, cover } = product;
        const matches = match(name, inputValue);
        const parts = parse(name, matches);

        return (
          <li {...props}>
            <Image
              alt={cover}
              src={cover}
              sx={{ width: 48, height: 48, borderRadius: 1, flexShrink: 0, mr: 1.5 }}
            />

            <Link underline="none" onClick={() => handleGotoProduct(name)}>
              {parts.map((part, index) => (
                <Typography
                  key={index}
                  component="span"
                  variant="subtitle2"
                  color={part.highlight ? 'primary' : 'textPrimary'}
                >
                  {part.text}
                </Typography>
              ))}
            </Link>
          </li>
        );
      }}
    />
  );
}
