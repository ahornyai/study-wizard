import { RequestHandler } from 'express'

const AuthMiddleware = ((req, res, next) => {
    if (req.session.user) {
        next()
    } else {
        res.status(401).send({
            error: "unauthorized"
        })
    }
}) as RequestHandler

export default AuthMiddleware