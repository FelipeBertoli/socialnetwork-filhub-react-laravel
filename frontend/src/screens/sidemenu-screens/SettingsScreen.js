import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import AuthContext from '../../../utils/contexts/AuthContext';
import { logout } from '../../../utils/services/UserService';
import Constants from 'expo-constants';

export default function SettingsScreen(props) {
  const {setUser} = useContext(AuthContext);

  async function handleLogout() {
    try {
      await logout();
      setUser(null);
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.item}>
          <TouchableOpacity style={styles.button} onPress={() => {
            props.navigation.closeDrawer();
            props.navigation.navigate("AccountSettings");
          }}>
            <MaterialIcons name="account-circle" size={30} color="black" />
            <Text>Configurações da Conta</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.item}>
          <TouchableOpacity style={styles.button} onPress={() => {
            props.navigation.closeDrawer();
            props.navigation.navigate("About");
          }}>
            <MaterialIcons name="info-outline" size={30} color="black" />
            <Text>Sobre</Text>
          </TouchableOpacity>
        </View> */}
        <View style={styles.item}>
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <MaterialCommunityIcons name="logout-variant" size={30} color="black" />
            <Text>Sair da conta</Text>
          </TouchableOpacity>
        </View>
        <View style={{borderWidth:.3}}></View>
        <View style={styles.item}>
            <Text>Versão: <Text style={{ fontStyle: 'italic', fontSize: 12, fontWeight: 800 }}>{Constants.expoConfig.version}</Text></Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'white',
    rowGap: 5
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8
  }
});