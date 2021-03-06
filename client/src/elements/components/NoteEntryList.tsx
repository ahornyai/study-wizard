import { SortableContainer } from "react-sortable-hoc"
import NoteEntry, { EntryType } from "../../classes/note_entry";
import ModifyNoteEntry from "../modify_note/ModifyNoteEntry"

const colorDepthArray = [
  "border-green-300",
  "border-blue-600",
  "border-indigo-600",
  "border-pink-600",
  "border-yellow-400",
  "border-purple-600",
  "border-red-600",
  "border-gray-600",
];

interface NoteEntryListProps {
  children: NoteEntry[]
  addNoteEntry: (type: EntryType, depth: number, parent: NoteEntry) => void
  removeNoteEntry: (noteEntry: NoteEntry) => void
  depth?: number
  onSortChildren: (oldIndex: number, newIndex: number, parent?: NoteEntry) => void
}

const NoteEntryList = SortableContainer<NoteEntryListProps>(({ children, addNoteEntry, removeNoteEntry, depth = -1, onSortChildren }: NoteEntryListProps) => {
  return (<div 
    className={depth !== -1 ? "border-l-2 border-solid " + colorDepthArray[depth] : "grid grid-cols-1 gap-3 w-full cursor-move"} 
    style={depth !== -1 ? { marginLeft: 20, marginTop: 16 } : {}} >
    {children.map((entry, index) => (
      <ModifyNoteEntry key={entry.id}
        index={index}
        data={entry}
        addNoteEntry={addNoteEntry}
        removeNoteEntry={removeNoteEntry}
        onSortChildren={onSortChildren} />
    ))}
  </div>)
})

export default NoteEntryList