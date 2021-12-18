import express, { Application, RequestHandler } from 'express'
import path from 'path'

export interface Controller {
    method: 'get' | 'post' | 'put' | 'delete' | 'patch' | 'head' | 'options'
    path: string
    handler: RequestHandler
    middlewares?: RequestHandler[]
}

export interface APIDefinition {
    port: number
    middlewares: RequestHandler[]
    controllers: Controller[]
}

export class API {
    public app: Application
    public port: number

    constructor({ port, middlewares, controllers }: APIDefinition) {
        this.app = express()
        this.port = port

        express.static("../client/build")

        this.registerMiddlewares(middlewares)
        this.registerRoutes(controllers)

        //for react
        this.app.get("/", (req, res) => {
            res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
        });
        
        this.app.listen(this.port, () => {
            console.log(`App listening on the http://localhost:${this.port}`)
        })
    }

    private registerMiddlewares(middleWares: RequestHandler[]) {
        middleWares.forEach(middleWare => {
            this.app.use(middleWare)
        })
    }

    private registerRoutes(controllers: Controller[]) {
        controllers.forEach(controller => {
            this.app[controller.method]("/api/" + controller.path, ...(controller.middlewares ? controller.middlewares : []), controller.handler)
        });
    }
}
