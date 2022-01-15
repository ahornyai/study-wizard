import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"

interface UserContextRouteProps {
    children: React.ReactComponentElement<any>
    redirectWhenAuthenticated?: boolean
}

const UserContextRoute = ({ children, redirectWhenAuthenticated = false }: UserContextRouteProps) => {
    const { user } = useContext(UserContext)

    if (user.loggedIn && redirectWhenAuthenticated) {
        return <Navigate to="/" />
    }

    if (!user.loggedIn && !redirectWhenAuthenticated) {
        return <Navigate to="/login" />
    }

    return children
}

export default UserContextRoute