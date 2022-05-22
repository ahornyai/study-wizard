import axios from "axios"
import { useContext, useRef } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { Slide, toast, ToastContainer } from "react-toastify"
import { User, UserContext } from "../../contexts/UserContext"
import Button from "../../elements/components/Button"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"

const Login = () => {
  const navigate = useNavigate()
  const username = useRef<HTMLInputElement>(null)
  const password = useRef<HTMLInputElement>(null)
  const { t } = useTranslation()
  const { setUser } = useContext(UserContext)
  const { executeRecaptcha } = useGoogleReCaptcha()

  const handleLogin = async () => {
    if (!username.current?.value || !password.current?.value) {
      return
    }

    if (!executeRecaptcha) {
      toast.error(t("errors.captcha-failed"))
      return;
    }

    const captchaToken = await executeRecaptcha("login")

    axios.post("/api/auth/login", {
      username: username.current.value,
      password: password.current.value,
      captchaToken
    }).catch(err => {
      if (err.response?.data?.error) {
        toast.error(t("errors." + err.response.data.error))
      }
    }).then(res => {
      if (res?.data.user) {
        const user = res.data.user

        setUser(new User(user.id, user.username, true))
        navigate("/notes")
      }
    });
  }

  return (
    <div className="pt-40 text-white space-y-4 container text-center">
      <ToastContainer className="lg:mt-20 mt-5" theme="dark" transition={Slide} />

      <div className="bg-gray-800 mx-auto lg:max-w-xs md:max-w-sm rounded-lg p-5 px-10 space-y-2 !mb-4">
        <h1 className="text-2xl font-bold mb-5">{t("auth.login")}</h1>

        <input type="text"
          placeholder={t("auth.username")}
          className="text-input w-full"
          ref={username} />

        <input type="password"
          placeholder={t("auth.password")}
          className="text-input w-full"
          ref={password} />

        <Button onClick={handleLogin} text={t("auth.login")} size="sm" className="!mt-5" />
      </div>

      <span className="cursor-pointer select-none text-gray-100 hover:text-blue-400" onClick={() => navigate("/forgot")}>{t("auth.forgot-password-question")}</span>
    </div>
  )
}

export default Login
