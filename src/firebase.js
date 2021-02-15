import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCJge75Qp_d9ATnyo0jkBksdyBAMDTkOdE",
  authDomain: "crud-b22d4.firebaseapp.com",
  projectId: "crud-b22d4",
  storageBucket: "crud-b22d4.appspot.com",
  messagingSenderId: "69365982998",
  appId: "1:69365982998:web:2fdbf63150f8f2833b1237"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);