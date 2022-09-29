import * as React from 'react';
import {WebView} from '../../components';
import {globalStrings} from '../../global';

export const WebViewScreen = () => {
  return <WebView url={globalStrings.resumeUrl} />;
};
