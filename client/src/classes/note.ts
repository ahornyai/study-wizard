import axios from "axios"
import Author from "./author"
import NoteEntry from "./noteEntry"

export default class Note {
    id: string
    inviteId: string
    title: string
    content?: NoteEntry[]
    updatedAt: Date
    createdAt?: Date
    author: Author

    constructor(id: string, inviteId: string, title: string, author: Author, updatedAt: Date, createdAt?: Date, content?: NoteEntry[]) {
        this.id = id
        this.inviteId = inviteId
        this.title = title
        this.updatedAt = updatedAt
        this.author = author
        this.createdAt = createdAt
        this.content = content
    }

    static async fetch(id: string, invite: boolean = false): Promise<Note | null> {
        return await axios.get("/api/notes/view/" + id + "?invite=" + invite)
            .then(res => {
                const note = res.data.note as Note
            
                if (!note) {
                    return null
                }

                if (!invite) {
                    if (note.content == null) {
                        return null
                    }

                    note.content = note.content.map(NoteEntry.fromJSON)
                }

                note.author = new Author(note.author.id, note.author.username)
            
                return note
            })
            .catch(err => {
                console.error(err)
            
                return null
            })
    }

}