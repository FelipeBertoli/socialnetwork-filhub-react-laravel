import { View, StyleSheet } from "react-native";
import { FontAwesome6 } from '@expo/vector-icons';
import { MainButton } from "../../../ModuleExports";
import { Button, Text } from "react-native-paper";

export default function ConfirmationScreen(props) {
  return (
    <View style={styles.container}>
      <FontAwesome6 name="circle-check" size={60} color="green" />
      <Text style={styles.text}>Registro concluído com sucesso. Confira sua caixa de e-mail para confirmar a sua conta.</Text>
      <Button mode="contained" style={styles.button} onPress={() => props.navigation.navigate("Login")}>
        <Text style={styles.buttonText}>Retornar ao início</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: "80%",
    rowGap: 30,
    height: "100%",
  },
  text: {
    width: 360,
    textAlign: 'center',
    fontWeight: 700,
    fontSize:15,
    paddingBottom: 20,
  },
  button: {
    height: 50,
    width: 250,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 100,
  },
  buttonText: {
    color: "white",
    fontSize: 17,
    textTransform: "uppercase",
    fontWeight: 700,
  },
});

