import { createContext } from "react";

export class User {
    username: string
    loggedIn: boolean

    constructor (username: string = "", loggedIn: boolean = false) {
        this.username = username
        this.loggedIn = loggedIn
    }

}

export const UserContext = createContext(new User());