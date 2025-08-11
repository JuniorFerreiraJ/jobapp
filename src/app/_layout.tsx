import { Stack, router } from "expo-router";
import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function RootLayout() {
  const { user, loading } = useAuth();
  
  useEffect(() => {
    if (!loading) {
      if (user) {
        console.log("Usuário logado:", user.email);
        router.replace('/(panel)/home/page');
      } else {
        console.log("Usuário não logado");
        router.replace('/(auth)/signin/page');
      }
    }
  }, [user, loading]);

  // Mostrar loading enquanto verifica autenticação
  if (loading) {
    return null; // Ou um componente de loading
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(auth)"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(panel)"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
