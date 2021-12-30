import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"

interface UserContextRouteProps {
    children: React.ReactComponentElement<any>
    redirectWhenAuthenticated?: boolean
}

const UserContextRoute = ({ children, redirectWhenAuthenticated = false }: UserContextRouteProps) => {
    const { user } = useContext(UserContext)

    return user.loggedIn ? (redirectWhenAuthenticated ? <Navigate to="/" /> : children) : <Navigate to="/login" />
}

export default UserContextRoute