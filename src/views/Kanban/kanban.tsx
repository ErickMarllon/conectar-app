// @mui
import { Container, Stack } from '@mui/material';
import { DragDropContext, Droppable, type DropResult } from '@hello-pangea/dnd';
// redux
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// utils
import { hideScrollbarX } from '../../utils/cssStyles';
// components
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { SkeletonKanbanColumn } from '../../components/skeleton';
import { KanbanColumn, KanbanColumnAdd } from './components';
import { useKanbanBoard } from '@/queries/kanban/board/useKanbanBoard';
import type { IKanbanCommonParams, IKanbanStateFlat } from '@/shared/interfaces/IKanban';
import { useKanbanUpdateColumn } from '@/queries/kanban/update/useUpdateColumn';
import { toast } from 'react-toastify';
// sections

export function KanbanPage() {
  const { data } = useKanbanBoard({
    slug: 'board-default',
  });
  const { mutate: handleUpdate } = useKanbanUpdateColumn();

  const handleUpdateColumn = async (data: IKanbanCommonParams) => {
    handleUpdate(
      {
        slug: 'board-default',
        ...data,
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

  const board: IKanbanStateFlat = {
    ...data?.board,
    columns: Object.fromEntries(data?.board?.columns.map((c) => [c.id, c]) ?? []),
    cards: Object.fromEntries(data?.board?.cards.map((c) => [c.id, c]) ?? []),
    columnOrder: data?.board?.columnOrder ?? [],
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    if (!destination || !board) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    if (type === 'column') {
      const newColumnOrder = Array.from(board.columnOrder);

      newColumnOrder.splice(source.index, 1);

      newColumnOrder.splice(destination.index, 0, draggableId);
      handleUpdateColumn({ data: { columnOrder: newColumnOrder } });
      return;
    }

    const start = board.columns[source.droppableId];
    const finish = board.columns[destination.droppableId];

    if (start.id === finish.id) {
      const updatedCardIds = [...start.cardIds];

      updatedCardIds.splice(source.index, 1);

      updatedCardIds.splice(destination.index, 0, draggableId);

      const updatedColumn = {
        ...start,
        cardIds: updatedCardIds,
      };

      handleUpdateColumn({
        columnId: updatedColumn.id,
        data: { columns: updatedColumn },
      });
      return;
    }

    const startCardIds = [...start.cardIds];

    startCardIds.splice(source.index, 1);

    const updatedStart = {
      ...start,
      cardIds: startCardIds,
    };

    const finishCardIds = [...finish.cardIds];

    finishCardIds.splice(destination.index, 0, draggableId);

    const updatedFinish = {
      ...finish,
      cardIds: finishCardIds,
    };

    handleUpdateColumn({
      columnId: updatedStart.id,
      data: {
        columns: updatedStart,
      },
    });

    handleUpdateColumn({
      columnId: updatedFinish.id,
      data: {
        columns: updatedFinish,
      },
    });
  };

  return (
    <>
      <Container maxWidth={false} sx={{ height: 1 }}>
        <CustomBreadcrumbs
          heading="Kanban"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            { name: 'Kanban' },
          ]}
        />

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="all-columns" direction="horizontal" type="column">
            {(provided) => (
              <Stack
                {...provided.droppableProps}
                ref={provided.innerRef}
                spacing={3}
                direction="row"
                alignItems="flex-start"
                sx={{
                  height: 1,
                  overflowY: 'hidden',
                  ...hideScrollbarX,
                }}
              >
                {!board || !board.columnOrder || board.columnOrder.length === 0 ? (
                  <SkeletonKanbanColumn />
                ) : (
                  board.columnOrder.map((columnId, index) => (
                    <KanbanColumn
                      index={index}
                      key={columnId}
                      columnId={columnId}
                      column={board.columns[columnId]}
                      cards={board.cards}
                    />
                  ))
                )}

                {provided.placeholder}
                <KanbanColumnAdd />
              </Stack>
            )}
          </Droppable>
        </DragDropContext>
      </Container>
    </>
  );
}
