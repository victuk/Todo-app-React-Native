import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import * as LocalAuthentication from "expo-local-authentication";
import { Alert, Pressable, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SimpleLineIcons } from "@expo/vector-icons";
import {
  Button,
  MD3LightTheme as DefaultTheme,
  Divider,
  Menu,
  PaperProvider,
} from "react-native-paper";
import { useAuthStore } from "@/store/AuthStore";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "black",
    secondary: "black",
  },
};

export default function RootLayout() {

  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <GestureHandlerRootView>
      <PaperProvider theme={theme}>
        <Stack screenOptions={{ headerShadowVisible: false }}>
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="home"
            options={{
              title: "VTask App",
              // headerTitleAlign: "center",
              headerBackVisible: false,
              headerRight: () => {
                return (
                  <MenuButton
                    openMenu={openMenu}
                    closeMenu={closeMenu}
                    visible={visible}
                  />
                );
              },
            }}
          />
        </Stack>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
interface MenuInterface {
  openMenu: () => void;
  closeMenu: () => void;
  visible: boolean;
}

const MenuButton = ({ openMenu, closeMenu, visible }: MenuInterface) => {

  const setLoggedIn = useAuthStore(state => state.setLoggedIn);

  return (
    <Menu
    contentStyle={{backgroundColor: "white"}}
      style={{marginTop: 50}}
      visible={visible}
      onDismiss={closeMenu}
      anchorPosition="bottom"
      anchor={<Pressable onPress={openMenu}><SimpleLineIcons name="options-vertical" size={18} /></Pressable>}
    >
        {/* <Menu.Item onPress={() => {}} title="Profile" /> */}
        {/* <Menu.Item onPress={() => {}} title="Settings" /> */}
        <Menu.Item onPress={() => {
          setLoggedIn(false);
        }} title="Log Out" />
        {/* <Menu.Item onPress={() => {}} title="Item 2" />
        <Divider />
        <Menu.Item onPress={() => {}} title="Item 3" /> */}
    </Menu>
  );
};
