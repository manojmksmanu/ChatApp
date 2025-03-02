import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function GroupScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Group Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#FFFFFF",
    fontSize: 20,
  },
});
