import { t } from "i18next"
import Note from "../../classes/note"
import NoteEntry from "../../classes/noteEntry"
import Button from "../components/Button"

interface DefinitionQuestionProperties {
  note: Note
}

const DefinitionQuestion = ({ note }: DefinitionQuestionProperties) => {
  return (
    <>
      <div className="flex flex-wrap break-all">
        <h1 className="text-3xl font-bold text-green-400 flex-1">{getDefinitionQuestion(note)}</h1>
      </div>
      <hr className="border-gray-500 my-3" />
      <div className="w-full flex space-x-3">
        <input min={5} max={50} type="text" placeholder={t("definition")} className="practice-input w-full" />
        <Button text="Answer" size="sm" />
      </div>
    </>
  )
}

const getDefinitionQuestion = (note: Note): string => {
  const definitions = note.getDefinitions()
  const randomIndex = Math.floor(Math.random() * definitions.length)

  if (definitions.length === 0) {
    return ""
  }

  return definitions[randomIndex].values[0]
}

export default DefinitionQuestion