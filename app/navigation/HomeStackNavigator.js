import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import routes from './routes';
import colors from '../config/colors';

export default function HomeStackNavigator(props) {
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
          fontFamily: 'ProximaNovaBold',
          color: colors.white,
        },
      }}>
      <Stack.Screen name={routes.EXPLORE} />
      <Stack.Screen name={routes.POST_TASK} />
    </Stack.Navigator>
  );
}
