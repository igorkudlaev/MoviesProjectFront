import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MoviesListScreen from '../screens/movies/MoviesListScreen';
import MovieDescriptionScreen from '../screens/movies/MovieDescriptionScreen';
import MovieCommentsScreen from '../screens/movies/MovieCommentsScreen';
import BiometricScreen from '../screens/biometric/BiometricScreen';
import MoviesListHeaderRight from './components/MoviesListHeaderRight';

export type MoviesStackParamList = {
  MoviesList: undefined;
  MovieDescription: {movieId: number; title: string};
  MovieComments: {movieId: number};
  Biometric: undefined;
};

const Stack = createStackNavigator<MoviesStackParamList>();

const MoviesNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="MoviesList">
      <Stack.Screen
        name="MoviesList"
        component={MoviesListScreen}
        options={({}) => ({
          title: 'Movies',
          headerRight: () => <MoviesListHeaderRight />,
        })}
      />
      <Stack.Screen
        name="MovieDescription"
        component={MovieDescriptionScreen}
        options={({route}) => ({title: route.params.title})}
      />
      <Stack.Screen name="MovieComments" component={MovieCommentsScreen} />
      <Stack.Screen name="Biometric" component={BiometricScreen} />
    </Stack.Navigator>
  );
};

export default MoviesNavigator;
