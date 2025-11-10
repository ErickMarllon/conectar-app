import { Button, ClickAwayListener, Paper, TextField } from '@mui/material';
import { useState } from 'react';
import Iconify from '@/components/iconify';
import { useKanbanCreate } from '@/queries/kanban/create/useKanbanCreate';

export default function KanbanColumnAdd() {
  const [name, setName] = useState('');
  const { mutate: handleCreate } = useKanbanCreate();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleCreateColumn = async () => {
    handleCreate(
      {
        slug: 'board-default',
        data: {
          columns: {
            name,
          },
        },
      },
      {
        onSuccess: () => {
          setName('');
          handleClose();
        },
      },
    );
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleCreateColumn();
    }
  };

  return (
    <Paper sx={{ minWidth: 280, width: 280 }}>
      {open ? (
        <ClickAwayListener onClickAway={handleCreateColumn}>
          <TextField
            autoFocus
            fullWidth
            placeholder="New section"
            value={name}
            onChange={handleChangeName}
            onKeyUp={handleKeyUp}
            InputProps={{
              sx: { typography: 'h6' },
            }}
          />
        </ClickAwayListener>
      ) : (
        <Button
          fullWidth
          size="large"
          color="inherit"
          variant="outlined"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleOpen}
        >
          Add section
        </Button>
      )}
    </Paper>
  );
}
