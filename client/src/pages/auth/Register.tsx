import axios from "axios"
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from "../../elements/components/Button"

const Register = () => {
    const navigate = useNavigate()
    const form = useRef<HTMLFormElement>(null);
    const username = useRef<HTMLInputElement>(null);
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const passwordAgain = useRef<HTMLInputElement>(null);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleRegister = () => {
      if (!form.current?.checkValidity()) {
        return
      }

      if (password.current?.value !== passwordAgain.current?.value) {
        setErrorMessage("Passwords do not match");
        return
      }

      axios.post("/api/auth/register", {
        username: username.current?.value,
        email: email.current?.value,
        password: password.current?.value,
        passwordAgain: passwordAgain.current?.value
      }).catch(err => {
        if (err.response?.data?.message) {
          setErrorMessage(err.response.data.message);
        }
      }).then(res => {
        if (res?.data?.success)
          navigate("/login")
      });
    }

    return (
      <div className="pt-40 text-white container space-y-4 text-center">
        <form ref={ form } onSubmit={ (e) => e.preventDefault() } className="bg-gray-800 mx-auto lg:max-w-xs md:max-w-sm rounded-lg p-5 px-10 space-y-2 mb-4">
          <h1 className={ "text-2xl font-bold " + (errorMessage ? "" : "mb-5") }>Register</h1>
          { errorMessage && <p className="text-red-600 font-semibold !mb-3">{ errorMessage }</p> }

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
