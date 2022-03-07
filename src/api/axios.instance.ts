import axios from 'axios';
import {API_URL} from '@env';
import {useUser} from '../store/user.context';
import {Alert} from 'react-native';

const useAxiosInstance = () => {
  const {accessToken, clearAccessToken} = useUser();
  const instance = axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
    },
  });
  instance.interceptors.response.use(
    response => response,
    async error => {
      Alert.alert(error.response.data.errorMessage);
      clearAccessToken?.();
      return Promise.reject(error);
    },
  );
  return instance;
};

export {useAxiosInstance};
