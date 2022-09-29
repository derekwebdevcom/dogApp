import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FC} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {globalColors} from '../global';

interface HeaderTypes {
  headerText?: string;
}

export const Header: FC<HeaderTypes> = ({headerText}) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          globalColors.paletteLight,
          globalColors.palettePink,
          globalColors.palettePink,
        ]}
        style={styles.linearGradient}>
        <Text style={styles.buttonText}>{headerText}</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  linearGradient: {
    height: 140,
  },
  buttonText: {
    marginLeft: 'auto',
    marginRight: 'auto',
    fontWeight: 'bold',
    fontSize: 28,
    marginTop: 75,
    color: globalColors.paletteLightText,
  },
});
