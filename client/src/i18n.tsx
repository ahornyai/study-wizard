import i18n from "i18next"
import backend from "i18next-http-backend"
import languageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"
import { register } from "timeago.js"
import hu from "timeago.js/lib/lang/hu"

i18n
    .use(backend)
    .use(languageDetector)
    .use(initReactI18next)
    .init({
        supportedLngs: ["en", "hu"],
        fallbackLng: 'en',
        debug: process.env.NODE_ENV !== 'production',

        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ['navigator'],
        }
    }).then(() => {
        register("hu", hu)
    })

export default i18n