import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Modal, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { deletePost } from '../../../utils/services/PostService';

export default function PostMenu({postDescription, postCourse, postId, onPostDeleted}) {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);

    const handleDelete = async() => {
        try {
            await deletePost({id: postId});
            onPostDeleted(postId);  // Chama a função para remover o post
        } catch(e) {
            console.log("Erro ao excluir publicação:", e.response?.data?.message);
        }
    };

    const handleDeletePress = () => {
        Alert.alert(
            "Confirmação",
            "Tem certeza que quer excluir?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Excluir", 
                    onPress: () => {
                        handleDelete();
                        setModalVisible(false);
                    },
                    style: "destructive"
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.menu} onPress={() => setModalVisible(true)}>
                <FontAwesome5 name="ellipsis-h" size={16} color="#FF7600" />
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity onPress={() => navigation.navigate('EditPost', {postDescription: postDescription, postCourse: postCourse, postId: postId})}>
                            <Text style={styles.modalText}>Editar publicação</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleDeletePress}>
                            <Text style={styles.modalText}>Excluir publicação</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 15,
        right: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
    },
    closeText: {
        color: 'red',
        fontSize: 15,
        fontWeight: '500'
    },
});
