import React, {useEffect, useState} from 'react';
import {View, Alert} from 'react-native';
import AppLoader from '../helpers/AppLoader';
import routes from '../navigation/routes';
import service from '../services/RegisterService';

export default function PreConfirmedScreen({route, navigation}) {
  const [isLoading, setIsLoading] = useState(false);

  const navigateToLogin = () => {
    setIsLoading(false);
    navigation.navigate(routes.LOGIN);
  };

  useEffect(() => {
    const {email, isEmailConfirmed} = route.params;
    console.log(email, isEmailConfirmed);
    !isLoading && setIsLoading(true);
    if (!isEmailConfirmed) {
      console.log('email not confirmed');
      //if the email is not confirmed show the popup and redirect the user to login page
      Alert.alert(
        'Email not confirmed!!',
        'Please confirm your email before proceeding to Home page',
        [
          {
            title: 'OK',
            onPress: () => navigateToLogin(),
          },
        ],
      );
    } else {
      //If the email is confirmed navigate to home screen
      (async function() {
        try {
          const data = await service.confirmUserRegistration(email);
          //if the data is not present after calling the api return with an alert error message to the login screen
          if (!data)
            return Alert.alert(
              'Error !!',
              'Something wrong with the registration',
              [
                {
                  title: 'OK',
                  onPress: () => navigateToLogin(),
                },
              ],
            );
          //If api call is successfull redirect the user to login screen with success message
          Alert.alert(
            'Email confirmed Successfully !!',
            'Now login to proceed further',
            [
              {
                title: 'OK',
                onPress: () => navigateToLogin(),
              },
            ],
          );
        } catch (error) {
          console.log(error);
          Alert.alert('Error!!', error, [
            {
              title: 'OK',
              onPress: () => navigateToLogin(),
            },
          ]);
        }
      })();
    }
  }, []);

  return (
    <>
      <AppLoader isLoading={isLoading} />
      <View></View>
    </>
  );
}
