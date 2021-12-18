import express from "express"
import session from "express-session"
import bodyParser from "body-parser"

import { API } from "./api"
import dbInit from "./db/init"
import connection from "./db/connection"

import RegisterController from "./controllers/auth/register"
import LoginController from "./controllers/auth/login"
import UserController from "./controllers/user"

dbInit()

const SessionStore = require('express-session-sequelize')(session.Store);

declare module 'express-session' {
  interface SessionData {
    user?: {
      id: number,
      username: string,
      updatedAt: Date,
      createdAt: Date
    };
  }
}

new API({
    port: parseInt(process.env.PORT || "5000"),
    controllers: [
        //auth
        RegisterController,
        LoginController,
        UserController
    ],
    middlewares: [
      express.json(),
      bodyParser.urlencoded({ extended: true }),
      session({
          secret: process.env.SESSION_SECRET || "secret",
          store: new SessionStore({ db: connection }),
          cookie: {
              maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
          },
          resave: false,
          saveUninitialized: false,
      })
    ]
})