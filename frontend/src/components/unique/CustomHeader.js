import React from "react";
import { View, Text, StyleSheet } from "react-native";
import BackButton from "../default/BackButton";

export default function CustomHeader({title}) {
    return (
        <View style={styles.headerContainer }>
            <BackButton/>
            <Text style={{ fontSize: 24, fontWeight: 600}}>
                {title}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        alignItems: 'center', 
        paddingTop: 25, 
        height:90,
        borderBottomWidth: .2, 
        columnGap:20,
        borderColor: 'black',
        backgroundColor:'white'
    },
})