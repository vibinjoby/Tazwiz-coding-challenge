import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import * as yup from 'yup';
import {Formik} from 'formik';

import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import colors from '../config/colors';
import routes from '../navigation/routes';
import {AppDateTimePicker} from '../components/AppDateTimePicker';

export default function PostTaskScreen({route, navigation}) {
  const [addressVal, setAddressVal] = useState('');

  useEffect(() => {
    route && route.params && setAddressVal(route.params.address);
  }, [route.params]);

  const handleAddressSearch = onChangeText => {
    onChangeText('address');
    navigation.navigate(routes.PLACES_SCREEN);
  };

  const data = [
    {
      key: 1,
      placeholder: 'Title',
      name: 'title',
      type: 'text',
      autoFocus: true,
      onPress: () => console.log(),
    },
    {
      key: 2,
      placeholder: 'Address',
      type: 'text',
      name: 'address',
      onPress: onChangeText => handleAddressSearch(onChangeText),
    },
    {
      key: 3,
      placeholder: 'Date',
      name: 'date',
      type: 'date',
      onPress: () => console.log(),
    },
    {
      key: 4,
      placeholder: 'Phone Number',
      name: 'phoneNumber',
      keyboardType: 'numeric',
      type: 'text',
      onPress: () => console.log(),
    },
    {
      key: 5,
      placeholder: 'Email',
      name: 'email',
      keyboardType: 'email-address',
      type: 'text',
      onPress: () => console.log(),
    },
    {
      key: 6,
      placeholder: 'Description',
      name: 'description',
      type: 'text',
      onPress: () => console.log(),
    },
  ];
  const handlePostTask = values => {
    Alert.alert('POST TASK', 'Task Posted Successfully!!');
    console.log(values);
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          title: '',
          address: '',
          date: '',
          phoneNumber: '',
          email: '',
          description: '',
        }}
        validationSchema={yup.object().shape({
          title: yup
            .string()
            .label('Title')
            .required(),
          address: yup.string().label('Address'),
          date: yup
            .string()
            .label('Date')
            .required(),
          phoneNumber: yup
            .string()
            .matches(
              /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
              'Phone number is not valid',
            )
            .min(10, 'too short')
            .max(10, 'too long')
            .label('Phone Number')
            .min(10)
            .required(),
          email: yup
            .string()
            .email()
            .label('Email')
            .required(),
          description: yup
            .string()
            .label('Description')
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
            {data.map(item => {
              console.log(errors);
              if (item.type === 'text') {
                return (
                  <AppTextInput
                    autoFocus={item.autoFocus}
                    customStyles={{color: colors.black}}
                    key={item.key.toString()}
                    keyboardType={item.keyboardType}
                    placeholder={item.placeholder}
                    multiline={item.multiline}
                    onBlur={() => setFieldTouched(item.name)}
                    onFocus={() => validateForm()}
                    onChangeText={handleChange(item.name)}
                    touched={touched}
                    name={item.name}
                    onPress={() => item.onPress(handleChange)}
                    errors={errors}
                    value={item.name === 'address' ? addressVal : null}
                  />
                );
              } else if (item.type === 'date') {
                return (
                  <AppDateTimePicker
                    key={item.key}
                    touched={touched}
                    onChangeText={handleChange(item.name)}
                    name={item.name}
                    errors={errors}
                  />
                );
              }
            })}

            <AppButton
              title="POST TASK"
              onPress={() => handlePostTask(values)}
              disabled={!isValid || isSubmitting}
              customStyles={{marginTop: 20}}
            />
          </>
        )}
      </Formik>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
});
