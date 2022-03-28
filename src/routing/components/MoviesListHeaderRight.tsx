import {StyleSheet, View} from 'react-native';
import React from 'react';
import SecureButton from './SecureButton';
import ExitButton from './ExitButton';

const MoviesListHeaderRight = () => {
  return (
    <View style={styles.container}>
      <SecureButton />
      <ExitButton />
    </View>
  );
};

export default MoviesListHeaderRight;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
