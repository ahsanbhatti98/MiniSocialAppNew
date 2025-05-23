import notifee, {
  AndroidColor,
  AndroidImportance,
  EventType,
} from '@notifee/react-native';
import {getApp} from '@react-native-firebase/app';
import {
  getInitialNotification,
  getMessaging,
  onMessage,
  onNotificationOpenedApp,
  setBackgroundMessageHandler,
} from '@react-native-firebase/messaging';
import React, {useEffect} from 'react';
import {useTheme} from '../../hooks';

export const PushNotification: React.FC = () => {
  const {AppTheme} = useTheme();

  useEffect(() => {
    const app = getApp();
    const messaging = getMessaging(app);

    const unsubscribeOnMessage = onMessage(messaging, async remoteMessage => {
      console.log('remoteMessage', JSON.stringify(remoteMessage));
      showNotification(remoteMessage.notification);
    });

    setBackgroundMessageHandler(messaging, async remoteMessage => {
      console.log('remoteMessage->====>', JSON.stringify(remoteMessage));
      await notifee.incrementBadgeCount();
    });

    const unsubscribeOnNotificationOpenedApp = onNotificationOpenedApp(
      messaging,
      remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          JSON.stringify(remoteMessage),
        );
        handleNotificationInteraction(remoteMessage);
      },
    );
    unsubscribeOnNotificationOpenedApp();

    getInitialNotification(messaging).then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          JSON.stringify(remoteMessage),
        );
        handleNotificationInteraction(remoteMessage);
      }
    });

    const unsubscribeOnForeground = notifee.onForegroundEvent(({detail}) => {
      console.log(
        'Notification displayed in the foreground:',
        JSON.stringify(detail.notification),
      );
    });

    notifee.onBackgroundEvent(async ({type, detail}) => {
      console.log('Notification displayed in the background:');

      if (type === EventType.DELIVERED) {
        console.log(
          'Notification delivered:',
          JSON.stringify(detail.notification),
        );
        await notifee.incrementBadgeCount();
      }

      if (
        type === EventType.ACTION_PRESS &&
        detail.pressAction?.id === 'mark-as-read'
      ) {
        await notifee.cancelAllNotifications();
      }
    });

    return () => {
      unsubscribeOnMessage();
      unsubscribeOnNotificationOpenedApp();
      unsubscribeOnForeground();
    };
  }, []);

  const showNotification = async (notification: any) => {
    const channelId = await notifee.createChannel({
      id: 'com.boilerplate',
      name: 'com.boilerplate',
      description: 'A channel to categorize your notifications',
      sound: 'default',
      importance: AndroidImportance.HIGH,
      vibration: true,
      vibrationPattern: [300, 500],
      lights: true,
      lightColor: AndroidColor.NAVY,
    });

    // const myNotification = {
    //   title: notification.title || 'Alert',
    //   body: notification.body || 'Notification',
    //   android: {
    //     channelId,
    //     importance: AndroidImportance.HIGH,
    //     pressAction: {
    //       id: 'default',
    //     },
    //     color: AppTheme.Primary,
    //     sound: 'default',
    //   },
    //   ios: {
    //     sound: 'default',
    //     interruptionLevel: IOSNotificationInterruptionLevel.,
    //     critical: true,
    //     criticalVolume: 1,
    //     foregroundPresentationOptions: {
    //       badge: true,
    //       sound: true,
    //       banner: true,
    //       list: true,
    //     },
    //   },
    // };

    await notifee.displayNotification({
      title: notification.title || 'Alert',
      body: notification.body || 'Notification',
      android: {
        channelId,
        importance: AndroidImportance.HIGH,
        pressAction: {
          id: 'default',
        },
        color: AppTheme.Primary,
        sound: 'default',
      },
      ios: {
        sound: 'default',
        interruptionLevel: 'critical',
        critical: true,
        criticalVolume: 1,
        foregroundPresentationOptions: {
          badge: true,
          sound: true,
          banner: true,
          list: true,
        },
      },
    });
    await notifee.incrementBadgeCount();
  };

  const handleNotificationInteraction = (notification: any) => {
    console.log(
      'User interacted with the notification:',
      JSON.stringify(notification),
    );
    // your navigation or interaction logic
  };

  return null;
};
