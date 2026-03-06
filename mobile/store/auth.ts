// store/auth.ts - Zustand store for mobile
import { create } from 'zustand';
import { User, AuthResponse } from '@noplace/types';
import { authAPI } from '@noplace/utils';

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  
  signup: (username: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hydrate: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  loading: false,
  error: null,

  signup: async (username, email, password) => {
    set({ loading: true, error: null });
    try {
      const res = await authAPI.signup(username, email, password);
      const data: AuthResponse = res.data;
      set({ user: { ...data } as User, token: data.token, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const res = await authAPI.login(email, password);
      const data: AuthResponse = res.data;
      set({ user: { ...data } as User, token: data.token, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  logout: () => {
    set({ user: null, token: null });
  },

  hydrate: async () => {
    // Load from AsyncStorage in React Native
    // For now, just reset
    set({ user: null, token: null });
  },
}));
