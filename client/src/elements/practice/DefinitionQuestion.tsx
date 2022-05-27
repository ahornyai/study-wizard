import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useTranslation } from "react-i18next"
import Note from "../../classes/note"
import NoteEntry from "../../classes/note_entry"

interface DefinitionQuestionProperties {
  note: Note
  definition: NoteEntry
}

interface TitleProperties {
  note: Note
  node: NoteEntry
  currentTitle?: JSX.Element
  arrow?: boolean
}

const DefinitionQuestion = ({ note, definition }: DefinitionQuestionProperties) => {
  const { t } = useTranslation()
  
  return (
    <>
      <div className="flex flex-wrap break-all">
        <div className="text-2xl font-bold text-green-400 flex-1">
          { note.title }
        </div>
      </div>
      <hr className="border-gray-500 my-3" />
      <div className="w-full flex">
        <Title note={note} node={definition} />
      </div>
    </>
  )
}

const Title = ({note, node, currentTitle = <></>, arrow = false}: TitleProperties) => {
  const parent = note.getEntry(node.parentId)

  if (parent) {
    return <Title 
      node={parent} 
      currentTitle={<> 
        { node.values[0] } 
        { node.children.length > 0 ? <FontAwesomeIcon className="mt-1 mx-1 text-gray-400" icon={ faChevronRight } /> : <></> }
        { currentTitle }
       </>} 
      note={note} />
  }

  return <>{ currentTitle }</>
}

export default DefinitionQuestion