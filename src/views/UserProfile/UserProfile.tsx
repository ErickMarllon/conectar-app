// src/views/UserProfile.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
// import { format } from 'date-fns';
// import { ptBR } from 'date-fns/locale';
//
const mockUser = {
  email: 'johndoe@example.com',
  first_name: 'John',
  last_name: 'Doe',
  role: 'ADMIN',
  created_at: '2024-05-12T14:30:00Z',
  updated_at: '2024-06-20T10:15:00Z',
};

export function UserProfile() {
  return (
    <div className="mx-auto mt-12 max-w-96 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Perfil do Usuário</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground space-y-4 text-sm">
          <div className="flex gap-2">
            <span className="text-foreground font-medium">Email:</span>
            <span>{mockUser.email}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-foreground font-medium">Primeiro Nome:</span>
            <span>{mockUser.first_name}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-foreground font-medium">Último Nome:</span>
            <span>{mockUser.last_name}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-foreground font-medium">Função:</span>
            <Badge variant="secondary">{mockUser.role}</Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-foreground font-medium">Criado em:</span>
            <span>
              {/* {format(new Date(mockUser.created_at), "dd 'de' MMMM yyyy HH:mm", { locale: ptBR })} */}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-foreground font-medium">Atualizado em:</span>
            <span>
              {/* {format(new Date(mockUser.updated_at), "dd 'de' MMMM yyyy HH:mm", { locale: ptBR })} */}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
