import AuthMiddleware from "../../middlewares/authMiddleware"
import { Controller } from "../../api"
import { NoteModel } from "../../db/models/noteModel"

const PracticeAnswerController = {
  method: "post",
  path: "practice/answer",
  handler: async (req, res) => {
    const { id, answer, type } = req.body

    if (!id || !answer || !type) {
      res.status(400).send({
        error: "all-fields-required"
      })
      return
    }

    const note = await NoteModel.findOne({
      where: { id, authorId: req.session.user?.id }
    })

    if (!note) {
      res.status(400).send({
        error: "note-not-found"
      })
      return
    }

    switch (type) {
      case "definition":
        console.log(answer)
        break
      case "card":
        console.log(answer)
        break
      case "sentence-filling":
        console.log(answer)
        break
      default:
        res.status(400).send({
          error: "undefined-type"
        })
        return
    }
  },
  middlewares: [AuthMiddleware]
} as Controller

export default PracticeAnswerController
