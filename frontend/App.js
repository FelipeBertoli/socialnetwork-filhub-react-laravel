import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MD3LightTheme as DefaultTheme, PaperProvider } from "react-native-paper";
import MainScreen from "./src/screens/MainScreen";
import InitialScreen from "./src/screens/InitialScreen";
import AuthContext from './utils/contexts/AuthContext';
import { Loading } from "./ModuleExports"; // Tela de carregamento importada
import { loadUser } from "./utils/services/UserService";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const Stack = createNativeStackNavigator();
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true); // Controle de carregamento

  useEffect(() => {
    async function runEffect() {
      try {
        const user = await loadUser();
        setUser(user);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false); // Carregamento concluído
      }
    }
    runEffect();
  }, []);

  if (isLoading) {
    // Mostra a tela de carregamento enquanto verifica o usuário
    return <Loading />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthContext.Provider value={{ user, setUser }}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <Stack.Navigator>
              {user ? (
                <Stack.Screen
                  name="Main"
                  component={MainScreen}
                  options={{ headerShown: false }}
                />
              ) : (
                <Stack.Screen
                  name="Initial"
                  component={InitialScreen}
                  options={{ headerShown: false }}
                />
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </AuthContext.Provider>
    </GestureHandlerRootView>
  );
}

const theme = {
  ...DefaultTheme,
  myOwnProperty: true,
  colors: {
    primary: "#FF7600",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(255, 219, 201)",
    onPrimaryContainer: "rgb(51, 18, 0)",
    secondary: "rgb(0, 87, 204)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(217, 226, 255)",
    onSecondaryContainer: "rgb(0, 25, 70)",
    tertiary: "rgb(0, 104, 116)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(151, 240, 255)",
    onTertiaryContainer: "rgb(0, 31, 36)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "white",
    onBackground: "white",
    surface: "rgb(255, 251, 255)",
    onSurface: "rgb(32, 26, 23)",
    surfaceVariant: "rgb(244, 222, 212)",
    onSurfaceVariant: "rgb(82, 68, 60)",
    outline: "rgb(133, 116, 107)",
    outlineVariant: "rgb(215, 194, 184)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(54, 47, 44)",
    inverseOnSurface: "rgb(251, 238, 233)",
    inversePrimary: "rgb(255, 182, 141)",
    elevation: {
      level0: "transparent",
      level1: "rgb(250, 242, 242)",
      level2: "rgb(247, 236, 235)",
      level3: "rgb(244, 231, 227)",
      level4: "rgb(243, 229, 224)",
      level5: "rgb(241, 226, 219)",
    },
    surfaceDisabled: "rgba(32, 26, 23, 0.12)",
    onSurfaceDisabled: "rgba(32, 26, 23, 0.38)",
    backdrop: "rgba(59, 46, 39, 0.4)",
  },
};
