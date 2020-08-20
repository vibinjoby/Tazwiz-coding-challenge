import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
  HeaderBackButton,
} from '@react-navigation/stack';
import colors from '../config/colors';
import routes from './routes';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeStackNavigator from './HomeStackNavigator';
import PreConfirmedScreen from '../screens/PreConfirmedScreen';

export default function LoginStackNavigator() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      navigationOptions={{headerLayoutPreset: 'center'}}
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerStyle: {
          backgroundColor: colors.lightPrimary,
        },
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 20,
          fontFamily: 'ProximaNova-Bold',
          color: colors.white,
        },
      }}>
      <Stack.Screen
        name={routes.LOGIN}
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={routes.REGISTER}
        component={RegisterScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          headerBackTitleStyle: {color: colors.white},
          headerBackTitle: 'Back',
          headerLeft: props => (
            <HeaderBackButton {...props} tintColor={colors.white} />
          ),
        }}
      />
      <Stack.Screen
        name={routes.PRE_CONFIRMATION}
        component={PreConfirmedScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={routes.HOME}
        component={HomeStackNavigator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
