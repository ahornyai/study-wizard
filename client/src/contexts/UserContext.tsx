import axios from "axios"
import { createContext } from "react"
import { createAvatar } from '@dicebear/avatars'
import * as style from '@dicebear/avatars-jdenticon-sprites'

export class User {
  id: number
  username: string
  loggedIn: boolean
  avatar: string

  constructor(id: number = 0, username: string = "", loggedIn: boolean = false) {
    this.id = id
    this.username = username
    this.loggedIn = loggedIn
    this.avatar = createAvatar(style, {
      seed: this.username,
      dataUri: true
    })
  }

}

export const syncUser = () => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      resolve(await axios.get("/api/user/info").then(res => {
        if (!res.data.error) {
          return new User(res.data.user.id, res.data.user.username, true)
        }

        return new User()
      }).catch(err => {
        return new User()
      }).finally(() => {
        return new User()
      }))
    }, 150)
  })
}

export const UserContext = createContext({ user: new User(), setUser: (user: User) => { } });