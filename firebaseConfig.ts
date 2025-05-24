import {initializeApp} from '@react-native-firebase/app';
import {getAuth} from '@react-native-firebase/auth';
import {getFirestore} from '@react-native-firebase/firestore';

export const firebaseConfig = {
  apiKey: 'AIzaSyDfgy0ltjEHtD9IPYd0B-W9g9PFFl6hE1w',
  authDomain: 'minisocialapp-ba57f.firebaseapp.com',
  projectId: 'minisocialapp-ba57f',
  storageBucket: 'minisocialapp-ba57f.firebasestorage.app',
  messagingSenderId: '15887899635',
  appId: '1:15887899635:android:83dc3f7f6245d9ce7fd086',
};

const appFirebase = initializeApp(firebaseConfig);
export const auth = getAuth(appFirebase);
export const db = getFirestore(appFirebase);
