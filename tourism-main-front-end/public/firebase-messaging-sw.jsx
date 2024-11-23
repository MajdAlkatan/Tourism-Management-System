// public/firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js');

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
firebase.initializeApp(firebaseConfig);

// Retrieve Firebase Messaging object
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('Background Message received: ', payload);
  const { title, body, icon } = payload.notification;
  self.registration.showNotification(title, {
    body,
    icon,
  });
});
