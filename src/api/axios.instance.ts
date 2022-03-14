import axios from 'axios';
import {API_URL} from '@env';
import {useUser} from '../store/user.context';
import {Alert} from 'react-native';
import {LoginResponseDto} from './auth/dto/login.response.dto';

const useAxiosInstance = () => {
  const {tokens, setTokens, clearAccessToken} = useUser();
  const instance = axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: 'Bearer ' + tokens.access_token,
      'Content-Type': 'application/json',
    },
  });
  instance.interceptors.response.use(
    response => response,
    async error => {
      const config = error.config;
      if (
        !/auth/.test(config.url) &&
        error?.response?.status === 401 &&
        !config._retry
      ) {
        error._retry = true;
        try {
          const res = await axios.post<LoginResponseDto>(
            '/auth/register',
            tokens,
          );
          const newTokens = res.data;
          setTokens?.(newTokens);
          config.headers.Authorization = 'Bearer ' + newTokens.access_token;
          return instance(config);
        } catch (err) {
          clearAccessToken?.();
          return Promise.reject(err);
        }
      }
      Alert.alert(error.response.data.errorMessage);
      return Promise.reject(error);
    },
  );
  return instance;
};

export {useAxiosInstance};
