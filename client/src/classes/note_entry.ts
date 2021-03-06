import { nanoid } from "nanoid"

export enum EntryType {
  NOTE,
  DEFINITION
}

export default class NoteEntry {
  id: string
  type: EntryType
  depth: number
  children: NoteEntry[]
  values: string[]
  parent?: NoteEntry //for temporary usage
  parentId?: string //persistent
  created: boolean = false

  constructor(type: EntryType, depth: number = 0, children: NoteEntry[] = [], parent?: NoteEntry, values: string[] = [], parentId?: string) {
    this.type = type
    this.depth = depth
    this.children = children
    this.id = nanoid()
    this.parent = parent
    this.parentId = parentId
    this.values = values
  }

  public static fromJSON(json: any): NoteEntry {
    const entry = new NoteEntry(json.type, json.depth, json.children.map((child: any) => NoteEntry.fromJSON(child)), undefined, json.values)
    entry.id = json.id
    entry.created = true

    return entry
  }

  public hasChildren(): boolean {
    return this.children.length > 0
  }

}