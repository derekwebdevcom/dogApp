import * as React from "react";
import { StyleSheet, Text, View, ImageBackground, Image } from "react-native";
import { FC, useState, useEffect } from "react";
import { Header, Button } from "../../components";
import { useNavigation } from "@react-navigation/native";
import { PERMISSIONS, request } from "react-native-permissions";
import { globalColors, globalStrings } from "../../global";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Routes } from "../../navigation";

export const WelcomeScreen: FC = () => {
  const derekWebDevLogo = require("../../assets/derekwebdevlogon.png");
  const bullDog = require("../../assets/bulldog.jpg");
  const [opacity, setOpacity] = useState<any>(null);
  const navigation = useNavigation<NativeStackNavigationProp<Routes>>();

  useEffect(() => {
    let subscribePermission = true;
    const requestPermission = () => {
      request(PERMISSIONS.ANDROID.CAMERA).then((response) => {
        console.log("ANDROID CAMERA RESPONSE", response);
      });
      request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then((response) => {
        console.log("ANDROID WRITE EXTERNAL STORAGE", response);
      });
      request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then((response) => {
        console.log("ANDROID READ EXTERNAL STORAGE", response);
      });

      request(PERMISSIONS.IOS.CAMERA).then((response) => {
        console.log("IOS CAMERA PERMISSIONS", response);
      });
      request(PERMISSIONS.IOS.PHOTO_LIBRARY).then((response) => {
        console.log("IOS PHOTO LIBRARY PERMISSION", response);
      });
      return () => {
        subscribePermission = false;
      };
    };
    requestPermission();
  }, []);

  const loginAction = () => {
    setOpacity(styles.opacity);
    navigation.navigate("dashboardScreen");
    const timer = setTimeout(() => {
      setOpacity(styles.opacityZero);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  };

  return (
    <View testID={"welcome_screen"}>
      <Header headerText={globalStrings.dogsApp} />
      <ImageBackground style={[styles.bulldog, opacity]} source={bullDog}>
        <View style={styles.optionButtonView}>
          <Image style={styles.logo} source={derekWebDevLogo} />
          <Text style={styles.credits}>{globalStrings.presentedBy}</Text>
          <Text style={styles.optionButtonText}>{globalStrings.allThings}</Text>
          <View style={styles.buttonContainer}>
            <Button
              testID={"skip_login"}
              buttonText={globalStrings.skipLogin}
              onPress={loginAction}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  bulldog: {
    width: "100%",
    height: "100%",
  },
  opacity: {
    opacity: 0.5,
  },
  opacityZero: {
    opacity: 1,
  },
  logo: {
    resizeMode: "contain",
    marginTop: 20,
    marginLeft: "auto",
    marginRight: "auto",
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: globalColors.tabInactiveTint,
  },
  credits: {
    marginLeft: "auto",
    marginRight: 20,
    fontSize: 8,
  },
  optionButtonView: {
    backgroundColor: globalColors.paletteLightText,
    marginLeft: "auto",
    marginRight: "auto",
    height: 240,
    width: 285,
    marginTop: 60,
    borderRadius: 10,
    borderColor: globalColors.palettePink,
    borderWidth: 1,
  },
  optionButtonText: {
    color: globalColors.palettePink,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 5,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "center",
  },
});
