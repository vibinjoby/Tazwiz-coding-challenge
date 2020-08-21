import React, {useContext, useState} from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
  HeaderBackButton,
} from '@react-navigation/stack';
import {GoogleSignin} from '@react-native-community/google-signin';
import {Image, TouchableOpacity, Alert} from 'react-native';

import routes from './routes';
import colors from '../config/colors';
import ExploreScreen from '../screens/ExploreScreen';
import PostTaskScreen from '../screens/PostTaskScreen';
import UserInfoContext from '../context/UserInfoContext';
import AppLoader from '../helpers/AppLoader';
import Utils from '../helpers/Utils';

export default function HomeStackNavigator({route, navigation}) {
  const [isLoading, setIsLoading] = useState(false);
  const userCtxInfo = useContext(UserInfoContext);
  const Stack = createStackNavigator();

  const removeToken = () => {
    Utils.removeAsyncStorageData('token');
  };

  const googleSignOut = async () => {
    try {
      !isLoading && setIsLoading(true);
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      //After sign out navigate to login screen
      setIsLoading(false);
      removeToken();
      navigation.navigate(routes.LOGIN);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const usersSignOut = () => {
    setIsLoading(false);
    removeToken();
    navigation.navigate(routes.LOGIN);
  };

  //Logout users
  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out??', [
      {
        text: 'No',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          //If google users sign out from google else remove the token
          userCtxInfo && userCtxInfo.isGoogleSignIn
            ? googleSignOut()
            : usersSignOut();
        },
      },
    ]);
  };
  return (
    <>
      <AppLoader isLoading={isLoading} />
      <Stack.Navigator
        navigationOptions={{headerLayoutPreset: 'center'}}
        screenOptions={{
          cardStyleInterpolator:
            CardStyleInterpolators.forScaleFromCenterAndroid,
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
          name={routes.EXPLORE}
          component={ExploreScreen}
          options={({route, navigation}) => ({
            headerShown: true,
            headerLeft: null,
            headerRight: () => (
              <TouchableOpacity onPress={handleLogout}>
                <Image
                  source={require('../assets/logout.png')}
                  style={{width: 20, height: 20, marginRight: 20}}
                />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name={routes.POST_TASK}
          component={PostTaskScreen}
          options={{
            headerTitle: 'Post a Task',
            headerLeft: props => (
              <HeaderBackButton
                {...props}
                label="Back"
                tintColor={colors.white}
              />
            ),
          }}
        />
      </Stack.Navigator>
    </>
  );
}
