import { View, StyleSheet, Text } from "react-native";

export default function TextTitle({ text }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{text}</Text>
            <View style={styles.line}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        alignItems:'center',
        columnGap:12,
        paddingBottom:20
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color:'#717171',
    },
    line: {
        flex:1,
        borderWidth:1,
        borderColor:'#717171',
    }
})