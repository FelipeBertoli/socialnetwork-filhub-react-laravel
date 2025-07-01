import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

export default function ReactionsCount({ likeCount, commentCount, onCommentClick }) {

    return (
        <View style={styles.reactions}>
            {likeCount > 0 && (
                <TouchableOpacity>
                    <Text style={styles.reactionText}>
                        {likeCount}
                        {likeCount === 1 ? (<Text> Curtida</Text>) : (<Text> Curtidas</Text>)}
                    </Text>
                </TouchableOpacity>
            )}
            {commentCount > 0 && (
                <TouchableOpacity onPress={onCommentClick}>
                    <Text style={styles.reactionText}>
                        {commentCount}
                        {commentCount === 1 ? (<Text> Comentário</Text>) : (<Text> Comentários</Text>)}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    reactions: {
        columnGap: 12,
        flexDirection: 'row',
        paddingBottom: 12,
    },
    reactionText: {
        color: '#676767',
        fontSize:12
    }
});
