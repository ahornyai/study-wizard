import { faUserShield, faTrash, faCheckSquare, faSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { createPopper } from "@popperjs/core"
import axios from "axios"
import { useContext, useEffect } from "react"
import { useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import OutsideClickHandler from "react-outside-click-handler"
import Note from "../../classes/note"
import NoteMember from "../../classes/note_member"
import { UserContext } from "../../contexts/UserContext"
import Avatar from "../components/Avatar"

interface InvitedUserElementProps {
  note: Note
  member: NoteMember
  onRemove: () => void
}

const InvitedUserElement = ({ note, member, onRemove }: InvitedUserElementProps) => {
  const [dropdownShow, setDropdown] = useState(false)
  const btnDropdownRef = useRef(null)
  const popoverDropdownRef = useRef(null)
  const [canWrite, setCanWrite] = useState(member.canWrite)
  const [canManagePerms, setCanManagePerms] = useState(member.canManagePerms)
  const { user } = useContext(UserContext)
  const { t } = useTranslation()

  useEffect(() => {
    if (!(btnDropdownRef.current && popoverDropdownRef.current)) {
      return
    }

    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-end",
    })
  }, [btnDropdownRef, popoverDropdownRef])

  const handlePermissionChange = (permission: string, value: boolean) => {
    axios.post("/api/notes/manage-member/permission", {
      noteId: note.id,
      memberId: member.user.id,
      permission,
      value
    }).then(() => {
      permission === "write" ? setCanWrite(value) : setCanManagePerms(value)
    }).catch((err) => {
      console.error(err)
    })
  }

  return (
    <div className="flex bg-gray-800 rounded-lg p-2 px-3">
      <div className="flex-1 flex items-center space-x-3">
        <Avatar image={member.user.avatar} className="inline-block" />
        <span>{member.user.username}</span>
      </div>

      <div className="flex space-x-3 items-center">
        <OutsideClickHandler onOutsideClick={() => setDropdown(false)}>
          <FontAwesomeIcon onClick={() => setDropdown(!dropdownShow)} forwardedRef={btnDropdownRef} className={"text-green-400 hover:text-green-500 cursor-pointer"} icon={faUserShield} />

          <div ref={popoverDropdownRef} className={(dropdownShow ? "block " : "hidden ") + "dropdown select-none "} >
            <p className="dropdown-link text-center hover:text-gray-200 cursor-default">{t("permissions")}</p>
            <p className="dropdown-link" onClick={() => handlePermissionChange("write", !canWrite)}>
              <FontAwesomeIcon className="text-green-300" icon={canWrite ? faCheckSquare : faSquare} /> <span className="dropdown-text">{t("write")}</span>
            </p>
            {
              member.user.id !== user.id &&
              <p className="dropdown-link" onClick={() => handlePermissionChange("manage", !canManagePerms)}>
                <FontAwesomeIcon className="text-green-300" icon={canManagePerms ? faCheckSquare : faSquare} /> <span className="dropdown-text">{t("view-note.manage-perms")}</span>
              </p>
            }
          </div>
        </OutsideClickHandler>
        <FontAwesomeIcon className="text-red-400 hover:text-red-500 cursor-pointer" size="lg" icon={faTrash} onClick={onRemove} />
      </div>
    </div>
  )
}

export default InvitedUserElement