import {FCM_TOKEN_VAPID_KEY} from '@env';
import notifee, {AuthorizationStatus} from '@notifee/react-native';
import {
  getMessaging,
  getToken,
  isDeviceRegisteredForRemoteMessages,
  registerDeviceForRemoteMessages,
  requestPermission as requestFirebasePermission,
} from '@react-native-firebase/messaging';
import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {setFCMToken} from '../redux-store/reducers';

const useNotificationPermissions = () => {
  const dispatch = useDispatch();
  const messaging = getMessaging();

  const requestUserPermission = useCallback(async () => {
    // Request notification permission from Notifee (iOS)
    const permission = await notifee.requestPermission({
      sound: true,
      criticalAlert: true,
    });

    console.log('Notifee permission status:', permission);

    // Request Firebase messaging permission (modular way)
    const firebasePermission = await requestFirebasePermission(messaging);
    const enabled =
      firebasePermission === 1 || // AUTHORIZED
      firebasePermission === 2; // PROVISIONAL

    if (enabled) {
      console.log('Firebase authorization status:', firebasePermission);
      await getFCMToken();
      await checkNotificationPermission();
      await checkChannelPermission();
    } else {
      console.warn('Firebase messaging permission not granted');
    }
  }, [dispatch]);

  const getFCMToken = useCallback(async () => {
    try {
      const isRegistered = await isDeviceRegisteredForRemoteMessages(messaging);
      if (!isRegistered) {
        await registerDeviceForRemoteMessages(messaging);
      }

      const token = await getToken(messaging, {
        vapidKey: FCM_TOKEN_VAPID_KEY,
      });

      if (token) {
        console.log('New FCM Token:', token);
        dispatch(setFCMToken(token.toString()));
      } else {
        console.warn('No registration token available.');
      }
    } catch (err) {
      console.error('Error retrieving FCM token:', err);
    }
  }, [dispatch]);

  const checkChannelPermission = useCallback(async () => {
    const channel = await notifee.getChannel('com.bpl.workorder');
    console.log(
      channel?.blocked ? 'Channel is disabled' : 'Channel is enabled',
    );
  }, []);

  const checkNotificationPermission = useCallback(async () => {
    const settings = await notifee.getNotificationSettings();
    if (settings.authorizationStatus === AuthorizationStatus.AUTHORIZED) {
      console.log('Notification permissions authorized');
    } else if (settings.authorizationStatus === AuthorizationStatus.DENIED) {
      console.log('Notification permissions denied');
    }
  }, []);

  return {
    requestUserPermission,
    getFCMToken,
    checkNotificationPermission,
    checkChannelPermission,
  };
};

export {useNotificationPermissions};
