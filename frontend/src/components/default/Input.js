import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput } from 'react-native-paper';

export default function Input({ value, onChangeText, label, editable, security, error, right, autoCapitalize}) {
    return (
        <View>
            <TextInput style={styles.input}
                mode="flat"
                label={label}
                onChangeText={onChangeText}
                defaultValue={value}
                editable={editable}
                secureTextEntry={security}
                autoCapitalize={autoCapitalize}
                right={right}
            />
            {error != null && (
                <Text style={styles.error}>{error}</Text>
            )}
        </View>
     );
};

const styles = StyleSheet.create({
    input: {
        height: 55,
        width: 330,
        color: "black",
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
