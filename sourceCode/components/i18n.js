/* eslint-disable prettier/prettier */
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from '../language/en.json';
import hi from '../language/hi.json';
import pb from '../language/pb.json';

i18n.use(initReactI18next).init({
  lng: 'en',
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
