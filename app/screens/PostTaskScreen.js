import React from 'react';
import {View, StyleSheet} from 'react-native';
import * as yup from 'yup';
import {Formik} from 'formik';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import colors from '../config/colors';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

export default function PostTaskScreen() {
  const data = [
    {key: 1, placeholder: 'Title', name: 'title'},
    {key: 2, placeholder: 'Address', name: 'address'},
    {key: 3, placeholder: 'Date', name: 'date'},
    {key: 4, placeholder: 'Phone Number', name: 'phoneNumber'},
    {key: 5, placeholder: 'Email', name: 'email'},
    {key: 6, placeholder: 'Description', name: 'description', multiline: true},
  ];
  const handlePostTask = values => {
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
          address: yup
            .string()
            .label('Address')
            .required(),
          date: yup
            .string()
            .label('Date')
            .required(),
          phoneNumber: yup
            .number()
            .label('Phone Number')
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
            {data.map(item => (
              <AppTextInput
                customStyles={{color: colors.black}}
                key={item.key.toString()}
                placeholder={item.placeholder}
                multiline={item.multiline}
                onBlur={() => setFieldTouched(item.name)}
                onFocus={() => validateForm()}
                onChangeText={handleChange(item.name)}
                touched={touched}
                name={item.name}
                errors={errors}
              />
            ))}
            <GooglePlacesAutocomplete
              placeholder="Search"
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log(data, details);
              }}
              onFail={error => console.error(error)}
              query={{
                key: 'AIzaSyDX2XCz_l5e5EXVhEWArkeLnwshJ4uvIaw',
                language: 'en',
              }}
            />
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
