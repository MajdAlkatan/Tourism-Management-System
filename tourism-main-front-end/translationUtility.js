// src/translationUtils.js
import { useContext } from 'react';
import { LanguageContext } from './src/LanguageContext'; // Adjust the path if necessary
import { translations } from './translations'; // Import translations

export const useTranslation = () => {
  const { language } = useContext(LanguageContext);

  const t = (key) => {
    const keys = key.split('.');
    let translation = translations[language];

    keys.forEach(k => {
      translation = translation ? translation[k] : '';
    });

    return translation || key; // Return the key if translation not found
  };

  return { t };
};
