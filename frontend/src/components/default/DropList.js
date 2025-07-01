import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput } from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";

export default function DropList({ label, list, setValue, value, error, size }) {
  const [showDropDown, setShowDropDown] = useState(false);

  return (
    <View>
      <DropDown
        label={label}
        mode="flat"
        visible={showDropDown}
        showDropDown={() => setShowDropDown(true)}
        onDismiss={() => setShowDropDown(false)}
        value={value}
        list={list}
        setValue={setValue}
        inputProps={{
          style: {
            width: size,
            backgroundColor: '#F0EFEF'
          },
          right: <TextInput.Icon icon={showDropDown ? "menu-up" : "menu-down"} />,
        }}
      />
      {error != null && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  error: {
    backgroundColor: '#FFC0B2',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    color: 'red',
    fontWeight: '500',
    fontSize: 10,
    paddingHorizontal: 5,
    paddingVertical: 3,

  }
});
