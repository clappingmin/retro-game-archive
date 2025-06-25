import { useUserStore } from '../store/user';
import { User } from '../types/user';

export const useAuth = () => {
  const setUser = useUserStore((s) => s.setUser);
  const setIsLoggedIn = useUserStore((s) => s.setIsLoggedIn);

  const login = (user: User) => {
    setUser(user);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return { login, logout };
};
