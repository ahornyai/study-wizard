import axios from "axios"
import Author from "./author"
import NoteEntry from "./noteEntry"

export default class Note {
    id: string
    title: string
    content?: NoteEntry[]
    updatedAt: Date
    createdAt?: Date
    author: Author

    constructor(id: string, title: string, author: Author, updatedAt: Date, createdAt?: Date, content?: NoteEntry[]) {
        this.id = id
        this.title = title
        this.updatedAt = updatedAt
        this.author = author
        this.createdAt = createdAt
        this.content = content
    }

    
    static async fetchNote(id: string): Promise<Note | null> {
        return await axios.get("/api/notes/view/" + id)
            .then(res => {
                const note = res.data.note as Note
            
                if (!note || note.content == null) {
                    return null
                }
            
                note.content = note.content.map(NoteEntry.fromJSON)
            
                return note
                })
            .catch(err => {
                console.error(err)
            
                return null
            })
    }

}