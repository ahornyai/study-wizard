import UserModel from "../../db/models/userModel";
import { Controller } from "../../api"
import bcrypt from 'bcrypt'

const LoginController = {
    method: "post",
    path: "auth/login",
    handler: async (req, res) => {
        const { username, password } = req.body

        if (!username || !password) {
            res.status(400).send({
                error: "all-fields-required"
            })
            return
        }

        const user = await UserModel.findOne({ where: { username } });

        if (!user) {
            res.status(400).send({
                error: "invalid-username-password"
            })
            return
        }

        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                res.status(500).send({
                    error: "internal"
                })
                return
            }

            if (result === false) {
                res.status(400).send({
                    error: "invalid-username-password"
                })
                return
            } else {
                req.session.user = {
                    id: user.id,
                    username: user.username,
                    updatedAt: user.updatedAt,
                    createdAt: user.createdAt
                }

                res.send({
                    success: true,
                    user: req.session.user
                })
            }
        })
    }
} as Controller

export default LoginController