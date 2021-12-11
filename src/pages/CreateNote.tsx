import CreateNoteHeader from "../elements/create_note/CreateNoteHeader"
import AddNoteCard from "../elements/create_note/AddNoteEntry"
import { CreateNoteCard, EntryType } from "../elements/create_note/CreateNoteCard"
import { useEffect, useState } from "react"
import { nanoid } from 'nanoid';

export class NoteEntry {
  id: string
  type: EntryType
  depth: number
  children: NoteEntry[]

  constructor(type: EntryType, depth: number = 0, children: NoteEntry[] = []) {
    this.type = type
    this.depth = depth
    this.children = children
    this.id = nanoid()
  }

}

const CreateNote = () => {
  let [entries, setEntries] = useState<NoteEntry[]>([new NoteEntry(EntryType.NOTE, 0, [new NoteEntry(EntryType.NOTE, 1, [])])])

  useEffect(() => {
    window.scroll({left: 0, top: document.body.scrollHeight, behavior: "smooth" })
  }, [entries])

  return (
    <div className="text-white container mx-auto py-16 text-center">
      <h1 className="text-3xl font-bold">Create note</h1>

      <div className="grid grid-cols-1 mt-10 gap-3">
        <CreateNoteHeader />
        <div className="grid grid-cols-1 gap-3">
          {entries.map(entry => (
            <CreateNoteCard key={ entry.id }
              data={ entry }
              addNoteEntry={ (type, depth, parent) => {
                parent.children.push(new NoteEntry(type, depth))
                setEntries([...entries]) 
              }
            } />
          ))}
        </div>
        <AddNoteCard addNoteEntry={ (type) => setEntries([...entries, new NoteEntry(type)]) } />
      </div>
    </div>
  )
}

export default CreateNote
