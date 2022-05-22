import AuthMiddleware from "../../middlewares/auth_middleware"
import { Controller } from "../../api"
import { EntryType, NoteEntry, NoteModel } from "../../db/models/noteModel"
import UserModel from "../../db/models/userModel"
import SharedNoteModel from "../../db/models/sharedNote"

const ModifyNoteController = {
  method: "post",
  path: "notes/modify/:method",
  handler: async (req, res) => {
    const { method } = req.params
    let { title, content, id } = req.body

    if (method !== "create" && method !== "update" && method !== "delete") {
      res.status(400).send({
        error: "invalid-method"
      })
      return
    }

    if (method === "delete" || method === "update") {
      if (id === undefined) {
        res.status(400).send({
          error: "all-fields-required"
        })
        return
      }

      const note = await NoteModel.findOne({
        attributes: ["id", "inviteId", "title", "content", "createdAt", "updatedAt"],
        where: { id: id },
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

      if (note === null) {
        res.status(404).send({
          error: "note-not-found"
        })
        return
      }

      if (note.author.id !== req.session.user?.id
        && !note.sharedWith?.find((s: any) => s.user.id === req.session.user?.id && s.canWrite === true)) {
        res.status(403).send({
          error: "unauthorized"
        })
        return
      }
    }

    if (method === "delete") {
      const queryResult = await NoteModel.destroy({
        where: {
          id,
          authorId: req.session!.user!.id
        }
      })

      res.status(200).send({
        success: queryResult === 1
      })

      return
    }

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
    } catch (e: any) {
      res.status(400).send({
        error: e.message ? e.message : "content-invalid"
      })

      return
    }

    if (method === "create") {
      const { id, inviteId } = await NoteModel.create({
        authorId: req?.session?.user?.id || -1,
        title,
        content: entries
      })

      res.status(200).send({
        success: true,
        id,
        inviteId
      })
    } else {
      const [affectedRows] = await NoteModel.update({
        title,
        content: entries
      }, {
        where: {
          id,
          authorId: req?.session?.user?.id || -1
        }
      })

      res.status(200).send({
        success: affectedRows === 1
      })
    }
  },
  middlewares: [AuthMiddleware]
} as Controller

function convertEntries(content: any[], ids: string[] = [], depth = 0): NoteEntry[] {
  let entries = []

  if (content.length === 0 && depth === 0) {
    throw new Error()
  }

  if (depth > 8 && content.length !== 0) {
    throw new Error()
  }

  for (let entry of content) {
    if (typeof entry !== "object") {
      throw new Error()
    }

    if (entry.id === undefined || entry.type === undefined || entry.depth === undefined || !Array.isArray(entry.values) || !Array.isArray(entry.children)) {
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

    if (entry.values.length === 0) {
      throw new Error()
    }

    if (entry.values[0].trim().length < 3) {
      throw new Error("term-min-char")
    }

    if (entry.values[0].length > 256) {
      throw new Error("term-max-char")
    }

    if (entry.type === 1 && entry.children.length === 0) {
      if (entry.values.length !== 2) {
        throw new Error()
      }

      if (entry.values[1].trim().length < 3) {
        throw new Error("definition-min-char")
      }

      if (entry.values[1].trim().length > 256) {
        throw new Error("definition-max-char")
      }
    }

    ids.push(entry.id)
    entries.push(new NoteEntry(entry.id, entry.type as EntryType, entry.depth, convertEntries(entry.children, ids, depth + 1), [entry.values[0], entry.values[1] || ""]))
  }

  return entries
}

export default ModifyNoteController
