import {MovieDescription} from '../../types/movie/movie.description';
import {useAxiosInstance} from '../axios.instance';
import {CastDto} from './dto/cast.dto';
import {Comment, CommentsDto} from './dto/comments.dto';

export default () => {
  const axios = useAxiosInstance();
  return {
    list: async () => {
      return axios.get<MovieDescription[]>('/movies-api/Movies');
    },
    description: async (movieId: number) => {
      return axios.get<MovieDescription>(`/movies-api/Movies/${movieId}/Info`);
    },
    cast: async (movieId: number) => {
      return axios.get<CastDto>(`/movies-api/Movies/${movieId}/Cast`);
    },
    comments: async (movieId: number) => {
      return axios.get<CommentsDto>(`/movies-api/Movies/${movieId}/Comments`);
    },
    addComment: async (movieId: number, message: string) => {
      return axios.post<Comment>(
        `/movies-api/Movies/${movieId}/Comments/Post`,
        {
          message,
        },
      );
    },
  };
};
