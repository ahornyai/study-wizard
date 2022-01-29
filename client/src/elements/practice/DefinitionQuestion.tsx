import { t } from "i18next";
import Note from "../../classes/note";
import Button from "../components/Button";

interface DefinitionQuestionProperties {
  note: Note
}

const DefinitionQuestion = ({ note }: DefinitionQuestionProperties) => {
  return (
    <>
      <div className="flex flex-wrap break-all">
        <h1 className="text-3xl font-bold text-green-400 flex-1">{note.title}</h1>
      </div>
      <hr className="border-gray-500 my-3" />
      <div className="w-full flex space-x-3">
        <input min={5} max={50} type="text" placeholder={t("definition")} className="practice-input w-full" />
        <Button text="Answer" size="sm" />
      </div>
    </>
  )
}

export default DefinitionQuestion