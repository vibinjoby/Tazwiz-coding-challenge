import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import colors from '../config/colors';

export default function AppButton({title, customStyles, onPress, disabled}) {
  return !disabled ? (
    <TouchableOpacity
      style={[styles.enabledBtn, customStyles]}
      onPress={onPress}>
      <Text style={styles.enabledBtnTxt}>{title}</Text>
    </TouchableOpacity>
  ) : (
    <TouchableWithoutFeedback style={[styles.disabledBtn, customStyles]}>
      <Text style={styles.disabledTxt}>{title}</Text>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  enabledBtn: {
    backgroundColor: 'green',
    borderRadius: 25,
    marginBottom: 10,
    padding: 15,
  },
  disabledBtn: {
    backgroundColor: 'grey',
    borderRadius: 25,
    marginBottom: 10,
    padding: 15,
  },
  disabledTxt: {
    fontFamily: 'ProximaNova-Bold',
    textAlign: 'center',
    color: colors.white,
  },
  enabledBtnTxt: {
    fontFamily: 'ProximaNova-Bold',
    textAlign: 'center',
    color: colors.white,
  },
});
