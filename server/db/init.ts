import { NoteModel } from './models/noteModel'
import UserModel from './models/userModel'

const dbInit = () => Promise.all([
    UserModel.sync(),
    NoteModel.sync(),

    // relationships
    UserModel.hasMany(NoteModel, {
        foreignKey: 'authorId',
        as: 'notes'
    }),
    NoteModel.belongsTo(UserModel, {
        foreignKey: 'authorId',
        as: 'author'
    })
])

export default dbInit