import "react-native-reanimated";

import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner-native";
import { IS_ANDROID } from "../constants/theme";
import QueryProvider from "../providers/QueryProvider";
import { persistor, store } from "../store/configure-store";

export default function RootLayout() {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaProvider
      style={{
        paddingBottom: IS_ANDROID ? insets.bottom : 0,
      }}
    >
      <GestureHandlerRootView>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <QueryProvider>
              <ThemeProvider value={DefaultTheme}>
                <Stack screenOptions={{ headerShown: false }}>
                  <Stack.Screen
                    name="index"
                    options={{ title: "List of Posts" }}
                  />
                  <Stack.Screen
                    name="posts/[id]"
                    options={{
                      title: "Post Details",
                      headerTitleAlign: "center",
                    }}
                  />
                  <Stack.Screen
                    name="posts/create-post"
                    options={{
                      title: "Create Post",
                      headerTitleAlign: "center",
                    }}
                  />
                </Stack>
                <StatusBar style="auto" />
                <Toaster position="top-center" />
              </ThemeProvider>
            </QueryProvider>
          </PersistGate>
        </Provider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
