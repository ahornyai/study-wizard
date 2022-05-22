import AuthMiddleware from "../../middlewares/auth_middleware"
import { Controller } from "../../api"

const UserInfoController = {
  method: "get",
  path: "user/info",
  handler: async (req, res) => {
    res.send({
      success: true,
      user: req.session.user
    })
  },
  middlewares: [AuthMiddleware]
} as Controller

export default UserInfoController