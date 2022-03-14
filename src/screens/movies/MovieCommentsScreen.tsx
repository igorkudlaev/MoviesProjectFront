import {FlatList, StyleSheet} from 'react-native';
import React from 'react';
import CommentItem from '../../components/CommentItem';
import InputWithSender from '../../components/InputWithSender';
import {RouteProp, useRoute} from '@react-navigation/native';
import {MoviesStackParamList} from '../../routing/MoviesNavigator';
import useMoviesApi from '../../api/movies/useMoviesApi';
import {useMutation, useQuery} from 'react-query';

type MoviesListScreenRuteProp = RouteProp<
  MoviesStackParamList,
  'MovieDescription'
>;

const MovieCommentsScreen = () => {
  const {params} = useRoute<MoviesListScreenRuteProp>();
  const moviesApi = useMoviesApi();
  const commentsQuery = useQuery(['comments', params.movieId], () =>
    moviesApi.comments(params.movieId),
  );

  const commentsMutation = useMutation(
    (value: string) => moviesApi.addComment(params.movieId, value),
    {
      onSuccess: comment => {
        commentsQuery.data?.push(comment);
      },
    },
  );
  return (
    <>
      <FlatList
        style={style.container}
        data={commentsQuery.data}
        refreshing={commentsQuery.isLoading}
        onRefresh={commentsQuery.refetch}
        renderItem={value => <CommentItem>{value.item.message}</CommentItem>}
      />
      <InputWithSender
        onSend={commentsMutation.mutate}
        loading={commentsMutation.isLoading}
      />
    </>
  );
};

export default MovieCommentsScreen;

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    marginTop: 15,
  },
});
