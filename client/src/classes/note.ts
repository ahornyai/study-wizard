import Author from "./author"
import NoteEntry from "./noteEntry"

export default class Note {
    id: number
    title: string
    content?: NoteEntry[]
    updatedAt: Date
    createdAt?: Date
    author: Author

    constructor(id: number, title: string, author: Author, updatedAt: Date, createdAt?: Date, content?: NoteEntry[]) {
        this.id = id
        this.title = title
        this.updatedAt = updatedAt
        this.author = author
        this.createdAt = createdAt
        this.content = content
    }

}