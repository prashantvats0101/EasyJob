import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from './en.json';
import hi from './hi.json';
import pb from './pb.json';

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: async (callback) => {
    try {
      const savedDataJSON = await AsyncStorage.getItem('user-language');
      const lng = savedDataJSON ? savedDataJSON : 'en';
      callback(lng);
    } catch (error) {
      console.error('Failed to fetch user language:', error);
      callback('en');
    }
  },
  init: () => {},
  cacheUserLanguage: async (lng) => {
    try {
      await AsyncStorage.setItem('user-language', lng);
    } catch (error) {
      console.error('Failed to save user language:', error);
    }
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources: {
      en: en,
      hi: hi,
      pb: pb,
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
