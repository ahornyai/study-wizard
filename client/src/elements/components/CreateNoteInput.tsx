import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import NoteEntry from '../../classes/noteEntry'

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
    const [isDone, setDone] = useState(entry.created)
    const input = useRef<HTMLInputElement>(null)
    const { t } = useTranslation()

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
        <input min={ 3 }
            max={ 100 }
            onFocus={ () => setDone(false) } 
            onKeyPress={ e => e.key === 'Enter' ? setDone(true) : null } 
            onChange= { e => entry.values[type === "definition" ? 1 : 0] = e.target.value }
            onBlur={ () => setDone(true) }
            type="text" 
            defaultValue={ entry.values[type === "definition" ? 1 : 0] }
            placeholder={ type === "note" && entry.children.length !== 0 ? t("title") : t(type) } 
            className={ "item text-input placeholder-capital " + (isDone ? "bg-gray-800 " : "") + (type === "term" && entry.hasChildren() ? "w-full" : sizing[type]) + " " + className }
            ref={ input } />
    )
}

export default CreateNoteInput;