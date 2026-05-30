import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const baseURL = process.env.EXPO_PUBLIC_API_URL;

interface AuthState {
  token: string | null;
  user: { id: string; email: string; name?: string } | null;
  login: (email: string, pass: string) => Promise<void>;
  signup: (name: string, email: string, pass: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,

      login: async (email, password) => {
        const { data } = await axios.post(`${baseURL}/api/auth/login`, { email, password });
        set({ token: data.token, user: data.user });
      },

      signup: async (name, email, password) => {
        const { data } = await axios.post(`${baseURL}/api/auth/signup`, { name, email, password });
        set({ token: data.token, user: data.user });
      },

      logout: () => {
        set({ token: null, user: null });
      },
    }),
    {
      name: 'auth-storage', 
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);