import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import colors from '../config/colors';

export default function AppTextInput({onChangeText, ...otherProps}) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholderTextColor="#A2A2A2"
        style={styles.textInput}
        {...otherProps}
        autoCapitalize="none"
        onChangeText={text => onChangeText && onChangeText(text)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  textInput: {
    fontFamily: 'ProximaNova-Regular',
    color: colors.white,
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.black,
    padding: 15,
    fontSize: 16,
    marginTop: 10,
  },
});
