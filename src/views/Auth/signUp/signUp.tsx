import { useAuthUser } from '@/queries/useAuth/useAuth';
import { AuthActionType } from '@/queries/useAuth/types/IUseAuthTypes';
import { AccessForm } from '@/components/access-form/access-form';
import { signUpSchema } from '@/components/access-form/schemas/sign-up.schema';
import { signUpMock } from '../constants/sign-up-data.mock';
import { useRedirectAfterLogin } from '@/hooks/useRedirectAfterAuth';

export function SignUp() {
  const { mutate, data } = useAuthUser({ type: AuthActionType.SIGNUP });
  useRedirectAfterLogin(data?.data);

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <AccessForm schema={signUpSchema} mock={signUpMock} onSubmit={mutate} />
    </div>
  );
}
