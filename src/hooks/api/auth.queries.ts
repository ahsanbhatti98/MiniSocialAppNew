import {TokenService} from '@src/utils';
import {useMutation} from '@tanstack/react-query';
import {useDispatch} from 'react-redux';
import {AuthApis} from '../../api/auth';
import {setAuthentication} from '../../redux-store/reducers';

export const useLogin = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: AuthApis.login,
    onSuccess: async (response: any) => {
      const serverResponse = response?.data;
      const token = serverResponse?.data?.access_token;
      const refreshToken = serverResponse?.data?.refresh_token;
      TokenService.saveTokens(token, refreshToken);
      // console.log('response00<<', serverResponse);
      // dispatch(setToken(token));
      // dispatch(setUser(serverResponse?.data as UserModel));
      dispatch(setAuthentication(true));
    },
    onError: (error: any) => {
      console.log(
        error?.response?.data?.error ||
          error?.response?.data?.message ||
          error?.response?.data?.msg ||
          error?.response?.error ||
          'Something went wrong. Please try again later.',
      );
    },
  });
};

export const useSignUp = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: AuthApis.signUp,
    onSuccess: async (response: any) => {
      const serverResponse = response?.data;
      // const token = serverResponse?.data?.token_api_user;
      console.log('response00<<', serverResponse);
      const token = serverResponse?.data?.access_token;
      const refreshToken = serverResponse?.data?.refresh_token;
      TokenService.saveTokens(token, refreshToken);

      // dispatch(setToken(token));
      // dispatch(setUser(serverResponse?.data as UserModel));
      dispatch(setAuthentication(true));
    },
    onError: (error: any) => {
      console.log(
        error?.response?.data?.error ||
          error?.response?.data?.message ||
          error?.response?.data?.msg ||
          error?.response?.error ||
          'Something went wrong. Please try again later.',
      );
    },
  });
};
