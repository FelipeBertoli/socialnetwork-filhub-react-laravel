import React, { useContext, useEffect, useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import AuthContext from '../../../utils/contexts/AuthContext';
import { getLikeCount, likePost, unlikePost } from '../../../utils/services/LikeService';
import { favoritePost, unfavoritePost } from '../../../utils/services/PostFavoriteService';
import ReactionButton from './comment-components/ReactionButton';
import CommentModal from './comment-components/CommentModal';
import { getCommentsCount } from '../../../utils/services/PostCommentService';
import ReactionsCount from './comment-components/ReactionsCount';

export default function ReactionsTab({ postId, isLiked, likeId, isFavorited, favoriteId }) {
    const { user } = useContext(AuthContext);
    const [like, setLikeId] = useState(likeId);
    const [likeStatus, setLikeStatus] = useState(isLiked);
    const [likeCount, setLikeCount] = useState();
    const [commentCount, setCommentCount] = useState();
    const [favorite, setFavoriteId] = useState(favoriteId);
    const [favoriteStatus, setFavoriteStatus] = useState(isFavorited);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        loadPostLikes();
        loadCommentCount();
    }, []);

    const loadPostLikes = useCallback(async () => {
        try {
            const likeCountData = await getLikeCount({ id: postId });
            setLikeCount(likeCountData.likeCount);
        } catch (e) {
            console.log("Erro ao carregar quantidade de curtidas: ", e.response.data);
        }
    }, [postId]);

    const loadCommentCount = useCallback(async () => {
        try {
            const commentCountData = await getCommentsCount({ id: postId });
            setCommentCount(commentCountData.commentCount);
        } catch (e) {
            console.log("Erro ao carregar quantidade de comentários: ", e.response.data);
        }
    }, [postId]);

    const setLike = async () => {
        if (likeStatus) {
            try {
                await unlikePost({ id: like, post_id: postId });
                setLikeId(null);
                setLikeStatus(false);
                setLikeCount(prevCount => (parseInt(prevCount) - 1).toString());
            } catch (error) {
                console.log("Erro ao descurtir publicação: ", error.response.data);
            }
        } else {
            try {
                const likeData = await likePost({ user_id: user.id, post_id: postId });
                setLikeId(likeData.likeId);
                setLikeStatus(true);
                setLikeCount(prevCount => (parseInt(prevCount) + 1).toString());
            } catch (error) {
                console.log("Erro ao curtir publicação: ", error.response.data.message);
            }
        }
    };

    const setFavorite = useCallback(async () => {
        if (favoriteStatus) {
            try {
                await unfavoritePost({ id: favorite, post_id: postId });
                setFavoriteId(null);
                setFavoriteStatus(false);
            } catch (e) {
                console.log("Error ao desfavoritar publicação: ", e.response.data);
            }
        } else {
            try {
                const favoriteData = await favoritePost({ user_id: user.id, post_id: postId });
                setFavoriteId(favoriteData.favoriteId);
                setFavoriteStatus(true);
            } catch (error) {
                console.log("Erro ao favoritar publicação: ", error.response.data.message);
            }
        }
    }, [favoriteStatus, favorite, postId, user.id]);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <View>
            {(likeCount > 0 || commentCount > 0) && (
                <ReactionsCount likeCount={likeCount} commentCount={commentCount} onCommentClick={openModal} />
            )}
            
            <View style={styles.content}>
                <ReactionButton
                    icon={<AntDesign name={likeStatus ? "heart" : "hearto"} size={23} color="#FF7600" />}
                    label={likeStatus ? "Curtido" : "Curtir"}
                    onPress={setLike}
                />
                <ReactionButton
                    icon={<FontAwesome name="comment-o" size={23} color="#FF7600" />}
                    label="Comentar"
                    onPress={openModal}
                />
                <ReactionButton
                    icon={<FontAwesome name={favoriteStatus ? "bookmark" : "bookmark-o"} size={23} color="#FF7600" />}
                    label={favoriteStatus ? "Favoritado" : "Favoritar"}
                    onPress={setFavorite}
                />
            </View>
            <CommentModal
                modalVisible={modalVisible}
                closeModal={closeModal}
                postId={postId}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        borderTopColor: '#676767',
        borderTopWidth: 0.5,
        columnGap: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 5,
        paddingTop: 15
    },
});
