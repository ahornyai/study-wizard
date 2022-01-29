import { NoteModel } from './models/noteModel'
import { LearningStatusModel } from './models/learningStatusModel'
import SharedNoteModel from './models/sharedNote'
import UserModel from './models/userModel'

const dbInit = () => Promise.all([
  UserModel.sync(),
  NoteModel.sync(),
  SharedNoteModel.sync(),
  LearningStatusModel.sync(),

  // relationships
  UserModel.hasMany(NoteModel, {
    foreignKey: 'authorId',
    as: 'notes'
  }),
  UserModel.hasMany(SharedNoteModel, {
    foreignKey: 'userId',
    as: 'sharedWith'
  }),
  UserModel.hasMany(LearningStatusModel, {
    foreignKey: 'userId',
    as: 'learningStatuses'
  }),

  NoteModel.belongsTo(UserModel, {
    foreignKey: 'authorId',
    as: 'author'
  }),
  NoteModel.hasMany(SharedNoteModel, {
    foreignKey: 'noteId',
    as: 'sharedWith'
  }),
  NoteModel.hasMany(LearningStatusModel, {
    foreignKey: 'noteId',
    as: 'learningStatuses'
  }),

  SharedNoteModel.belongsTo(NoteModel, {
    foreignKey: 'noteId',
    as: 'note'
  }),
  SharedNoteModel.belongsTo(UserModel, {
    foreignKey: 'userId',
    as: 'user'
  }),

  LearningStatusModel.belongsTo(NoteModel, {
    foreignKey: 'noteId',
    as: 'note'
  }),
  LearningStatusModel.belongsTo(UserModel, {
    foreignKey: 'userId',
    as: 'user'
  })
])

export default dbInit