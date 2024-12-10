import { SignedIn, useClerk } from "@clerk/clerk-expo";
import { Button, StyleSheet, Text, View } from "react-native";

const SettingsScreen = () => {
  const { signOut, user } = useClerk();

  return (
    <View style={styles.container}>
      <SignedIn>
        <Text>Email: {user?.emailAddresses[0]?.emailAddress}</Text>
        <Text>Full Name: {user?.fullName}</Text>
        <Text>username: {user?.username || "N/A"}</Text>
        <Button title="Logout" onPress={() => signOut()} />
      </SignedIn>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
