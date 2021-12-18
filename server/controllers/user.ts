import AuthMiddleware from "../middlewares/authMiddleware"
import { Controller } from "../api"

const UserController = {
    method: "get",
    path: "user",
    handler: async (req, res) => {
        res.send({
            success: true,
            user: req.session.user
        })
    },
    middlewares: [ AuthMiddleware ]
} as Controller

export default UserController