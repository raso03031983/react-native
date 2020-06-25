import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyC1pYwjwm3m-gxgD6USAGj8C8b6Uu5nq2E',
  authDomain: 'info-140a4.firebaseapp.com',
  databaseURL: 'https://info-140a4.firebaseio.com',
  projectId: 'info-140a4',
  storageBucket: 'info-140a4.appspot.com',
  messagingSenderId: '172373191128',
  appId: '1:172373191128:web:abeef23567140afd1daaad',
  measurementId: 'G-ML1Y3FNR8Q',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
