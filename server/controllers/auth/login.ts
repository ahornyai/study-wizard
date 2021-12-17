import UserModel from "../../db/models/UserModel";
import { Controller } from "../../api"
import bcrypt from 'bcrypt'

const LoginController = {
    path: "auth/login",
    handler: async (req, res) => {
        const { username, password } = req.body

        if (!username || !password) {
            res.status(400).send({
                error: "All fields are required"
            })
            return
        }

        const user = await UserModel.findOne({ where: { username } });

        if (!user) {
            res.status(400).send({
                error: "Invalid username or password"
            })
            return
        }

        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                res.status(500).send({
                    error: "Internal server error"
                })
                return
            }

            if (result === false) {
                res.status(400).send({
                    error: "Invalid username or password"
                })
                return
            } else {
                res.send({
                    success: true,
                    user: {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        updatedAt: user.updatedAt,
                        createdAt: user.createdAt
                    }
                })
            }
        })
    }
} as Controller

export default LoginController