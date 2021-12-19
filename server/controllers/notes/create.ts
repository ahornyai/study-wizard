import AuthMiddleware from "../../middlewares/authMiddleware"
import { Controller } from "../../api"
import { EntryType, NoteEntry, NoteModel } from "../../db/models/noteModel"

const CreateNoteController = {
    method: "post",
    path: "notes/create",
    handler: async (req, res) => {
        let { title, content } = req.body

        if (!title || !content) {
            res.status(400).send({
                error: "all-fields-required"
            })
            return
        }

        title = title.trim()
        content = JSON.parse(content)

        if (title.length < 5) {
            res.status(400).send({
                error: "title-min-char"
            })
            return
        }

        if (title.length > 50) {
            res.status(400).send({
                error: "title-max-char"
            })
            return
        }

        if (!Array.isArray(content)) {
            res.status(400).send({
                error: "content-invalid"
            })
            return
        }

        let entries: NoteEntry[]

        try {
            entries = convertEntries(content)
        }catch (e) {
            res.status(400).send({
                error: "content-invalid"
            })

            return
        }
        
        await NoteModel.create({
            authorId: req?.session?.user?.id || -1,
            title,
            content: entries
        })

        res.status(200).send({
            success: true
        })
    },
    middlewares: [ AuthMiddleware ]
} as Controller

function convertEntries(content: any[], ids: string[] = [], depth = 0, parent?: NoteEntry): NoteEntry[] {
    let entries = []

    for (let entry of content) {
        if (typeof entry !== "object") {
            throw new Error()
        }

        if (entry.id === undefined || entry.type === undefined || entry.depth === undefined || !Array.isArray(entry.children)) {
            throw new Error()
        }

        if (entry.depth !== depth) {
            throw new Error()
        }

        if (!entry.id.trim() || entry.id.length > 255 || ids.includes(entry.id)) {
            throw new Error()
        }

        if (entry.type !== 0 && entry.type !== 1) {
            throw new Error()
        }

        ids.push(entry.id)
        entries.push(new NoteEntry(entry.id, entry.type as EntryType, entry.depth, convertEntries(entry.children, ids, depth + 1, entry), parent))
    }

    return entries
}

export default CreateNoteController
