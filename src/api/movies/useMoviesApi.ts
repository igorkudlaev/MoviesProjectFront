import {useAxios} from '../../store/axios.context';
import {MovieDescription} from '../../types/movie/movie.description';
import {CastDto} from './dto/cast.dto';
import {Comment, CommentsDto} from './dto/comments.dto';

export default () => {
  const {axios} = useAxios();
  return {
    list: async () => {
      const res = await axios.get<MovieDescription[]>('/movies');
      return res.data;
    },
    description: async (movieId: number) => {
      const res = await axios.get<MovieDescription>(`/movies/${movieId}`);
      return res.data;
    },
    cast: async (movieId: number) => {
      const res = await axios.get<CastDto[]>(`movies/${movieId}/cast`);
      return res.data;
    },
    comments: async (movieId: number) => {
      const res = await axios.get<CommentsDto>(`movies/${movieId}/comments`);
      return res.data;
    },
    addComment: async (movieId: number, message: string) => {
      const res = await axios.post<Comment>(`/movies/${movieId}/comments`, {
        message,
      });
      return res.data;
    },
  };
};
