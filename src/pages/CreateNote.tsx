import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid';
import { arrayMoveImmutable } from 'array-move';

import CreateNoteHeader from "../elements/create_note/CreateNoteHeader"
import AddNoteCard from "../elements/create_note/AddNoteEntry"
import { EntryType } from "../elements/create_note/CreateNoteCard"
import NoteEntryList from '../elements/components/NoteEntryList';

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
  let [lastAdded, setLastAdded] = useState<NoteEntry|null>(null)

  useEffect(() => {
      if (lastAdded === null)
        return

      document.getElementById(lastAdded.id)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [lastAdded])

  return (
    <div className="text-white container mx-auto py-16 text-center">
      <h1 className="text-3xl font-bold">Create note</h1>

      <div className="grid grid-cols-1 mt-10 gap-3">
        <CreateNoteHeader />
        <NoteEntryList children={entries}
          lockAxis="y"
          axis="y"
          shouldCancelStart={ (e: any) => ['input', 'textarea', 'select', 'option', 'button', 'path', 'svg', 'span'].indexOf(e.target.tagName.toLowerCase()) !== -1 || e.target.onclick }
          addNoteEntry={ (type, depth, parent) => {
            const newNote = new NoteEntry(type, depth, [], parent);
            setLastAdded(newNote)

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
          } }
          onSortEnd={ ({oldIndex, newIndex}) => {
            setEntries(arrayMoveImmutable(
              entries,
              oldIndex,
              newIndex,
            )) }}
          onSortChildren={ (oldIndex, newIndex, parent) => {
            if (!parent)
              return

            parent.children = arrayMoveImmutable(
              parent.children,
              oldIndex,
              newIndex,
            )

            setEntries([...entries]) 
          }} />
        <AddNoteCard addNoteEntry={ (type) => {
          const newNote = new NoteEntry(type);
          setLastAdded(newNote)

          setEntries([...entries, newNote])
        } } />
      </div>
    </div>
  )
}

export default CreateNote
