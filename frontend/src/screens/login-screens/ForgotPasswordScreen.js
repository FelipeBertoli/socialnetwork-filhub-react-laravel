import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import { CustomHeader, Input } from "../../../ModuleExports";
import { sendNewPassword } from "../../../utils/services/UserService";
import { useNavigation } from "@react-navigation/native";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  async function handlePasswordUpdate() {
    try {
      await sendNewPassword({
        email,
      }
      )
      navigation.navigate("Login");
    } catch (e) {
      if (e.response?.status === 422) {
        setError(e.response.data.errors.email);
      } else if (e.response?.status === 404) {
        setError(e.response.data.message);
      }
      console.log(e.response.data.message);
    }
  }

  useEffect(() => {
    navigation.setOptions({
      headerShown: !loading,
    });
  }, [loading, navigation]);

  if (loading) {
    return <Loading/>;
  }

  return (
    <View style={styles.container}>
            <Input
              label="E-mail"
              value={email}
              onChangeText={(value) => setEmail(value)}
              error={error}
            />
      <Text style={styles.text}>Um e-mail com uma nova senha será enviado para você.</Text>
      <Button mode="contained" style={styles.button} onPress={handlePasswordUpdate}>

      <Text style={styles.buttonText}>Enviar E-mail</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: "60%",
    rowGap: 30,
    height: "100%",
    backgroundColor:'white'
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

