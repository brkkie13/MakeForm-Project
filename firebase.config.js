import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'make-form-8c00e.firebaseapp.com',
  databaseURL: 'https://make-form-8c00e-default-rtdb.firebaseio.com',
  projectId: 'make-form-8c00e',
  storageBucket: 'make-form-8c00e.appspot.com',
  messagingSenderId: '1025605134976',
  appId: '1:1025605134976:web:2a7d352a5d3b5427041465',
  measurementId: 'G-3NDH99F6HB',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
