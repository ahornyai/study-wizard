import { useRef, useState } from 'react';
import { createPopper } from '@popperjs/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faStickyNote, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import OutsideClickHandler from 'react-outside-click-handler';

import CreateNoteEntry from '../components/CreateNoteEntry';

export type CardType = 'definition' | 'note'

interface CreateNoteCardProps {
    cardType: CardType
    depth?:number
}

const CreateNoteCard = (props:CreateNoteCardProps) => {
    const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false)
    const btnDropdownRef = useRef(null)
    const popoverDropdownRef = useRef(null)
    const isDefinition = props.cardType === 'definition'

    const openDropdownPopover = () => {
        if (!(btnDropdownRef.current && popoverDropdownRef.current)) {
            return
        }

        createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
            placement: "bottom",
        })
        
        setDropdownPopoverShow(true)
    }

    const closeDropdownPopover = () => {
        setDropdownPopoverShow(false)
    }

    return (
        <div className="bg-gray-800 p-3 flex rounded-lg lg:mx-auto space-x-4 lg:w-1/2">
            <CreateNoteEntry type={ isDefinition ? "term" : "note" } />

            { isDefinition ? 
            <span className="font-bold text-green-500 mt-1">│</span> :
            <OutsideClickHandler onOutsideClick={ closeDropdownPopover }>
                <FontAwesomeIcon onClick={ dropdownPopoverShow ? closeDropdownPopover : openDropdownPopover } forwardedRef={ btnDropdownRef } className="font-bold text-2xl text-gray-300 hover:text-blue-400 !ml-2 !mr-3 mt-[6px]" icon={ faPlus } />
                
                <div ref={popoverDropdownRef} className={ (dropdownPopoverShow ? "block " : "hidden ") + "dropdown" } >
                    <p className="dropdown-link">
                        <FontAwesomeIcon className="text-green-300" icon={ faStickyNote } /> <span className="dropdown-text">Note</span>
                    </p>
                    <p className="dropdown-link">
                        <FontAwesomeIcon className="text-green-300" icon={ faQuoteRight } /> <span className="dropdown-text">Definition</span>
                    </p>
                </div>
            </OutsideClickHandler>
            }
            
            { isDefinition && 
            <CreateNoteEntry type={ "definition" } />
            }
        </div>
    )
}

export default CreateNoteCard