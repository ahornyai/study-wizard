import axios from "axios"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import Button from "../../elements/components/Button"

const Login = () => {
    const navigate = useNavigate()
    const username = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)

    const handleLogin = () => {
        if (!username.current?.value || !password.current?.value) {
            return
        }

        axios.post("/api/auth/login", {
            username: username.current?.value,
            password: password.current?.value
        }).catch(err => {
            if (err.response?.data?.error) {
                toast(err.response.data.error, { type: "error", theme: "dark" })
            }
        }).then(res => {
            if (res?.data?.success) {
                navigate("/notes")
            }
        });
    }

    return (
      <div className="pt-40 text-white space-y-4 container text-center">
        <ToastContainer theme="dark" style={ { marginTop: 80 } } />

        <div className="bg-gray-800 mx-auto lg:max-w-xs md:max-w-sm rounded-lg p-5 px-10 space-y-2 !mb-4">
          <h1 className="text-2xl font-bold mb-5">Login</h1>

          <input type="text" 
            placeholder="Username" 
            className="text-input w-full"
            ref={ username } />
            
          <input type="password" 
            placeholder="Password" 
            className="text-input w-full"
            ref={ password } />

          <Button onClick={ handleLogin } text="Login" size="sm" className="!mt-5" />
        </div>

        <span className="cursor-pointer select-none text-gray-100 hover:text-blue-400" onClick={ () => navigate("/forgot") }>Forgot your password?</span>
      </div>
    )
}

export default Login
