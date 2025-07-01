import React, {useContext, useState, useEffect} from "react";
import { View, Image, StyleSheet, Text, Pressable } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import UserImage from '../default/UserImage';
import AuthContext  from "../../../utils/contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";


export default function CustomDrawer (props) {
  const {user} = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <DrawerContentScrollView
      {...props}
      style={styles.borderRight}
      contentContainerStyle={{
        flex: 1, justifyContent: 'space-between'
      }}
    >
      <Pressable style={styles.profileContainer}  onPress={() => navigation.navigate('Profile', {
            visitorId: user.id,
            visitedId: user.id,
            userName: `${user.name} +  ${user.surname}`,
            path: 'Início'})}>
        <View style={styles.profileContent}>
        <UserImage style={styles.image} source={user.picture_path}/>
          <Text style={styles.name}>{user.name} {user.surname}</Text>
        </View>
        <MaterialIcons name="keyboard-arrow-right" size={30} color="#FF7600" />
      </Pressable>

      <View style={{backgroundColor:'white', flex:1}}>
        <DrawerItem
          label="Início"
          labelStyle={{ marginLeft: -20 }}
          icon={() => (
            <MaterialCommunityIcons name="home" size={30} color={"#FF7600"} />
          )}
          onPress={() => {
            props.navigation.navigate("Início");
          }}
        ></DrawerItem>
        <DrawerItem
          label="Favoritos"
          labelStyle={{ marginLeft: -20 }}
          icon={() => (
            <MaterialCommunityIcons
              name="bookmark"
              size={30}
              color={"#FF7600"}
            />
          )}
          onPress={() => {
            props.navigation.navigate("Favorites");
          }}
        ></DrawerItem>
        <DrawerItem
          label="Configurações"
          labelStyle={{ marginLeft: -20 }}
          icon={() => (
            <MaterialIcons name="settings" size={30} color={"#FF7600"} />
          )}
          onPress={() => {
            props.navigation.navigate("Settings");
          }}
        ></DrawerItem>
      </View>

      <View style={{backgroundColor:'white', justifyContent:'flex-end', alignItems:'center', paddingVertical: 25}}>
        <Image
          source={require("../../../assets/logo-navbar.png")}
          style={{ height: "22%", width: "70%" }}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    backgroundColor:"#F0EFEF",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: "5%",
    paddingHorizontal: "5%",
    borderBottomWidth: .2,
  },
  profileContent: {
    display: "flex",
    flexDirection: 'row',
    alignItems: "center",
    gap: 10,
    width: "70%",
  },
  borderRight: {
    borderRightWidth: 1,
    backgroundColor:'#F0EFEF'
  },
  name: {
    fontWeight:'600',
    fontSize:15
  }
});