import { useState, useEffect, useRef } from 'react';

type CardType = 'definition' | 'note'

interface CreateNoteCardProps {
    cardType: CardType
    depth?:number
}

const CreateNoteCard = (props:CreateNoteCardProps) => {
    let [isNoteDone, setNoteDone] = useState(false)
    let [isDefinitionDone, setDefinitionDone] = useState(false)

    let note = useRef<HTMLInputElement>(null)
    let definition = useRef<HTMLInputElement>(null)

    let isDefinition = props.cardType === 'definition'

    useEffect(() => {
        if (isNoteDone && note.current !== null && note.current !== document.activeElement) {
            if (note.current.value.trim().length === 0) {
                setNoteDone(false)
                return
            }

            note.current.blur()
        }

        if (isDefinitionDone && definition.current !== null && definition.current !== document.activeElement) {
            if (definition.current.value.trim().length === 0) {
                setDefinitionDone(false)
                return
            }

            definition.current.blur()
        }
    }, [isNoteDone, isDefinitionDone]);

    return (
        <div className="bg-gray-800 p-3 flex rounded-lg lg:mx-auto space-x-4 lg:w-1/2">
            <input onFocus={ () => setNoteDone(false) } 
                onKeyPress={ e => e.key === 'Enter' ? setNoteDone(true) : null } 
                onBlur={ () => setNoteDone(true) }
                type="text" 
                placeholder={ isDefinition ? "Term" : "Note" } 
                className={ "item text-input " + (isNoteDone ? "bg-gray-800 " : "") + (isDefinition ? "w-1/3" : "w-full") }
                ref={ note } />

            { isDefinition && 
            <span className="font-bold text-green-500 mt-1">│</span>
            }
            
            { isDefinition && 
            <input onFocus={ () => setDefinitionDone(false) } 
                onKeyPress={ e => e.key === 'Enter' ? setDefinitionDone(true) : null } 
                onBlur={ () => setDefinitionDone(true) }
                type="text" 
                placeholder="Definition" 
                className={ "item text-input w-2/3 " + (isDefinitionDone ? "bg-gray-800" : "") }
                ref={ definition } /> 
            }
        </div>
    )
}

export default CreateNoteCard