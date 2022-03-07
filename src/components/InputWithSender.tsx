import {StyleSheet, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import ButtonRounded from './ButtonRounded';

type PropsType = {
  loading?: boolean;
  onSend?: (value: string) => void;
};

const InputWithSender = (props: PropsType) => {
  const [value, setValue] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Type a message"
        style={styles.inputStyle}
        value={value}
        onChangeText={setValue}
      />
      <ButtonRounded
        containerStyle={styles.buttonStyle}
        onPress={() => props.onSend?.(value)}
        title="Send"
        loading={props.loading}
        disabled={!value}
      />
    </View>
  );
};

export default InputWithSender;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#dddddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  inputStyle: {
    width: '75%',
    paddingRight: 10,
  },
  buttonStyle: {
    width: '25%',
  },
});
