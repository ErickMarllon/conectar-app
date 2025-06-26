import { useAuthUser } from '@/queries/useAuth/useAuth';
import { AuthActionType } from '@/queries/useAuth/types/IUseAuthTypes';
import { AccessForm } from '@/components/access-form/access-form';
import { signInSchema } from '@/components/access-form/schemas/sign-in.schema';
import { signInMock } from '../constants/sign-in-data.mock';
import { useRedirectAfterLogin } from '@/hooks/useRedirectAfterAuth';
import type { ISignUpDto } from '@/components/access-form/dto/sign-up.dto';

export function SignIn() {
  const { mutate, data } = useAuthUser({ type: AuthActionType.SIGNIN });
  useRedirectAfterLogin(data?.data);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-muted min-h-svh md:p-10">
      <AccessForm
        schema={signInSchema}
        mock={signInMock}
        onSubmit={(data) => {
          mutate(data as ISignUpDto);
        }}
      />
    </div>
  );
}
