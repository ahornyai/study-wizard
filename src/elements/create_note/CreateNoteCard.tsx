import { useRef, useState } from 'react';
import { createPopper } from '@popperjs/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faStickyNote, faQuoteRight, faTrash, faAngleLeft, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import OutsideClickHandler from 'react-outside-click-handler';
import { SortableElement } from 'react-sortable-hoc';

import { NoteEntry } from '../../pages/CreateNote';
import CreateNoteEntry from '../components/CreateNoteEntry';

export enum EntryType {
    NOTE,
    DEFINITION
}

interface CreateNoteCardProps {
    className?: string
    data: NoteEntry
    addNoteEntry: (type:EntryType, depth:number, parent:NoteEntry) => void
    removeNoteEntry: (entry:NoteEntry) => void
}

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

export const CreateNoteCard = SortableElement(({ className = "", data, addNoteEntry, removeNoteEntry }:CreateNoteCardProps) => {
    const { id, type, depth, children } = data;
    const [dropdownShow, setDropdown] = useState(false)
    const [expanded, setExpanded] = useState(true)
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
        <div id={ id } className={ "lg:mx-auto " + (depth === 0 ? "lg:w-1/2 " : "") + className } style={ depth !== 0 ? { paddingLeft: 10 } : {} } >
            <div className={ "bg-gray-800 p-3 flex rounded-lg space-x-4" } >
                <CreateNoteEntry className={ data.hasChildren() ? "mr-2" : "" } entry={ data } type={ type === EntryType.DEFINITION ? "term" : "note" } />

                { (type === EntryType.DEFINITION && !data.hasChildren()) && 
                <span className="font-bold text-green-500 mt-1 select-none">│</span>
                }
                
                { (type === EntryType.DEFINITION && !data.hasChildren()) && 
                <CreateNoteEntry entry={ data } type={ "definition" } />
                }

                { data.hasChildren() &&
                <FontAwesomeIcon onClick={ () => setExpanded(!expanded) } className={ "font-bold text-3xl text-gray-300 hover:text-blue-400 mt-1 !mr-0 !ml-0 cursor-pointer" } icon={ expanded ? faAngleDown : faAngleLeft } fixedWidth={ true } />
                }
                
                <div className={ "!ml-" + (data.hasChildren() ? "2" : "4") }>
                    <OutsideClickHandler onOutsideClick={ closeDropdown }>
                        <FontAwesomeIcon onClick={ dropdownShow ? closeDropdown : openDropdown } forwardedRef={ btnDropdownRef } className={ "font-bold text-xl text-gray-300 hover:text-blue-400 !mr-2 mt-2 cursor-pointer" } icon={ faPlus } />
                        
                        <div ref={popoverDropdownRef} className={ (dropdownShow ? "block " : "hidden ") + "dropdown select-none " } >
                            <p className="dropdown-link" onClick={ () => addNoteEntry(EntryType.NOTE, depth+1, data) } >
                                <FontAwesomeIcon className="text-green-300" icon={ faStickyNote } /> <span className="dropdown-text">Note</span>
                            </p>
                            <p className="dropdown-link" onClick={ () => addNoteEntry(EntryType.DEFINITION, depth+1, data) } >
                                <FontAwesomeIcon className="text-green-300" icon={ faQuoteRight } /> <span className="dropdown-text">Definition</span>
                            </p>
                        </div>
                    </OutsideClickHandler>
                </div>

                <FontAwesomeIcon onClick={ () => removeNoteEntry(data) } className="font-bold text-xl text-red-400 hover:text-red-500 !ml-1 !mr-3 mt-2 cursor-pointer" icon={ faTrash } />
            </div>

            { expanded &&
            <div className={ "border-l-2 border-solid " + colorDepthArray[depth] } style={ depth !== 0 ? { marginLeft: 20 } : {} } >
                { children.map((child, index) => <CreateNoteCard index={ index } className="mt-4" key={ child.id } data={ child } removeNoteEntry={ removeNoteEntry } addNoteEntry={ addNoteEntry } /> ) }
            </div>
            }
        </div>
    )
})