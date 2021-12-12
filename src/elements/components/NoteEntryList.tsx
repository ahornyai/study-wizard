import { SortableContainer } from "react-sortable-hoc"
import { NoteEntry } from "../../pages/CreateNote"
import { CreateNoteCard, EntryType } from "../create_note/CreateNoteCard"

interface NoteEntryListProps {
    children: NoteEntry[]
    addNoteEntry: (type:EntryType, depth:number, parent:NoteEntry) => void
    removeNoteEntry: (noteEntry: NoteEntry) => void
}
    
const NoteEntryList = SortableContainer(({children, addNoteEntry, removeNoteEntry}:NoteEntryListProps) => {
    return (<div className="grid grid-cols-1 gap-3 cursor-move">
        {children.map((entry, index) => (
            <CreateNoteCard key={ entry.id }
                index={ index }
                data={ entry }
                addNoteEntry={ addNoteEntry }
                removeNoteEntry={ removeNoteEntry } />
        ))}
    </div>)
})

export default NoteEntryList