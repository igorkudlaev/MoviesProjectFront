import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faLock} from '@fortawesome/free-solid-svg-icons';

const LockScreen = () => {
  return (
    <View style={styles.container}>
      <FontAwesomeIcon icon={faLock} size={100} />
    </View>
  );
};

export default LockScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});
