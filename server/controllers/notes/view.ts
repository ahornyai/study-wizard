import AuthMiddleware from "../../middlewares/authMiddleware"
import { Controller } from "../../api"
import { NoteModel } from "../../db/models/noteModel"
import UserModel from "../../db/models/userModel"

const ViewNotesController = {
    method: "get",
    path: "notes/view/:id",
    handler: async (req, res) => {
        const { id } = req.params

        const note = await NoteModel.findOne({
            attributes: ["id", "title", "content", "createdAt", "updatedAt"],
            where: { id: id },
            include: [{ model: UserModel, as: "author", attributes: ["id", "username"] }]
        })

        if (!note) {
            res.status(404).send({
                error: "Note not found"
            })
            return
        }

        res.status(200).send({
            note
        })
    },
    middlewares: [ AuthMiddleware ]
} as Controller

export default ViewNotesController
