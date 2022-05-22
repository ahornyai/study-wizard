import { t } from "i18next"
import { useTranslation } from "react-i18next"
import Note from "../../classes/note"
import NoteEntry from "../../classes/note_entry"
import Button from "../components/Button"

interface DefinitionQuestionProperties {
  note: Note
  definition: NoteEntry
}

const DefinitionQuestion = ({ note, definition }: DefinitionQuestionProperties) => {
  const { t } = useTranslation()
  
  return (
    <>
      <div className="flex flex-wrap break-all">
        <h1 className="text-3xl font-bold text-green-400 flex-1">{ definition.values[0] }</h1>
      </div>
      <hr className="border-gray-500 my-3" />
      <div className="w-full flex space-x-3">
        <Button text={t("practice-note.check")} size="sm" />
      </div>
    </>
  )
}

export default DefinitionQuestion