import { useTranslation } from "react-i18next"
import Button from "../../elements/components/Button"

const ForgotPassword = () => {
    const { t } = useTranslation()

    return (
      <div className="pt-40 text-white space-y-4 container text-center">
        <div className="bg-gray-800 mx-auto lg:max-w-xs md:max-w-sm rounded-lg p-5 px-10 space-y-2">
          <h1 className="text-2xl font-bold mb-5">{ t("auth.reset-your-password") }</h1>

          <input type="text" 
            placeholder={ t("auth.username") }
            className="text-input w-full" />
            
          <input type="email" 
            placeholder={ t("auth.email") }
            className="text-input w-full" />

          <Button text={ t("auth.send") } size="sm" className="!mt-5" />
        </div>
      </div>
    )
}

export default ForgotPassword
