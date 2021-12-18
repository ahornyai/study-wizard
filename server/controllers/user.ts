import { Controller } from "../api"

const UserController = {
    path: "user",
    handler: async (req, res) => {
        res.send({
            success: true,
            user: req.session.user
        })
    }
} as Controller

export default UserController