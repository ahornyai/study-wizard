import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router-dom"
import { useAsyncResource } from "use-async-resource"
import { ReactNode, useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faPenSquare, faTrash, faUsersCog } from "@fortawesome/free-solid-svg-icons"
import Button from "../../elements/components/Button"
import { toast, ToastContainer } from "react-toastify"
import Modal from "../../elements/components/Modal"
import Note from "../../classes/note"
import NoteEntry, { EntryType } from "../../classes/noteEntry"

const depthListStyle = [
  "disc",
  "circle",
  "square"
]

const renderEntry = (entry: NoteEntry): ReactNode => {
  if (!entry.hasChildren()) {
    if (entry.depth === 0) {
      return (
        <p className="break-words" key={ entry.id }>{ entry.asString() }</p>
      )
    }

    return (
      <li className="break-words" key={ entry.id }>{ entry.asString() }</li>
    )
  }

  const title = entry.asString() + (entry.type === EntryType.DEFINITION ? ":" : "")

  return (
    <div key={ entry.id }>
      { entry.depth === 0 ? <p className="break-words">{ title } </p> : <li className="break-words">{ title } </li> }
      <ul className="list-disc ml-8" style={ { listStyleType: depthListStyle[entry.depth % depthListStyle.length] } }>
        { entry.children.map(renderEntry) }
      </ul>
    </div>
  )
}

const ViewNote = () => {
    const { t } = useTranslation()
    const { id } = useParams()
    const [ resource ] = useAsyncResource(Note.fetchNote, parseInt(id || "-1"))
    const navigate = useNavigate()
    const note = resource()
    const deleteButton = useRef<HTMLDivElement>(null)
    const usersButton = useRef<HTMLDivElement>(null)

    if (note === null) {
      return (
        <div className="container mx-auto py-16 text-center lg:w-8/12 text-white">
          <h1 className="text-3xl font-bold mb-3">{ t('view-note.title') }</h1>
          <h2 className="text-xl">{ t('view-note.not-found') }</h2>
        </div>
      )
    }

    return (
      <div className="container py-16 h-full text-gray-100 lg:flex">
        <ToastContainer className="lg:mt-20 mt-5" theme="dark" />
        <FontAwesomeIcon className="text-gray-100 hover:text-blue-400 cursor-pointer hidden lg:inline-block fixed left-[calc(16.67%-1em)]" onClick={ () => navigate("/notes") } icon={ faArrowLeft } size="3x" />
        
        <div className="flex lg:space-x-3 lg:space-y-0 space-y-3 lg:w-8/12 mx-auto lg:flex-nowrap flex-wrap">
          <div className="card w-full">
            <div className="card-header">
              <h1 className="text-3xl font-bold text-green-400 inline">{ note.title }</h1>
              <hr className="border-gray-500 mt-3" />
            </div>

            <div className="card-body mt-2 text-lg">
              {
                note?.content?.map(renderEntry)
              }
            </div>
          </div>
          <div className="flex space-y-3 flex-wrap lg:w-10/12">
            <div className="card space-y-3 w-full h-auto">
              <div>
                <span className="text-xl text-gray-300">{ t("definitions") }</span>
                <span className="text-xl ml-2 text-gray-400">60% (30/50)</span>

                <div className="w-full bg-gray-900 h-4 rounded-lg mt-2">
                  <div className="bg-green-500 h-full rounded-lg" style={ { width: '60%' } } ></div>
                </div>
              </div>
              <div>
                <span className="text-xl text-gray-300">{ t("view-note.note-memorizing") }</span>
                <span className="text-xl ml-2 text-gray-400">30% (15/50)</span>

                <div className="w-full bg-gray-900 h-4 rounded-lg mt-2">
                  <div className="bg-blue-500 h-full rounded-lg" style={ { width: '30%' } } ></div>
                </div>
              </div>
              <div>
                <span className="text-xl text-gray-300">{ t("view-note.overall") }</span>
                <span className="text-xl ml-2 text-gray-400">45% (45/100)</span>

                <div className="w-full bg-gray-900 h-4 rounded-lg mt-2">
                  <div className="bg-pink-500 h-full rounded-lg" style={ { width: '45%' } } ></div>
                </div>
              </div>
            </div>
            <div className="card grid grid-cols-3 lg:gap-6 gap-3 w-full">
              <Button size="sm" text={ t("view-note.learn-definitions") } />
              <Button size="sm" text={ t("view-note.memorize-note") } />
              <Button size="sm" text={ t("view-note.write-test") } />
            </div>
            <div className="card grid grid-cols-3 justify-items-center w-full">
              <div className="text-center cursor-pointer hover:text-blue-500 text-blue-400" onClick={ () => navigate("/notes/edit/" + note.id) }>
                <FontAwesomeIcon size="2x" icon={ faPenSquare } />
                <p>{ t("view-note.edit") }</p>
              </div>
              <div ref={ deleteButton } className="text-center cursor-pointer hover:text-red-500 text-red-400">
                <FontAwesomeIcon size="2x" icon={ faTrash } />
                <p>{ t("view-note.delete") }</p>
              </div>
              <div ref={ usersButton } className="text-center cursor-pointer hover:text-yellow-500 text-yellow-400">
                <FontAwesomeIcon size="2x" icon={ faUsersCog } />
                <p>{ t("view-note.manage-users") }</p>
              </div>
            </div>
          </div>
        </div>

        <Modal title={"Confirmation"} 
          toggleButton={deleteButton} 
          content={<p>Are you sure you want to delete this note?</p>} 
          footer={
            <>
              <button className="px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-600 mr-2 modal-close">Go back</button>
              <button className="px-4 bg-red-500 p-3 rounded-lg text-white hover:bg-red-600" onClick={ () => navigate("/notes") }>Delete</button>
            </>
          } />
      </div>
    )
}

export default ViewNote