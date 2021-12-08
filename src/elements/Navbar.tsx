import { useState } from "react"
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons"
import { faGithub } from "@fortawesome/free-brands-svg-icons"

import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-jdenticon-sprites';

import Avatar from "./components/Avatar"
import Button from "./components/Button"

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false)
    const navigate = useNavigate();

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
            <button
              onClick={() => navigate("/settings")}
              className="no-underline px-2 mr-3 text-gray-200 font-medium hover:text-blue-400"
            >
              Settings
            </button>
          </div>
          <div className="items-center hidden lg:flex">
            <Button text="Create note" size="sm" />
            <FontAwesomeIcon
              icon={faGithub}
              className="ml-6 text-2xl cursor-pointer"
            />
            <Avatar
              image={avatar}
              className="ml-6 cursor-pointer"
            />
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
                  onClick={() => navigate("/")}
                  className="no-underline px-2 my-2 text-gray-200 font-medium hover:text-blue-400"
                >
                  Home
                </button>
                <button
                  onClick={() => navigate("/notes")}
                  className="no-underline px-2 my-2 font-medium hover:text-blue-400"
                >
                  My notes
                </button>
                <button
                  onClick={() => navigate("/shared_notes")}
                  className="no-underline px-2 my-2 font-medium hover:text-blue-400"
                >
                  Shared notes
                </button>
                <button
                  onClick={() => navigate("/settings")}
                  className="no-underline px-2 my-2 text-gray-200 font-medium hover:text-blue-400"
                >
                  Settings
                </button>
                <Button text="Create note" size="sm" className="my-2" />
                <div className="my-2 flex justify-center">
                  <FontAwesomeIcon
                    icon={faGithub}
                    className="text-2xl mx-2 cursor-pointer"
                  />
                </div>
                <Avatar
                  image={avatar}
                  className="cursor-pointer my-2"
                />
              </div>
            </div>
          )}
        </div>
    )
}

export default Navbar;