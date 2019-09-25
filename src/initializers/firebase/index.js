import Firebase from 'firebase/app';

const config = {
  apiKey: 'AIzaSyAbog8thHCc_2lhPwHcP050Hugi97uYo1o',
  authDomain: 'rainbarrel-dev.firebaseapp.com',
  databaseURL: 'https://rainbarrel-dev.firebaseio.com',
  projectId: 'rainbarrel-dev',
  storageBucket: 'rainbarrel-dev.appspot.com',
  messagingSenderId: '9213028884'
};

const initFirebase = () => {
  Firebase.initializeApp(config);
};

export default initFirebase;
