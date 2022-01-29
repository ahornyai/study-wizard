import AuthMiddleware from "../../middlewares/authMiddleware"
import { Controller } from "../../api"
import { NoteModel } from "../../db/models/noteModel"
import UserModel from "../../db/models/userModel"
import SharedNoteModel from "../../db/models/sharedNote"

const ManageMemberController = {
  method: "post",
  path: "notes/manage-member/:method",
  handler: async (req, res) => {
    const { noteId, memberId, permission, value } = req.body
    const { method } = req.params

    if (!noteId || !memberId || !method) {
      res.status(400).send({
        error: "all-fields-required"
      })
      return
    }

    const note = await NoteModel.findOne({
      attributes: ["id", "inviteId", "title", "content", "createdAt", "updatedAt"],
      where: { id: noteId },
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

    if (!note) {
      res.status(404).send({
        error: "note-not-found"
      })
      return
    }

    if (note.author.id !== req.session.user?.id
      && !note.sharedWith?.find((s: any) => s.user.id === req.session.user?.id && s.canManagePerms === true)) {
      res.status(403).send({
        error: "unauthorized"
      })
      return
    }

    const member = note.sharedWith?.find((s: any) => s.user.id === memberId)

    if (!member) {
      res.status(404).send({
        error: "member-not-found"
      })
      return
    }

    switch (method) {
      case "delete": {
        await SharedNoteModel.destroy({
          where: {
            noteId: note.id,
            userId: memberId
          }
        })

        res.send({
          success: true
        })

        break
      }
      case "permission": {
        if (!permission || value === undefined || (value !== true && value !== false)) {
          res.status(400).send({
            error: "all-fields-required"
          })
          return
        }

        if (permission !== "write" && permission !== "manage") {
          res.status(400).send({
            error: "invalid-permission"
          })
          return
        }

        await SharedNoteModel.update({ [permission === "write" ? "canWrite" : "canManagePerms"]: value === true }, { where: { noteId: note.id, userId: memberId } })

        res.send({
          success: true
        })

        break
      }
      default: {
        res.status(400).send({
          error: "invalid-method"
        })
        return
      }
    }
  },
  middlewares: [AuthMiddleware]
} as Controller

export default ManageMemberController
