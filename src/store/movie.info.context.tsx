import React, {Ref, useCallback, useContext, useRef, useState} from 'react';
import {CastDto} from '../api/movies/dto/cast.dto';
import useMoviesApi from '../api/movies/useMoviesApi';
import useRequest from '../api/useRequest';
import {MovieDescription} from '../types/movie/movie.description';

type MovieInfoContextType = {
  cast: CastDto;
  movie: MovieDescription | {};
  loading: boolean;
  getInfo: (movieId: number) => void;
};

const initialState: MovieInfoContextType = {
  cast: [],
  movie: {},
  loading: true,
  getInfo: () => {},
};

const MovieInfoContext = React.createContext(initialState);

export const useMovieInfoContext = () => useContext(MovieInfoContext);

const useInfo = (movieId: number) => {
  const movieIdRef = useRef(movieId);
  const [movie, setMovie] = useState<MovieDescription | {}>({});
  const [cast, setCast] = useState<CastDto>([]);
  const moviesApi = useMoviesApi();
  const {sendRequest: sendRequestDescription, loading: loadingDescription} =
    useRequest();
  const {sendRequest: sendRequestCast, loading: loadingCast} = useRequest();
  const getInfo = useCallback(
    (id: number) => {
      if (movieIdRef.current === id) {
        return;
      }
      sendRequestDescription(moviesApi.description(id)).then(res => {
        if (res) {
          setMovie(res.data);
        }
      });
      sendRequestCast(moviesApi.cast(id)).then(res => {
        if (res) {
          setCast(res.data);
        }
      });
      movieIdRef.current = id;
    },
    [movieId],
  );
  const loading = loadingDescription && loadingCast;
  return {movie, loading, getInfo, cast};
};

export const MovieInfoContextProvider = ({children}: any) => {
  const info = useInfo(0);
  return (
    <MovieInfoContext.Provider value={{...info}}>
      {children}
    </MovieInfoContext.Provider>
  );
};

export default MovieInfoContext;
