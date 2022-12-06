import * as React from "react";
import {
  StyleSheet,
  Text,
  Pressable,
  GestureResponderEvent,
  View,
} from "react-native";
import { FC } from "react";
import LinearGradient from "react-native-linear-gradient";
import AntDesign from "react-native-vector-icons/AntDesign";
import { globalColors, globalEnums } from "../global";

interface ButtonProps {
  buttonText?: string;
  onPress?: (event: GestureResponderEvent) => void;
  invertColors?: boolean;
  testID?: string;
}

export const Button: FC<ButtonProps> = ({
  buttonText,
  onPress,
  invertColors,
  testID,
}) => {
  return (
    <>
      <Pressable
        testID={testID}
        style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]}
        onPress={onPress}
      >
        {invertColors ? (
          <LinearGradient
            colors={[
              globalColors.palettePink,
              globalColors.palettePink,
              globalColors.paletteLight,
            ]}
            style={styles.linearGradient}
          >
            <View style={styles.iconAdded}>
              <AntDesign
                name={globalEnums.doubleLeft}
                color={globalColors.paletteLightText}
                size={16}
              />
              <Text style={styles.buttonTextIcon}>{buttonText}</Text>
            </View>
          </LinearGradient>
        ) : (
          <LinearGradient
            colors={[
              globalColors.paletteLight,
              globalColors.palettePink,
              globalColors.palettePink,
            ]}
            style={styles.linearGradient}
          >
            <Text style={styles.buttonText}>{buttonText}</Text>
          </LinearGradient>
        )}
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    height: 40,
    width: 100,
    borderRadius: 10,
  },
  buttonText: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 11,
    color: globalColors.paletteLightText,
    fontWeight: "bold",
  },
  buttonTextIcon: {
    marginLeft: 11,
    marginRight: "auto",
    color: globalColors.paletteLightText,
    fontWeight: "bold",
  },
  iconAdded: {
    flexDirection: "row",
    marginTop: 12,
  },
});
