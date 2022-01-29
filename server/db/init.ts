import { NoteModel } from './models/noteModel'
import SharedNoteModel from './models/sharedNote'
import UserModel from './models/userModel'

const dbInit = () => Promise.all([
  UserModel.sync(),
  NoteModel.sync(),
  SharedNoteModel.sync(),

  // relationships
  UserModel.hasMany(NoteModel, {
    foreignKey: 'authorId',
    as: 'notes'
  }),
  UserModel.hasMany(SharedNoteModel, {
    foreignKey: 'userId',
    as: 'sharedWith'
  }),
  NoteModel.belongsTo(UserModel, {
    foreignKey: 'authorId',
    as: 'author'
  }),
  NoteModel.hasMany(SharedNoteModel, {
    foreignKey: 'noteId',
    as: 'sharedWith'
  }),
  SharedNoteModel.belongsTo(NoteModel, {
    foreignKey: 'noteId',
    as: 'note'
  }),
  SharedNoteModel.belongsTo(UserModel, {
    foreignKey: 'userId',
    as: 'user'
  })
])

export default dbInit