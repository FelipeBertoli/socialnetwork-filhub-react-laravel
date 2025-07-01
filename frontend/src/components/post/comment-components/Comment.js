import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import UserImage from "../../default/UserImage";
import AuthContext from "../../../../utils/contexts/AuthContext";
import { useContext, useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import CommentReactions from "./CommentReactions";
import CommentReplies from "./CommentReplies";
import Reply from "./Reply";
import { deleteReply, getCommentReplies } from "../../../../utils/services/CommentReplyService";
import { Modal } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";

export default function Comment({ userId, userName, userPicture, commentId, commentContent, isLiked, likeId, sendTime, setReply, thereIsReplies }) {
    const { user } = useContext(AuthContext);
    const navigation = useNavigation();
    const [repliesSectionVisibility, setRepliesSectionVisibility] = useState(false);
    const [replies, setReplies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedReply, setSelectedReply] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const openReplies = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await getCommentReplies(commentId);
            if (response && response.message === "Respostas encontradas") {
                setReplies(response.replies);
                setRepliesSectionVisibility(true);
            }
        } catch (e) {
            console.log("Erro ao carregar respostas: ", e.response?.data);
        } finally {
            setIsLoading(false);
        }
    }, [commentId]);

    const closeReplies = useCallback(() => {
        setRepliesSectionVisibility(false);
        setReplies([]);
    }, []);

    const openReplyModal = useCallback((reply, authorId) => {
        if (authorId === user.id) {
            setSelectedReply(reply);
            setModalVisible(true);
        }
    }, [user.id]);

    const closeReplyModal = useCallback(() => {
        setModalVisible(false);
        setSelectedReply(null);
    }, []);

    const handleDeleteReply = useCallback(async (replyId) => {
        try {
            await deleteReply({ id: replyId });
            setRepliesSectionVisibility(false);
            setReplies(replies.filter(reply => reply.id !== replyId));
        } catch (e) {
            console.log("Erro ao deletar resposta: ", e.response?.data);
        }
    }, [replies]);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile', { visitorId: user.id, visitedId: userId })}>
                <UserImage size={50} source={userPicture} />
            </TouchableOpacity>

            <View style={styles.content}>
                <View style={styles.comment}>
                    <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('Profile', { visitorId: user.id, visitedId: userId })}>
                        <Text style={styles.name}>{userName}</Text>
                    </TouchableOpacity>
                    <Text>{commentContent}</Text>
                </View>

                <CommentReactions commentId={commentId} isLiked={isLiked} likeId={likeId} sendTime={sendTime} setReply={setReply} />
                
                {isLoading && <ActivityIndicator size="small" color="#FF7600" style={{ paddingTop: 10 }} />}

                {repliesSectionVisibility && !isLoading && (
                    <View>
                        {replies.map((reply) => (
                            <TouchableOpacity key={reply.id} onPress={() => openReplyModal(reply, reply.user_id)}>
                                <Reply
                                    userId={reply.user_id}
                                    userName={`${reply.user.name} ${reply.user.surname}`}
                                    userPicture={reply.user.picture_path || null}
                                    replyContent={reply.content}
                                    sendTime={reply.formatted_send_time}
                                    deleteReply={() => handleDeleteReply(reply.id)}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                {thereIsReplies && (
                    <CommentReplies
                        schema={repliesSectionVisibility ? closeReplies : openReplies}
                        sectionVisility={repliesSectionVisibility}
                    />
                )}

                {modalVisible && selectedReply && (
                    <Modal
                        visible={modalVisible}
                        onDismiss={closeReplyModal}
                        contentContainerStyle={styles.commentModalContainer}
                    >
                        <View style={styles.commentModalContent}>
                            <TouchableOpacity onPress={() => handleDeleteReply(selectedReply.id)}>
                                <Text style={styles.commentText}>Excluir resposta</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.commentCloseButton} onPress={closeReplyModal}>
                                <MaterialCommunityIcons name="window-close" size={20} color="red" />
                            </TouchableOpacity>
                        </View>
                    </Modal>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        columnGap: 7,
        flexDirection: 'row',
        paddingVertical: 10,
        paddingLeft: 10,
    },
    content: {
        width: '80%',
    },
    comment: {
        backgroundColor: '#ECECEC',
        borderRadius: 12,
        paddingVertical: 9,
        paddingHorizontal: 10,
        rowGap: 2,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    row: {
        alignItems: 'center',
        columnGap: 10,
        flexDirection: 'row',
    },
    commentModalContainer: {
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
    commentText: {
        color: 'red',
        marginVertical: 15,
        fontSize: 16,
        fontWeight: '700',
    },
    commentCloseButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    }
});
