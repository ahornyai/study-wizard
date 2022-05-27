import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useTranslation } from "react-i18next"
import Note from "../../classes/note"
import NoteEntry from "../../classes/note_entry"
import Button from "../components/Button"

interface DefinitionQuestionProperties {
  note: Note
  definition: NoteEntry
}

interface TitleProperties {
  note: Note
  node: NoteEntry
  currentTitle?: JSX.Element
}

const DefinitionQuestion = ({ note, definition }: DefinitionQuestionProperties) => {
  const { t } = useTranslation()
  
  return (
    <>
      <div className="flex flex-wrap break-all">
        <div className="text-2xl font-bold text-green-400 flex-1">
          <Title note={note} node={definition} />
        </div>
      </div>
      <hr className="border-gray-500 my-3" />
      <div className="w-full flex space-x-3">
        <Button text={t("practice-note.check")} size="sm" />
      </div>
    </>
  )
}

const Title = ({note, node, currentTitle = <></>}: TitleProperties) => {
  const parent = note.getEntry(node.parentId)

  if (parent) {
    return <Title 
      node={parent} 
      currentTitle={<>{parent.values[0]} <FontAwesomeIcon className="text-gray-400 mx-1" icon={faArrowRight} size="xs" /> {currentTitle}</>} 
      note={note} />
  }

  return <>{ note.title }</>
}

export default DefinitionQuestion