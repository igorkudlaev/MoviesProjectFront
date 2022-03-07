import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MoviesListScreen from '../screens/movies/MoviesListScreen';
import MovieDescriptionScreen from '../screens/movies/MovieDescriptionScreen';
import MovieCommentsScreen from '../screens/movies/MovieCommentsScreen';
import ExitButton from '../components/ExitButton';

export type MoviesStackParamList = {
  MoviesList: undefined;
  MovieDescription: {movieId: number; title: string};
  MovieComments: {movieId: number};
};

const Stack = createStackNavigator<MoviesStackParamList>();

const MoviesNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="MoviesList">
      <Stack.Screen
        name="MoviesList"
        component={MoviesListScreen}
        options={({}) => ({title: 'Movies', headerRight: () => <ExitButton />})}
      />
      <Stack.Screen
        name="MovieDescription"
        component={MovieDescriptionScreen}
        options={({route}) => ({title: route.params.title})}
      />
      <Stack.Screen name="MovieComments" component={MovieCommentsScreen} />
    </Stack.Navigator>
  );
};

export default MoviesNavigator;
