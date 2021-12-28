import { createAvatar } from '@dicebear/avatars'
import * as style from '@dicebear/avatars-jdenticon-sprites'

export default class Author {
    id: number
    username: string
    avatar: string

    constructor (id: number, username: string) {
        this.id = id
        this.username = username
        this.avatar = createAvatar(style, {
            seed: this.username,
            dataUri: true
        })
    }

}