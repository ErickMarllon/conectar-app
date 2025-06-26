import { useContext } from 'react';
import { AuthContext } from './auth.context';

function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
export { useAuthContext };
