import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from '@expo/vector-icons';
import TabStack from "../stack/TabStack";
import SettingsScreen from "./sidemenu-screens/SettingsScreen";
import ProfileScreen from "./sidemenu-screens/ProfileScreen";
import EditProfileScreen from "./sidemenu-screens/profiles-screens/EditProfileScreen";
import AccountSettings from "./sidemenu-screens/settings-screens/AccountSettings";
import UserFollowershipScreen from "./sidemenu-screens/profiles-screens/UserFollowershipScreen";
import NewPostScreen from "./tab-screens/sub-screens/NewPostScreen";
import CoursePostsScreen from "./tab-screens/sub-screens/CoursePostsScreen";
import EditPostScreen from "./tab-screens/sub-screens/EditPostScreen";
import FavoritesScreen from "./sidemenu-screens/FavoritesScreen";
import { BackButton, CustomDrawer, FilhubLogo } from "../../ModuleExports";
import AuthContext from "../../utils/contexts/AuthContext";
import AboutScreen from "./sidemenu-screens/settings-screens/AboutScreen";

const Drawer = createDrawerNavigator();

export default function MainScreen() {
  const { user } = useContext(AuthContext);

  const screenOptions = (title, backRoute = null) => ({
    title,
    headerLeft: () => (backRoute ? <BackButton route={backRoute} /> : <BackButton/>),
    headerStyle: {
      borderBottomWidth: 0.2,
      borderColor: 'black',
    },
  });

  return (
    <Drawer.Navigator
      screenOptions={{ unmountOnBlur: false }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="Início"
        component={TabStack}
        options={{
          headerTitle: () => (
            <View style={styles.logoContainer}>
              <FilhubLogo />
            </View>
          ),
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
          headerStyle: {
            borderBottomWidth: 0.2,
            borderColor: 'black',
          },
        }}
      />

      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={screenOptions('Configurações')}
      />

      <Drawer.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={screenOptions('Publicações Favoritas')}
      />

      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: '',
          headerShown: false,
          unmountOnBlur: true,
        }}
      />

      <Drawer.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          title: 'Editar Perfil',
          headerShown: false,
        }}
      />

      <Drawer.Screen
        name="UserFollowership"
        component={UserFollowershipScreen}
        options={{
          title: '',
          unmountOnBlur: true,
          headerLeft: () => <BackButton route="Profile" />,
        }}
      />

      <Drawer.Screen
        name="AccountSettings"
        component={AccountSettings}
        options={screenOptions('Configurações da Conta', 'Settings')}
      />

    <Drawer.Screen
        name="About"
        component={AboutScreen}
        options={screenOptions('Sobre', 'Settings')}
      />


      <Drawer.Screen
        name="NewPostScreen"
        component={NewPostScreen}
        options={{
          title: 'Nova Publicação',
          unmountOnBlur: true,
          headerLeft: () => <BackButton />,
        }}
      />

      <Drawer.Screen
        name="EditPost"
        component={EditPostScreen}
        options={{
          title: 'Editar Publicação',
          unmountOnBlur: true,
          headerLeft: () => <BackButton />,
        }}
      />

      <Drawer.Screen
        name="CoursePosts"
        component={CoursePostsScreen}
        options={{
          title: '',
          unmountOnBlur: true,
          headerLeft: () => <BackButton />,
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    position: 'relative',
    left: 45,
  },
});
