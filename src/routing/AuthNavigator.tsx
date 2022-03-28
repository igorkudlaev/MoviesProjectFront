import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignInScreen from '../screens/auth/SignInScreen';

const Stack = createStackNavigator();

export type MoviesStackParamList = {
  LogIn: undefined;
  Biometric: undefined;
};

const AuthNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="LogIn">
      <Stack.Screen
        name="LogIn"
        component={SignInScreen}
        options={{title: 'Log In'}}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
