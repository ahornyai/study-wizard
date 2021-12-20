import AuthMiddleware from "../../middlewares/authMiddleware"
import { Controller } from "../../api"
import { NoteModel } from "../../db/models/noteModel"

const ListNotesController = {
    method: "get",
    path: "notes/list",
    handler: async (req, res) => {
        const { pageParam, limitParam } = req.query
        const page = parseInt(pageParam?.toString() || "1")
        const limit = parseInt(limitParam?.toString() || "9")

        const notes = await NoteModel.findAll( { 
            attributes: ["id", "title", "updatedAt"],
            where: { authorId: req.session.user?.id },
            order: [["createdAt", "DESC"]],
            limit,
            offset: (page - 1) * 9
        })

        res.status(200).send({
            notes
        })
    },
    middlewares: [ AuthMiddleware ]
} as Controller

export default ListNotesController
