import {useAxiosInstance} from '../axios.instance';
import {LoginResponseDto} from './dto/login.response.dto';
import {UserLoginDto} from './dto/user.login.dto';

export default () => {
  const axios = useAxiosInstance();
  return {
    login: async (user: UserLoginDto) => {
      return axios.post<LoginResponseDto>('movies-api/Login', {
        ...user,
        grant_type: 'password',
      });
    },
  };
};
