import * as React from "react";
import { View } from "react-native";
import { WebView } from "../../components";
import { globalStrings } from "../../global";

export const WebViewScreen = () => {
  return (
    <View testID={"webview_screen"}>
      <WebView url={globalStrings.resumeUrl} />
    </View>
  );
};
