import { useContext } from "react"
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"
import { Navigate } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"

interface UserContextRouteProps {
  children: React.ReactComponentElement<any>
  redirectWhenAuthenticated?: boolean
  captcha?: boolean
}

const UserContextRoute = ({ children, redirectWhenAuthenticated = false, captcha = false }: UserContextRouteProps) => {
  const { user } = useContext(UserContext)

  if (user.loggedIn && redirectWhenAuthenticated) {
    return <Navigate to="/" />
  }

  if (!user.loggedIn && !redirectWhenAuthenticated) {
    return <Navigate to="/login" />
  }

  return captcha ? <GoogleReCaptchaProvider reCaptchaKey={process.env.REACT_APP_RECAPTCHA_SITE_KEY || ""} >{children}</GoogleReCaptchaProvider> : children
}

export default UserContextRoute