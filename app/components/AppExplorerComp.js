import React from 'react';
import {StyleSheet, Text, Image, TouchableOpacity} from 'react-native';

export default function AppExplorerComp({name, email, uri}) {
  return (
    <TouchableOpacity style={styles.container}>
      <Image
        style={{width: 150, height: 150}}
        source={{
          uri,
        }}
      />
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'black',
    margin: 10,
  },
  name: {
    fontFamily: 'ProximaNova-Bold',
    fontSize: 20,
    textAlign: 'center',
  },
});
