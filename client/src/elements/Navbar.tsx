import { useRef, useState } from "react"
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBars,
  faCog,
  faSignOutAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons"
import { faGithub } from "@fortawesome/free-brands-svg-icons"

import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-jdenticon-sprites';

import { createPopper } from "@popperjs/core";

import Avatar from "./components/Avatar"
import Button from "./components/Button"
import OutsideClickHandler from "react-outside-click-handler";

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [dropdownOpen, setDropdown] = useState(false)
    const avatarDropdownRef = useRef(null)
    const popoverDropdownRef = useRef(null)
    const navigate = useNavigate();

    let dropdownInited = false

    const openDropdown = () => {
        if (!(avatarDropdownRef.current && popoverDropdownRef.current)) {
            return
        }
        
        if (!dropdownInited) {
            createPopper(avatarDropdownRef.current, popoverDropdownRef.current, {
                placement: "bottom",
            })
            
            dropdownInited = true
        }
        
        setDropdown(true)
    }

    const closeDropdown = () => {
        setDropdown(false)
    }

    let avatar = createAvatar(style, {
      seed: 'sustown',
      dataUri: true
    });

    return (
        <div className="flex items-center h-20 px-6 justify-between bg-gray-800 text-gray-100 relative z-50">
          <div className="items-center">
            <h1 className="font-bold text-2xl">StudyWizard</h1>
          </div>
          <div className="flex-1 ml-10 items-center hidden lg:flex">
            <button
              onClick={() => navigate("/")}
              className="no-underline px-2 mr-3 text-gray-200 font-medium hover:text-blue-400"
            >
              Home
            </button>
            <button
              onClick={() => navigate("/notes")}
              className="no-underline px-2 mr-3 font-medium hover:text-blue-400"
            >
              My notes
            </button>
            <button
              onClick={() => navigate("/shared_notes")}
              className="no-underline px-2 mr-3 font-medium hover:text-blue-400"
            >
              Shared notes
            </button>
          </div>
          <div className="items-center hidden lg:flex">
            <Button onClick={() => navigate("/create_note")} text="Create note" size="sm" />
            <FontAwesomeIcon
              icon={ faGithub }
              onClick={ () => window.location.replace("https://github.com/ahornyai/study-wizard/") }
              className="ml-6 text-2xl cursor-pointer"
            />
            <OutsideClickHandler onOutsideClick={ closeDropdown }>
              <Avatar
                onClick={ dropdownOpen ? closeDropdown : openDropdown } 
                forwardedRef={ avatarDropdownRef }
                image={ avatar }
                className="ml-6 cursor-pointer"
              />

              <div ref={popoverDropdownRef} className={ (dropdownOpen ? "block " : "hidden ") + "dropdown select-none " } >
                  <p className="dropdown-link" >
                      <FontAwesomeIcon className="text-green-300" icon={ faCog } /> <span className="dropdown-text">Settings</span>
                  </p>
                  <p className="dropdown-link" >
                      <FontAwesomeIcon className="text-green-300" icon={ faSignOutAlt } /> <span className="dropdown-text">Sign out</span>
                  </p>
              </div>
            </OutsideClickHandler>
          </div>
          <FontAwesomeIcon
            icon={mobileOpen ? faTimes : faBars}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-white text-3xl cursor-pointer lg:hidden"
          />
          {mobileOpen && (
            <div className="bg-gray-700 absolute top-full left-0 flex flex-col w-full pb-8 lg:hidden">
              <div className="flex-1 flex flex-col items-center text-xl">
                <button
                  onClick={() => {navigate("/"); setMobileOpen(false)}}
                  className="no-underline px-2 my-2 text-gray-200 font-medium hover:text-blue-400"
                >
                  Home
                </button>
                <button
                  onClick={() => {navigate("/notes"); setMobileOpen(false)}}
                  className="no-underline px-2 my-2 font-medium hover:text-blue-400"
                >
                  My notes
                </button>
                <button
                  onClick={() => {navigate("/shared_notes"); setMobileOpen(false)}}
                  className="no-underline px-2 my-2 font-medium hover:text-blue-400"
                >
                  Shared notes
                </button>
                <Button onClick={() => {navigate("/create_note"); setMobileOpen(false)}} text="Create note" size="sm" className="my-2" />
                <div className="my-2 flex justify-center">
                  <FontAwesomeIcon
                    icon={ faGithub }
                    onClick={ () => window.location.replace("https://github.com/ahornyai/study-wizard/") }
                    className="text-2xl mx-2 cursor-pointer"
                  />
                </div>
                <OutsideClickHandler onOutsideClick={ closeDropdown }>
                  <Avatar
                    onClick={ dropdownOpen ? closeDropdown : openDropdown } 
                    forwardedRef={ avatarDropdownRef }
                    image={ avatar }
                    className="cursor-pointer my-2"
                  />

                  <div ref={popoverDropdownRef} className={ (dropdownOpen ? "block " : "hidden ") + "dropdown select-none bg-gray-800" } >
                      <p className="dropdown-link bg-gray-700" >
                          <FontAwesomeIcon className="text-green-300" icon={ faCog } /> <span className="dropdown-text">Settings</span>
                      </p>
                      <p className="dropdown-link bg-gray-700" >
                          <FontAwesomeIcon className="text-green-300" icon={ faSignOutAlt } /> <span className="dropdown-text">Sign out</span>
                      </p>
                  </div>
                </OutsideClickHandler>
              </div>
            </div>
          )}
        </div>
    )
}

export default Navbar;