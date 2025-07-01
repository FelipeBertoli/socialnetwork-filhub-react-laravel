import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { getCommentLikeCount, likeComment, unlikeComment } from "../../../../utils/services/CommentLikeService";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../../utils/contexts/AuthContext";

export default function CommentReactions({commentId, likeId, isLiked, sendTime, setReply}) {
    const { user } = useContext(AuthContext);
    const [like, setLikeId] = useState(likeId);
    const [likeStatus, setLikeStatus] = useState(isLiked);
    const [likeCount, setLikeCount] = useState(0);

    useEffect(() => {
        loadLikes();
    }, []);

    const loadLikes = async () => {
        try {
            const likeCountData = await getCommentLikeCount({ id: commentId });
            setLikeCount(likeCountData.likeCount);
        } catch (e) {
            console.log("Erro ao carregar quantidade de curtidas: ", e.response.data);
        }
    };

    const handleLike = async () => {
        
            if (likeStatus) {
                try {
                    await unlikeComment({ id: like, comment_id: commentId });
                    setLikeId(null);
                    setLikeStatus(false);
                    setLikeCount(prevCount => (parseInt(prevCount) - 1).toString());
                } catch (error) {
                    console.log("Erro ao descurtir comentário: ", error.response.data);
                }
            } else {
                try {
                    const likeData = await likeComment({ user_id: user.id, comment_id: commentId });
                    setLikeId(likeData.likeId);
                    setLikeStatus(true);
                    setLikeCount(prevCount => (parseInt(prevCount) + 1).toString());
                } catch (error) {
                    console.log("Erro ao curtir comentário: ", error.response.data.message);
                }
            }
        }

    return (
        <View style={styles.container}>
            <Text style={styles.data}>{sendTime}</Text>
            <View style={styles.like}>
                <Text style={styles.likeCount}>{likeCount}</Text>
                <TouchableOpacity onPress={handleLike}>
                    <Text style={styles.reactionText}>{likeStatus ? 'Curtido' : 'Curtir'}</Text>
                </TouchableOpacity>         
            </View>
                <TouchableOpacity onPress={setReply}>
                    <Text style={styles.reactionText}>Responder</Text>
                </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 5,
        paddingHorizontal: 10,
        columnGap: 15
    },
    data:{
        color:'#5D5D5D',
        fontStyle: 'italic',
    },
    like:{
        flexDirection:'row',
        columnGap:10
    },
    likeCount:{
        color:'#FF7600',
        fontWeight: '700'
    },
    reactionText: {
        fontWeight: '700'
    }
})