import { useEffect, useState } from 'react'
import { arrayMoveImmutable } from 'array-move';

import ModifyNoteHeader from "../../elements/modify_note/ModifyNoteHeader"
import AddNoteCard from "../../elements/modify_note/AddNoteEntry"
import NoteEntryList from '../../elements/components/NoteEntryList';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Slide, toast, ToastContainer, Zoom } from 'react-toastify';
import NoteEntry, { EntryType } from '../../classes/note_entry';

const CreateNote = () => {
  const [entries, setEntries] = useState<NoteEntry[]>([])
  const [lastAdded, setLastAdded] = useState<NoteEntry | null>(null)
  const { t } = useTranslation()
  const navigate = useNavigate()

  useEffect(() => {
    if (lastAdded === null)
      return

    document.getElementById(lastAdded.id)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [lastAdded])

  const handleCreateNote = (title: string) => {
    axios.post('/api/notes/modify/create', {
      title: title,
      content: JSON.stringify(entries, (k, v) => {
        if (k === 'parent')
          return undefined
        else
          return v
      })
    }).then(res => {
      navigate("/notes/" + res.data.id)
    }).catch(err => {
      if (err.response?.data?.error) {
        toast(t("errors." + err.response.data.error), { type: "error", theme: "dark" })
      }
    })
  }

  return (
    <div className="text-white container mx-auto py-16 text-center">
      <ToastContainer className="lg:mt-20 mt-5" theme="dark" transition={Slide} />
      <h1 className="text-3xl font-bold">{t("create-note.title")}</h1>

      <div className="grid grid-cols-1 mt-10 gap-3">
        <ModifyNoteHeader handleModifyNote={handleCreateNote} />
        <NoteEntryList children={entries}
          lockAxis="y"
          axis="y"
          shouldCancelStart={(e: any) => ['input', 'textarea', 'select', 'option', 'button', 'path', 'svg', 'span'].indexOf(e.target.tagName.toLowerCase()) !== -1 || e.target.onclick}
          addNoteEntry={(type: EntryType, depth: number, parent: NoteEntry) => {
            const newNote = new NoteEntry(type, depth, [], parent, [], parent.id);
            setLastAdded(newNote)

            parent.children.push(newNote)
            setEntries([...entries])
          }}
          removeNoteEntry={(entry: NoteEntry) => {
            if (entry.parent) {
              entry.parent.children.splice(entry.parent.children.indexOf(entry), 1)
            } else {
              entries.splice(entries.indexOf(entry), 1)
            }

            setEntries([...entries])
          }}
          onSortEnd={({ oldIndex, newIndex }) => {
            setEntries(arrayMoveImmutable(
              entries,
              oldIndex,
              newIndex,
            ))
          }}
          onSortChildren={(oldIndex: number, newIndex: number, parent: any) => {
            if (!parent)
              return

            parent.children = arrayMoveImmutable(
              parent.children,
              oldIndex,
              newIndex,
            )

            setEntries([...entries])
          }} />
        <AddNoteCard addNoteEntry={(type) => {
          const newNote = new NoteEntry(type);
          setLastAdded(newNote)

          setEntries([...entries, newNote])
        }} />
      </div>
    </div>
  )
}

export default CreateNote
