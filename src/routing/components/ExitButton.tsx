import {StyleSheet} from 'react-native';
import React from 'react';
import {Button, ButtonProps} from 'react-native-elements';
import {useUser} from '../../store/user.context';
import {useBiometricAuth} from '../../store/biometric.auth';

const ExitButton = (props?: ButtonProps) => {
  const {clearAccessToken} = useUser();
  const {disable} = useBiometricAuth();
  const logOut = () => {
    clearAccessToken?.();
    disable?.();
  };
  return (
    <Button
      {...props}
      buttonStyle={[styles.button, props?.style]}
      titleStyle={styles.titleStyle}
      title="EXIT"
      onPress={logOut}
    />
  );
};

export default ExitButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    marginRight: 10,
    color: 'black',
  },
  titleStyle: {
    fontSize: 12,
  },
});
