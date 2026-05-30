import { Tabs, useRouter, useSegments, useRootNavigationState } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useAuthStore } from '../src/store/useAuthStore';
import { useEffect } from 'react';

export default function Layout() {
  const token = useAuthStore((state) => state.token);
  const segments = useSegments();
  const router = useRouter();

  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    
    if (!rootNavigationState?.key) return;

    const inAuthGroup = segments[0] === 'login' || segments[0] === 'signup';

    // A MÁGICA ACONTECE AQUI: 
    // Colocamos o redirecionamento no fim da fila de processamento
    setTimeout(() => {
      if (!token && !inAuthGroup) {
        router.replace('/login');
      } else if (token && inAuthGroup) {
        router.replace('/');
      }
    }, 1); // 1 milissegundo de atraso é o suficiente para o Event Loop girar!

  }, [token, segments, rootNavigationState?.key]);

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'black' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tarefas',
          tabBarIcon: ({ color }) => <Feather name="list" size={24} color={color} />,
          headerShown: false,
        }}
      />
    
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <Feather name="user" size={24} color={color} />,
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="login"
        options={{ href: null, headerShown: false }} 
      />
      <Tabs.Screen
        name="signup"
        options={{ href: null, headerShown: false }} 
      />
    </Tabs>
  );
}