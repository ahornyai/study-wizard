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
    parent?: NoteEntry
    created: boolean = false
  
    constructor(type: EntryType, depth: number = 0, children: NoteEntry[] = [], parent?: NoteEntry, values: string[] = []) {
      this.type = type
      this.depth = depth
      this.children = children
      this.id = nanoid()
      this.parent = parent
      this.values = values
    }
  
    public static fromJSON(json: any): NoteEntry {
      const entry = new NoteEntry(json.type, json.depth, json.children.map((child: any) => NoteEntry.fromJSON(child)), undefined, json.values)
      entry.id = json.id
      entry.created = true
      
      return entry
    }
  
    public asHtml(): any {
      if (this.type === EntryType.NOTE || this.hasChildren()) {
        return this.values[0]
      }
  
      return (<p><span className="underline">{ this.values[0] }</span>: { this.values[1] }</p>)
    }
  
    public hasChildren(): boolean {
      return this.children.length > 0
    }

}