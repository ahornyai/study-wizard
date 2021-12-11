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
  parent?: NoteEntry

  constructor(type: EntryType, depth: number = 0, children: NoteEntry[] = [], parent?: NoteEntry) {
    this.type = type
    this.depth = depth
    this.children = children
    this.id = nanoid()
    this.parent = parent
  }

  hasChildren(): boolean {
    return this.children.length > 0
  }
}

const CreateNote = () => {
  let [entries, setEntries] = useState<NoteEntry[]>([])
  let [lastModified, setLastModified] = useState<NoteEntry|null>(null)

  useEffect(() => {
    if (lastModified === null)
      return

    document.getElementById(lastModified.id)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [lastModified])

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
                const newNote = new NoteEntry(type, depth, [], parent);
                setLastModified(newNote)

                parent.children.push(newNote)
                setEntries([...entries]) 
              } }
              removeNoteEntry={ (entry) => {
                if (entry.parent) {
                  entry.parent.children.splice(entry.parent.children.indexOf(entry), 1)
                }else {
                  entries.splice(entries.indexOf(entry), 1)
                }

                setEntries([...entries]) 
              } 
            } />
          ))}
        </div>
        <AddNoteCard addNoteEntry={ (type) => {
          const newNote = new NoteEntry(type);
          setLastModified(newNote)

          setEntries([...entries, newNote])
        } } />
      </div>
    </div>
  )
}

export default CreateNote
