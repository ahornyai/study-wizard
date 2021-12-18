import axios from "axios";
import { createContext } from "react";

export class User {
    id: number
    username: string
    loggedIn: boolean

    constructor (id: number = 0, username: string = "", loggedIn: boolean = false) {
        this.id = id
        this.username = username
        this.loggedIn = loggedIn
    }

}

export const syncUser = () => {
    return axios.get("/api/user/info").then(res => {
        if (!res.data.error) {
            return new User(res.data.user.id, res.data.user.username, true)
        }

        return new User()
    }).catch(err => {
        console.error(err)

        return new User()
    }).finally(() => {
        return new User()
    })
}

export const UserContext = createContext({ user: new User(), setUser: (user: User) => {} });