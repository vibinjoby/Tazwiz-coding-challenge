import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import colors from '../config/colors';
import routes from './routes';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeStackNavigator from './HomeStackNavigator';

export default function LoginStackNavigator(props) {
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
      <Stack.Screen name={routes.LOGIN} component={LoginScreen} />
      <Stack.Screen name={routes.REGISTER} component={RegisterScreen} />
      <Stack.Screen name={routes.HOME} component={HomeStackNavigator} />
    </Stack.Navigator>
  );
}
