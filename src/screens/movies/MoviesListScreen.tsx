import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import MovieItem from '../../components/MovieItem';
import useMoviesApi from '../../api/movies/useMoviesApi';
import MovieItemSceleton from '../../components/MovieItemSceleton';
import {useNavigation} from '@react-navigation/native';
import {MoviesStackParamList} from '../../routing/MoviesNavigator';
import {StackNavigationProp} from '@react-navigation/stack';
import {useQuery} from 'react-query';

type MoviesListScreenNavigationProp = StackNavigationProp<
  MoviesStackParamList,
  'MoviesList'
>;

const MoviesListScreen = () => {
  const moviesApi = useMoviesApi();
  const query = useQuery(['movies'], moviesApi.list);
  const navigation = useNavigation<MoviesListScreenNavigationProp>();
  const onPressMovie = (movieId: number, title: string) => {
    navigation.navigate('MovieDescription', {movieId, title});
  };

  return (
    <>
      {query.isLoading ? (
        <View style={styles.placeholderView}>
          {[...Array(5)].map((item, index) => (
            <MovieItemSceleton marginVertical={15} key={index} />
          ))}
        </View>
      ) : (
        <FlatList
          data={query.data}
          refreshing={query.isLoading}
          onRefresh={query.refetch}
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
