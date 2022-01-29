import NoteEntry, { EntryType } from "../../classes/noteEntry"

const depthListStyle = [
  "disc",
  "circle",
  "square"
]

interface RenderedNoteEntryProps {
  entry: NoteEntry
}

const RenderedNoteEntry = ({ entry }: RenderedNoteEntryProps) => {
  let content = (<p><span className="underline">{entry.values[0]}</span>: {entry.values[1]}</p>)

  if (entry.type === EntryType.NOTE || entry.hasChildren()) {
    content = <>{entry.values[0]}</>
  }

  if (!entry.hasChildren()) {
    if (entry.depth === 0) {
      return (
        <div className="break-words">{content}</div>
      )
    }

    return (
      <li className="break-words">{content}</li>
    )
  }

  const title = entry.values[0] + (entry.type === EntryType.DEFINITION ? ":" : "")

  return (
    <div>
      {entry.depth === 0 ? <p className="break-words">{title} </p> : <li className="break-words">{title} </li>}
      <ul className="list-disc ml-8" style={{ listStyleType: depthListStyle[entry.depth % depthListStyle.length] }}>
        {entry.children.map(e => <RenderedNoteEntry key={e.id} entry={e} />)}
      </ul>
    </div>
  )
}

export default RenderedNoteEntry