import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"

interface AuthenticatedRouteProps {
    children: React.ReactComponentElement<any>
}

const AuthenticatedRoute = ({ children }: AuthenticatedRouteProps) => {
    const { user } = useContext(UserContext)

    return user.loggedIn ? children : <Navigate to="/login" />
}

export default AuthenticatedRoute