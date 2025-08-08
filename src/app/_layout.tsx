import { Stack, router } from "expo-router";
import { useEffect } from 'react';

export default function RootLayout() {
  useEffect(() => {
    const checkAuth = async () => {
      const signed = false;

      if (!signed) {
        router.replace('/(auth)/signin/page');
        return;
      }

      router.replace('/(panel)/home/page');
    };

    // Delay para garantir que o componente esteja montado
    const timer = setTimeout(checkAuth, 100);
    return () => clearTimeout(timer);
  }, []);

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
