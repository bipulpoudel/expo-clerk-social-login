import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useForm } from "react-hook-form";
import { useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";

import TextInput from "@/components/Forms/TextInput";
import RadioButtonInput from "@/components/Forms/RadioButtonInput";

const CompleteYourAccountScreen = () => {
  const { user } = useUser();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      full_name: user?.fullName || "",
      username: user?.username || "",
      gender: "male",
    },
  });

  const onSubmit = async (data: any) => {
    const { full_name, username, gender } = data;

    try {
      await user?.update({
        username: username,
        firstName: full_name.split(" ")[0],
        lastName: full_name.split(" ")[1],
        unsafeMetadata: {
          gender,
          onboarding_completed: true,
        },
      });

      await user?.reload();

      return router.push("/(tabs)");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top + 40, paddingBottom: insets.bottom },
      ]}
    >
      <View style={styles.headingContainer}>
        <Text style={styles.label}>Complete your account</Text>
        <Text style={styles.description}>
          Complete your account to start your journey with thousands of
          developers around the world.
        </Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          control={control}
          placeholder="Enter your full name"
          label="Full Name"
          required
          name="full_name"
        />

        <TextInput
          control={control}
          placeholder="Enter your username"
          label="Username"
          required
          name="username"
        />

        <RadioButtonInput
          control={control}
          placeholder="Select your gender"
          label="Gender"
          required
          name="gender"
          options={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
            { label: "Other", value: "other" },
          ]}
        />

        <View style={{ marginTop: 20 }}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.buttonText}>Complete account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CompleteYourAccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    gap: 20,
  },
  headingContainer: {
    width: "100%",
    gap: 5,
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    color: "gray",
  },
  formContainer: {
    width: "100%",
    marginTop: 20,
    gap: 20,
  },
  textIput: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    width: "100%",
  },
  button: {
    width: "100%",
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
  },
});
