import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useBiometricAuth} from '../../store/biometric.auth';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faShield} from '@fortawesome/free-solid-svg-icons';
import ButtonRounded from '../../components/ButtonRounded';

const BiometricScreen = () => {
  const {init, biometricEnabled, disable} = useBiometricAuth();
  const onEnable = () => {
    init?.();
  };
  const onDisable = () => {
    disable?.();
  };
  const colorIcon = biometricEnabled ? '#67a9f4' : 'red';
  return (
    <View style={styles.container}>
      <FontAwesomeIcon icon={faShield} size={120} color={colorIcon} />
      <View>
        {!biometricEnabled ? (
          <ButtonRounded
            title={'Enable'}
            style={styles.button}
            onPress={onEnable}
          />
        ) : (
          <ButtonRounded
            title={'Disable'}
            style={styles.button}
            onPress={onDisable}
          />
        )}
      </View>
    </View>
  );
};

export default BiometricScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
});
