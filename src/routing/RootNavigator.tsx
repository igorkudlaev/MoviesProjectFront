import React from 'react';
import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthNavigator from './AuthNavigator';
import MoviesNavigator, {MoviesStackParamList} from './MoviesNavigator';
import {useUser} from '../store/user.context';

export type RootStackParamList = {
  Auth: undefined;
  Movies: NavigatorScreenParams<MoviesStackParamList>;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  const {
    tokens: {access_token},
  } = useUser();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={!access_token ? 'Auth' : 'Movies'}>
        {!access_token ? (
          <Stack.Screen
            name="Auth"
            component={AuthNavigator}
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Screen
            name="Movies"
            component={MoviesNavigator}
            options={{headerShown: false}}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
