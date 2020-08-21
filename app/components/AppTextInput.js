import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import colors from '../config/colors';
import AppErrorText from './AppErrorText';

export default function AppTextInput({
  onChangeText,
  customStyles,
  touched,
  errors,
  name,
  onPress,
  value,
  ...otherProps
}) {
  return (
    <>
      <View style={[styles.container, customStyles]}>
        <TextInput
          placeholderTextColor="#A2A2A2"
          style={[styles.textInput, customStyles]}
          {...otherProps}
          autoCapitalize="none"
          onTouchStart={onPress}
          onChangeText={text => onChangeText && onChangeText(text)}
          value={value}
        />
      </View>
      {touched[name] && errors[name] && (
        <AppErrorText> {errors[name]}</AppErrorText>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
  textInput: {
    fontFamily: 'ProximaNova-Regular',
    color: colors.white,
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.white,
    padding: 15,
    fontSize: 16,
    marginTop: 10,
  },
});
