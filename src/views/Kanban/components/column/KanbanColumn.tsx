import { Draggable, Droppable } from '@hello-pangea/dnd';
import { Button, Paper, Stack } from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';
import type { IKanbanCard, IKanbanColumn } from '@/shared/interfaces/IKanban';
import KanbanTaskAdd from '../KanbanTaskAdd';
import KanbanTaskCard from '../KanbanTaskCard';
import KanbanColumnToolBar from './KanbanColumnToolBar';
import Iconify from '@/components/iconify';
import { useKanbanCreate } from '@/queries/kanban/create/useKanbanCreate';
import { useKanbanDeleteColumn } from '@/queries/kanban/delete/useKanbanDeleteColumn';
import { useKanbanUpdateColumn } from '@/queries/kanban/update/useUpdateColumn';

type Props = {
  index: number;
  columnId: string;
  column: IKanbanColumn;
  cards: Record<string, IKanbanCard>;
};

export default function KanbanColumn({ index, column, columnId, cards }: Props) {
  const [openAddTask, setOpenAddTask] = useState(false);
  const { mutate: handleDelete } = useKanbanDeleteColumn();
  const { mutate: handleUpdate } = useKanbanUpdateColumn();
  const { mutate: handleCreate } = useKanbanCreate();
  const handleToggleAddTask = () => {
    setOpenAddTask(!openAddTask);
  };

  const handleCloseAddTask = () => {
    setOpenAddTask(false);
  };

  const handleDeleteTask = (cardId: string) => {
    handleDelete(
      {
        slug: 'board-default',
        cardId,
        columnId: column.id,
      },
      {
        onSuccess: () => {
          toast.success('Delete success!');
        },
        onError: () => {
          toast.error('Delete failed!');
        },
      },
    );
  };

  const handleDeleteColumn = async () => {
    handleDelete(
      {
        slug: 'board-default',
        columnId: column.id,
      },
      {
        onSuccess: () => {
          toast.success('Delete success!');
        },
        onError: () => {
          toast.error('Delete failed!');
        },
      },
    );
  };

  const handleUpdateColumn = async (newName: string) => {
    handleUpdate(
      {
        slug: 'board-default',
        columnId: column.id,
        data: {
          columns: {
            id: column.id,
            name: newName,
          },
        },
      },
      {
        onSuccess: () => {
          toast.success('Delete success!');
        },
        onError: () => {
          toast.error('Delete failed!');
        },
      },
    );
  };

  const handleAddTask = (task: IKanbanCard) => {
    handleCloseAddTask();
    handleCreate(
      {
        slug: 'board-default',
        columnId: column.id,
        data: {
          cards: task,
          columns: {
            id: column.id,
          },
        },
      },
      {
        onSuccess: () => {
          toast.success('Delete success!');
        },
        onError: () => {
          toast.error('Delete failed!');
        },
      },
    );
  };

  return (
    <>
      {column && (
        <Draggable draggableId={columnId} index={index}>
          {(provided) => (
            <Paper
              {...provided.draggableProps}
              ref={provided.innerRef}
              variant="outlined"
              sx={{
                px: 2,
                borderRadius: 1,
                borderStyle: 'dashed',
                bgcolor: (theme) =>
                  theme.palette.mode === 'light' ? 'grey.100' : 'background.default',
              }}
            >
              <Stack spacing={3} {...provided.dragHandleProps}>
                <KanbanColumnToolBar
                  columnName={column?.name}
                  onDelete={handleDeleteColumn}
                  onUpdate={handleUpdateColumn}
                />
                <Droppable droppableId={columnId} type="task">
                  {(columnProvided) => (
                    <Stack
                      ref={columnProvided.innerRef}
                      {...columnProvided.droppableProps}
                      spacing={2}
                      sx={{ width: 280 }}
                    >
                      {column?.cardIds?.map((cardId, cardIndex) => (
                        <KanbanTaskCard
                          key={cardId}
                          index={cardIndex}
                          onDeleteTask={handleDeleteTask}
                          card={cards[cardId]}
                        />
                      ))}
                      {columnProvided.placeholder}
                    </Stack>
                  )}
                </Droppable>

                <Stack spacing={2} sx={{ pb: 3 }}>
                  {openAddTask && (
                    <KanbanTaskAdd onAddTask={handleAddTask} onCloseAddTask={handleCloseAddTask} />
                  )}

                  <Button
                    fullWidth
                    size="large"
                    color="inherit"
                    startIcon={<Iconify icon="eva:plus-fill" />}
                    onClick={handleToggleAddTask}
                    sx={{ fontSize: 14 }}
                  >
                    Add Task
                  </Button>
                </Stack>
              </Stack>
            </Paper>
          )}
        </Draggable>
      )}
    </>
  );
}
