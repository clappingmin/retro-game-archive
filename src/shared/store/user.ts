import { create } from 'zustand';
import { User } from '@/shared/types/user';

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (state: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user: User | null) => set({ user }),
  isLoggedIn: false,
  setIsLoggedIn: (state: boolean) => set({ isLoggedIn: state }),
}));

export function setLoggedInUser(user: User) {
  useUserStore.getState().setUser(user);
  useUserStore.getState().setIsLoggedIn(true);
}
