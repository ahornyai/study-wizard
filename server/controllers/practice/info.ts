import AuthMiddleware from "../../middlewares/authMiddleware"
import { Controller } from "../../api"
import { NoteModel } from "../../db/models/noteModel"
import { LearningStatusModel } from "../../db/models/learningStatusModel"
import { LearningStatisticModel } from "../../db/models/learningStatisticModel"

const PracticeInfoController = {
  method: "get",
  path: "practice/info",
  handler: async (req, res) => {
    const { id } = req.query

    if (!id) {
      res.status(400).send({
        error: "all-fields-required"
      })
      return
    }

    const note = await NoteModel.findOne({
      where: { id, authorId: req.session.user?.id },
      include: [
        {
          model: LearningStatusModel,
          where: { userId: req.session.user?.id },
          as: "learningStatuses",
          required: false,
          limit: 1
        },
        {
          model: LearningStatisticModel,
          where: { userId: req.session.user?.id },
          as: "learningStatistics",
          required: false
        }
      ]
    })

    if (!note) {
      res.status(400).send({
        error: "note-not-found"
      })
      return
    }

    let learningStatus = note.learningStatuses[0]

    if (!learningStatus) {
      learningStatus = await LearningStatusModel.create({
        userId: req.session.user?.id as number,
        noteId: note.id
      })
    }

    res.send({
      learningStatus: learningStatus,
      learningStatistics: note.learningStatistics
    })
  },
  middlewares: [AuthMiddleware]
} as Controller

export default PracticeInfoController
