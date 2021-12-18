import UserModel from "../../db/models/userModel";
import { Controller } from "../../api"

const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const alphaNumerical = /^[a-zA-Z0-9]+$/

const RegisterController = {
    path: "auth/register",
    handler: async (req, res) => {
        const { username, email, password, passwordAgain } = req.body

        if (!username || !email || !password || !passwordAgain) {
            res.status(400).send({
                error: "all-fields-required"
            })
            return
        }

        if (alphaNumerical.test(username) === false) {
            res.status(400).send({
                error: "username-alphanumerical"
            })
            return
        }

        if (username.length < 3) {
            res.status(400).send({
                error: "username-min-char"
            })
            return
        }

        if (mailFormat.test(email) === false) {
            res.status(400).send({
                error: "invalid-email"
            })
            return
        }

        if (password.length < 6) {
            res.status(400).send({
                error: "password-min-char"
            })
            return
        }

        if (password !== passwordAgain) {
            res.status(400).send({
                error: "passwords-dont-match" 
            })
            return
        }

        if (await UserModel.findOne({ where: { username } })) {
            res.status(400).send({
                error: "username-taken"
            })
            return
        }

        if (await UserModel.findOne({ where: { email } })) {
            res.status(400).send({
                error: "email-taken"
            })
            return
        }

        await UserModel.create({
            username,
            email,
            password
        })

        res.send({
            success: true
        })
    }
} as Controller

export default RegisterController