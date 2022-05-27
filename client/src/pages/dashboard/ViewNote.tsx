import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router-dom"
import { useAsyncResource, resourceCache } from "use-async-resource"
import { useContext, useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faTrash, faShareAlt, faPen } from "@fortawesome/free-solid-svg-icons"
import { Slide, toast, ToastContainer } from "react-toastify"
import Modal from "../../elements/components/Modal"
import Note from "../../classes/note"
import axios from "axios"
import InvitedUserElement from "../../elements/notes/InvitedUserElement"
import NoteMember from "../../classes/note_member"
import RenderedNoteEntry from "../../elements/notes/RenderedNoteEntry"
import { UserState } from "../../classes/user_state"
import { UserContext } from "../../contexts/UserContext"

const ViewNote = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const [resource] = useAsyncResource(Note.fetch, id || "")
  const navigate = useNavigate()
  const note = resource()
  const deleteButton = useRef<HTMLDivElement>(null)
  const shareButton = useRef<HTMLDivElement>(null)
  const [sharedWith, setSharedWith] = useState<NoteMember[]>(typeof note === "string" ? [] : note.sharedWith || [])
  const { user } = useContext(UserContext)

  if (typeof note === "string") {
    return (
      <div className="container mx-auto py-16 text-center lg:w-8/12 text-white">
        <h1 className="text-3xl font-bold mb-3">{t('view-note.title')}</h1>
        <h2 className="text-xl">{t('errors.' + note)}</h2>
      </div>
    )
  }

  const handleDeleteNote = () => {
    axios.post("/api/notes/modify/delete", {
      id: note.id
    }).then(() => {
      UserState.createOrGet(user.id).deleteNoteState(note)
      resourceCache(Note.fetch).delete(note.id)
      navigate("/notes")
    }).catch(err => {
      if (err.response?.data?.error) {
        toast.error(t("errors." + err.response.data.error))
      }
    })
  }

  const handleDeleteMember = (memberId: number) => {
    axios.post("/api/notes/manage-member/delete", {
      noteId: note.id,
      memberId
    }).then(() => {
      resourceCache(Note.fetch).delete(note.id)
      toast.success(t("view-note.successfully-deleted"))
      setSharedWith(sharedWith.filter(member => member.user.id !== memberId))
    }).catch(err => {
      if (err.response?.data?.error) {
        toast.error(t("errors." + err.response.data.error))
      }
    })
  }

  return (
    <div className="container py-16 h-full text-gray-100 lg:flex">
      <ToastContainer className="lg:mt-20 mt-5" theme="dark" transition={Slide} />

      <div className="flex lg:space-x-3 lg:space-y-0 space-y-3 lg:w-9/12 mx-auto lg:flex-nowrap flex-wrap -translate-x-10">
        <FontAwesomeIcon className="text-gray-100 hover:text-blue-400 cursor-pointer hidden lg:inline-block mr-5" onClick={() => navigate(`/notes/`)} icon={faArrowLeft} size="3x" />

        <div className="card flex flex-col w-full h-[calc(100vh-12rem)]">
          <div className="flex flex-wrap break-all">
            <h1 className="text-3xl font-bold text-green-400 flex-1">{note.title}</h1>

            <div className="space-x-3 ml-3 self-center">
              {note.perms.write &&
                <>
                  <FontAwesomeIcon className="text-gray-200 hover:text-blue-400 cursor-pointer" onClick={() => navigate(`/notes/${note.id}/edit`)} icon={faPen} size="lg" />
                  <FontAwesomeIcon className="text-gray-200 hover:text-blue-400 cursor-pointer" forwardedRef={deleteButton} icon={faTrash} size="lg" />
                </>
              }
              <FontAwesomeIcon className="text-gray-200 hover:text-blue-400 cursor-pointer" forwardedRef={shareButton} icon={faShareAlt} size="lg" />
            </div>
          </div>
          <hr className="border-gray-500 mt-3" />

          <div className="mt-2 text-lg overflow-y-auto">
            {
              note?.content?.map(e => <RenderedNoteEntry key={e.id} entry={e} />)
            }
          </div>
        </div>
        <div className="flex flex-col lg:w-2/3 w-full h-[calc(100vh-12rem)] space-y-3">
          <div className="card">
            <h1 className="text-2xl font-bold text-green-400">{t("settings")}</h1>
          </div>
        </div>
      </div>

      <Modal title={t("confirmation")}
        toggleButton={deleteButton}
        content={<p> {t("view-note.are-you-sure-delete")} </p>}
        footer={
          <>
            <button className="px-4 bg-gray-700 p-3 rounded-lg text-white hover:bg-gray-800 mr-2 modal-close">{t("view-note.go-back")}</button>
            <button className="px-4 bg-red-500 p-3 rounded-lg text-white hover:bg-red-600" onClick={handleDeleteNote}>{t("view-note.delete")}</button>
          </>
        }
      />

      <Modal title={t("share")}
        toggleButton={shareButton}
        content={
          <div className="flex flex-col space-y-3">
            <label>
              <span className="text-gray-400">{t("url")}</span>
              <input className="w-full text-input bg-gray-800 mt-1"
                type="text"
                value={`${window.location.origin}/notes/${note.inviteId}/invite`}
                readOnly
                onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/notes/${note.inviteId}/invite`)
                  toast.success(t("view-note.copied"))
                }}
              />
            </label>

            {sharedWith.length !== 0 &&
              <>
                <p className="text-gray-400">{t("view-note.members")}</p>
                <div className="space-y-3">
                  {
                    sharedWith.map(member => (
                      <InvitedUserElement note={note} member={member} key={member.user.id} onRemove={() => handleDeleteMember(member.user.id)} />
                    ))
                  }
                </div>
              </>
            }
          </div>
        }
      />
    </div>
  )
}

export default ViewNote