import {FlatList, StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {MovieDescription} from '../../types/movie/movie.description';
import MovieItem from '../../components/MovieItem';
import useMoviesApi from '../../api/movies/useMoviesApi';
import useRequest from '../../api/useRequest';
import MovieItemSceleton from '../../components/MovieItemSceleton';
import {useNavigation} from '@react-navigation/native';
import {MoviesStackParamList} from '../../routing/MoviesNavigator';
import {StackNavigationProp} from '@react-navigation/stack';

type MoviesListScreenNavigationProp = StackNavigationProp<
  MoviesStackParamList,
  'MoviesList'
>;

const MoviesListScreen = () => {
  const [movies, setMovies] = useState<MovieDescription[]>([]);
  const moviesApi = useMoviesApi();
  const {sendRequest, loading} = useRequest();
  const loadData = useCallback(() => {
    sendRequest(moviesApi.list()).then(res => {
      if (res) {
        setMovies(res.data);
      }
    });
  }, []);
  useEffect(() => {
    loadData();
  }, []);
  const navigation = useNavigation<MoviesListScreenNavigationProp>();
  const onPressMovie = (movieId: number, title: string) => {
    navigation.navigate('MovieDescription', {movieId, title});
  };

  return (
    <>
      {loading ? (
        <View style={styles.placeholderView}>
          {[...Array(5)].map((item, index) => (
            <MovieItemSceleton marginVertical={15} key={index} />
          ))}
        </View>
      ) : (
        <FlatList
          data={movies}
          refreshing={loading}
          onRefresh={loadData}
          renderItem={value => (
            <MovieItem
              movieDescription={value.item}
              key={value.item.id}
              onPress={() => onPressMovie(value.item.id, value.item.title)}
            />
          )}
        />
      )}
    </>
  );
};

export default MoviesListScreen;

const styles = StyleSheet.create({
  placeholderView: {
    padding: 10,
  },
});
