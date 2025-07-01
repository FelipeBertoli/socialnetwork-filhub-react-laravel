import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SettingsScreen from "../screens/sidemenu-screens/SettingsScreen";
import ProfileScreen from "../screens/sidemenu-screens/ProfileScreen";
import EditProfileScreen from "../screens/sidemenu-screens/profiles-screens/EditProfileScreen";
import UserFollowershipScreen from "../screens/sidemenu-screens/profiles-screens/UserFollowershipScreen";
import OtherUserProfileScreen from "../screens/sidemenu-screens/profiles-screens/OtherUserProfileScreen";
import FavoritesScreen from "../screens/sidemenu-screens/FavoritesScreen";

const Drawer = createDrawerNavigator();

export default function DrawerStack() {
  return (
    <Drawer.Navigator>
       <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Favorites" component={FavoritesScreen} />
      <Drawer.Screen name="Profile" component={SettingsScreen} />
      <Drawer.Screen name="EditProfile" component={EditProfileScreen} />
      <Drawer.Screen name="UserFollowership" component={UserFollowershipScreen} />
      <Drawer.Screen name="OtherUserProfile" component={OtherUserProfileScreen} />
    </Drawer.Navigator>
  );
}
