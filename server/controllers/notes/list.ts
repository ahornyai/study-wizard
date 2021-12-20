import AuthMiddleware from "../../middlewares/authMiddleware"
import { Controller } from "../../api"
import { NoteModel } from "../../db/models/noteModel"

const ListNotesController = {
    method: "get",
    path: "notes/list",
    handler: async (req, res) => {
        const { page } = req.query
        const convertedPage = parseInt(page?.toString() || "1") - 1

        if (convertedPage < 0) {
            res.status(400).send({
                error: "Page must be a positive number"
            })
            return
        }

        const notes = await NoteModel.findAll( { 
            attributes: ["id", "title", "updatedAt"],
            where: { authorId: req.session.user?.id },
            order: [["createdAt", "DESC"]],
            limit: 9,
            offset: convertedPage * 9
        })

        const hasMore = await NoteModel.count({
            where: { authorId: req.session.user?.id }
        }) > (convertedPage + 1) * 9

        res.status(200).send({
            notes: notes.map(note => ({
                id: note.id,
                title: note.title,
                author: req.session.user?.username,
                updatedAt: note.updatedAt
            })),
            hasMore
        })
    },
    middlewares: [ AuthMiddleware ]
} as Controller

export default ListNotesController
