import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthenticatedStack} from './navigation';

const App = () => {
  return (
    <>
      <NavigationContainer>
        <AuthenticatedStack />
      </NavigationContainer>
    </>
  );
};

export default App;
