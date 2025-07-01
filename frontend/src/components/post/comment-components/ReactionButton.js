import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function ReactionButton({ icon, label, onPress }) {
    return (
        <TouchableOpacity style={styles.reaction} onPress={onPress}>
            {icon}
            <Text style={styles.text}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    reaction: {
        alignItems: 'center',
        columnGap: 8,
        flexDirection: 'row'
    },
    text: {
        fontWeight: '500',
        fontSize:13
    }
});
