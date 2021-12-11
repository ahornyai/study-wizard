import { useRef, useState } from 'react';
import { createPopper } from '@popperjs/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faStickyNote, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { NoteEntry } from '../../pages/CreateNote';
import OutsideClickHandler from 'react-outside-click-handler';

import CreateNoteEntry from '../components/CreateNoteEntry';

export enum EntryType {
    NOTE,
    DEFINITION
}

interface CreateNoteCardProps {
    data: NoteEntry
    addNoteEntry: (type:EntryType, depth:number) => void
}

export const CreateNoteCard = ({ data, addNoteEntry }:CreateNoteCardProps) => {
    const { type, depth, children } = data;
    const [dropdownShow, setDropdown] = useState(false)
    const btnDropdownRef = useRef(null)
    const popoverDropdownRef = useRef(null)
    let dropdownInited = false

    const openDropdown = () => {
        if (!(btnDropdownRef.current && popoverDropdownRef.current)) {
            return
        }
        
        if (!dropdownInited) {
            createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
                placement: "bottom",
            })
            
            dropdownInited = true
        }
        
        setDropdown(true)
    }

    const closeDropdown = () => {
        setDropdown(false)
    }

    return (
        <div className="lg:w-1/2 lg:mx-auto">
            <div className="bg-gray-800 p-3 flex rounded-lg space-x-4 w-full">
                <CreateNoteEntry type={ type === EntryType.DEFINITION ? "term" : "note" } />

                { type === EntryType.DEFINITION ? 
                <span className="font-bold text-green-500 mt-1">│</span> :
                <OutsideClickHandler onOutsideClick={ closeDropdown }>
                    <FontAwesomeIcon onClick={ dropdownShow ? closeDropdown : openDropdown } forwardedRef={ btnDropdownRef } className="font-bold text-2xl text-gray-300 hover:text-blue-400 !ml-2 !mr-3 mt-[6px] cursor-pointer" icon={ faPlus } />
                    
                    <div ref={popoverDropdownRef} className={ (dropdownShow ? "block " : "hidden ") + "dropdown" } >
                        <p className="dropdown-link" onClick={ () => addNoteEntry(EntryType.NOTE, depth+1) } >
                            <FontAwesomeIcon className="text-green-300" icon={ faStickyNote } /> <span className="dropdown-text">Note</span>
                        </p>
                        <p className="dropdown-link" onClick={ () => addNoteEntry(EntryType.DEFINITION, depth+1) } >
                            <FontAwesomeIcon className="text-green-300" icon={ faQuoteRight } /> <span className="dropdown-text">Definition</span>
                        </p>
                    </div>
                </OutsideClickHandler>
                }
                
                { type === EntryType.DEFINITION && 
                <CreateNoteEntry type={ "definition" } />
                }
            </div>

            { children.map(child => <CreateNoteCard key={ child.id } data={ child } addNoteEntry={ addNoteEntry } /> ) }
        </div>
    )
}