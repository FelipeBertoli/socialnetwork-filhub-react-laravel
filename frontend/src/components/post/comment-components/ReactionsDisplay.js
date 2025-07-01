import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function ReactionsDisplay({ likeCount, commentCount }) {
    
    return (
        <View style={styles.reactions}>
            {likeCount > 0 && (
                <TouchableOpacity>
                    <Text style={styles.reactionText}>
                        {likeCount} {likeCount === 1 ? 'Curtida' : 'Curtidas'}
                    </Text>
                </TouchableOpacity>
            )}
            <TouchableOpacity onPress>
                <Text style={styles.reactionText}>{commentCount} {commentCount === 1 ? 'Comentário' : 'Comentários'}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    reactions: {
        columnGap: 12,
        flexDirection: 'row',
        paddingBottom: 12,
        paddingTop: 12
    },
    reactionText: {
        color: '#676767'
    }
});
