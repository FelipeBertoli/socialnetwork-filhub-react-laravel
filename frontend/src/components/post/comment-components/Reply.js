import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import UserImage from "../../default/UserImage";
import AuthContext from "../../../../utils/contexts/AuthContext";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Reply({ userId, userName, userPicture, replyContent, sendTime, deleteReply }) {
    const { user } = useContext(AuthContext);
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile', { visitorId: user.id, visitedId: userId })}>
                <UserImage size={35} source={userPicture} />
            </TouchableOpacity>


            <View style={styles.content}>
                <View style={styles.reply}>
                    <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('Profile', { visitorId: user.id, visitedId: userId })}>
                        <View style={styles.gap}>
                        <Text style={styles.name}>{userName}</Text>
                        <Text style={styles.data}>{sendTime}</Text>
                        </View>

                        {userId === user.id &&
                        <TouchableOpacity onPress={deleteReply}>
                            <MaterialCommunityIcons name="trash-can-outline" size={15} color="red" style={{paddingRight:5}}/>
                        </TouchableOpacity>
                        }
                    </TouchableOpacity>
                    <Text>{replyContent}</Text>
                </View>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems:'stretch',
        columnGap: 7,
        flexDirection: 'row',
        paddingVertical: 10,
        paddingLeft: 10,
    },
    content: {


        width: '80%'
    },
    reply:{
        backgroundColor: '#ECECEC',
        borderRadius: 12,
        paddingVertical: 9,
        paddingHorizontal: 10,
        rowGap: 5,
    },
    data:{
        color:'#5D5D5D',
        fontStyle: 'italic',
        fontSize: 11,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 11,
    },

    row: {
        alignItems: 'center',
        columnGap: 10,
        flexDirection: 'row',
        justifyContent:'space-between'
    },
    gap:{
        flexDirection:'row',
        gap:10
    },
    box: {
        flexDirection: 'column'
    }
})