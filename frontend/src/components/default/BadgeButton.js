import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Avatar } from 'react-native-paper';

export default function BadgeButton({label, icon}) {
    return (
        <TouchableOpacity style={styles.button}>
            <Avatar.Icon size={27} icon={icon} color='white' />
            <Text style={styles.text}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#FF7600',
        width:'auto',
        height:'auto',
        paddingVertical:5,
        paddingLeft:5,
        paddingRight:10,
        borderRadius:12,
        borderWidth:1,
    },
    text: {
        color:'white',
        fontSize:12,
        fontWeight:'600'
    }
})