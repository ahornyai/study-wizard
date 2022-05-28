import axios from "axios"
import Author from "./author"
import NoteEntry, { EntryType } from "./note_entry"
import NoteMember from "./note_member"

export class Permissions {
  write: boolean
  managePerms: boolean

  constructor(write: boolean, managePerms: boolean) {
    this.write = write
    this.managePerms = managePerms
  }
}

export default class Note {
  id: string
  inviteId: string
  title: string
  content: NoteEntry[]
  updatedAt: Date
  createdAt?: Date
  author: Author
  sharedWith?: NoteMember[] = []
  perms: Permissions

  constructor(id: string, inviteId: string, title: string, author: Author, updatedAt: Date, createdAt?: Date, content: NoteEntry[] = [], perms: Permissions = new Permissions(false, false)) {
    this.id = id
    this.inviteId = inviteId
    this.title = title
    this.updatedAt = updatedAt
    this.author = author
    this.createdAt = createdAt
    this.content = content
    this.perms = perms
  }

  public getEntry(id: string | undefined, list: NoteEntry[] = this.content): NoteEntry | undefined {
    if (!id) {
      return undefined
    }

    for (const entry of list) {
      if (entry.id === id) {
        return entry
      } else if (entry.hasChildren()) {
        const deepSearch = this.getEntry(id, entry.children)

        if (deepSearch) {
          return deepSearch
        }
      }
    }

    return undefined
  }

  public getDefinitions(list: NoteEntry[] = this.content): NoteEntry[] {
    const definitions: NoteEntry[] = []

    list.forEach(entry => {
      if (entry.type === EntryType.DEFINITION && entry.children.length === 0) {
        definitions.push(entry)
      } else if (entry.hasChildren()) {
        definitions.push(...this.getDefinitions(entry.children))
      }
    })

    return definitions
  }

  public getRandomDefinition(): NoteEntry {
    const definitions = this.getDefinitions()

    return definitions[Math.floor(Math.random() * definitions.length)]
  }

  public setContentParentIds(content = this.content, id = ""): void {
    content.forEach(entry => {
      entry.parentId = id

      if (entry.hasChildren()) {
        this.setContentParentIds(entry.children, entry.id)
      }
    })
  }

  static async fetch(id: string, invite = false, edit = false): Promise<Note | string> {
    return await axios.get("/api/notes/view/" + id + "?invite=" + invite)
      .then(res => {
        let note = res.data.note as Note

        if (!note) {
          return "not-found"
        }

        if (!invite) {
          if (note.content == null) {
            return "content-invalid"
          }

          note.content = note.content.map(NoteEntry.fromJSON)
        }

        note.author = new Author(note.author.id, note.author.username)

        if (note.sharedWith) {
          note.sharedWith = note.sharedWith.map(s => new NoteMember(s.user.id, s.user.username, s.canWrite, s.canManagePerms))
        }

        note = new Note(note.id, note.inviteId, note.title, note.author, note.updatedAt, note.createdAt, note.content, new Permissions(note.perms.write, note.perms.managePerms))
        note.setContentParentIds()

        return note
      })
      .catch(err => {
        return err.response.data.error
      })
  }

}