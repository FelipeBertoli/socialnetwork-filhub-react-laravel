import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Modal, View, ScrollView, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Comment from './Comment';
import { deleteComment, getPostComments, setComment } from '../../../../utils/services/PostCommentService';
import AuthContext from '../../../../utils/contexts/AuthContext';
import { replyComment } from '../../../../utils/services/CommentReplyService';

export default function CommentModal({ modalVisible, closeModal, postId, commentAuthorId }) {
    const { user } = useContext(AuthContext);
    const [commentary, setCommentary] = useState('');
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedComment, setSelectedComment] = useState(null);
    const [commentModalVisible, setCommentModalVisible] = useState(false);
    const [isReplying, setIsReplying] = useState(false);
    const [commentUser, setCommentUser] = useState();
    const [commentId, setCommentId] = useState();
    const [longPressTimer, setLongPressTimer] = useState(null);

    const loadComments = useCallback(async () => {
        try {
            const response = await getPostComments({ post_id: postId });
            if (response && response.message === "Comentários encontrados") {
                setComments(response.comments);
            }
        } catch (e) {
            console.log("Erro ao carregar comentários: ", e.response?.data);
        }
    }, [postId]);

    useEffect(() => {
        loadComments();
    }, [loadComments]);

    const handleComment = useCallback(async () => {
        try {
            await setComment({ user_id: user.id, post_id: postId, content: commentary });
            setCommentary('');
            loadComments();
        } catch (e) {
            console.log("Erro ao comentar publicação: ", e.response?.data);
        }
    }, [user.id, postId, commentary, loadComments]);

    const handleDeleteComment = useCallback(async (commentId) => {
        try {
            await deleteComment({ id: commentId });
            setCommentModalVisible(false);
            setComments((prevComments) => prevComments.filter(comment => comment.id !== commentId));
        } catch (e) {
            console.log("Erro ao deletar comentário: ", e.response?.data);
        }
    }, [loadComments]);

    const openCommentModal = useCallback((comment, commentAuthorId) => {
        if (commentAuthorId === user.id) {
            setSelectedComment(comment);
            setCommentModalVisible(true);
        }
    }, [user.id]);

    const closeCommentModal = useCallback(() => {
        setCommentModalVisible(false);
        setSelectedComment(null);
    }, []);

    const setReply = useCallback((username, commentaryId) => {
        setCommentId(commentaryId);
        setCommentUser(username);
        setIsReplying(true);
    }, []);

    const unsetReply = useCallback(() => {
        setCommentUser(null);
        setIsReplying(false);
    }, []);

    const handleReply = useCallback(async () => {
        try {
            await replyComment({ user_id: user.id, comment_id: commentId, content: commentary });
            setCommentary('');
            setIsReplying(false);
            loadComments();
        } catch (e) {
            console.log("Erro ao responder comentário: ", e.response?.data);
        }
    }, [user.id, commentId, commentary, loadComments]);

    const handleLongPressStart = useCallback((comment, commentAuthorId) => {
        const timer = setTimeout(() => {
            openCommentModal(comment, commentAuthorId);
        }, 1000);
        setLongPressTimer(timer);
    }, [openCommentModal]);

    const handleLongPressEnd = useCallback(() => {
        clearTimeout(longPressTimer);
        setLongPressTimer(null);
    }, [longPressTimer]);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={closeModal}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                        <MaterialCommunityIcons name="window-close" size={20} color="red" />
                    </TouchableOpacity>
                    <ScrollView style={styles.scrollContainer}>
                        <View>
                            {loading ? (
                                <ActivityIndicator size="large" color="#FF7600" />
                            ) : (
                                comments.map((comment) => (
                                    <TouchableOpacity key={comment.id} 
                                    onPressIn={() => handleLongPressStart(comment, comment.user_id)} // Inicia o toque longo
                                    onPressOut={handleLongPressEnd} >
                                        <Comment
                                            userId={comment.user_id}
                                            userName={`${comment.user.name} ${comment.user.surname}`}
                                            userPicture={comment.user.picture_path || null}
                                            commentId={comment.id}
                                            commentContent={comment.content}
                                            commentTime={comment.formatted_send_time}
                                            likeId={comment.likeId || ''}
                                            isLiked={comment.isLiked}
                                            thereIsReplies={comment.thereIsReplies}
                                            sendTime={comment.formatted_send_time}
                                            setReply={() => setReply(`${comment.user.name} ${comment.user.surname}`, comment.id)}
                                        />

                                        {selectedComment && (
                                            <Modal
                                                animationType="fade"
                                                transparent={true}
                                                visible={commentModalVisible}
                                                onRequestClose={closeCommentModal}
                                            >
                                                <View style={styles.commentModalContainer}>
                                                    <View style={styles.commentModalContent}>
                                                        <TouchableOpacity onPress={() => handleDeleteComment(comment.id)}>
                                                            <Text style={styles.commentText}>Excluir comentário</Text>
                                                        </TouchableOpacity>

                                                        <TouchableOpacity style={styles.commentCloseButton} onPress={closeCommentModal}>
                                                            <MaterialCommunityIcons name="window-close" size={20} color="red" />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </Modal>
                                        )}
                                    </TouchableOpacity>

                                    
                                ))
                            )}
                        </View>
                    </ScrollView>

                    <View style={styles.footer}>
                        {isReplying &&
                        <View style={styles.replyMessage}>
                            <Text style={styles.replyText}>Respondendo à {commentUser}</Text>
                            <TouchableOpacity style={styles.closeReply} onPress={unsetReply}>
                                <MaterialCommunityIcons name="window-close" size={20} color="red" />
                            </TouchableOpacity>
                        </View>
                        }
                        <View style={styles.commenting}>
                            <TextInput
                                style={styles.input}
                                placeholder="Digite sua mensagem..."
                                value={commentary}
                                onChangeText={setCommentary}
                            />
                            <TouchableOpacity onPress={isReplying ? handleReply : handleComment}>
                                <MaterialCommunityIcons name="send" size={29} color="#FF7600" />
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',

    },
    content: {
        backgroundColor: 'white',
        borderRadius: 10,
        height: '93%',
        width: '99%',
        alignItems: 'center',

    },
    footer: {
        position: 'absolute',
        bottom: 0,
        zIndex: 100,
    },
    replyMessage: {
        backgroundColor: '#FFD9B9',
        borderTopWidth: 2,
        borderColor: '#FF7600',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal: 35,
        paddingVertical: 10
    },
    replyText:{
        color:'#FF7600',
        fontWeight:'900'
    }, 
    commenting: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopWidth: .5,
        borderColor: 'black',
        columnGap: 10,
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 20,
        width: '100%',
    },
    input: {
        width: '93%',
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#ECECEC',
    },
    closeButton: {
        backgroundColor: '#ECECEC',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '3%',
        borderBottomWidth: .5,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    scrollContainer: {
        width: '100%',
        paddingVertical: 20,
    },

    commentModalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    commentModalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '80%',
        alignItems: 'center',
    },
    commentUser: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    commentText: {
        color: 'red',
        marginVertical: 15,
        fontSize: 16,
        fontWeight: '700'

    },
    commentCloseButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
});
