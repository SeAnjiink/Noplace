// hooks/useAuth.ts
import { useState, useCallback } from 'react';
import { authAPI } from '@noplace/utils';
import { AuthResponse, User } from '@noplace/types';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signup = useCallback(async (username: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.signup(username, email, password);
      const data: AuthResponse = response.data;
      localStorage.setItem('auth_token', data.token);
      setUser({ ...data, created_at: new Date().toISOString(), updated_at: new Date().toISOString() } as User);
      return data;
    } catch (err: any) {
      const message = err.response?.data?.error || 'Signup failed';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.login(email, password);
      const data: AuthResponse = response.data;
      localStorage.setItem('auth_token', data.token);
      setUser({ ...data, created_at: new Date().toISOString(), updated_at: new Date().toISOString() } as User);
      return data;
    } catch (err: any) {
      const message = err.response?.data?.error || 'Login failed';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('auth_token');
    setUser(null);
  }, []);

  return { user, loading, error, signup, login, logout };
}
