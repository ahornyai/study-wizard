import UserModel from "../../db/models/userModel";
import { Controller } from "../../api"
import bcrypt from 'bcrypt'
import axios from "axios";

const LoginController = {
  method: "post",
  path: "auth/login",
  handler: async (req, res) => {
    const { username, password, captchaToken } = req.body

    if (!username || !password || !captchaToken) {
      res.status(400).send({
        error: "all-fields-required"
      })
      return
    }

    const captchaRes = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`)

    if (!captchaRes.data.success) {
      res.status(400).send({
        error: "captcha-failed"
      })
      return
    }

    const user = await UserModel.findOne({ where: { username } })

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