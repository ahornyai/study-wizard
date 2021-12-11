import CreateNoteHeader from "../elements/create_note/CreateNoteHeader";
import CreateNoteCard, { CardType } from "../elements/create_note/CreateNoteCard";
import AddNoteCard from "../elements/create_note/AddNoteCard";
import { useEffect, useState } from "react";

const CreateNote = () => {
  let [entries, setEntries] = useState<CardType[]>(['note'])

  useEffect(() => {
    window.scroll({left: 0, top: document.body.scrollHeight, behavior: "smooth" });
  }, [entries])

  return (
    <div className="text-white container mx-auto py-16 text-center">
      <h1 className="text-3xl font-bold">Create note</h1>

      <div className="grid grid-cols-1 mt-10 gap-3">
        <CreateNoteHeader />
        <div className="grid grid-cols-1 gap-3">
          {entries.map(type => (
            <CreateNoteCard cardType={ type } />
          ))}
        </div>
        <AddNoteCard addNoteElement={ (type) => setEntries([...entries, type]) } />
      </div>
    </div>
  )
}

export default CreateNote;
