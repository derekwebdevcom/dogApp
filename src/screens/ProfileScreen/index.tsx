import * as React from 'react';
import {FC} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Linking,
  Platform,
  StatusBar,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {globalColors, globalEnums, globalStrings} from '../../global';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Routes} from '../../navigation';
import WebView from 'react-native-webview';

export const ProfileScreen: FC = () => {
  const avatar = require('../../assets/derekwebdevlogon.png');
  const doggy = require('../../assets/profileDog.jpg');
  const navigation = useNavigation<NativeStackNavigationProp<Routes>>();

  const emailAction = () => {
    const url = globalStrings.emailAddressLink;
    Linking.openURL(url);
  };

  const phoneCallAction = () => {
    const url = `tel:${globalStrings.phoneNumber}`;
    Linking.openURL(url);
  };

  const openUrlAction = () => {
    const url = globalStrings.browserUrl;
    Linking.openURL(url);
  };

  const linkedInAction = () => {
    const url = globalStrings.linkedIn;
    Linking.openURL(url);
  };

  const viewResumeAction = () => {
    navigation.navigate('webViewScreen');
  };

  const textAction = () => {
    const url = `sms:${globalStrings.phoneNumber}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Text style={styles.profileText}>{globalStrings.profile}</Text>
      <Image source={avatar} style={styles.avatar} />
      <Text style={styles.userName}>{globalStrings.author}</Text>
      <WebView
        javaScriptEnabled={true}
        domStorageEnabled={true}
        source={{uri: globalStrings.spiral}}
        style={styles.webView}
        onError={event =>
          Alert.alert(
            globalStrings.webviewError +
              `: ` +
              `${event.nativeEvent.description}`,
          )
        }
      />
      <LinearGradient
        colors={[
          globalColors.palettePink,
          globalColors.shadowBackgroundPink,
          globalColors.shadowBackgroundPink,
        ]}
        style={styles.linearGradient}>
        <View style={styles.informationContainer}>
          <Text style={styles.information}>{globalStrings.emailAddress}</Text>
          <Pressable
            onPress={emailAction}
            style={({pressed}) => [{opacity: pressed ? 0.5 : 1.0}]}>
            <Feather
              name={globalEnums.mail}
              color={globalColors.paletteLightText}
              size={30}
              style={styles.margin}
            />
          </Pressable>
        </View>
      </LinearGradient>
      <LinearGradient
        colors={[
          globalColors.palettePink,
          globalColors.shadowBackgroundPink,
          globalColors.shadowBackgroundPink,
        ]}
        style={styles.linearGradient}>
        <View style={styles.informationContainer}>
          <Text style={styles.information}>{globalStrings.browserUrlFull}</Text>
          <Pressable
            onPress={openUrlAction}
            style={({pressed}) => [{opacity: pressed ? 0.5 : 1.0}]}>
            <Feather
              name={globalEnums.externalLink}
              color={globalColors.paletteLightText}
              size={30}
              style={styles.margin}
            />
          </Pressable>
        </View>
      </LinearGradient>
      <LinearGradient
        colors={[
          globalColors.palettePink,
          globalColors.shadowBackgroundPink,
          globalColors.shadowBackgroundPink,
        ]}
        style={styles.linearGradient}>
        <View style={styles.informationContainer}>
          <Text style={styles.information}>{globalStrings.linkedInShort}</Text>
          <Pressable
            onPress={linkedInAction}
            style={({pressed}) => [{opacity: pressed ? 0.5 : 1.0}]}>
            <AntDesign
              name={globalEnums.linkedIn}
              color={globalColors.paletteLightText}
              size={30}
              style={styles.margin}
            />
          </Pressable>
        </View>
      </LinearGradient>
      <LinearGradient
        colors={[
          globalColors.palettePink,
          globalColors.shadowBackgroundPink,
          globalColors.shadowBackgroundPink,
        ]}
        style={styles.linearGradient}>
        <View style={styles.informationContainer}>
          <Text style={styles.information}>{globalStrings.privacyNumber}</Text>
          <Pressable
            onPress={phoneCallAction}
            style={({pressed}) => [{opacity: pressed ? 0.5 : 1.0}]}>
            <Ionicons
              name={globalEnums.phone}
              color={globalColors.paletteLightText}
              size={30}
              style={styles.margin}
            />
          </Pressable>
        </View>
      </LinearGradient>
      {Platform.OS === 'ios' ? (
        <LinearGradient
          colors={[
            globalColors.palettePink,
            globalColors.shadowBackgroundPink,
            globalColors.shadowBackgroundPink,
          ]}
          style={styles.linearGradient}>
          <View style={styles.informationContainer}>
            <Text style={styles.information}>{globalStrings.viewResume}</Text>
            <Pressable
              onPress={viewResumeAction}
              style={({pressed}) => [{opacity: pressed ? 0.5 : 1.0}]}>
              <Entypo
                name={globalEnums.eye}
                color={globalColors.paletteLightText}
                size={30}
                style={styles.margin}
              />
            </Pressable>
          </View>
        </LinearGradient>
      ) : null}
      <LinearGradient
        colors={[
          globalColors.palettePink,
          globalColors.shadowBackgroundPink,
          globalColors.shadowBackgroundPink,
        ]}
        style={styles.linearGradient}>
        <View style={styles.informationContainer}>
          <Text style={styles.information}>{globalStrings.text}</Text>
          <Pressable
            onPress={textAction}
            style={({pressed}) => [{opacity: pressed ? 0.5 : 1.0}]}>
            <Feather
              name={globalEnums.smartphone}
              color={globalColors.paletteLightText}
              size={30}
              style={styles.margin}
            />
          </Pressable>
        </View>
      </LinearGradient>
      <View style={styles.profileDogContainer}>
        <Image source={doggy} style={styles.doggy} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  profileDogContainer: {
    backgroundColor: globalColors.shadowBackground,
  },
  webView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doggy: {
    paddingBottom: 10,
    height: 100,
    zIndex: -1,
    width: '100%',
  },
  margin: {
    marginTop: 15,
    borderRadius: 5,
    borderColor: globalColors.paletteLightText,
  },
  avatar: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
    position: 'absolute',
    top: Platform.OS === 'ios' ? '14%' : 125,
    left: Platform.OS === 'ios' ? '38%' : 155,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  userName: {
    textAlign: 'center',
    position: 'absolute',
    top: Platform.OS === 'ios' ? '32%' : 275,
    left: 10,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    fontWeight: 'bold',
    fontSize: 24,
    color: globalColors.paletteLightText,
  },
  informationContainer: {
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 35,
  },
  information: {
    color: globalColors.paletteLightText,
    fontSize: 16,
    marginTop: 15,
    fontWeight: 'bold',
  },
  linearGradient: {
    height: 60,
    zIndex: 2,
  },
  profileText: {
    fontWeight: 'bold',
    fontSize: 28,
    color: globalColors.paletteLightText,
    position: 'absolute',
    top: Platform.OS === 'ios' ? '8%' : 60,
    left: Platform.OS === 'ios' ? '38%' : 160,
    alignSelf: 'center',
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
});
