import Author from './author'

export default class NoteMember {
  canWrite: boolean
  canManagePerms: boolean
  user: Author

  constructor(id: number, username: string, canWrite: boolean, canManagePerms: boolean) {
    this.user = new Author(id, username)
    this.canWrite = canWrite
    this.canManagePerms = canManagePerms
  }

}