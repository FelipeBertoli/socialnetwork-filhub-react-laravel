import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./login-screens/LoginScreen";
import RegisterScreen from "./login-screens/RegisterScreen";
import ConfirmationScreen from "./login-screens/ConfirmationScreen";
import ForgotPasswordScreen from "./login-screens/ForgotPasswordScreen";
import { BackButton } from "../../ModuleExports";
import { View } from "react-native";

export default function InitialScreen() {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="Register" component={RegisterScreen} options={{ 
                title: "Cadastro",
                unmountOnBlur: true,
                headerLeft: () => <View style={{paddingRight:10}}>
                <BackButton/>
            </View>,
                headerStyle: {
                    borderBottomWidth: 0.2,
                    borderColor: 'black',
                },
            }}/>
            <Stack.Screen name="Confirmation" component={ConfirmationScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ 
                title: "Esqueci a senha",
                unmountOnBlur: true,
                headerLeft: () => <View style={{paddingRight:10}}>
                    <BackButton/>
                </View>,
                headerStyle: {
                    borderBottomWidth: 0.2,
                    borderColor: 'black',
                },
            }}/>
        </Stack.Navigator>

    );
}
