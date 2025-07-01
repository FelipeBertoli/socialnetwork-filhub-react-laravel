import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { IconButton } from 'react-native-paper';

export default function AddPost() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('NewPostScreen')}>
      <IconButton icon="plus" iconColor="white" size={35}/>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor:"#FF7600",
        borderRadius:100,
        position:'absolute',
        bottom:30,
        right:30
    }
});
