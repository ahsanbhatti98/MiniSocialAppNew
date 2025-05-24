import '@i18n/i18n'; // 👈 make sure to import
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useEffect } from 'react';
import { Platform, StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import KeyboardManager from 'react-native-keyboard-manager';
import Purchases, { LOG_LEVEL } from 'react-native-purchases';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useNotificationPermissions, useTheme } from './src/hooks';
import { RootNavigator } from './src/navigation';

if (Platform.OS === 'ios') {
  KeyboardManager.setEnable(true);
}

// initializeApp(firebaseConfig);

const App: React.FC = () => {
  const {requestUserPermission} = useNotificationPermissions();
  const {AppTheme} = useTheme();
  React.useEffect(() => {
    GoogleSignin.configure();
    requestUserPermission();
  }, []);

  useEffect(() => {
    Purchases.setLogLevel(LOG_LEVEL.VERBOSE);

    if (Platform.OS === 'ios') {
      Purchases.configure({apiKey: '<revenuecat_project_apple_api_key>'});
    } else if (Platform.OS === 'android') {
      Purchases.configure({apiKey: '<revenuecat_project_google_api_key>'});
    }
  }, []);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <StatusBar barStyle="dark-content" backgroundColor={AppTheme.Primary} />
        <RootNavigator />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default App;
