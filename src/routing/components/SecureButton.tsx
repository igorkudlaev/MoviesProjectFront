import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faShield} from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';

const SecureButton = () => {
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate('Biometric');
  }
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <FontAwesomeIcon icon={faShield} size={20} />
    </TouchableOpacity>
  );
};

export default SecureButton;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
});
