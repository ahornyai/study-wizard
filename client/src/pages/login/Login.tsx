import Button from "../../elements/components/Button"

const Home = () => {
    return (
      <div className="pt-40 text-white container">
        <div className="bg-gray-800 mx-auto lg:max-w-xs md:max-w-sm rounded-lg text-center p-5 px-10 space-y-2">
          <h1 className="text-2xl font-bold mb-5">Login</h1>

          <input type="text" 
            placeholder="Username" 
            className="text-input w-full" />
            
          <input type="password" 
            placeholder="Password" 
            className="text-input w-full" />

          <Button text="Login" size="sm" className="!mt-5" />
        </div>
      </div>
    )
}

export default Home
