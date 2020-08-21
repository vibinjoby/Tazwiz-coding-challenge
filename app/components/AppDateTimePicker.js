import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import colors from '../config/colors';
import moment from 'moment';
import AppErrorText from './AppErrorText';

export const AppDateTimePicker = ({touched, errors, name, onChangeText}) => {
  const [date, setDate] = useState(moment().format('MMMM Do YYYY'));
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setDate(moment(date).format('MMMM Do YYYY'));
    //update the onchange of formik
    onChangeText(moment(date).format('MMMM Do YYYY'));
    hideDatePicker();
  };

  return (
    <>
      <Text style={styles.textInput} onPress={showDatePicker}>
        {date}
      </Text>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      {touched[name] && errors[name] && (
        <AppErrorText> {errors[name]}</AppErrorText>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  textInput: {
    fontFamily: 'ProximaNova-Regular',
    color: colors.black,
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.white,
    padding: 15,
    fontSize: 16,
    marginTop: 10,
  },
});
