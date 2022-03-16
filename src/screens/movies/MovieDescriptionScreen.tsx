import {View, Text, StyleSheet, Linking} from 'react-native';
import React from 'react';
import ButtonRounded from '../../components/ButtonRounded';
import MovieItem from '../../components/MovieItem';
import {StackNavigationProp} from '@react-navigation/stack';
import {MoviesStackParamList} from '../../routing/MoviesNavigator';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import MovieItemSceleton from '../../components/MovieItemSceleton';
import useMoviesApi from '../../api/movies/useMoviesApi';
import {useQuery} from 'react-query';
import {FlatList} from 'react-native-gesture-handler';
import TrailerPreview from './components/TrailerPreview';

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

  const trailersQuery = useQuery(['trailers', movieId], () =>
    moviesApi.trailers(movieId),
  );

  const onNavigateTrailer = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View>
      {moviesQuery.isLoading && castQuery.isLoading ? (
        <View style={styles.containerWithPaddings}>
          <MovieItemSceleton />
        </View>
      ) : (
        <>
          <MovieItem movieDescription={moviesQuery.data} disabled />
          <View style={styles.containerWithPaddings}>
            <View style={styles.castContainer}>
              <Text style={styles.title}>Cast:</Text>
              <Text style={styles.castDescription}>
                {castQuery.data?.map(({name}) => name).join(', ')}
              </Text>
            </View>
          </View>
          <View style={styles.containerWithPaddings}>
            <Text style={styles.title}>Trailers:</Text>
          </View>
          <FlatList
            data={trailersQuery.data}
            renderItem={info => (
              <TrailerPreview
                uri={info.item.preview}
                onPress={() => onNavigateTrailer(info.item.url)}
              />
            )}
            style={styles.trailersContainer}
            horizontal={true}
          />
          <View style={styles.containerWithPaddings}>
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
  title: {
    color: '#b9b9b9',
    fontSize: 16,
  },
  castDescription: {
    color: 'black',
    fontSize: 16,
  },
  containerWithPaddings: {
    paddingHorizontal: 10,
  },
  trailersContainer: {
    marginBottom: 10,
    paddingVertical: 10,
  },
});
