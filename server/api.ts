import express, { Application, RequestHandler } from 'express'
import path from 'path'

export interface Controller {
    path: string
    handler: RequestHandler
}

export interface ControllerDefinition {
    get?: Controller[]
    post?: Controller[]
    put?: Controller[]
    delete?: Controller[]
    options?: Controller[]
    patch?: Controller[]
    head?: Controller[]
}

export interface APIDefinition {
    port: number
    middlewares: RequestHandler[]
    controllers: ControllerDefinition
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

    private registerRoutes(controllers: ControllerDefinition) {
        // yanderedev reference???

        controllers.get?.forEach(controller => {
            this.app.get("/api/" + controller.path, controller.handler)
        })

        controllers.post?.forEach(controller => {
            this.app.post("/api/" + controller.path, controller.handler)
        })

        controllers.put?.forEach(controller => {
            this.app.put("/api/" + controller.path, controller.handler)
        })

        controllers.delete?.forEach(controller => {
            this.app.delete("/api/" + controller.path, controller.handler)
        })

        controllers.options?.forEach(controller => {
            this.app.options("/api/" + controller.path, controller.handler)
        })

        controllers.patch?.forEach(controller => {
            this.app.patch("/api/" + controller.path, controller.handler)
        })

        controllers.head?.forEach(controller => {
            this.app.head("/api/" + controller.path, controller.handler)
        })
    }
}
