import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Input} from 'react-native-elements';
import ButtonRounded from '../../components/ButtonRounded';
import useAuthApi from '../../api/auth/useAuthApi';
import {useUser} from '../../store/user.context';
import SignInGoogle from './components/SignInGoogle';
import {useMutation} from 'react-query';

const SignInScreen = () => {
  const authApi = useAuthApi();
  const {setTokens} = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const mutation = useMutation(
    (_: any) => authApi.login({username, password}),
    {
      onSuccess: data => {
        setTokens?.(data);
      },
    },
  );

  return (
    <View style={styles.backgroundStyle}>
      <View>
        <Text style={styles.inputTitle}>Username:</Text>
        <Input
          placeholder="Username"
          inputContainerStyle={styles.inputStyle}
          autoCompleteType={undefined}
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View>
        <Text style={styles.inputTitle}>Password:</Text>
        <Input
          placeholder="Password"
          inputContainerStyle={styles.inputStyle}
          secureTextEntry={true}
          autoCompleteType={undefined}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <ButtonRounded
        title="Sign In"
        containerStyle={styles.buttonStyle}
        loading={mutation.isLoading}
        onPress={mutation.mutate}
      />
      <SignInGoogle />
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  inputContainer: {},
  inputTitle: {
    paddingLeft: 10,
    fontSize: 20,
    color: '#333333',
    paddingBottom: 10,
  },
  inputStyle: {
    backgroundColor: '#dddddd',
    borderRadius: 5,
    paddingHorizontal: 15,
  },
  buttonStyle: {
    marginTop: 20,
  },
});
