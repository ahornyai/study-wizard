import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router-dom"
import { useAsyncResource } from "use-async-resource"
import { useContext } from "react"
import { UserContext } from "../../contexts/UserContext"
import Note from "../../classes/note"

const AcceptInvite = () => {
    const { t } = useTranslation()
    const { id } = useParams()
    const [ resource ] = useAsyncResource(Note.fetch, id || "", true)
    const navigate = useNavigate()
    const note = resource()
    const { user } = useContext(UserContext)

    if (note === null) {
      return (
        <div className="container mx-auto py-16 text-center lg:w-8/12 text-white">
          <h1 className="text-3xl font-bold mb-3">{ t('accept-invite.title') }</h1>
          <h2 className="text-xl">{ t('accept-invite.not-found') }</h2>
        </div>
      )
    }

    return (
      <div className="container mx-auto py-16 text-center lg:w-8/12 text-white">
        <h1 className="text-3xl font-bold mb-3">{ t('accept-invite.title') }</h1>
        <h2 className="text-xl">mogus</h2>
      </div>
    )
}

export default AcceptInvite