import { Stack } from "expo-router";

export default function PanelLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="home/page"
        options={{ headerShown: false }}
      />
    </Stack>
  )
}