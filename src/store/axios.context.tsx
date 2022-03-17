import {API_URL} from '@env';
import React from 'react';
import axios, {AxiosInstance} from 'axios';
import {createContext, useContext} from 'react';
import {useUser} from './user.context';
import {LoginResponseDto} from '../api/auth/dto/login.response.dto';

type AxiosContextType = {
  axios: AxiosInstance;
};

const initialState: AxiosContextType = {
  axios: axios.create(),
};

const AxiosContext = createContext(initialState);

export const useAxios = () => useContext(AxiosContext);

export const AxiosContextProvider = ({children}: any) => {
  const {tokens, setTokens, clearAccessToken} = useUser();
  const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: 'Bearer ' + tokens.access_token,
      'Content-Type': 'application/json',
    },
  });
  let isRefreshing = false;
  let failedQueue: {
    resolve: (value: unknown) => void;
    reject: (value: unknown) => void;
  }[] = [];

  const processQueue = (error: any, token: null | string = null) => {
    failedQueue.forEach(prom => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });

    failedQueue = [];
  };

  axiosInstance.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      const originalRequest = error.config;
      if (
        !/auth/.test(error.config.url) &&
        error.response.status === 401 &&
        !originalRequest._retry
      ) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({resolve, reject});
          })
            .then(token => {
              originalRequest.headers.Authorization = 'Bearer ' + token;
              return axios(originalRequest);
            })
            .catch(err => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        return new Promise(function (resolve, reject) {
          axiosInstance
            .post<LoginResponseDto>('/auth/refresh', tokens)
            .then(({data}) => {
              axiosInstance.defaults.headers.common.Authorization =
                'Bearer ' + data.access_token;
              originalRequest.headers.Authorization =
                'Bearer ' + data.access_token;
              processQueue(null, data.access_token);
              setTokens?.(data);
              resolve(axios(originalRequest));
            })
            .catch(err => {
              processQueue(err, null);
              clearAccessToken?.();

              reject(err);
            })
            .then(() => {
              isRefreshing = false;
            });
        });
      }

      return Promise.reject(error);
    },
  );

  return (
    <AxiosContext.Provider
      value={{
        axios: axiosInstance,
      }}>
      {children}
    </AxiosContext.Provider>
  );
};
