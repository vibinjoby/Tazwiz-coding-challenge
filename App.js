/**
 * @ author vibinjoby
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import LoginStackNavigator from './app/navigation/LoginStackNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <LoginStackNavigator />
    </NavigationContainer>
  );
};

export default App;
