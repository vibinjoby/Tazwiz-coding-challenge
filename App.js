/**
 * @ author vibinjoby
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StatusBar, KeyboardAvoidingView, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import LoginStackNavigator from './app/navigation/LoginStackNavigator';
import UserInfoStore from './app/context/store/UserInfoStore';

const App = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{flex: 1}}>
      <StatusBar barStyle="light-content" />
      <UserInfoStore>
        <NavigationContainer>
          <LoginStackNavigator />
        </NavigationContainer>
      </UserInfoStore>
    </KeyboardAvoidingView>
  );
};

export default App;
