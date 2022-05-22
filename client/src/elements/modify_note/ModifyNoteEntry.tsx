import { useRef, useState } from 'react';
import { createPopper } from '@popperjs/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faStickyNote, faQuoteRight, faTrash, faAngleLeft, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import OutsideClickHandler from 'react-outside-click-handler';
import { SortableElement } from 'react-sortable-hoc';

import CreateNoteInput from '../components/CreateNoteInput';
import NoteEntryList from '../components/NoteEntryList';
import NoteEntry, { EntryType } from '../../classes/note_entry';
import { useTranslation } from 'react-i18next';

interface ModifyNoteEntryProps {
  className?: string
  data: NoteEntry
  addNoteEntry: (type: EntryType, depth: number, parent: NoteEntry) => void
  removeNoteEntry: (entry: NoteEntry) => void
  onSortChildren: (oldIndex: number, newIndex: number, parent?: NoteEntry) => void
}

const ModifyNoteEntry = SortableElement(({ className = "", data, addNoteEntry, removeNoteEntry, onSortChildren }: ModifyNoteEntryProps) => {
  const { id, type, depth, children } = data
  const [dropdownShow, setDropdown] = useState(false)
  const [expanded, setExpanded] = useState(true)
  const btnDropdownRef = useRef(null)
  const popoverDropdownRef = useRef(null)
  const { t } = useTranslation()
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
    <div id={id} className={"lg:mx-auto " + (depth === 0 ? "lg:w-1/2 " : "w-full mt-4 ") + className} style={depth !== 0 ? { paddingLeft: 10 } : {}} >
      <div className={"bg-gray-800 p-3 flex rounded-lg space-x-4"} >
        <CreateNoteInput className={data.hasChildren() ? "mr-2" : ""} entry={data} type={type === EntryType.DEFINITION ? "term" : "note"} />

        {(type === EntryType.DEFINITION && !data.hasChildren()) &&
          <span className="font-bold text-green-500 mt-1 select-none">│</span>
        }

        {(type === EntryType.DEFINITION && !data.hasChildren()) &&
          <CreateNoteInput entry={data} type={"definition"} />
        }

        {data.hasChildren() &&
          <FontAwesomeIcon onClick={() => setExpanded(!expanded)} className={"font-bold text-3xl text-gray-300 hover:text-blue-400 mt-1 !mr-0 !ml-0 cursor-pointer"} icon={expanded ? faAngleDown : faAngleLeft} fixedWidth={true} />
        }

        <div className={"!ml-" + (data.hasChildren() ? "2" : "4") + " " + (depth > 7 ? "hidden" : "")}>
          <OutsideClickHandler onOutsideClick={closeDropdown}>
            <FontAwesomeIcon onClick={dropdownShow ? closeDropdown : openDropdown} forwardedRef={btnDropdownRef} className={"font-bold text-xl text-gray-300 hover:text-blue-400 !mr-2 mt-2 cursor-pointer"} icon={faPlus} />

            <div ref={popoverDropdownRef} className={(dropdownShow ? "block " : "hidden ") + "dropdown select-none "} >
              <p className="dropdown-link" onClick={() => addNoteEntry(EntryType.NOTE, depth + 1, data)} >
                <FontAwesomeIcon className="text-green-300" icon={faStickyNote} /> <span className="dropdown-text">{t("note")}</span>
              </p>
              <p className="dropdown-link" onClick={() => addNoteEntry(EntryType.DEFINITION, depth + 1, data)} >
                <FontAwesomeIcon className="text-green-300" icon={faQuoteRight} /> <span className="dropdown-text">{t("definition")}</span>
              </p>
            </div>
          </OutsideClickHandler>
        </div>

        <FontAwesomeIcon onClick={() => removeNoteEntry(data)} className={"font-bold text-xl text-red-400 hover:text-red-500 !ml-1 !mr-3 mt-2 cursor-pointer " + (depth > 7 ? "!ml-4" : "")} icon={faTrash} />
      </div>

      {(expanded && data.hasChildren()) &&
        <NoteEntryList children={children}
          lockAxis="y"
          axis="y"
          shouldCancelStart={(e: any) => ['input', 'textarea', 'select', 'option', 'button', 'path', 'svg', 'span'].indexOf(e.target.tagName.toLowerCase()) !== -1 || e.target.onclick}
          addNoteEntry={addNoteEntry}
          removeNoteEntry={removeNoteEntry}
          onSortEnd={({ oldIndex, newIndex }) => onSortChildren(oldIndex, newIndex, data)}
          onSortChildren={onSortChildren}
          depth={depth} />
      }
    </div>
  )
})

export default ModifyNoteEntry