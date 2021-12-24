import axios from "axios"
import { useTranslation } from "react-i18next"
import { Note } from "../../elements/notes/NoteCard"
import { useNavigate, useParams } from "react-router-dom";
import { useAsyncResource } from "use-async-resource";
import { NoteEntry } from "./CreateNote";
import { ReactNode, useRef } from "react";
import { EntryType } from "../../elements/create_note/CreateNoteEntry";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPenSquare, faTrash, faUsersCog } from "@fortawesome/free-solid-svg-icons";
import Button from "../../elements/components/Button";
import { toast, ToastContainer } from "react-toastify";
import Modal from "../../elements/components/Modal";

const depthListStyle = [
  "disc",
  "circle",
  "square"
]

const fetchNote = async (id: number): Promise<Note | null> => {
  if (id === -1 || isNaN(id))
    return null

  return await axios.get("/api/notes/view/" + id)
    .then(res => {
      const note = res.data.note as Note

      if (!note || note.content == null) {
        return null
      }

      note.content = note.content.map(NoteEntry.fromJSON)

      return note
    })
    .catch(err => {
      console.error(err)

      return null
    })
}

const renderEntry = (entry: NoteEntry): ReactNode => {
  if (!entry.hasChildren()) {
    if (entry.depth === 0) {
      return (
        <p key={ entry.id }>{ entry.asString() }</p>
      )
    }

    return (
      <li key={ entry.id }>{ entry.asString() }</li>
    )
  }

  const title = entry.asString() + (entry.type === EntryType.DEFINITION ? ":" : "")

  return (
    <div key={ entry.id }>
      { entry.depth === 0 ? <p>{ title } </p> : <li>{ title } </li> }
      <ul className="list-disc ml-8" style={ { listStyleType: depthListStyle[entry.depth % depthListStyle.length] } }>
        { entry.children.map(renderEntry) }
      </ul>
    </div>
  )
}

const ViewNote = () => {
    const { t } = useTranslation()
    const { id } = useParams()
    const [ resource ] = useAsyncResource(fetchNote, parseInt(id || "-1"))
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
        <FontAwesomeIcon className="text-gray-100 hover:text-blue-400 cursor-pointer mx-auto hidden lg:inline-block" onClick={ () => navigate("/notes") } icon={ faArrowLeft } size="3x" />
        <div className="mx-auto lg:w-10/12 grid lg:grid-cols-2 gap-3">
          <div className="card">
            <div className="card-header">
              <h1 className="text-3xl font-bold text-green-400 inline">{ note.title }</h1>
              <hr className="border-gray-500 mt-3" />
            </div>

            <div className="card-body mt-2 text-lg ml-4">
              {
                note?.content?.map(renderEntry)
              }
            </div>
          </div>
          <div className="grid gap-3" style={ { gridAutoRows: 'minmax(min-content, max-content)' } }>
            <div className="card space-y-3">
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
            <div className="card grid grid-cols-3 lg:gap-6 gap-3">
              <Button size="sm" text={ t("view-note.learn-definitions") } />
              <Button size="sm" text={ t("view-note.memorize-note") } />
              <Button size="sm" text={ t("view-note.write-test") } />
            </div>
            <div className="card flex flex-wrap">
              <span className="mt-2 mr-2 mb-2 flex-1">{ t("view-note.invite-friends") }</span>
              <input className="text-input p-2" onClick={ () => {
                navigator.clipboard.writeText("http://localhost:3000/invite/24")
                toast.success(t("view-note.copied"))
              } } readOnly value="http://localhost:3000/invite/24" style={ { width: "http://localhost:3000/invite/24".length + "ch" }} />
            </div>
            <div className="card grid grid-cols-3 justify-items-center">
              <div className="text-center cursor-pointer hover:text-blue-500 text-blue-400">
                <FontAwesomeIcon size={ "3x" } icon={ faPenSquare } />
                <p className="text-xl">{ t("view-note.edit") }</p>
              </div>
              <div ref={ deleteButton } className="text-center cursor-pointer hover:text-red-500 text-red-400">
                <FontAwesomeIcon size={ "3x" } icon={ faTrash } />
                <p className="text-xl">{ t("view-note.delete") }</p>
              </div>
              <div ref={ usersButton } className="text-center cursor-pointer hover:text-yellow-500 text-yellow-400">
                <FontAwesomeIcon size={ "3x" } icon={ faUsersCog } />
                <p className="text-xl">{ t("view-note.manage-users") }</p>
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