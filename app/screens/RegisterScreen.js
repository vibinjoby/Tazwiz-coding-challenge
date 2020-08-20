import React from 'react';
import {View, StyleSheet, Text, Image, Alert} from 'react-native';
import * as yup from 'yup';
import {Formik} from 'formik';

import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import colors from '../config/colors';
import routes from '../navigation/routes';
import service from '../services/RegisterService';

export default function RegisterScreen({route, navigation}) {
  const data = [
    {key: 1, placeholder: 'Full Name', name: 'fullName', autofocus: true},
    {
      key: 2,
      placeholder: 'Email',
      name: 'email',
      keyboardType: 'email-address',
      autofocus: false,
    },
    {
      key: 3,
      placeholder: 'Password',
      name: 'password',
      secureEntry: true,
      autofocus: false,
    },
    {
      key: 4,
      placeholder: 'Confirm Password',
      name: 'confirmPwd',
      secureEntry: true,
      autofocus: false,
    },
  ];

  const handleLoginClick = () => {
    navigation.navigate(routes.LOGIN);
  };

  const handleRegister = async values => {
    try {
      const {fullName, email, password} = values;
      //Register the user first
      const registerData = await service.registerUser(
        fullName,
        email,
        password,
      );
      // If the registration is successfull, send a confirmation email
      if (registerData) {
        const isEmailSent = await service.sendEmailConfirmation(
          fullName,
          email,
        );
        //If email is sent alert the user to check his email and click on the link to proceed
        if (isEmailSent)
          Alert.alert(
            'Successfully Registered',
            'Check your email to confirm your registration!!',
            [{title: 'OK', onPress: () => navigation.navigate(routes.LOGIN)}],
          );
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Something went wrong with the server', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/Tazwiz-logo.png')}
        width={40}
        height={40}
        style={{alignSelf: 'center'}}
      />
      <View style={styles.registerBox}>
        <Formik
          initialValues={{
            fullName: '',
            email: '',
            password: '',
            confirmPwd: '',
          }}
          validationSchema={yup.object().shape({
            fullName: yup
              .string()
              .label('Full Name')
              .required(),
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
            confirmPwd: yup
              .string()
              .label('Confirm Password')
              .oneOf([yup.ref('password'), null], 'Passwords must match')
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
              {data.map(item => (
                <AppTextInput
                  autoFocus={item.autofocus}
                  keyboardType={item.keyboardType}
                  key={item.key.toString()}
                  placeholder={item.placeholder}
                  onBlur={() => setFieldTouched(item.name)}
                  onFocus={() => validateForm()}
                  onChangeText={handleChange(item.name)}
                  touched={touched}
                  secureTextEntry={item.secureEntry}
                  name={item.name}
                  errors={errors}
                />
              ))}

              <AppButton
                title="REGISTER"
                onPress={() => handleRegister(values)}
                disabled={!isValid || isSubmitting}
                customStyles={{marginTop: 20}}
              />
              <View style={styles.loginContainer}>
                <Text style={styles.accTxt}>Already have an Account? </Text>
                <Text style={styles.loginTxt} onPress={handleLoginClick}>
                  Login
                </Text>
              </View>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: colors.white,
  },
  registerBox: {
    padding: 20,
    borderRadius: 10,
    marginTop: 40,
    backgroundColor: colors.lightPrimary,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  accTxt: {
    fontFamily: 'ProximaNova-Regular',
    color: colors.white,
    fontSize: 16,
  },
  loginTxt: {
    fontFamily: 'ProximaNova-Bold',
    fontSize: 16,
    textAlign: 'center',
    color: 'tomato',
  },
});
