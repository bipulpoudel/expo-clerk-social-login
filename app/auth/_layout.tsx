import { useAuth, useUser } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const { user } = useUser();
  const { isSignedIn } = useAuth();

  if (isSignedIn && user?.unsafeMetadata?.onboarding_completed === true) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="complete-your-account"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
