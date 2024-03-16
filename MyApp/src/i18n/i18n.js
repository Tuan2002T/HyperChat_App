// src/i18n/i18n.js
import 'intl-pluralrules'; //Quan trọng không được xoá
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import enTranslation from './translations/en.json';
import viTranslation from './translations/vi.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      vi: { translation: viTranslation },
    },
    lng: 'en', // Ngôn ngữ mặc định nếu không tìm thấy trong AsyncStorage
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

// Đọc ngôn ngữ từ AsyncStorage và thiết lập cho i18n
AsyncStorage.getItem('language').then((lang) => {
  if (lang) {
    i18n.changeLanguage(lang);
  }
});

export default i18n;


