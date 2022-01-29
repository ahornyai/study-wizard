import AuthMiddleware from "../../middlewares/authMiddleware"
import { Controller } from "../../api"
import { NoteModel } from "../../db/models/noteModel"
import SharedNoteModel from "../../db/models/sharedNote"
import UserModel from "../../db/models/userModel"

const ListNotesController = {
  method: "get",
  path: "notes/list",
  handler: async (req, res) => {
    const { page, shared } = req.query
    const convertedPage = parseInt(page?.toString() || "1") - 1
    const convertedShare = shared === "true"

    if (convertedPage < 0) {
      res.status(400).send({
        error: "Page must be a positive number"
      })
      return
    }

    let notes;
    let hasMore;

    if (convertedShare) {
      notes = await SharedNoteModel.findAll({
        where: { userId: req.session.user?.id },
        include: [
          {
            model: NoteModel, as: "note", attributes: ["id", "title", "updatedAt"],
            include: [
              { model: UserModel, as: "author", attributes: ["id", "username"] }
            ]
          },
        ],
        order: [["updatedAt", "DESC"]],
        limit: 9,
        offset: convertedPage * 9
      })

      hasMore = await SharedNoteModel.count({
        where: { userId: req.session.user?.id }
      }) > (convertedPage + 1) * 9
    } else {
      notes = await NoteModel.findAll({
        attributes: ["id", "title", "updatedAt"],
        where: { authorId: req.session.user?.id },
        include: [{ model: UserModel, as: "author", attributes: ["id", "username"] }],
        order: [["updatedAt", "DESC"]],
        limit: 9,
        offset: convertedPage * 9
      })

      hasMore = await NoteModel.count({
        where: { authorId: req.session.user?.id }
      }) > (convertedPage + 1) * 9
    }

    res.status(200).send({
      notes: notes.map((queriedNote: any) => {
        queriedNote = convertedShare ? queriedNote.note : queriedNote

        return {
          id: queriedNote.id,
          title: queriedNote.title,
          author: queriedNote.author,
          updatedAt: queriedNote.updatedAt
        }
      }),
      hasMore
    })
  },
  middlewares: [AuthMiddleware]
} as Controller

export default ListNotesController
