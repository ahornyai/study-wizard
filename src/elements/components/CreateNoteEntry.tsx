import { useState, useEffect, useRef } from 'react'

interface CreateNoteEntryProps {
    type: 'note' | 'term' | 'definition'
}

const sizing = {
    note: "w-full",
    term: "w-1/3",
    definition: "w-2/3"
}

const CreateNoteEntry = (props:CreateNoteEntryProps) => {
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
            placeholder={ props.type } 
            className={ "item text-input " + (isDone ? "bg-gray-800 " : "") + (sizing[props.type]) }
            ref={ input } />
    )
}

export default CreateNoteEntry;