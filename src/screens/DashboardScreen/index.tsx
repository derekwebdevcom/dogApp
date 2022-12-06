import * as React from "react";
import {
  FlatList,
  StyleSheet,
  TextInput,
  View,
  Text,
  Pressable,
  ImageBackground,
  ActivityIndicator,
  Alert,
  GestureResponderEvent,
  StatusBar,
} from "react-native";
import { useState, FC, useEffect, useRef, useCallback } from "react";
import { useFetchData } from "../../hooks";
import { Button, Header, Modal } from "../../components";
import { globalColors, globalEnums, globalStrings } from "../../global";
import LinearGradient from "react-native-linear-gradient";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Routes } from "../../navigation";

interface DashBoardProps {
  viewImage?: (event: GestureResponderEvent) => void;
}

export const DashboardScreen: FC<DashBoardProps> = () => {
  const manWithDog = require("../../assets/dogfeeding.jpg");
  const [data, isLoading, dataError] = useFetchData(globalStrings.allBreeds);
  const [selected, setSelected] = useState<string>(globalStrings.emptyString);
  const [url, setUrl] = useState(globalStrings.imageUrl);
  const imagesList = useFetchData(url);
  const [showBreeds, setShowBreeds] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [viewImageButton, setViewImageButton] = useState<boolean>(false);
  const ref = useRef<FlatList>(null);
  const navigation = useNavigation<NativeStackNavigationProp<Routes>>();
  const [listKeys, setListKeys] = useState([]);
  const [blur, setBlur] = useState<number>(0);
  const [buttonLabel, setButtonLabel] = useState<string>(
    globalStrings.showBreeds
  );
  const [dogModalLabel, setDogModalLabel] = useState<string>(
    globalStrings.emptyString
  );

  useEffect(() => {
    let subscribed = true;
    for (const key in data) {
      if (data[key]) {
        listKeys?.push(key as never);
        setListKeys([...listKeys]);
      }
    }
    if (selected) {
      const template = globalStrings.imageUrl.replace("selected", selected);
      setUrl(template);
    }
    return () => {
      subscribed = false;
    };
  }, [data, selected, url]);

  const goBack = () => {
    navigation.navigate("welcomeScreen");
  };

  const buttonAction = () => {
    setBlur(5);
    setShowBreeds(!showBreeds);
    setButtonLabel(globalStrings.hideBreeds);
    if (buttonLabel === globalStrings.hideBreeds) {
      setBlur(0);
      setButtonLabel(globalStrings.showBreeds);
      setViewImageButton(false);
    }
  };

  const onChange = useCallback((value: string) => {
    setButtonLabel(globalStrings.hideBreeds);
    const format = globalStrings.regex;
    if (format.test(value)) {
      Alert.alert(globalStrings.alertWarning);
    }
    const newData = listKeys.filter((item) => {
      const itemData = item ? item?.toUpperCase() : "".toUpperCase();
      const textData = value.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    const filterText = listKeys.indexOf(
      newData?.toString().toLowerCase() as never,
      0
    );
    setShowBreeds(true);
    if (value.length == 0) {
      setShowBreeds(false);
      setButtonLabel(globalStrings.showBreeds);
    }
    if (filterText !== -1) {
      ref.current?.scrollToIndex({
        index: filterText,
        animated: true,
      });
    }
  }, []);

  const onPressModalClose = () => {
    setModalVisible(false);
  };

  const viewImage = (idx: number) => {
    ref.current?.scrollToIndex({
      index: idx,
      animated: true,
    });
    const timer = setTimeout(() => {
      setModalVisible(true);
    }, 1500);
    return () => {
      clearTimeout(timer);
    };
  };

  return (
    <View style={styles.container} testID={"dashboard_screen"}>
      <StatusBar hidden />
      <Header headerText={globalStrings.dashBoard} />
      <ImageBackground
        style={styles.manWithDog}
        source={manWithDog}
        blurRadius={blur}
      >
        <View style={styles.searchView}>
          <TextInput
            autoCorrect={false}
            placeholder={globalStrings.searchDogs}
            style={styles.textInput}
            placeholderTextColor={globalColors.paletteLightText}
            onChangeText={onChange}
          />
          <Button onPress={buttonAction} buttonText={buttonLabel} />
        </View>
        <View style={styles.goBack}>
          <Button
            testID={"logout_button"}
            onPress={goBack}
            invertColors
            buttonText={globalStrings.goBack}
          />
        </View>
        <View style={styles.imageContainer}>
          {isLoading && (
            <View style={styles.activityIndicator}>
              <ActivityIndicator
                size={globalEnums.large}
                color={globalColors.palettePink}
              />
            </View>
          )}
          {dataError && (
            <View style={styles.activityIndicator}>
              <Text style={styles.errorMessage}>
                {globalStrings.netWorkError} {dataError}
              </Text>
            </View>
          )}
          {showBreeds ? (
            <FlatList
              data={listKeys}
              removeClippedSubviews
              ref={ref}
              keyExtractor={(item, index) => index.toString()}
              onScrollToIndexFailed={({ index, averageItemLength }) => {
                ref.current?.scrollToOffset({
                  offset: index * averageItemLength,
                  animated: true,
                });
              }}
              renderItem={({ item, index }) => (
                <Pressable
                  onPress={() => {
                    setSelected(item);
                    setDogModalLabel(item);
                    setViewImageButton(true);
                    viewImage(index);
                  }}
                  style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]}
                >
                  <LinearGradient
                    colors={[
                      globalColors.paletteLight,
                      globalColors.palettePink,
                      globalColors.palettePink,
                    ]}
                    style={styles.linearGradient}
                  >
                    <View style={styles.listItem}>
                      {viewImageButton && item === selected ? (
                        <Pressable style={styles.cameraIcon}>
                          <Feather
                            name={globalEnums.camera}
                            color={globalColors.paletteLightText}
                            size={20}
                          />
                        </Pressable>
                      ) : null}
                      <Text style={styles.itemText} key={item}>
                        {item[0]?.toUpperCase() + item?.slice(1)}
                      </Text>
                      <View style={styles.iconContainer}>
                        <AntDesign
                          name={globalEnums.doubleRight}
                          color={globalColors.paletteLightText}
                          size={20}
                        />
                      </View>
                    </View>
                  </LinearGradient>
                </Pressable>
              )}
            />
          ) : null}
        </View>
        <Modal
          visible={modalVisible}
          dogData={imagesList[0]}
          dog={dogModalLabel}
          onPressModalClose={onPressModalClose}
          isLoading={isLoading}
          dataError={dataError}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    marginTop: 50,
  },
  activityIndicator: {
    marginTop: "50%",
  },
  goBack: {
    marginTop: 10,
    marginLeft: "auto",
    marginRight: "auto",
  },
  container: {
    flex: 1,
  },
  cameraIcon: {
    marginTop: 12,
    marginLeft: "10%",
  },
  linearGradient: {
    height: 50,
  },
  iconContainer: {
    marginTop: 12,
    marginLeft: 20,
  },
  errorMessage: {
    textAlign: "center",
    fontSize: 20,
    color: globalColors.paletteLightText,
    fontWeight: "bold",
  },
  manWithDog: {
    width: "100%",
    height: "100%",
  },
  searchView: {
    marginTop: 30,
    marginLeft: "auto",
    marginRight: "auto",
    flexDirection: "row",
  },
  listItem: {
    flexDirection: "row-reverse",
    justifyContent: "flex-end",
  },
  textInput: {
    backgroundColor: globalColors.palettePink,
    opacity: 0.5,
    width: 165,
    height: 40,
    borderRadius: 10,
    textAlign: "center",
    marginRight: 10,
    color: globalColors.paletteLightText,
    fontWeight: "bold",
  },
  itemText: {
    marginTop: 12,
    fontSize: 16,
    color: globalColors.paletteLightText,
    fontWeight: "bold",
    marginLeft: 15,
  },
});
