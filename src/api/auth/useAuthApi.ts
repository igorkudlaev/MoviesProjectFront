import {useAxiosInstance} from '../axios.instance';
import {GooogleAuthTokenDto} from './dto/google.auth.token.dto';
import {LoginResponseDto} from './dto/login.response.dto';
import {UserLoginDto} from './dto/user.login.dto';

export default () => {
  const axios = useAxiosInstance();
  return {
    login: async (user: UserLoginDto) => {
      const res = await axios.post<LoginResponseDto>('/auth/login', user);
      return res.data;
    },
    register: async (user: UserLoginDto) => {
      const res = await axios.post<LoginResponseDto>('/auth/register', user);
      return res.data;
    },
    googleAuth: async (token: GooogleAuthTokenDto) => {
      const res = await axios.post<LoginResponseDto>(
        '/auth/google/login',
        token,
      );
      return res.data;
    },
  };
};
