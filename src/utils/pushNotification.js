import PushNotification from 'react-native-push-notification';

export default (callback) =>
  new Promise((resolve) => {
    PushNotification.configure({
      onRegister: function (token) {
        // console.log('TOKEN:', token);
        resolve(token);
      },
      onNotification: function (notification) {
        // console.log('NOTIFICATION:', notification);
        if (callback) {
          callback(notification);
        }
        // notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      senderID: '483477530790',
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },
      popInitialNotification: true,
      requestPermissions: true
    });
  });
