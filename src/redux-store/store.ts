import {configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore, Storage} from 'redux-persist';
import {MMKV} from 'react-native-mmkv';
import {rootReducer} from './reducers';

export const storage = new MMKV();

export const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    storage.delete(key);
    return Promise.resolve();
  },
};

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  whitelist: ['auth'],
  // whitelist: ['auth', 'dropdownData'],
  //   whitelist: ["theme", "auth",],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = (getDefaultMiddleware: any) =>
  getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  });

export const store = configureStore({
  reducer: persistedReducer,
  middleware: middlewares,
});

export const persistor = persistStore(store);
