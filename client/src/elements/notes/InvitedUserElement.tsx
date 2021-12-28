import { faUserShield, faTrash, faCheckSquare, faSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { createPopper } from "@popperjs/core"
import { t } from "i18next"
import { useEffect } from "react"
import { useRef, useState } from "react"
import OutsideClickHandler from "react-outside-click-handler"
import Avatar from "../components/Avatar"

interface InvitedUserElementProps {
    username: string
    avatar: string
    onRemove: () => void
}

const InvitedUserElement = ({ username, avatar, onRemove }: InvitedUserElementProps) => {
    const [dropdownShow, setDropdown] = useState(false)
    const btnDropdownRef = useRef(null)
    const popoverDropdownRef = useRef(null)
    const [canWrite, setCanWrite] = useState(false)
    const [canShare, setCanShare] = useState(false)
    
    useEffect(() => {
        if (!(btnDropdownRef.current && popoverDropdownRef.current)) {
            return
        }

        createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
            placement: "bottom-end",
        })
    }, [btnDropdownRef, popoverDropdownRef])

    return (
        <div className="flex bg-gray-800 rounded-lg p-2 px-3">
            <div className="flex-1 flex items-center space-x-3">
                <Avatar image={ avatar } className="inline-block" />
                <span>{ username }</span>
            </div>

            <div className="flex space-x-3 items-center">
                <OutsideClickHandler onOutsideClick={ () => setDropdown(false) }>
                    <FontAwesomeIcon onClick={ () => setDropdown(!dropdownShow) } forwardedRef={ btnDropdownRef } className={ "text-green-400 hover:text-green-500 cursor-pointer" } icon={ faUserShield } />
                    
                    <div ref={popoverDropdownRef} className={ (dropdownShow ? "block " : "hidden ") + "dropdown select-none " } >
                        <p className="dropdown-link text-center hover:text-gray-200 cursor-default">Permissions</p>
                        <p className="dropdown-link" onClick={ () => setCanWrite(!canWrite) }>
                            <FontAwesomeIcon className="text-green-300" icon={ canWrite ? faCheckSquare : faSquare } /> <span className="dropdown-text">{ t("write") }</span>
                        </p>
                        <p className="dropdown-link" onClick={ () => setCanShare(!canShare) }>
                            <FontAwesomeIcon className="text-green-300" icon={ canShare ? faCheckSquare : faSquare } /> <span className="dropdown-text">{ t("share") }</span>
                        </p>
                    </div>
                </OutsideClickHandler>
                <FontAwesomeIcon className="text-red-400 hover:text-red-500 cursor-pointer" size="lg" icon={ faTrash } onClick={ onRemove } />
            </div>
        </div>
    )
}

export default InvitedUserElement