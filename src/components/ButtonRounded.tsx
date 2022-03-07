import {StyleSheet} from 'react-native';
import React from 'react';
import {Button, ButtonProps} from 'react-native-elements';

const ButtonRounded = (props?: ButtonProps) => {
  return <Button {...props} buttonStyle={[styles.button, props?.style]} />;
};

export default ButtonRounded;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#333333',
    fontSize: 14,
    paddingVertical: 12,
    borderRadius: 50,
  },
});
