// src/firebase.jsx

import { useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyDFnw8fVUGZ1Y-vuO2UPCY4r7koy8Ik-H8",
  authDomain: "pingoway-ed8c0.firebaseapp.com",
  projectId: "pingoway-ed8c0",
  storageBucket: "pingoway-ed8c0.appspot.com",
  messagingSenderId: "526962051313",
  appId: "1:526962051313:web:dad84497f4eb9dc8bfc150",
  measurementId: "G-2M2Q2GGP0X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestPermissionAndGetToken = async () => {
  try {
    console.log('Requesting permission...');
    const token = await getToken(messaging, {
      vapidKey: 'BI00OZf2muuzp3OF8GsOk67qqGxVgvAktCSpJSHVRpjBEyWV8NWqDzP7_-siM9q7gT37-BiSQP7pJKR05l8dFio'
    });
    if (token) {
      console.log('FCM Token:', token);
      // Optionally send this token to your backend
    } else {
      console.log('No registration token available. Request permission to generate one.');
    }
  } catch (error) {
    console.error('An error occurred while retrieving the token:', error);
  }
};

export const useNotificationListener = (callback) => {
  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log('Message received in foreground: ', payload);
      callback(payload);
    });

    return () => {
      unsubscribe();
    };
  }, [callback]);
};
