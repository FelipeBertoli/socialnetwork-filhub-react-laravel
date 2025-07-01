import { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Input, Loading, MainButton, PasswordInput } from "../../../ModuleExports";
import { Text, Button, ActivityIndicator } from "react-native-paper";
import AuthContext from "../../../utils/contexts/AuthContext";
import {loadUser, login } from '../../../utils/services/UserService'

export default function LoginScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [message, setMessage] = useState(false);
  const {setUser} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMessage(false);
  }, []);

  async function handleLogin() {
    setError({});
    try {
      await login({
        email,
        password,
      });
      setLoading(true);
      const user = await loadUser();
      if(user.status == 'Ativo') {

        setUser(user);
      } else if (user.status == 'Pendente') {
        setLoading(false);
        setMessage(true);
      }
    } catch (e) {
      setLoading(false);
        if (e.response?.status === 422) {
          setError(e.response.data.errors);
        }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require("../../../assets/logo-navbar.png")}
          style={{height: '20%', width: "65%" }}
          resizeMode="contain" 
        />
        <View style={styles.firstGroup}>
          <Input
            label="E-mail"
            value={email}
            autoCapitalize="none"
            onChangeText={(newText) => setEmail(newText)}
            error={error.email}
          />
          <PasswordInput
            label="Senha"
            value={password}
            onChangeText={(newText) => setPassword(newText)}
            error={error.password}
          />
          {message==true && (
            <View style={styles.error}>          
              <Text style={styles.errorText}>Verifique sua caixa de e-mail para confirmar sua conta.</Text>
              </View>

        )}
          <TouchableOpacity>
            <Text style={styles.blueText} onPress={() => props.navigation.navigate("ForgotPassword")}>Esqueceu sua senha?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.secondGroup}>
          <Button
            onPress={handleLogin}
            mode="contained"
            style={styles.button}
          >
          {loading ? (
            <ActivityIndicator animating={true} color="white" size="small" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
          </Button>
          <View style={{ flexDirection: "row" }}>
            <Text>Não possui uma conta? </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Register")}
            >
              <Text style={styles.blueText}>Cadastre-se</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.thirdGroup}>
        <Text style={styles.bottomText}>Unifil • 2024</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    height: "100%",
    backgroundColor: "white",
    overflow:'hidden'
  },
  content: {
    display: "flex",
    alignItems: "center",
  },
  firstGroup: {
    alignItems: "flex-end",
    marginTop: 60,
    marginVertical: 20,
    rowGap: 15,
  },
  secondGroup: {
    alignItems: "center",
    rowGap: 40,
  },
  button: {
    height: 50,
    width: 200,
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
  thirdGroup: {
    position: "relative",
    bottom: "-15%",
    left: "39%",
  },
  blueText: {
    color: "#1271FF",
    fontWeight: "700",
  },
  bottomText: {
    fontSize: 15,
    fontWeight: "800",
  },
  error: {
    backgroundColor:'#FFC0B2',
    padding:15,
    borderRadius:10,
    width:330,
    alignItems:'center'

  },
  errorText: {
    color:'red',
    fontWeight: '700',
  }
});
