import { Stack, router } from "expo-router";
import { useEffect } from "react";
export default function RootLayout() {
 
  useEffect(() => {

    const singIn = false;
    
    if (!singIn) {
      router.replace("/(auth)/signin/page");
      return
   
    }

    router.replace("/(panel)/home/page");
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
  )
}
