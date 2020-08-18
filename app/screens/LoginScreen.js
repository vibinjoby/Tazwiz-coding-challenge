import React from 'react';
import {View, StyleSheet} from 'react-native';
import * as yup from 'yup';
import {Formik} from 'formik';
import AppTextInput from '../components/AppTextInput';

export default function LoginScreen(props) {
  return (
    <View style={styles.container}>
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
            <AppTextInput
              placeholder="Email"
              onBlur={() => setFieldTouched('email')}
              onFocus={() => validateForm()}
              onChangeText={handleChange('email')}
            />
            {touched.email && errors.email && (
              <CustomErrorText> {errors.email}</CustomErrorText>
            )}
            <AppTextInput
              secureTextEntry
              placeholder="Password"
              onBlur={() => setFieldTouched('password')}
              onChangeText={handleChange('password')}
            />
            {touched.password && errors.password && (
              <CustomErrorText> {errors.password}</CustomErrorText>
            )}
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
