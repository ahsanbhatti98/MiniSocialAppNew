import {LoginBodyType, SignUpBodyType} from '../../models';
import {AxiosService} from '../https.service';
import Urls from './api.url';

const apiCall = AxiosService.getInstance();

const login = (body: LoginBodyType) => {
  return apiCall.post(Urls.login, body);
};

const signUp = (body: SignUpBodyType) => {
  return apiCall.post(Urls.signUp, body);
};

export const AuthApis = {
  login,
  signUp,
};
