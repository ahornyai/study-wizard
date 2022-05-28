import { faChevronDown, faChevronRight, faEllipsis } from "@fortawesome/free-solid-svg-icons"
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
  count?: number
}

const DefinitionQuestion = ({ note, definition }: DefinitionQuestionProperties) => {
  const { t } = useTranslation()
  
  return (
    <>
      <div className="p-5">
        <div className="flex flex-wrap break-all text-green-400 text-lg font-bold">
          <Title note={note} node={definition} />
        </div>
        <hr className="border-gray-500 my-3" />
        <h1 className="text-center text-2xl py-5">{definition.values[0]}</h1>
      </div>

      <div className="text-center text-white rounded-b-lg p-2 transition-all hover:bg-gray-700 hover:text-green-400 hover:cursor-pointer">
        {t('practice-note.check')}
        <FontAwesomeIcon className="block mx-auto mb-1" size="2x" icon={faChevronDown} />
      </div>
    </>
  )
}

const Title = ({note, node, currentTitle = <></>, count = 0}: TitleProperties) => {
  const parent = note.getEntry(node.parentId)

  if (parent && count < 3) {
    return <Title 
      node={parent} 
      currentTitle={<> 
        { parent.values[0] } 
        { node.children.length > 0 ? <FontAwesomeIcon className="mt-1 mx-1 text-gray-400" icon={ faChevronRight } /> : <></> }
        { currentTitle }
       </>} 
      count={count + 1}
      note={note} />
  }

  if (count === 3)
    return <><FontAwesomeIcon className="mt-1 mx-1 text-green-400" icon={faEllipsis} /><FontAwesomeIcon className="mt-1 mx-1 text-gray-400" icon={faChevronRight} /> {currentTitle}</>

  return <>{ currentTitle }</>
}

export default DefinitionQuestion