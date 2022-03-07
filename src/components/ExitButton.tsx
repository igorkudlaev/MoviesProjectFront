import {StyleSheet} from 'react-native';
import React from 'react';
import {Button, ButtonProps} from 'react-native-elements';
import {useUser} from '../store/user.context';

const ExitButton = (props?: ButtonProps) => {
  const {clearAccessToken} = useUser();
  const logOut = () => {
    clearAccessToken?.();
  };
  return (
    <Button
      {...props}
      buttonStyle={[styles.button, props?.style]}
      title="EXIT"
      onPress={logOut}
    />
  );
};

export default ExitButton;

const styles = StyleSheet.create({
  button: {
    fontSize: 14,
    paddingVertical: 12,
    color: 'black',
  },
});
