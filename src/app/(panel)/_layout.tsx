import { Stack } from "expo-router";

export default function PanelLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="home/page"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="audits/page"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="profile"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="stats"
        options={{ headerShown: false }}
      />

    </Stack>
  )
}