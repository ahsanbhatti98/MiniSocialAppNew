import axios, {
  AxiosInstance,
  // AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import {API_TIMEOUT, BASE_PATH, BASE_URL} from './config';
import {setAuthentication} from '@reduxStore/reducers';
import {store} from '@reduxStore/store';
import {Toast, TokenService} from '@utils/index';
import AuthUrls from './auth/api.url';

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

export class AxiosService {
  private static instance: AxiosInstance;

  static getInstance(contentType: string = 'application/json'): AxiosInstance {
    if (!AxiosService.instance) {
      AxiosService.instance = axios.create({
        baseURL: `${BASE_URL}${BASE_PATH}`,
        timeout: API_TIMEOUT,
        headers: {
          'Content-Type': contentType,
        },
      });

      // Request Interceptor
      AxiosService.instance.interceptors.request.use(
        async (config: InternalAxiosRequestConfig) => {
          const tokens = await TokenService.getTokens();
          const token = tokens?.accessToken;
          // const token = store.getState().auth.token;

          if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
          }

          console.log('Request URL:', config.url);
          console.log('Request token:', token);
          console.log('Request Refresh:', tokens?.refreshToken);

          return config;
        },
        error => {
          console.error('Request Error:', error, error?.response?.data);
          Toast.fail(
            error?.response?.data?.error ||
              error?.response?.data?.message ||
              error?.response?.data?.msg ||
              error?.response?.error ||
              'Something went wrong. Please try again later.',
          );
          return Promise.reject(error);
        },
      );

      // Response Interceptor
      AxiosService.instance.interceptors.response.use(
        (response: AxiosResponse) => {
          return response;
        },
        async error => {
          const originalRequest = error.config;

          console.error('Response Error:', error, error?.response?.data);

          if (error.response) {
            const {status, data} = error.response;
            if (
              error.response?.status === 401 &&
              !originalRequest._retry &&
              !originalRequest.url.includes(AuthUrls.getRefreshToken)
            ) {
              originalRequest._retry = true;

              if (isRefreshing) {
                return new Promise((resolve, reject) => {
                  failedQueue.push({resolve, reject});
                })
                  .then(token => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return AxiosService.instance(originalRequest);
                  })
                  .catch(err => Promise.reject(err));
              }

              isRefreshing = true;

              try {
                const tokens = await TokenService.getTokens();
                const refreshResponse = await axios.post(
                  `${BASE_URL}${BASE_PATH}${AuthUrls.getRefreshToken}`,
                  {},
                  {
                    headers: {
                      Cookie: `refresh_token=${tokens?.refreshToken}`,
                      Accept: 'application/json',
                    },
                    withCredentials: true, // optional based on backend
                  },
                );
                console.log('refreshResponse', refreshResponse);

                const newAccessToken = refreshResponse?.data?.accessToken;
                const newRefreshToken = refreshResponse?.data?.refreshToken;

                if (newAccessToken && newRefreshToken) {
                  await TokenService.saveTokens(
                    newAccessToken,
                    newRefreshToken,
                  );

                  processQueue(null, newAccessToken);

                  originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                  return AxiosService.instance(originalRequest);
                }

                throw new Error('Invalid refresh token response');
              } catch (err) {
                console.log('Error refreshing token:', err);
                processQueue(err, null);
                await TokenService.clearTokens();
                store.dispatch(setAuthentication(false));
                Toast.fail('Session expired. Please log in again.');
                return Promise.reject(err);
              } finally {
                isRefreshing = false;
              }
            } else if (status === 401) {
              console.log('401 error');
              await TokenService.clearTokens();
              store.dispatch(setAuthentication(false));

              Toast.fail('Session expired. Please log in again.');
            } else if (status === 409) {
              Toast.fail(data?.message || 'Conflict error occurred.');
            } else if (status === 404 || status === 400) {
              Toast.fail(data?.message || 'Resource not found.');
            } else {
              Toast.fail(
                data?.error ||
                  data?.message ||
                  data?.msg ||
                  'Something went wrong. Please try again later.',
              );
            }
          } else {
            console.error('Error setting up the request:', error.message);
            Toast.fail('Network error. Please check your connection.');
          }

          return Promise.reject(error);
        },
      );
    }

    return AxiosService.instance;
  }
}
