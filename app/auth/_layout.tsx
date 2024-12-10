import { useAuth, useUser } from "@clerk/clerk-expo";
import { Redirect, Stack, usePathname } from "expo-router";

export default function AuthLayout() {
  const { user } = useUser();
  const pathName = usePathname();
  const { isSignedIn } = useAuth();

  if (isSignedIn && user?.unsafeMetadata?.onboarding_completed !== true) {
    if (pathName !== "/auth/complete-your-account") {
      return <Redirect href="/auth/complete-your-account" />;
    }
  }

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
