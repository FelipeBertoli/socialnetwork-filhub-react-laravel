import React, { useState, useContext } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Modal, Portal, Text, Button, Icon, ActivityIndicator } from "react-native-paper";
import { TextTitle, Input, PasswordInput } from "../../../../ModuleExports";
import AuthContext from "../../../../utils/contexts/AuthContext";
import { deleteUser, logout, sendNewEmail, updatePassword } from "../../../../utils/services/UserService";
import { useNavigation } from "@react-navigation/native";

export default function AccountSettings() {
  const [visible, setVisible] = useState(false);
  const [editMode, setEditMode] = useState(null);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [confirmEmailModalVisible, setConfirmEmailModalVisible] = useState(false);
  const [confirmPasswordModalVisible, setConfirmPasswordModalVisible] = useState(false);
  const { user } = useContext(AuthContext);
  const [error, setError] = useState({});
  const {setUser} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  async function handleEmailUpdate() {
    try {
      setLoading(true);
      await sendNewEmail({
        id: user.id,
        email,
      }
      )
      showConfirmEmailModal();
      setLoading(false);
    } catch (e) {
      if (e.response?.status === 422) {
        setError(e.response.data.errors);
      }
      setLoading(false);
    }
  }

  async function handlePasswordUpdate() {
    try {
      setLoading(true);
      await updatePassword({
        id: user.id,
        password,
        password_confirmation: passwordConfirmation,
      }
      )
      showConfirmPasswordModal();
      setLoading(false);
    } catch (e) {
      if (e.response?.status === 422) {
        setError(e.response.data.errors);
      }

      setLoading(false);
    }
  }

  async function handleDeleteUser() {
    try {
      setLoading(true);
      await deleteUser({
        id: user.id,
      }
      )
      await logout();
      setLoading(false);
      setUser(null);
    } catch (e) {
      if (e.response?.status === 422) {
        setError(e.response.data.errors);
      }
      console.log(e.response);
    }
  }

  const showModal = (mode) => {
    setVisible(true);
    setEditMode(mode);
  };

  const hideModal = () => {
    setVisible(false);
    setEditMode(null);
  };

  const showDeleteModal = () => {
    setDeleteVisible(true);
  };

  const hideDeleteModal = () => {
    setDeleteVisible(false);
  };

  const showConfirmEmailModal = () => {
    setVisible(false);
    setConfirmEmailModalVisible(true)
  };
  const hideConfirmEmailModal = () => setConfirmEmailModalVisible(false);

  const showConfirmPasswordModal = () => {
    setVisible(false);
    setConfirmPasswordModalVisible(true)
  };
  const hideConfirmPasswordModal = () => setConfirmPasswordModalVisible(false);

  const containerStyle = {
    backgroundColor: "white",
    paddingVertical: 25,
    alignItems: "center",
    rowGap: 15,
  };


  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TextTitle text="Editar Informações" />
        <View style={styles.item}>
          <View>
            <Text style={styles.bold}>E-mail</Text>
            <Text>{user.email}</Text>
          </View>
          <Button
            icon="square-edit-outline"
            mode="outlined"
            onPress={() => showModal('email')}
          >
            Editar
          </Button>
        </View>
        <View style={styles.item}>
          <View>
            <Text style={styles.bold}>Senha</Text>
          </View>
          <Button
            icon="square-edit-outline"
            mode="outlined"
            onPress={() => showModal('password')}
          >
            Editar
          </Button>
        </View>
      </View>
      <View style={styles.content}>
        <TextTitle text="Gerenciamento de Conta" />
        <View style={styles.item}>
          <Text style={styles.bold}>Excluir conta</Text>
          <TouchableOpacity style={{ paddingRight: "5%" }} onPress={() => showDeleteModal()}>
            <Icon source="trash-can-outline" size={25} color="red" />
          </TouchableOpacity>
        </View>
      </View>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <View style={styles.titleContainer}>
            <View style={styles.line}></View>
            <Text style={styles.title}>
              {editMode === "email" ? "Alterar E-mail" : "Alterar Senha"}
            </Text>
            <View style={styles.line}></View>
          </View>
          {editMode === "email" ? (
            <Input label="E-mail novo" defaultValue={email} onChangeText={(newEmail) => setEmail(newEmail)} error={error.email} />
          ) : (
            <View style={{ rowGap: 15 }}>
              <PasswordInput label="Senha nova" defaultValue={password} autoCapitalize="none" onChangeText={(newPassword) => setPassword(newPassword)} error={error.password} />
              <PasswordInput label="Repita a senha nova" defaultValue={passwordConfirmation} autoCapitalize="none" onChangeText={(newPassword) => setPasswordConfirmation(newPassword)} error={error.password} />
            </View>
          )}
          <Button style={{ marginTop: 10 }} mode="contained" onPress={() => {
            if (editMode === "email") {
              handleEmailUpdate();
            } else {
              handlePasswordUpdate();
            }
          }}>
          {loading ? (
            <ActivityIndicator animating={true} color="white" size="small" />
          ) : (
            <Text style={styles.buttonText}>Confirmar</Text>
          )}
          </Button>
        </Modal>
      </Portal>
      <Portal>
        <Modal
          visible={confirmEmailModalVisible}
          onDismiss={hideConfirmEmailModal}
          contentContainerStyle={containerStyle}
        >
          <View style={{ height: 290, alignItems: 'center', justifyContent: 'center', rowGap: 10 }}>
            <Icon source="check-circle" size={100} color="#82C902" />
            <Text style={{ fontSize: 18, fontWeight: 800 }}>Quase tudo certo!</Text>
            <Text style={{ textAlign: 'center', paddingHorizontal: 20 }}>Uma mensagem de confirmação foi enviada na caixa de entrada do novo e-mail cadastrado.</Text>
            <Button style={{ marginTop: 10 }} mode="contained" onPress={hideConfirmEmailModal}>
            <Text style={styles.buttonText}>Fechar</Text>
            </Button>
          </View>
        </Modal>
      </Portal>
      <Portal>
        <Modal
          visible={confirmPasswordModalVisible}
          onDismiss={hideConfirmPasswordModal}
          contentContainerStyle={containerStyle}
        >
          <View style={{ height: 220, alignItems: 'center', justifyContent: 'center', rowGap: 10 }}>
            <Icon source="check-circle" size={100} color="#82C902" />
            <Text style={{ fontSize: 18, fontWeight: 800 }}>Senha alterada com sucesso!</Text>
            <Button style={{ marginTop: 10 }} mode="contained" onPress={hideConfirmPasswordModal}>
            <Text style={styles.buttonText}>Fechar</Text>
            </Button>
          </View>
        </Modal>
      </Portal>
      <Portal>
        <Modal
          visible={deleteVisible}
          onDismiss={hideDeleteModal}
          contentContainerStyle={containerStyle}
        >
          <View style={styles.titleContainer}>
            <View style={styles.line}></View>
            <Text style={styles.title}>
              Deletar conta
            </Text>
            <View style={styles.line}></View>
          </View>
          <Text style={{ paddingVertical: 10, fontSize: 16, fontWeight: '700' }}>Você tem certeza que quer deletar a sua conta?</Text>
          <Button mode="contained" onPress={handleDeleteUser}>
          {loading ? (
            <ActivityIndicator animating={true} color="white" size="small" />
          ) : (
            <Text style={styles.buttonText}>Confirmar</Text>
          )}
          </Button>
        </Modal>
      </Portal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  content: {
    padding: 20,
    backgroundColor: "white",
    rowGap: 5,
    marginBottom: 15,
    borderTopWidth:0.2,
    borderBottomWidth:0.2
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  bold: {
    fontWeight: "700",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#717171",
  },
  line: {
    borderWidth: 1,
    borderColor: "#717171",
    width: "25%",
  },
  buttonText: {
    color:'white',
    fontWeight:'900',
    textTransform:'uppercase'
  }
});
