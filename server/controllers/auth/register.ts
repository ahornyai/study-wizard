import { Controller } from "../../api"

const RegisterController = {
    path: "/auth/register",
    handler: (req, res) => {
        res.json({ message: "hello world" })
    }
} as Controller;

export default RegisterController