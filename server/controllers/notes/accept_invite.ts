import { Controller } from "../../api"
import AuthMiddleware from "../../middlewares/authMiddleware";
import { NoteModel } from "../../db/models/noteModel";
import SharedNoteModel from "../../db/models/sharedNote";

const RegisterController = {
    method: "post",
    path: "notes/accept_invite",
    handler: async (req, res) => {
        let { inviteId } = req.body

        if (!inviteId) {
            res.status(400).send({
                error: "all-fields-required"
            })
            return
        }

        const note = await NoteModel.findOne({ where: { inviteId } })

        if (!note) {
            res.status(400).send({
                error: "note-not-found"
            })
            return
        }

        if (await SharedNoteModel.findOne({ where: { noteId: note.id, userId: req.session.user?.id } })) {
            res.status(400).send({
                error: "already-accepted-invite"
            })
            return
        }

        await SharedNoteModel.create({
            noteId: inviteId,
            userId: req.session.user?.id || -1
        })

        res.send({
            success: true
        })
    },
    middlewares: [ AuthMiddleware ]
} as Controller

export default RegisterController