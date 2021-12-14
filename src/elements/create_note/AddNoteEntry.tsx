import Button from "../components/Button"
import { EntryType } from "./CreateNoteCard"

interface AddNoteCardProps {
    addNoteEntry: (type:EntryType) => void
}

const AddNoteCard = (props:AddNoteCardProps) => {
    return (
        <div className="bg-gray-800 p-3 pl-5 pr-5 grid grid-cols-2 gap-8 rounded-lg lg:mx-auto">
            <Button onClick={ () => props.addNoteEntry(EntryType.NOTE) } text="Add note" size="sm" />
            <Button onClick={ () => props.addNoteEntry(EntryType.DEFINITION) } text="Add definition" size="sm" />
        </div>
    )
}

export default AddNoteCard