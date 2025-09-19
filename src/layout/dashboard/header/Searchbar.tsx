import { useState, memo, useEffect } from 'react';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

import { useNavigate, useLocation } from 'react-router-dom';
// @mui
import { alpha, styled } from '@mui/material/styles';
import {
  Box,
  Popper,
  InputBase,
  type PopperProps,
  Autocomplete,
  InputAdornment,
  ClickAwayListener,
  Dialog,
  DialogContent,
} from '@mui/material';
// utils
import { bgBlur } from '@/utils/cssStyles';
import flattenArray from '@/utils/flattenArray';
// components
import Iconify from '@/components/iconify';
import type { NavListProps } from '@/components/nav-section';
import { IconButtonAnimate } from '@/components/animate';
import SearchNotFound from '@/components/search-not-found';
//
import NavConfig from '../nav/config-navigation';

// ----------------------------------------------------------------------

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const BootstrapDialog = styled(Dialog)(() => ({
  '& .MuiDialogContent-root': {
    padding: 0,
    height: '50dvh',
    width: '100%',
  },
}));

const StyledSearchbar = styled('div')(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: APPBAR_MOBILE,
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  [theme.breakpoints.up('md')]: {
    height: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

const StyledPopper = styled((props: PopperProps) => <Popper {...props} />)(({ theme }) => ({
  top: `${APPBAR_MOBILE}px !important`,
  width: '100% !important',
  transform: 'none !important',
  border: 'none !important',
  '& .MuiAutocomplete-paper': {
    borderRadius: '0 ',
  },
  '& .MuiAutocomplete-listbox': {
    maxHeight: 'none !important',
    padding: 0,
    '& .MuiAutocomplete-option': {
      margin: 0,
      display: 'block',
      width: '100% !important',

      border: `dashed 1px transparent`,
      borderBottomColor: theme.palette.divider,
      '&:last-of-type': {
        borderBottomColor: 'transparent',
      },
      '&:hover': {
        borderColor: theme.palette.primary.main,
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.hoverOpacity),
      },
    },
  },
  [theme.breakpoints.up('md')]: {
    top: `${APPBAR_DESKTOP}px !important`,
  },
}));

// ----------------------------------------------------------------------

interface Option extends NavListProps {
  subheader: string;
}

function Searchbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [open, setOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');

  const reduceItems = NavConfig.map((list) =>
    handleLoop(list.items, (list as any).subheader),
  ).flat();

  const allItems = flattenArray(reduceItems).map((option) => {
    const group = splitPath(reduceItems, option.path);

    return {
      group: group && group.length > 1 ? group[0] : (option as Option).subheader,
      title: option.title,
      path: option.path,
      indexKey: 'minimal',
    };
  });

  useEffect(() => {
    if (open) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (path: string) => {
    if (path.includes('http')) {
      window.open(path);
    } else {
      navigate(path);
    }
    handleClose();
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleClick(searchQuery);
    }
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        <IconButtonAnimate onClick={handleOpen}>
          <Iconify icon="eva:search-fill" />
        </IconButtonAnimate>

        <BootstrapDialog
          open={open}
          onClose={handleClose}
          maxWidth={'sm'}
          fullWidth={true}
          slotProps={{
            backdrop: {
              sx: {
                backgroundColor: (theme) => alpha(theme.palette.grey[900], 0.5),
              },
            },
          }}
          closeAfterTransition
        >
          <DialogContent dividers>
            <StyledSearchbar>
              <Autocomplete
                open={true}
                disableClearable
                disablePortal={true}
                clearOnEscape={true}
                autoComplete={true}
                popupIcon={null}
                sx={{ width: '100%', height: '100%' }}
                slots={{
                  popper: StyledPopper,
                }}
                onInputChange={(_, value) => setSearchQuery(value)}
                noOptionsText={<SearchNotFound query={searchQuery} />}
                options={allItems.sort((a, b) => -b.group.localeCompare(a.group))}
                getOptionLabel={(option) => `${option.title} ${option.path} ${option.indexKey}`}
                renderInput={(params) => (
                  <InputBase
                    {...params.InputProps}
                    inputProps={params.inputProps}
                    fullWidth
                    autoFocus
                    placeholder="Search..."
                    onKeyUp={handleKeyUp}
                    startAdornment={
                      <InputAdornment position="start">
                        <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                      </InputAdornment>
                    }
                    sx={{ height: 1, typography: 'h6' }}
                  />
                )}
                renderOption={(props, option, { inputValue }) => {
                  const { title, path } = option;

                  const partsTitle = parse(title, match(title, inputValue));

                  const partsPath = parse(path, match(path, inputValue));

                  return (
                    <Box component="li" {...props} onClick={() => handleClick(path)}>
                      <div>
                        {partsTitle.map((part, index) => (
                          <Box
                            key={index}
                            component="span"
                            sx={{
                              typography: 'subtitle2',
                              textTransform: 'capitalize',
                              color: part.highlight ? 'primary.main' : 'text.primary',
                            }}
                          >
                            {part.text}
                          </Box>
                        ))}
                      </div>

                      <div>
                        {partsPath.map((part, index) => (
                          <Box
                            key={index}
                            component="span"
                            sx={{
                              typography: 'caption',
                              color: part.highlight ? 'primary.main' : 'text.secondary',
                            }}
                          >
                            {part.text}
                          </Box>
                        ))}
                      </div>
                    </Box>
                  );
                }}
              />
            </StyledSearchbar>
          </DialogContent>
        </BootstrapDialog>
      </div>
    </ClickAwayListener>
  );
}

export default memo(Searchbar);

// ----------------------------------------------------------------------

type ItemProps = {
  path: string[];
  currItem: NavListProps;
};

function splitPath(array: NavListProps[], key: string) {
  let stack = array.map((item) => ({
    path: [item.title],
    currItem: item,
  }));

  while (stack.length) {
    const { path, currItem } = stack.pop() as ItemProps;

    if (currItem.path === key) {
      return path;
    }

    if (currItem.children?.length) {
      stack = stack.concat(
        currItem.children.map((item: NavListProps) => ({
          path: path.concat(item.title),
          currItem: item,
        })),
      );
    }
  }
  return null;
}

// ----------------------------------------------------------------------

function handleLoop(array: any, subheader?: string) {
  return array?.map((list: any) => ({
    subheader: subheader || '',
    ...list,
    ...(list.children && {
      children: handleLoop(list.children, subheader),
    }),
  }));
}
