import {Alert, StyleSheet, View} from 'react-native';
import React from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {GOOGLE_CLIENT_ID} from '@env';
import {useUser} from '../../../store/user.context';
import {useMutation} from 'react-query';
import useAuthApi from '../../../api/auth/useAuthApi';
import ButtonRounded from '../../../components/ButtonRounded';

GoogleSignin.configure({
  webClientId: GOOGLE_CLIENT_ID,
});

const SignInGoogle = () => {
  const authApi = useAuthApi();
  const {setTokens} = useUser();
  const mutation = useMutation(authApi.googleAuth, {
    onSuccess: tokens => {
      setTokens?.(tokens);
    },
  });

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      mutation.mutate({
        token: userInfo.idToken || '',
      });
    } catch (error: any) {
      Alert.alert(error);
    }
  };

  return (
    <View style={styles.container}>
      <ButtonRounded
        loading={mutation.isLoading}
        onPress={signIn}
        title="Sign with Google"
      />
    </View>
  );
};

export default SignInGoogle;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
});
