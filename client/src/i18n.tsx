import i18n from "i18next"
import backend from "i18next-http-backend"
import languageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"

i18n
    .use(backend)
    .use(languageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        debug: true,

        interpolation: {
            escapeValue: false,
        },
        react: { //todo: replace this with proper loading screen
            useSuspense: false
        }
    })

export default i18n