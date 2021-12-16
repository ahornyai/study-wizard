import express from "express";
import { API } from "./api";

import RegisterController from "./controllers/auth/register";

new API({
    port: parseInt(process.env.PORT || "5000"),
    controllers: {
        post: [
          RegisterController
        ]
    },
    middlewares: [
      express.json(),
    ]
})