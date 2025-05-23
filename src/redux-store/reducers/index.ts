import {combineReducers} from '@reduxjs/toolkit';

import authSlice, {
  logout,
  setAuthentication,
  setToken,
  setUser,
  updateUser,
  setFCMToken,
} from './auth.slice';

import themeSlice, {setThemeType, toggleTheme} from './theme.slice';

export const rootReducer = combineReducers({
  theme: themeSlice,
  auth: authSlice,
});

// export { setTheme };

export {logout, setAuthentication, setToken, setUser, updateUser, setFCMToken};

export {setThemeType, toggleTheme};
