import { Tabs } from "expo-router";
import React, { useRef } from "react";
import { View, StyleSheet, Dimensions, StatusBar } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";
import * as Animatable from "react-native-animatable";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const screenWidth = Dimensions.get("window").width;
const TAB_COUNT = 3;

export default function TabLayout() {
  const translateX = useSharedValue(0);
  const currentTabIndex = useRef(0);
  const tabsRef = useRef<any>(null);

  const updateIndicator = (index: number) => {
    translateX.value = withSpring(index * (screenWidth / TAB_COUNT), {
      damping: 15,
      stiffness: 120,
    });
    currentTabIndex.current = index;
  };

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    width: screenWidth / TAB_COUNT - 40, // Slightly narrower for better spacing
  }));

  const swipeGesture = Gesture.Pan()
    .onBegin(() => {})
    .onEnd((event) => {
      const swipeThreshold = screenWidth / 4;
      const tabNames = ["index", "group", "profile"];

      if (event.translationX > swipeThreshold && currentTabIndex.current > 0) {
        const newIndex = currentTabIndex.current - 1;
        updateIndicator(newIndex);
        tabsRef.current?.navigate(tabNames[newIndex]);
      } else if (
        event.translationX < -swipeThreshold &&
        currentTabIndex.current < TAB_COUNT - 1
      ) {
        const newIndex = currentTabIndex.current + 1;
        updateIndicator(newIndex);
        tabsRef.current?.navigate(tabNames[newIndex]);
      }
    })
    .runOnJS(true);

  return (
    <GestureDetector gesture={swipeGesture}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
        <Tabs
          initialRouteName="index"
          screenOptions={{
            tabBarStyle: styles.tabBarStyle,
            tabBarShowLabel: false,
            headerShown: false,
            tabBarActiveTintColor: "#4A90E2",
            swipeEnabled: true,
          }}
          sceneContainerStyle={styles.sceneContainer}
          tabBar={(props) => {
            tabsRef.current = props.navigation;
            return (
              <View style={styles.tabBarContainer}>
                <View style={styles.tabBar}>
                  {props.state.routes.map((route, index) => (
                    <Animatable.View
                      key={route.key}
                      animation={
                        props.state.index === index ? "bounceIn" : "fadeIn"
                      }
                      duration={300}
                      useNativeDriver
                      style={[
                        styles.tabItem,
                        props.state.index === index && styles.activeTabItem,
                      ]}
                    >
                      <FontAwesome
                        name={
                          route.name === "index"
                            ? "comment"
                            : route.name === "group"
                            ? "users"
                            : "user"
                        }
                        size={28} // Slightly larger icons
                        color={
                          props.state.index === index
                            ? ["#4A90E2", "#1ABC9C", "#9B59B6"][index]
                            : "#B0B0B0"
                        }
                        onPress={() => {
                          updateIndicator(index);
                          props.navigation.navigate(route.name);
                        }}
                      />
                    </Animatable.View>
                  ))}
                  {/* Animated Indicator */}
                  {/* <Animated.View style={[styles.indicator, indicatorStyle]} /> */}
                </View>
              </View>
            );
          }}
        >
          <Tabs.Screen
            name="index"
            listeners={{ tabPress: () => updateIndicator(0) }}
          />
          <Tabs.Screen
            name="group"
            listeners={{ tabPress: () => updateIndicator(1) }}
          />
          <Tabs.Screen
            name="profile"
            listeners={{ tabPress: () => updateIndicator(2) }}
          />
        </Tabs>
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  sceneContainer: {
    backgroundColor: "#F5F5F5",
    paddingBottom: 80, // Adjusted to fit the tab bar height
  },
  tabBarContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  tabBar: {
    backgroundColor: "#FFFFFF",
    height: 60,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8, // Slightly higher elevation for a floating effect
    position: "relative",
  },
  tabBarStyle: {
    display: "none", // Hide default tab bar
  },
  tabItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  activeTabItem: {
    // Optional: Add a subtle background or scale effect for active tab
    backgroundColor: "rgba(74, 144, 226, 0.1)", // Light tint for active tab
    borderRadius: 30,
  },
  indicator: {
    position: "absolute",
    bottom: 5, // Positioned at the bottom of the tab bar
    height: 3,
    backgroundColor: "#4A90E2",
    borderRadius: 3,
    marginHorizontal: 20, // Adjusted for better centering
    left: 0,
    shadowColor: "#4A90E2",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 2,
  },
});
