import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-xhr-backend'

const DEBUG = false

i18n
  // load translation using xhr -> see /public/locales
  // learn more: https://github.com/i18next/i18next-xhr-backend
  .use(Backend)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: DEBUG && process.env.NODE_ENV !== 'production',

    lng: 'en',
    fallbackLng: 'en',

    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
  })
