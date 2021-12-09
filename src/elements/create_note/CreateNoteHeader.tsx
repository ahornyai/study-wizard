import Button from "../components/Button"

interface CreateNoteHeaderProps {
    className?: string
}

const CreateNoteHeader = ({ className } : CreateNoteHeaderProps) => {
    return (
        <div className={ `bg-gray-800 p-3 rounded-lg lg:mx-auto lg:grid-cols-2 grid gap-3 lg:w-1/2 ${className}` }>
            <input type="text" placeholder="Title" className="text-input" />
            <Button text="Upload file" size="sm" className="justify-self-end" />
        </div>
    )
}

export default CreateNoteHeader