import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput } from "react-native-paper";

export default function FieldInput({ label, value, setValue, error }) {
  return (
    <View>
      <TextInput
        style={styles.input}
        mode="flat"
        multiline={true}
        label={label}
        defaultValue={value}
        onChangeText={setValue}
      />
      {error != null && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: 330,
    paddingBottom: 10,
    backgroundColor: "#F0EFEF",
  },
  error: {
    color:'red',
    fontWeight: '500',
    fontSize:10,
    paddingHorizontal:5,
    paddingVertical:3,
    backgroundColor:'#FFC0B2',
    borderBottomLeftRadius:5,
    borderBottomRightRadius:5
}
});
