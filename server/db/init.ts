import { NoteModel } from './models/noteModel'
import UserModel from './models/userModel'

const isDev = process.env.NODE_ENV === 'development'

const dbInit = () => Promise.all([
    UserModel.sync(),
    NoteModel.sync(),
])

export default dbInit