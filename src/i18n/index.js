import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { getStorageItem } from 'tingme/utils/asyncStorage';

import en from './en.json';
import vi from './vi.json';

// creating a language detection plugin
const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: cb =>
    getStorageItem('setting').then(setting => {
      if (setting) {
        cb(setting.language);
      }
      cb('en');
    }),
  init: () => {},
  cacheUserLanguage: () => {}
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources: { en: en, vi: vi },
    ns: ['common'],
    defaultNS: 'common'
    // debug: true
    // cache: {
    //   enabled: true
    // }
  });

export default i18n;
