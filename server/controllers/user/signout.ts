import AuthMiddleware from "../../middlewares/authMiddleware"
import { Controller } from "../../api"

const SignOutController = {
    method: "post",
    path: "user/signout",
    handler: async (req, res) => {
        req.session.destroy(() => {
            res.send({
                success: true
            })
        })
    },
    middlewares: [ AuthMiddleware ]
} as Controller

export default SignOutController