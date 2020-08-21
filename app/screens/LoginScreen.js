import React, {useState, useEffect, useContext} from 'react';
import {Linking, View, StyleSheet, Image, Text, Alert} from 'react-native';
import * as yup from 'yup';
import {Formik} from 'formik';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';

import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import colors from '../config/colors';
import GoogleSignInButton from '../components/GoogleSignInButton';
import routes from '../navigation/routes';
import AppLoader from '../helpers/AppLoader';
import service from '../services/LoginService';
import UserInfoContext from '../context/UserInfoContext';
import Utils from '../helpers/Utils';

export default function LoginScreen({route, navigation}) {
  const [isLoading, setIsLoading] = useState(false);
  const userCtxInfo = useContext(UserInfoContext);

  const signIn = async () => {
    try {
      !isLoading && setIsLoading(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      //Store the user details to the context api
      userCtxInfo.setIsGoogleSignIn(true);
      userCtxInfo.setUserInfo(userInfo);
      //Store a dummy token for google sign in
      Utils.storeAsyncStorageData('token', 'googlesignin');

      //Navigate to home page after successful login
      setIsLoading(false);
      navigation.navigate(routes.HOME);
    } catch (error) {
      setIsLoading(false);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const handleLoginClick = async values => {
    const {email, password} = values;
    !isLoading && setIsLoading(true);
    try {
      //Call the login service and validate the credentials
      const loginData = await service.loginUser(email, password);
      if (loginData) {
        //If the email confirmed bool is true navigate to home page
        if (loginData.isEmailConfirmed) {
          //Store the user details to the context api
          userCtxInfo.setIsGoogleSignIn(false);
          userCtxInfo.setUserInfo(loginData);

          setIsLoading(false);
          navigation.navigate(routes.HOME);
        }
        // else navigate him to pre confirmed screen
        else {
          setIsLoading(false);
          navigation.navigate(routes.PRE_CONFIRMATION, {
            isEmailConfirmed: loginData.isEmailConfirmed,
          });
        }
      }
    } catch (error) {
      Alert.alert('Unable to Login', error, [
        {
          text: 'OK',
          onPress: () => setIsLoading(false),
          style: 'cancel',
        },
      ]);
    }
  };

  const handleRegisterClick = () => {
    navigation.navigate(routes.REGISTER);
  };

  const handleOpenURL = event => {
    // Get the deep link url used to open the app
    try {
      const {url} = event;
      if (!url) return;
      //tazwiz://confirmation/:email
      const uri = url.split('//')[1];
      if (!uri) return;

      //confirmation/:email
      const email = uri.split('/')[1];

      //If there is an associated email redirect to the confirmation screen and then go to explore screen
      if (email)
        navigation.navigate(routes.PRE_CONFIRMATION, {
          email,
          isEmailConfirmed: true,
        });
      else console.log('email not found in the url');
    } catch (error) {
      console.log(error);
    }
  };

  //Deeplinking URL
  useEffect(() => {
    //Google sign in configuration
    GoogleSignin.configure({
      webClientId: process.env.SIGN_IN_API_KEY, // client ID of type WEB for your server (needed to verify user ID and offline access)
    });

    //If the initial URL when the app opens for the first time is from linking navigate to pre confirmation screen based on the url params
    (async function() {
      const url = await Linking.getInitialURL();
      console.log(url);
      if (url) handleOpenURL({url});
    })();

    //If the user is previously signed in navigate to home page
    (async function() {
      const token = await Utils.fetchAsyncStorageData('token');
      console.log(token);
      if (token) navigation.navigate(routes.HOME);
    })();

    // Add event listener if the app is in foreground
    Linking.addEventListener('url', handleOpenURL);
    //Remove the subscription during unmount
    return () => {
      Linking.removeEventListener('url', handleOpenURL);
    };
  }, []);

  return (
    <>
      <AppLoader isLoading={isLoading} />
      <View style={styles.container}>
        <Image
          source={require('../assets/Tazwiz-logo.png')}
          width={40}
          height={40}
          style={{alignSelf: 'center'}}
        />
        <View style={styles.loginContainer}>
          <Image
            source={require('../assets/login_girl.png')}
            width={200}
            height={100}
            resizeMode="stretch"
            style={styles.login_girl_img}
          />
          <View style={styles.loginBox}>
            <Formik
              initialValues={{email: '', password: ''}}
              validationSchema={yup.object().shape({
                email: yup
                  .string()
                  .email()
                  .label('Email')
                  .required(),
                password: yup
                  .string()
                  .min(6)
                  .label('Password')
                  .required(),
              })}>
              {({
                values,
                handleChange,
                errors,
                setFieldTouched,
                touched,
                isValid,
                isSubmitting,
                validateForm,
              }) => (
                <>
                  <Text style={styles.headerTxt}>Login With Email</Text>
                  <AppTextInput
                    autoFocus
                    placeholder="Email"
                    onBlur={() => setFieldTouched('email')}
                    onFocus={() => validateForm()}
                    onChangeText={handleChange('email')}
                    touched={touched}
                    name="email"
                    errors={errors}
                  />
                  <AppTextInput
                    secureTextEntry
                    placeholder="Password"
                    onBlur={() => setFieldTouched('password')}
                    onChangeText={handleChange('password')}
                    touched={touched}
                    name="password"
                    errors={errors}
                  />
                  <AppButton
                    title="LOGIN"
                    onPress={() => handleLoginClick(values)}
                    disabled={!isValid || isSubmitting}
                    customStyles={{marginTop: 20}}
                  />

                  <GoogleSignInButton onPress={signIn} />
                  <View style={styles.registerContainer}>
                    <Text style={styles.noAccTxt}>Don't have an account? </Text>
                    <Text
                      style={styles.registerTxt}
                      onPress={handleRegisterClick}>
                      Register
                    </Text>
                  </View>
                </>
              )}
            </Formik>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  loginContainer: {
    paddingRight: 10,
    paddingTop: 50,
    flexDirection: 'row',
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBox: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: colors.lightPrimary,
  },
  headerTxt: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'ProximaNova-Bold',
    color: colors.white,
  },
  login_girl_img: {
    width: '45%',
    height: 300,
  },
  noAccTxt: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 16,
    textAlign: 'center',
    color: colors.white,
  },
  registerContainer: {},
  registerTxt: {
    fontFamily: 'ProximaNova-Bold',
    fontSize: 16,
    textAlign: 'center',
    color: 'tomato',
  },
});
