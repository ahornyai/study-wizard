import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router-dom"
import { useAsyncResource } from "use-async-resource"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { ToastContainer } from "react-toastify"
import Note from "../../classes/note"
import DefinitionQuestion from "../../elements/practice/DefinitionQuestion"
import QuestionResult from "../../elements/practice/QuestionResult"

const PracticeNote = () => {
  const { t } = useTranslation()
  const { id, type } = useParams()
  const [resource] = useAsyncResource(Note.fetch, id || "")
  const navigate = useNavigate()
  const note = resource()

  if (typeof note === "string") {
    return (
      <div className="container mx-auto py-16 text-center lg:w-8/12 text-white">
        <h1 className="text-3xl font-bold mb-3">{t('practice-note.title')}</h1>
        <h2 className="text-xl">{t('errors.' + note)}</h2>
      </div>
    )
  }

  if (type === "definitions") {
    return (
      <div className="container py-16 text-gray-100 lg:flex">
        <ToastContainer className="lg:mt-20 mt-5" theme="dark" />

        <div className="flex lg:space-x-3 lg:space-y-0 space-y-3 lg:w-9/12 mx-auto lg:flex-nowrap flex-wrap -translate-x-10">
          <FontAwesomeIcon className="text-gray-100 hover:text-blue-400 cursor-pointer hidden lg:inline-block mr-5" onClick={() => navigate(`/notes/${id}`)} icon={faArrowLeft} size="3x" />

          <div className="card flex flex-col lg:w-7/12 w-full h-fit">
            <DefinitionQuestion note={note} />
          </div>

          <div className="card flex flex-col flex-1 w-full">
            <div className="flex flex-wrap break-all">
              <h1 className="text-3xl font-bold text-green-400 flex-1">Statistics</h1>
            </div>
            <hr className="border-gray-500 my-3" />
            <div className="w-full space-y-3">
              <div>
                <span className="text-xl text-gray-300">{t("stats.correct")}</span>
                <span className="text-xl ml-2 text-gray-400">60% (30/50)</span>

                <div className="w-full bg-gray-900 h-4 rounded-lg mt-2">
                  <div className="bg-green-500 h-full rounded-lg" style={{ width: '60%' }} ></div>
                </div>
              </div>
              <div>
                <span className="text-xl text-gray-300">{t("stats.wrong")}</span>
                <span className="text-xl ml-2 text-gray-400">30% (15/50)</span>

                <div className="w-full bg-gray-900 h-4 rounded-lg mt-2">
                  <div className="bg-red-500 h-full rounded-lg" style={{ width: '30%' }} ></div>
                </div>
              </div>
              <div>
                <span className="text-xl text-gray-300">{t("stats.completed")}</span>
                <span className="text-xl ml-2 text-gray-400">90% (45/50)</span>

                <div className="w-full bg-gray-900 h-4 rounded-lg mt-2">
                  <div className="bg-blue-500 h-full rounded-lg" style={{ width: '90%' }} ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-16 text-center lg:w-8/12 text-white">
      <h1 className="text-3xl font-bold mb-3">{t('practice-note.title')}</h1>
      <h2 className="text-xl">{t('errors.undefined-type')}</h2>
    </div>
  )
}

export default PracticeNote