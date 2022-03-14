import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import ButtonRounded from '../../components/ButtonRounded';
import MovieItem from '../../components/MovieItem';
import {StackNavigationProp} from '@react-navigation/stack';
import {MoviesStackParamList} from '../../routing/MoviesNavigator';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import MovieItemSceleton from '../../components/MovieItemSceleton';
import useMoviesApi from '../../api/movies/useMoviesApi';
import {useQuery} from 'react-query';

type MoviesListScreenNavigationProp = StackNavigationProp<
  MoviesStackParamList,
  'MovieDescription'
>;
type MoviesListScreenRuteProp = RouteProp<
  MoviesStackParamList,
  'MovieDescription'
>;

const MovieDescriptionScreen = () => {
  const navigation = useNavigation<MoviesListScreenNavigationProp>();
  const {
    params: {movieId},
  } = useRoute<MoviesListScreenRuteProp>();
  const moviesApi = useMoviesApi();
  const moviesQuery = useQuery(['movies', movieId], () =>
    moviesApi.description(movieId),
  );
  const castQuery = useQuery(['cast', movieId], () => moviesApi.cast(movieId));
  const onNavigateComments = () => {
    navigation.navigate('MovieComments', {movieId: movieId});
  };

  return (
    <View>
      {moviesQuery.isLoading && castQuery.isLoading ? (
        <MovieItemSceleton />
      ) : (
        <>
          <MovieItem movieDescription={moviesQuery.data} disabled />
          <View style={styles.containerCastComments}>
            <View style={styles.castContainer}>
              <Text style={styles.castTitle}>Cast:</Text>
              <Text style={styles.castDescription}>
                {castQuery.data?.map(({name}) => name).join(', ')}
              </Text>
            </View>
            <ButtonRounded title="Show comments" onPress={onNavigateComments} />
          </View>
        </>
      )}
    </View>
  );
};

export default MovieDescriptionScreen;

const styles = StyleSheet.create({
  castContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  castTitle: {
    color: '#b9b9b9',
    fontSize: 16,
  },
  castDescription: {
    color: 'black',
    fontSize: 16,
  },
  containerCastComments: {
    paddingHorizontal: 10,
  },
});
