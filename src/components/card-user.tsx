import type { IUser } from '@/shared/interfaces/IUser';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { LoremIpsum } from 'lorem-ipsum';
import { Drawer } from './drawer';
import { PlusIcon } from 'lucide-react';
import { Button } from './ui/button';
import { useDashboardUserModal } from '@/views/Dashboard/context/use-dashboard.context';
import { useUserDelete } from '@/queries/useUserDelete/useUserDelete';
import { useEffect } from 'react';

interface CardUserProps {
  isPlus?: boolean;
  user?: IUser;
}

export function CardUser({ ...props }: CardUserProps) {
  const userNote = new LoremIpsum().generateSentences(2);
  const { openModal, callRegisteredFunction } = useDashboardUserModal();

  const { mutate: deleteUser, isSuccess, isError, isPending } = useUserDelete();

  const drawerActions = [
    {
      title: 'editar',
      onAction: () => props.user && openModal({ userId: props.user.id }),
    },
    { title: 'excluir', onAction: () => props.user && deleteUser(props.user.id) },
  ];

  useEffect(() => {
    if ((isSuccess || isError) && !isPending) {
      callRegisteredFunction();
    }
  }, [callRegisteredFunction, isError, isPending, isSuccess]);
  return (
    <Card
      key={props.user?.id}
      className={`mx-auto w-full max-w-[420px] ${!props.user?.id && 'cursor-pointer'}`}
      onClick={() => !props.user?.id && openModal({ newUser: true })}
    >
      <CardHeader>
        <CardTitle className="flex gap-1 text-start">
          <p>{props?.user?.first_name}</p>
          <p>{props?.user?.last_name}</p>
        </CardTitle>
        <CardDescription className="max-w-36 truncate text-start">
          {props.user?.email}
        </CardDescription>
        <CardAction>
          {props.user && props.user?.id ? (
            <Drawer actions={drawerActions} />
          ) : (
            <Button variant="ghost" type="button" className="h-8 w-8 cursor-pointer p-0">
              <PlusIcon />
            </Button>
          )}
        </CardAction>
      </CardHeader>
      <CardContent className="min-h-[72px]">
        {props.user?.id && (
          <p
            className="overflow-hidden text-ellipsis"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {userNote}
          </p>
        )}
      </CardContent>
      <CardFooter>
        <p>{props.user?.role?.toLowerCase()}</p>
      </CardFooter>
    </Card>
  );
}
