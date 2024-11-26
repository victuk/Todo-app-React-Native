import { Text, View, ScrollView, SafeAreaView, Pressable, Dimensions } from "react-native";
import { Redirect, Stack, useRouter } from "expo-router";
import {COLORS, images, icons, SIZES} from "../constants"
import * as LocalAuthentication from "expo-local-authentication"
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { useAuthStore } from "@/store/AuthStore";

export default function Index() {

  const router = useRouter();

  const height = Dimensions.get("window").height;

  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
const [fingerprint, setFingerprint] = useState(false);

const setLoggedIn = useAuthStore(state => state.setLoggedIn);
const isLoggedIn = useAuthStore(state => state.isLoggedIn);

useEffect(() => {
  (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
      const enroll = await LocalAuthentication.isEnrolledAsync();
      if (enroll) {
          setFingerprint(true);
          handle();
      }
  })();
}, []);

if(isLoggedIn) {
  return <Redirect href="/home" />
}



const handle = async () => {
  try {
      const biometricAuth = await LocalAuthentication.authenticateAsync({
          promptMessage: "Login with Biometrics",
          disableDeviceFallback: true,
          cancelLabel: "Cancel",
      });
      console.log("bio", biometricAuth.success);
      if (biometricAuth.success == true) {
        setLoggedIn(true);
        // return router.push("/home");
      }
  } catch (error) {
      console.log(error);
  }
};

  return (
    <SafeAreaView 
      style={{
        flex: 1,
        backgroundColor: COLORS.gray,
        height,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <View>
    <View>
        {isBiometricSupported && fingerprint ? (
            <Pressable onPress={handle} style={{alignItems: "center"}}>
              <FontAwesome5 name="fingerprint" size={40} />
                <Text style={{color: "black", marginTop: 20}}>Unlock</Text>
            </Pressable>
        ) : (
            <View>
                <Text>Fingerprint not supported/allocated</Text>
            </View>
        )}
    </View>
</View>
    </SafeAreaView >
  );
}
