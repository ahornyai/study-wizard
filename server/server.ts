import express from "express"
import bodyParser from "body-parser"

import { API } from "./api"
import dbInit from "./db/init"

import RegisterController from "./controllers/auth/register"

dbInit()

new API({
    port: parseInt(process.env.PORT || "5000"),
    controllers: {
        post: [
          //auth
          RegisterController,
        ]
    },
    middlewares: [
      express.json(),
      bodyParser.urlencoded({ extended: true })
    ]
})