import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function BackButton({ route }) {
  const navigation = useNavigation();

  const toRoute = () => {
    if (route) {
      if (Array.isArray(route)) {
        const [screen, params] = route;
        navigation.navigate(screen, params);
      } else {
        navigation.navigate(route);
        
      }
    } else {
      navigation.goBack();
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={toRoute}>
      <Ionicons name="arrow-back-outline" size={24} color="#1271FF" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingLeft: 20,
    paddingRight: 5
  },
});
