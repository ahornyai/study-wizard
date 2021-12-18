import UserModel from "../db/models/userModel";
import { Controller } from "../api"

const UserController = {
    path: "user",
    handler: async (req, res) => {

        //res.send({
        //    success: true,
        //    user: {
        //        id: user.id,
        //        username: user.username,
        //        email: user.email,
        //        updatedAt: user.updatedAt,
        //        createdAt: user.createdAt
        //    }
        //})
    }
} as Controller

export default UserController