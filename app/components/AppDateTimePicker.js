import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Platform} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import colors from '../config/colors';
import moment from 'moment';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

export const AppDateTimePicker = () => {
  const [date, setDate] = useState(moment().format('MMMM Do YYYY'));
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    console.log('came here');
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setDate(moment(date).format('MMMM Do YYYY'));
    hideDatePicker();
  };

  return (
    <>
      <TextInput
        placeholderTextColor="#A2A2A2"
        style={styles.textInput}
        onTouchStart={showDatePicker}
        editable={false}
        placeholder="Date"
        value={date}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
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
