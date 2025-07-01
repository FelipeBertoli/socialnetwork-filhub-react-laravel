import { StyleSheet, TouchableOpacity, View } from "react-native"
import { Text } from "react-native-paper"

export default function CommentReplies({schema, sectionVisility}) {
    return (
    <TouchableOpacity style={styles.container} onPress={schema}>
        <Text>{sectionVisility ? 'Ocultar respostas' : 'Ver respostas'}</Text>
    </TouchableOpacity>
)
}

const styles = StyleSheet.create({
    container: {
        paddingLeft:20,
        paddingTop:5,

    }
})