import Button from "../components/Button"
import { CardType } from "./CreateNoteCard"

interface AddNoteCardProps {
    addNoteElement: (type:CardType) => void
}

const AddNoteCard = (props:AddNoteCardProps) => {
    return (
        <div className="bg-gray-800 p-3 pl-5 pr-5 grid grid-cols-2 gap-8 rounded-lg lg:mx-auto lg:w-1/4">
            <Button onClick={ () => props.addNoteElement('note') } text="Add note" size="sm" />
            <Button onClick={ () => props.addNoteElement('definition') } text="Add definition" size="sm" />
        </div>
    )
}

export default AddNoteCard