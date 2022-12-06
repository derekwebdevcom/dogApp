import * as React from "react";
import { FC, useEffect } from "react";
import { PERMISSIONS, request } from "react-native-permissions";
import { StyleSheet, View, Text, ImageBackground } from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { Button, Header } from "../../components";
import { globalColors, globalStrings } from "../../global";

export const UploadScreen: FC = () => {
  const cuteDog = require("../../assets/cameraPuppy.jpg");

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

  const cameraFunc = async () => {
    const options = {
      saveToPhotos: true,
    };

    launchCamera(options as any);
    const result = await launchCamera(options as any);
    console.log(result);
    return result;
  };

  const galleryFunc = async () => {
    const options = {
      includeBase64: true,
    };

    launchImageLibrary(options as any);
    const result = await launchImageLibrary(options as any);
    console.log(result);
    return result;
  };

  return (
    <View style={styles.container} testID={"upload_screen"}>
      <Header headerText={globalStrings.upLoad} />
      <ImageBackground source={cuteDog} style={styles.cutePuppy}>
        <View style={styles.textContainer}>
          <Text style={styles.header}>{globalStrings.uploadTitle}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={cameraFunc} buttonText={globalStrings.camera} />
          <Button onPress={galleryFunc} buttonText={globalStrings.gallery} />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.paletteLight,
  },
  buttonContainer: {
    marginTop: 300,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  textContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: globalColors.shadowBackground,
  },
  header: {
    color: globalColors.palettePink,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
  cutePuppy: {
    height: "100%",
    width: "100%",
  },
});
