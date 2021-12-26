import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router-dom"
import { useAsyncResource } from "use-async-resource"
import { ReactNode, useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faPenSquare, faTrash, faShareAlt } from "@fortawesome/free-solid-svg-icons"
import Button from "../../elements/components/Button"
import { toast, ToastContainer } from "react-toastify"
import Modal from "../../elements/components/Modal"
import Note from "../../classes/note"
import NoteEntry, { EntryType } from "../../classes/noteEntry"
import axios from "axios"

const depthListStyle = [
  "disc",
  "circle",
  "square"
]

const renderEntry = (entry: NoteEntry): ReactNode => {
  if (!entry.hasChildren()) {
    if (entry.depth === 0) {
      return (
        <div className="break-words" key={ entry.id }>{ entry.asHtml() }</div>
      )
    }

    return (
      <li className="break-words" key={ entry.id }>{ entry.asHtml() }</li>
    )
  }

  const title = entry.asHtml() + (entry.type === EntryType.DEFINITION ? ":" : "")

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
    const shareButton = useRef<HTMLDivElement>(null)

    if (note === null) {
      return (
        <div className="container mx-auto py-16 text-center lg:w-8/12 text-white">
          <h1 className="text-3xl font-bold mb-3">{ t('view-note.title') }</h1>
          <h2 className="text-xl">{ t('view-note.not-found') }</h2>
        </div>
      )
    }

    const handleDeleteNote = () => {
      axios.post("/api/notes/modify/delete", {
        id: note.id
      }).then(() => {
        navigate("/notes")
      }).catch(err => {
        if (err.response?.data?.error) {
          toast(t("errors." + err.response.data.error), { type: "error", theme: "dark" })
        }
      })
    }

    return (
      <div className="container py-16 h-full text-gray-100 lg:flex">
        <ToastContainer className="lg:mt-20 mt-5" theme="dark" />
        <FontAwesomeIcon className="text-gray-100 hover:text-blue-400 cursor-pointer hidden lg:inline-block fixed left-[calc(16.67%-1em)]" onClick={ () => navigate("/notes") } icon={ faArrowLeft } size="3x" />
        
        <div className="flex lg:space-x-3 lg:space-y-0 space-y-3 lg:w-8/12 mx-auto lg:flex-nowrap flex-wrap">
          <div className="card w-full">
            <div className="card-header relative">
              <h1 className="text-3xl font-bold text-green-400 inline">{ note.title }</h1>
              
              <div className="float-right space-x-3 absolute bottom-2 right-4">
                <FontAwesomeIcon className="text-gray-200 hover:text-blue-400 cursor-pointer" onClick={ () => navigate(`/notes/edit/${note.id}`) } icon={ faPenSquare } size="lg" />
                <FontAwesomeIcon className="text-gray-200 hover:text-blue-400 cursor-pointer" forwardedRef={ deleteButton } icon={ faTrash } size="lg" />
                <FontAwesomeIcon className="text-gray-200 hover:text-blue-400 cursor-pointer" forwardedRef={ shareButton } icon={ faShareAlt } size="lg" />
              </div>
            </div>
            <hr className="border-gray-500 mt-3" />

            <div className="card-body mt-2 text-lg">
              {
                note?.content?.map(renderEntry)
              }
            </div>
          </div>
        </div>

        <Modal title={ t("confirmation") } 
          toggleButton={deleteButton} 
          content={<p>Are you sure you want to delete this note?</p>} 
          footer={
            <>
              <button className="px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-600 mr-2 modal-close">Go back</button>
              <button className="px-4 bg-red-500 p-3 rounded-lg text-white hover:bg-red-600" onClick={ handleDeleteNote }>Delete</button>
            </>
          } 
        />

        <Modal title={ t("share") }
          toggleButton={shareButton} 
          content={ 
            <div className="flex flex-col space-y-3">
              <label>
                <span className="text-gray-400">{ t("url") }</span>
                <input className="w-full text-input bg-gray-800 mt-1" 
                  type="text" 
                  value={ `${window.location.origin}/notes/${note.id}` } 
                  readOnly
                  onClick={ () => {
                    navigator.clipboard.writeText("http://localhost:3000/invite/24")
                    toast.success(t("view-note.copied"))
                  } } 
                />
              </label>
            </div>
          }
        />
      </div>
    )
}

export default ViewNote