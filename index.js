/**
 * @format
 */


import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import { name as appName } from './app.json';
//FCM
import { registerFcmToken } from './fcm/index'


//fXdJVueUTFupnAn5ChoKyc:APA91bGYQnw0nQh3UtcQx4GSEl8oFgrHKWih0fOPXx8qRfG3QUa-mn9A2FrF0NDsW-DklqzPGNniYQRdLICupROLL5xebq-PxSXP198mnQh3oqmHKq8wJekN-fZcCUI1bpdYrbHRBXqA
registerFcmToken()


// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
});
AppRegistry.registerComponent(appName, () => App);