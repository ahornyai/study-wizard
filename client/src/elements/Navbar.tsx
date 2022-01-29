import { useContext, useRef, useState } from "react"
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBars,
  faCog,
  faSignOutAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons"
import { faGithub } from "@fortawesome/free-brands-svg-icons"

import { createPopper } from "@popperjs/core";
import OutsideClickHandler from "react-outside-click-handler";

import Avatar from "./components/Avatar"
import Button from "./components/Button"
import { User, UserContext } from "../contexts/UserContext";
import { useTranslation } from "react-i18next";
import axios from "axios";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdown] = useState(false)
  const avatarDropdownRef = useRef(null)
  const popoverDropdownRef = useRef(null)
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext)
  const { t } = useTranslation()

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

  const handleSignOut = () => {
    axios.post("/api/user/signout").then(res => {
      if (res.data.success) {
        setUser(new User())
        setDropdown(false)
        setMobileOpen(false)
        navigate("/login")
      }
    })
  }

  return (
    <div className="flex items-center h-20 px-6 justify-between bg-gray-800 text-gray-100 relative z-30">
      <div className="items-center">
        <h1 className="font-bold text-2xl select-none cursor-pointer" onClick={() => navigate("/")}>StudyWizard</h1>
      </div>
      <div className="flex-1 ml-5 items-center hidden lg:flex">
        <button
          onClick={() => navigate("/")}
          className="no-underline px-2 mr-3 text-gray-200 font-medium hover:text-blue-400"
        >
          {t("home.title")}
        </button>
        <button
          onClick={() => navigate("/notes")}
          className="no-underline px-2 mr-3 font-medium hover:text-blue-400"
        >
          {t("your-notes.title")}
        </button>
        <button
          onClick={() => navigate("/shared-notes")}
          className="no-underline px-2 mr-3 font-medium hover:text-blue-400"
        >
          {t("shared-notes.title")}
        </button>
      </div>
      <div className="items-center hidden lg:flex">
        {user.loggedIn && <Button onClick={() => navigate("/notes/create")} text={t("create-note.title")} size="sm" />}
        <FontAwesomeIcon
          icon={faGithub}
          onClick={() => window.location.replace("https://github.com/ahornyai/study-wizard/")}
          className="ml-6 text-2xl cursor-pointer"
        />
        {user.loggedIn ?
          <OutsideClickHandler onOutsideClick={closeDropdown}>
            <Avatar
              onClick={dropdownOpen ? closeDropdown : openDropdown}
              forwardedRef={avatarDropdownRef}
              image={user.avatar}
              className="ml-6 cursor-pointer"
            />

            <div ref={popoverDropdownRef} className={(dropdownOpen ? "block " : "hidden ") + "dropdown select-none "} >
              <p className="dropdown-link">
                <FontAwesomeIcon className="text-green-300" icon={faCog} /> <span className="dropdown-text">{t("settings")}</span>
              </p>
              <p className="dropdown-link" onClick={handleSignOut} >
                <FontAwesomeIcon className="text-green-300" icon={faSignOutAlt} /> <span className="dropdown-text">{t("sign-out")}</span>
              </p>
            </div>
          </OutsideClickHandler> :
          <div>
            <Button onClick={() => navigate("/login")} text={t("auth.login")} size="sm" className="ml-5" />
            <Button onClick={() => navigate("/register")} text={t("auth.register")} size="sm" className="ml-5" />
          </div>
        }
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
              onClick={() => { navigate("/"); setMobileOpen(false) }}
              className="no-underline px-2 my-2 text-gray-200 font-medium hover:text-blue-400"
            >
              {t("home.title")}
            </button>
            <button
              onClick={() => { navigate("/notes"); setMobileOpen(false) }}
              className="no-underline px-2 my-2 font-medium hover:text-blue-400"
            >
              {t("your-notes.title")}
            </button>
            <button
              onClick={() => { navigate("/shared-notes"); setMobileOpen(false) }}
              className="no-underline px-2 my-2 font-medium hover:text-blue-400"
            >
              {t("shared-notes.title")}
            </button>
            {user.loggedIn && <Button onClick={() => { navigate("/notes/create"); setMobileOpen(false) }} text={t("create-note.title")} size="sm" className="my-2" />}
            <div className="my-2 flex justify-center">
              <FontAwesomeIcon
                icon={faGithub}
                onClick={() => window.location.replace("https://github.com/ahornyai/study-wizard/")}
                className="text-2xl mx-2 cursor-pointer"
              />
            </div>
            {user.loggedIn ?
              <OutsideClickHandler onOutsideClick={closeDropdown}>
                <Avatar
                  onClick={dropdownOpen ? closeDropdown : openDropdown}
                  forwardedRef={avatarDropdownRef}
                  image={user.avatar}
                  className="cursor-pointer my-2"
                />

                <div ref={popoverDropdownRef} className={(dropdownOpen ? "block " : "hidden ") + "dropdown select-none bg-gray-800"} >
                  <p className="dropdown-link bg-gray-700" >
                    <FontAwesomeIcon className="text-green-300" icon={faCog} /> <span className="dropdown-text">{t("settings")}</span>
                  </p>
                  <p className="dropdown-link bg-gray-700" >
                    <FontAwesomeIcon className="text-green-300" icon={faSignOutAlt} /> <span className="dropdown-text" onClick={handleSignOut}>{t("sign-out")}</span>
                  </p>
                </div>
              </OutsideClickHandler> :
              <div>
                <Button onClick={() => { navigate("/login"); setMobileOpen(false) }} text={t("auth.login")} size="sm" className="mt-5 mr-5" />
                <Button onClick={() => { navigate("/register"); setMobileOpen(false) }} text={t("auth.register")} size="sm" className="mt-5" />
              </div>
            }
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar;