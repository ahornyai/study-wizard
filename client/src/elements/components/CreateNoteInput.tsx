import { useState, useEffect, useRef } from 'react'
import { NoteEntry } from '../../pages/dashboard/CreateNote'

interface CreateNoteEntryProps {
    type: 'note' | 'term' | 'definition'
    className?: string
    entry: NoteEntry
}

const sizing = {
    note: "w-full",
    term: "w-1/3",
    definition: "w-2/3"
}

const CreateNoteInput = ({ type, className = "", entry }:CreateNoteEntryProps) => {
    let [isDone, setDone] = useState(false)
    let input = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (isDone && input.current !== null && input.current !== document.activeElement) {
            if (input.current.value.trim().length === 0) {
                setDone(false)
                return
            }

            input.current.blur()
        }
    }, [isDone]);

    return (
        <input onFocus={ () => setDone(false) } 
            onKeyPress={ e => e.key === 'Enter' ? setDone(true) : null } 
            onBlur={ () => setDone(true) }
            type="text" 
            placeholder={ type === "note" && entry.children.length !== 0 ? "title" : type } 
            className={ "item text-input placeholder-capital " + (isDone ? "bg-gray-800 " : "") + (type === "term" && entry.hasChildren() ? "w-full" : sizing[type]) + " " + className }
            ref={ input } />
    )
}

export default CreateNoteInput;