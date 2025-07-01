import React from "react";
import { StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import HomeScreen from "../screens/tab-screens/HomeScreen";
import FollowershipScreen from "../screens/tab-screens/FollowershipScreen";
import NotificationsScreen from "../screens/tab-screens/NotificationsScreen";
import ChatScreen from "../screens/tab-screens/ChatScreen";
import CoursesScreen from "../screens/tab-screens/CoursesScreen";

export default function TabStack() {
  const Tab = createBottomTabNavigator();
  
  return (
    <View style={styles.container}>
        <View style={styles.content}>
          <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color }) => {
                if (route.name === "Home") {
                  return (
                    <MaterialCommunityIcons
                      name="home"
                      size={30}
                      color={color}
                    />
                  );
                } else if (route.name === "Followership") {
                  return (
                    <MaterialIcons
                      name="person-add-alt-1"
                      size={28}
                      color={color}
                    />
                  );
                } else if (route.name === "Courses") {
                  return (
                    <MaterialIcons name="collections-bookmark" size={26} color={color} />
                  );
                } else if (route.name === "Notifications") {
                  return (
                    <MaterialIcons
                      name="notifications"
                      size={28}
                      color={color}
                    />
                  );
                } else if (route.name === "Chat") {
                  return (
                    <MaterialIcons name="chat-bubble" size={25} color={color} />
                  );
                }
              },
              tabBarActiveTintColor: "#FF7600",
              tabBarInactiveTintColor: "gray",
              tabBarShowLabel: false,
              tabBarStyle: {
                borderTopWidth: .2, 
                borderColor: 'black',
              }
            })}
          >
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Tab.Screen
              name="Followership"
              component={FollowershipScreen}
              options={{ headerShown: false }}
            />
            <Tab.Screen
              name="Courses"
              component={CoursesScreen}
              options={{ headerShown: false }}
            />
            {/* <Tab.Screen
              name="Notifications"
              component={NotificationsScreen}
              options={{ headerShown: false }}
            /> */}
            {/* <Tab.Screen
              name="Chat"
              component={ChatScreen}
              options={{ headerShown: false }}
            /> */}
          </Tab.Navigator>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
