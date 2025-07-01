import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function IconButton ({type, size, scheme}) {
  return (
    <TouchableOpacity onPress={scheme}>
      <FontAwesome5 name={type} size={size} color="#FF7600"/>
    </TouchableOpacity>
  );
}
