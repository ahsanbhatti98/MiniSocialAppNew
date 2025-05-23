import {NavigatorScreenParams} from '@react-navigation/native';
import {AuthRoutes, HomeRoutes} from '@src/constants/index';

type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  App: NavigatorScreenParams<AppStackParamList>;
};

type AuthStackParamList = {
  [K in keyof typeof AuthRoutes]: any | undefined;
};

type AppStackParamList = {
  [K in keyof typeof HomeRoutes]: any | undefined;
};

export type {RootStackParamList, AuthStackParamList, AppStackParamList};
