import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import russianResourceBundle from '~/locales/ru/translation.json'
import serbianResourceBundle from '~/locales/rs/translation.json'
import env from '~/env'
import { Languages } from '~/Constants'


i18n
  .use(initReactI18next)
  .init({
    fallbackLng: Languages.gb.id.toLowerCase(),
    lng: env.lan.id,
    debug: false,
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    },
    keySeparator: false,
    saveMissing: true,
    resources: {},
    react: {
      wait: false
    }
  })

i18n.addResourceBundle('ru', 'translation', russianResourceBundle, true, true)
i18n.addResourceBundle('rs', 'translation', serbianResourceBundle, true, true)


export default i18n