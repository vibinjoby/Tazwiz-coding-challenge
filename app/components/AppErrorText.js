import React from 'react';
import {StyleSheet, Text} from 'react-native';

export default function AppErrorText({children}) {
  return <Text style={styles.text}>{children}</Text>;
}
const styles = StyleSheet.create({
  text: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 12,
    color: 'red',
    marginBottom: 5,
  },
});
