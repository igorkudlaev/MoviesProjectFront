import {FlatList, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import CommentItem from '../../components/CommentItem';
import InputWithSender from '../../components/InputWithSender';
import {RouteProp, useRoute} from '@react-navigation/native';
import {MoviesStackParamList} from '../../routing/MoviesNavigator';
import useMoviesApi from '../../api/movies/useMoviesApi';
import useRequest from '../../api/useRequest';
import {CommentsDto} from '../../api/movies/dto/comments.dto';

type MoviesListScreenRuteProp = RouteProp<
  MoviesStackParamList,
  'MovieDescription'
>;

const MovieCommentsScreen = () => {
  const [comments, setComments] = useState<CommentsDto>([]);
  const {params} = useRoute<MoviesListScreenRuteProp>();
  const moviesApi = useMoviesApi();
  const {sendRequest: sendRequestMessages, loading: loadingMessages} =
    useRequest();
  const {sendRequest: sendRequestNewMessage, loading: loadingNewMessage} =
    useRequest();
  const loadData = useCallback(() => {
    sendRequestMessages(moviesApi.comments(params.movieId)).then(res => {
      if (res) {
        setComments(res.data);
      }
    });
  }, [moviesApi, params.movieId, sendRequestMessages]);
  useEffect(() => {
    loadData();
  }, []);
  const onSendMessage = async (message: string) => {
    sendRequestNewMessage(moviesApi.addComment(params.movieId, message)).then(
      res => {
        if (res) {
          setComments([res.data, ...comments]);
        }
      },
    );
  };

  return (
    <>
      <FlatList
        style={style.container}
        data={comments}
        refreshing={loadingMessages}
        onRefresh={loadData}
        renderItem={value => <CommentItem>{value.item.message}</CommentItem>}
      />
      <InputWithSender onSend={onSendMessage} loading={loadingNewMessage} />
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
