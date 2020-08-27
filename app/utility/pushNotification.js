import * as UserService from '../api/deviceTokenUpdate'
import * as Utility from './index';
import firebase from "react-native-firebase";
import { Alert } from 'react-native';

export const pushNotification = async () => {
  //we check if user has granted permission to receive push notifications.
  checkPermission();
  // Register all listener for notification 
  createNotificationListeners();
}

const checkPermission = async () => {
  const enabled = await firebase.messaging().hasPermission();
  // If Premission granted proceed towards token fetch
  if (enabled) {
    getToken();
  } else {
    // If permission hasn’t been granted to our app, request user in requestPermission method. 
    requestPermission();
  }
}

const getToken = async () => {
  let fcmToken = await Utility.getFromLocalStorge('fcmToken');
  console.log('getToken::fcmToken.............................................', fcmToken)
  if (!fcmToken) {
    fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      // user has a device token
      console.log('fcmToken', fcmToken)
      await UserService.updateDeviceToken(fcmToken)
      await Utility.setInLocalStorge('fcmToken', fcmToken);
    }
  }
}

const requestPermission = async () => {
  try {
    await firebase.messaging().requestPermission();
    // User has authorised
    getToken();
  } catch (error) {
    // User has rejected permissions
    console.log('permission rejected');
  }
}
const createNotificationListeners = async (handleNotification) => {
  // This listener triggered when notification has been received in foreground
  notificationListener = firebase
    .notifications()
    .onNotification(notification => {
      console.log('foreground app::....', notification)
      const {title, body} = notification;
      // displayNotification(title, body);
      notification.android.setChannelId('channelId');
      firebase.notifications().displayNotification(notification);
      // firebase.notifications().displayNotification(notification)
        
    });

  // This listener triggered when app is in backgound and we click, tapped and opened notifiaction
  notificationOpenedListener = firebase
    .notifications()
    .onNotificationOpened(notificationOpen => {
      const { title, body, data } = notificationOpen.notification;
      console.log('backgound app::', notificationOpen.notification)
      // handleNotification(data);
    });

  // This listener triggered when app is closed and we click,tapped and opened notification
  const notificationOpen = await firebase
    .notifications()
    .getInitialNotification();

  if (notificationOpen) {
    console.log('notificationOpen app::', notificationOpen.notification)
    const { title, body, data } = notificationOpen.notification;
    displayNotification(data.title, data.body);
  }
};

const displayNotification = async (title, body) => {
  Alert.alert(
    title,
    body,
    [{ text: 'Ok', onPress: () => console.log('ok pressed') }],
    { cancelable: false },
  );
};

  // const displayNotification= async (title, body) => {
  //   // we display notification in alert box with title and body
  //   alert(title)

  // }