/**
 * @format
 */
import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import App from './App';
import {name as appName} from './app.json';
import QueryProvider from '@queryClient/index';
import {PushNotification} from '@containers/index';
import {persistor, store} from '@reduxStore/store';
import {getApp} from '@react-native-firebase/app';
import {getCrashlytics} from '@react-native-firebase/crashlytics';

// ✅ Set Global JS Error Handler
ErrorUtils.setGlobalHandler(error => {
  const app = getApp();
  const crashlytics = getCrashlytics(app);
  crashlytics.recordError(error); // Or just use: recordError(error, app);
});

class AppView extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryProvider>
            <App />
            <PushNotification />
          </QueryProvider>
        </PersistGate>
      </Provider>
    );
  }
}

AppRegistry.registerComponent(appName, () => AppView);
