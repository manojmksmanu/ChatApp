import { Stack } from "expo-router";
import { SafeAreaView, StatusBar, StyleSheet, Platform } from "react-native";

export default function RootLayout() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1A1A1A" />
      {Platform.OS === "android" && (
        <StatusBar
          translucent={false} // Ensure no translucency
          backgroundColor="#1A1A1A" // Match the dark background
          barStyle="light-content" // White text/icons
        />
      )}
      <SafeAreaView style={styles.container}>
        <Stack>
          <Stack.Screen name="(root)" options={{ headerShown: false }} />
          <Stack.Screen name="welcome" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A", // Dark background for the entire app
  },
});
