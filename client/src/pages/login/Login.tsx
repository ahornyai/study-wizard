import { useNavigate } from "react-router-dom"
import Button from "../../elements/components/Button"

const Login = () => {
    const navigate = useNavigate()

    return (
      <div className="pt-40 text-white space-y-4 container text-center">
        <div className="bg-gray-800 mx-auto lg:max-w-xs md:max-w-sm rounded-lg p-5 px-10 space-y-2">
          <h1 className="text-2xl font-bold mb-5">Login</h1>

          <input type="text" 
            placeholder="Username" 
            className="text-input w-full" />
            
          <input type="password" 
            placeholder="Password" 
            className="text-input w-full" />

          <Button text="Login" size="sm" className="!mt-5" />
        </div>

        <div className="w-full space-x-4 text-gray-100 select-none">
          <span className="cursor-pointer hover:text-blue-400" onClick={ () => navigate("/register") }>Sign up</span><span className="cursor-pointer hover:text-blue-400" onClick={ () => navigate("/forgot") }>Forgot your password?</span>
        </div>
      </div>
    )
}

export default Login
