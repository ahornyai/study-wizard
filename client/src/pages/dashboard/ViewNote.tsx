import axios from "axios"
import { useTranslation } from "react-i18next"
import { Note } from "../../elements/notes/NoteCard"
import { useParams } from "react-router-dom";
import { useAsyncResource } from "use-async-resource";
import { NoteEntry } from "./CreateNote";
import { ReactNode } from "react";
import { EntryType } from "../../elements/create_note/CreateNoteEntry";

const depthListStyle = [
  "disc",
  "circle",
  "square"
]

const fetchNote = async (id: number): Promise<Note | null> => {
  if (id === -1 || isNaN(id))
    return null

  return await axios.get("/api/notes/view/" + id)
    .then(res => {
      const note = res.data.note as Note

      if (!note || note.content == null) {
        return null
      }

      note.content = note.content.map(NoteEntry.fromJSON)

      return note
    })
    .catch(err => {
      console.error(err)

      return null
    })
}

const renderEntry = (entry: NoteEntry): ReactNode => {
  if (!entry.hasChildren()) {
    if (entry.depth === 0) {
      return (
        <p key={ entry.id }>{ entry.asString() }</p>
      )
    }

    return (
      <li key={ entry.id }>{ entry.asString() }</li>
    )
  }

  const title = entry.asString() + (entry.type === EntryType.DEFINITION ? ":" : "")

  return (
    <>
      { entry.depth === 0 ? <p>{ title } </p> : <li>{ title } </li> }
      <ul className="list-disc ml-8" style={ { listStyleType: depthListStyle[entry.depth % 3] } }>
        { entry.children.map(renderEntry) }
      </ul>
    </>
  )
}

const ViewNote = () => {
    const { t } = useTranslation()
    const { id } = useParams()
    const [ resource ] = useAsyncResource(fetchNote, parseInt(id || "-1"))
    const note = resource()

    if (note === null) {
      return (
        <div className="container mx-auto py-16 text-center lg:w-8/12 text-white">
          <h1 className="text-3xl font-bold mb-3">{ t('view-note.title') }</h1>
          <h2 className="text-xl">{ t('view-note.not-found') }</h2>
        </div>
      )
    }

    return (
      <div className="container mx-auto py-16 lg:w-10/12 grid lg:grid-cols-2 gap-3 text-gray-100">
          <div className="card">
            <div className="card-header ">
              <h1 className="text-3xl font-bold text-green-400 inline">{ note.title }</h1>
              <hr className="border-gray-500 mt-3" />
            </div>

            <div className="card-body mt-2 text-lg ml-4">
              {
                note?.content?.map(renderEntry)
              }
            </div>
          </div>
          <div className="card">A</div>
      </div>
    )
}

export default ViewNote