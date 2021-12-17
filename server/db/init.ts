import UserModel from './models/UserModel'

const isDev = process.env.NODE_ENV === 'development'

const dbInit = () => Promise.all([
    UserModel.sync(),
])

export default dbInit