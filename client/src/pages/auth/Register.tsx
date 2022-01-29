import axios from "axios"
import { useContext, useRef } from "react"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import { UserContext } from "../../contexts/UserContext"

import Button from "../../elements/components/Button"

const Register = () => {
  const navigate = useNavigate()
  const form = useRef<HTMLFormElement>(null)
  const username = useRef<HTMLInputElement>(null)
  const email = useRef<HTMLInputElement>(null)
  const password = useRef<HTMLInputElement>(null)
  const passwordAgain = useRef<HTMLInputElement>(null)
  const { t } = useTranslation()
  const { user } = useContext(UserContext)
  const { executeRecaptcha } = useGoogleReCaptcha()

  if (user.loggedIn) {
    navigate("/")
  }

  const handleRegister = async () => {
    if (!form.current?.checkValidity()) {
      return
    }

    if (password.current?.value !== passwordAgain.current?.value) {
      toast(t("auth.errors.passwords-dont-match"), { type: "error", theme: "dark" });
      return
    }

    if (!executeRecaptcha) {
      toast.error(t("errors.captcha-failed"))
      return;
    }

    const captchaToken = await executeRecaptcha("login")

    axios.post("/api/auth/register", {
      username: username.current?.value,
      email: email.current?.value,
      password: password.current?.value,
      passwordAgain: passwordAgain.current?.value,
      captchaToken
    }).catch(err => {
      if (err.response?.data?.error) {
        toast(t("errors." + err.response.data.error), { type: "error", theme: "dark" })
      }
    }).then(res => {
      if (res?.data?.success) {
        navigate("/login")
      }
    });
  }

  return (
    <div className="pt-40 text-white container space-y-4 text-center">
      <ToastContainer className="lg:mt-20 mt-5" theme="dark" />

      <form ref={form} onSubmit={(e) => e.preventDefault()} className="bg-gray-800 mx-auto lg:max-w-xs md:max-w-sm rounded-lg p-5 px-10 space-y-2 !mb-4">
        <h1 className={"text-2xl font-bold mb-5"}>{t("auth.register")}</h1>

        <input type="text"
          placeholder={t("auth.username")}
          className="text-input w-full"
          required
          ref={username} />

        <input type="email"
          placeholder={t("auth.email")}
          className="text-input w-full"
          required
          ref={email} />

        <input type="password"
          placeholder={t("auth.password")}
          className="text-input w-full"
          required
          ref={password} />

        <input type="password"
          placeholder={t("auth.password-again")}
          className="text-input w-full"
          required
          ref={passwordAgain} />

        <Button submit={true} text={t("auth.register")} size="sm" onClick={handleRegister} className="!mt-5" />
      </form>

      <span className="cursor-pointer select-none text-gray-100 hover:text-blue-400" onClick={() => navigate("/forgot")}>{t("auth.forgot-password-question")}</span>
    </div>
  )
}

export default Register
