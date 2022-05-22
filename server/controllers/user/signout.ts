import AuthMiddleware from "../../middlewares/auth_middleware"
import { Controller } from "../../api"

const SignOutController = {
  method: "post",
  path: "user/signout",
  handler: async (req, res) => {
    req.session.destroy(() => {
      res.clearCookie("state") // delete learning status cookie 

      res.send({
        success: true
      })
    })
  },
  middlewares: [AuthMiddleware]
} as Controller

export default SignOutController