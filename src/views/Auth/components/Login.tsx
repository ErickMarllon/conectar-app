import { Alert, Box, Link, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AuthLoginForm from './AuthLoginForm';
import AuthWithSocial from './AuthWithSocial';
import AccessLayout from '@/layout/access';
import { PATH_AUTH } from '@/routes/paths';

export default function Login() {
  return (
    <AccessLayout>
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant="h4">Sign in to Minimal</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">New user?</Typography>

          <Link component={RouterLink} to={PATH_AUTH.register} variant="subtitle2">
            Create an account
          </Link>
        </Stack>

        {/* <Tooltip title={method} placement="left"> */}
        <Box
          component="img"
          alt={'ic_jwt'}
          src={`/assets/icons/auth/ic_jwt.png`}
          sx={{ width: 32, height: 32, position: 'absolute', right: 0 }}
        />
        {/* </Tooltip> */}
      </Stack>

      <Alert severity="info" sx={{ mb: 3 }}>
        Use email : <strong>teste@teste.com</strong> <br />
        password : <strong>123456aA@</strong>
      </Alert>

      <AuthLoginForm />

      <AuthWithSocial />
    </AccessLayout>
  );
}
