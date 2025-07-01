import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import Input from "./Input";
import { TextInput } from "react-native-paper";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function PasswordInput({ value, onChangeText, label, error, editable}) {
    const [isPasswordSecure, setIsPasswordSecure] = useState(true);
    
    return (
        <View>
            <Input
            label={label}
            onChangeText={onChangeText}
            value={value}
            security={isPasswordSecure}
            editable={editable}
            error={error}
            autoCapitalize="none"
            right={
                <TextInput.Icon
                  icon={isPasswordSecure ? "eye-off" : "eye"}
                  onPress={() => { isPasswordSecure ? setIsPasswordSecure(false) : setIsPasswordSecure(true) }}
                />
              }
            />
        </View>
     );
};
