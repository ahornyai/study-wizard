import { Controller } from "../../api"

const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const alphaNumerical = /^[a-zA-Z0-9]+$/

const RegisterController = {
    path: "auth/register",
    handler: (req, res) => {
        const { username, email, password, passwordAgain } = req.body

        if (!username || !email || !password || !passwordAgain) {
            res.status(400).send({
                error: "All fields are required"
            })
            return
        }

        if (alphaNumerical.test(username) === false) {
            res.status(400).send({
                error: "Username must be alphanumerical"
            })
            return
        }

        if (username.length < 3) {
            res.status(400).send({
                error: "Username must be at least 3 characters long"
            })
            return
        }

        if (mailFormat.test(email) === false) {
            res.status(400).send({
                message: "Invalid email"
            })
            return
        }

        if (password.length < 6) {
            res.status(400).send({
                message: "Password must be at least 6 characters long"
            })
            return
        }

        if (password !== passwordAgain) {
            res.status(400).send({ error: "Passwords do not match" })
            return
        }

        res.send({
            success: true
        })
    }
} as Controller;

export default RegisterController