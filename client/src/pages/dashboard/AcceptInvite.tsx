import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router-dom"
import { useAsyncResource } from "use-async-resource"
import Note from "../../classes/note"
import Avatar from "../../elements/components/Avatar"
import Button from "../../elements/components/Button"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"

const AcceptInvite = () => {
    const { t } = useTranslation()
    const { id } = useParams()
    const [ resource ] = useAsyncResource(Note.fetch, id || "", true)
    const navigate = useNavigate()
    const note = resource()

    if (note === null) {
      return (
        <div className="container mx-auto py-16 text-center lg:w-8/12 text-white">
          <h1 className="text-3xl font-bold mb-3">{ t("accept-invite.title") }</h1>
          <h2 className="text-xl">{ t("accept-invite.not-found") }</h2>
        </div>
      )
    }

    const handleAcceptInvite = async () => {
      axios.post(`/api/notes/accept_invite`, {
        inviteId: id
      }).then(() => {
        navigate(`/notes/${note.id}`)
      }).catch(err => {
        toast.error(t("errors." + err.response.data.error))
      })
    }

    return (
      <div className="container mx-auto py-16 text-center lg:w-1/3 text-white">
        <ToastContainer className="lg:mt-20 mt-5" theme="dark" />
        <h1 className="text-3xl font-bold mb-3">{ t("accept-invite.title") }</h1>

        <div className="card">
          <Avatar className="w-1/4 h-auto mx-auto mt-3" image={ note.author.avatar } />
          <div className="w-10/12 mx-auto">
            <span className="text-2xl text-blue-400">{ note.author.username } </span>
            <span className="text-2xl">{ t("accept-invite.invited-you-to-collaborate") } { note.title }</span>
          </div>
          <Button className="mt-6 w-2/3" text={ t("accept-invite.accept") } onClick={ handleAcceptInvite } size="sm" />
        </div>
      </div>
    )
}

export default AcceptInvite