import { useNavigate } from "react-router-dom"
import Button from "../../elements/components/Button"

const ForgotPassword = () => {
    const navigate = useNavigate()

    return (
      <div className="pt-40 text-white space-y-4 container text-center">
        <div className="bg-gray-800 mx-auto lg:max-w-xs md:max-w-sm rounded-lg p-5 px-10 space-y-2 mb-4">
          <h1 className="text-2xl font-bold mb-5">Reset password</h1>

          <input type="text" 
            placeholder="Username" 
            className="text-input w-full" />
            
          <input type="email" 
            placeholder="Email" 
            className="text-input w-full" />

          <Button text="Send" size="sm" className="!mt-5" />
        </div>

        <span className="cursor-pointer select-none text-gray-100 hover:text-blue-400" onClick={ () => navigate("/login") }>Log in</span>
      </div>
    )
}

export default ForgotPassword
