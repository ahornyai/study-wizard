import axios from "axios"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"

import Button from "../../elements/components/Button"

const Register = () => {
    const navigate = useNavigate()
    const form = useRef<HTMLFormElement>(null)
    const username = useRef<HTMLInputElement>(null)
    const email = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null);
    const passwordAgain = useRef<HTMLInputElement>(null)

    const handleRegister = () => {
      if (!form.current?.checkValidity()) {
        return
      }

      if (password.current?.value !== passwordAgain.current?.value) {
        toast("Passwords do not match", { type: "error", theme: "dark" });
        return
      }

      axios.post("/api/auth/register", {
        username: username.current?.value,
        email: email.current?.value,
        password: password.current?.value,
        passwordAgain: passwordAgain.current?.value
      }).catch(err => {
        if (err.response?.data?.error) {
          toast(err.response.data.error, { type: "error", theme: "dark" })
        }
      }).then(res => {
        if (res?.data?.success) {
          navigate("/login")
        }
      });
    }

    return (
      <div className="pt-40 text-white container space-y-4 text-center">
        <ToastContainer theme="dark" style={ { marginTop: 80 } } />

        <form ref={ form } onSubmit={ (e) => e.preventDefault() } className="bg-gray-800 mx-auto lg:max-w-xs md:max-w-sm rounded-lg p-5 px-10 space-y-2 mb-4">
          <h1 className={ "text-2xl font-bold mb-5" }>Register</h1>
          <input type="text" 
            placeholder="Username" 
            className="text-input w-full"
            required
            ref={ username } />

          <input type="email" 
            placeholder="Email" 
            className="text-input w-full" 
            required
            ref={ email } />
            
          <input type="password" 
            placeholder="Password" 
            className="text-input w-full"
            required
            ref={ password } />
          
          <input type="password" 
            placeholder="Password again" 
            className="text-input w-full"
            required
            ref={ passwordAgain } />

          <Button submit={ true } text="Register" size="sm" onClick={ handleRegister } className="!mt-5" />
        </form>

        <span className="cursor-pointer select-none text-gray-100 hover:text-blue-400" onClick={ () => navigate("/forgot") }>Forgot your password?</span>
      </div>
    )
}

export default Register
