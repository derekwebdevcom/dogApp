import * as React from 'react';
import {FC, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Alert,
  Pressable,
} from 'react-native';
import {WebView as RNWebView} from 'react-native-webview';
import {globalColors, globalEnums, globalStrings} from '../global';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Routes} from '../navigation';

interface WebViewProp {
  url: {};
}

export const WebView: FC<WebViewProp> = url => {
  const [endPoint, setEndPoint] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation<NativeStackNavigationProp<Routes>>();

  const goBack = () => {
    navigation.navigate('profileScreen');
  };

  useEffect(() => {
    setEndPoint(url?.url);
    return () => {
      null;
    };
  }, [url]);

  return (
    <View style={styles.webview}>
      {loading && (
        <ActivityIndicator
          size={'large'}
          color={globalColors.palettePink}
          style={styles.activityIndicator}
        />
      )}
      <View style={styles.closeIcon}>
        <Pressable
          onPress={goBack}
          style={({pressed}) => [{opacity: pressed ? 0.5 : 1.0}]}>
          <AntDesign
            name={globalEnums.closeCirle}
            color={globalColors.palettePink}
            size={30}
          />
        </Pressable>
      </View>
      <RNWebView
        javaScriptEnabled={true}
        domStorageEnabled={true}
        style={styles.webViewStyle}
        source={{uri: endPoint}}
        onLoad={() => setLoading(false)}
        onError={event =>
          Alert.alert(
            globalStrings.webviewError +
              `: ` +
              `${event.nativeEvent.description}`,
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  webview: {
    height: '100%',
    width: '100%',
    marginTop: '30%',
    flex: 1,
  },
  webViewStyle: {
    flex: 1,
  },
  activityIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    zIndex: 2,
  },
  closeIcon: {
    marginLeft: 'auto',
    marginRight: 20,
    height: 55,
  },
});
