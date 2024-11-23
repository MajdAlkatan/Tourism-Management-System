// src/hooks/useNotifications.jsx

import { useEffect } from 'react';
import { requestPermissionAndGetToken, useNotificationListener } from '../../firebase';

const useNotifications = () => {
  useEffect(() => {
    const initializeNotifications = async () => {
      await requestPermissionAndGetToken();
    };

    initializeNotifications();
  }, []);

  useNotificationListener((payload) => {
    const { title, body, icon } = payload.notification;

    if (Notification.permission === 'granted') {
      new Notification(title, {
        body,
        icon,
      });
    } else {
      console.log('Notification permission not granted.');
    }
  });
};

export default useNotifications;
