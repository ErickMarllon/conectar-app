import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMe } from '@/queries/useMe/useMe';
import { formatToDatetimeLocal } from '@/shared/utils/formatToDatetimeLocal';

export function UserProfile() {
  const { data } = useMe();

  const initials = `${data?.first_name?.[0] || ''}${data?.first_name?.[0] || ''}`.toUpperCase();

  return (
    <Card className="mx-auto mt-10 w-full max-w-[425px] p-4">
      <CardHeader className="flex flex-col items-center justify-center">
        <Avatar className="mb-4 h-24 w-24">
          <AvatarImage src={data?.picture} alt={`${data?.first_name} ${data?.last_name}`} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <CardTitle className="text-xl">
          {data?.first_name} {data?.last_name}
        </CardTitle>
        <p className="text-muted-foreground">{data?.email}</p>
      </CardHeader>
      <CardContent className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between border-b pb-1">
          <span className="font-medium">ID:</span>
          <span>{data?.id}</span>
        </div>
        <div className="flex justify-between border-b pb-1">
          <span className="font-medium">Função:</span>
          <span>{data?.role ?? '-'}</span>
        </div>
        <div className="flex justify-between border-b pb-1">
          <span className="font-medium">Último login:</span>
          <span>{formatToDatetimeLocal(data?.last_login_at)}</span>
        </div>
        <div className="flex justify-between border-b pb-1">
          <span className="font-medium">Criado em:</span>
          <span>{formatToDatetimeLocal(data?.created_at)}</span>
        </div>
        <div className="flex justify-between border-b pb-1">
          <span className="font-medium">Atualizado em:</span>
          <span>{formatToDatetimeLocal(data?.updated_at)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
