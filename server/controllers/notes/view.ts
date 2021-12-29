import AuthMiddleware from "../../middlewares/authMiddleware"
import { Controller } from "../../api"
import { NoteModel } from "../../db/models/noteModel"
import UserModel from "../../db/models/userModel"
import SharedNoteModel from "../../db/models/sharedNote"

const ViewNotesController = {
    method: "get",
    path: "notes/view/:id",
    handler: async (req, res) => {
        const { id } = req.params
        const { invite } = req.query

        if (!id) {
            res.status(400).send({
                error: "all-fields-required"
            })
            return
        }

        let note;

        if (invite === "true") {
            note = await NoteModel.findOne({
                attributes: ["id", "title"],
                where: { inviteId: id },
                include: [
                    { model: UserModel, as: "author", attributes: ["id", "username"] }
                ]
            })
        } else {
            note = await NoteModel.findOne({
                attributes: ["id", "inviteId", "title", "content", "createdAt", "updatedAt"],
                where: { id },
                include: [
                    { model: UserModel, as: "author", attributes: ["id", "username"] }, 
                    { 
                        model: SharedNoteModel, 
                        as: "sharedWith", 
                        attributes: ["canWrite", "canManagePerms"], 
                        include: [
                            { model: UserModel, as: "user", attributes: ["id", "username"] }
                        ] 
                    }
                ]
            })
        }

        if (!note) {
            res.status(404).send({
                error: "note-not-found"
            })
            return
        }

        if (note.author.id !== req.session.user?.id && !note.sharedWith.find((s: any) => s.user.id === req.session.user?.id)) {
            res.status(403).send({
                error: "unauthorized"
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
