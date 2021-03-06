import { useContext, useEffect, useState } from 'react'
import { arrayMoveImmutable } from 'array-move';

import ModifyNoteHeader from "../../elements/modify_note/ModifyNoteHeader"
import AddNoteCard from "../../elements/modify_note/AddNoteEntry"
import NoteEntryList from '../../elements/components/NoteEntryList';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Slide, toast, ToastContainer } from 'react-toastify';
import NoteEntry, { EntryType } from '../../classes/note_entry';
import { resourceCache, useAsyncResource } from 'use-async-resource';
import Note from '../../classes/note';
import { UserState } from '../../classes/user_state';
import { UserContext } from '../../contexts/UserContext';

const EditNote = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const [resource] = useAsyncResource(Note.fetch, id || "", false, true)
  const note = resource()
  const [entries, setEntries] = useState<NoteEntry[]>(typeof note === "string" ? [] : note.content || [])
  const [lastAdded, setLastAdded] = useState<NoteEntry | null>(null)
  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (lastAdded === null)
      return

    document.getElementById(lastAdded.id)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [lastAdded, resource])

  if (typeof note === "string" || !note.perms.write) {
    return (
      <div className="container mx-auto py-16 text-center lg:w-8/12 text-white">
        <h1 className="text-3xl font-bold mb-3">{t('edit-note.title')}</h1>
        <h2 className="text-xl">{t('errors.' + (typeof note === "string" ? note : "unauthorized"))}</h2>
      </div>
    )
  }

  const handleEditNote = (title: string) => {
    axios.post('/api/notes/modify/update', {
      id: note.id,
      title: title,
      content: JSON.stringify(entries, (k, v) => {
        if (k === 'parent')
          return undefined
        else
          return v
      })
    }).then(() => {
      UserState.createOrGet(user.id).deleteNoteState(note)
      resourceCache(Note.fetch).delete(note.id)
      navigate("/notes/" + note.id)
    }).catch(err => {
      if (err.response?.data?.error) {
        toast(t("errors." + err.response.data.error), { type: "error", theme: "dark" })
      }
    })
  }

  return (
    <div className="text-white container mx-auto py-16 text-center">
      <ToastContainer className="lg:mt-20 mt-5" theme="dark" transition={Slide} />
      <h1 className="text-3xl font-bold">{t("edit-note.title")}</h1>

      <div className="grid grid-cols-1 mt-10 gap-3">
        <ModifyNoteHeader note={note} handleModifyNote={handleEditNote} />
        <NoteEntryList children={entries}
          lockAxis="y"
          axis="y"
          shouldCancelStart={(e: any) => ['input', 'textarea', 'select', 'option', 'button', 'path', 'svg', 'span'].indexOf(e.target.tagName.toLowerCase()) !== -1 || e.target.onclick}
          addNoteEntry={(type: EntryType, depth: number, parent: NoteEntry) => {
            const newNote = new NoteEntry(type, depth, [], parent, [], note.id);
            setLastAdded(newNote)

            parent.children.push(newNote)
            setEntries([...entries])
          }}
          removeNoteEntry={(entry: NoteEntry) => {
            const parent = note.getEntry(entry.parentId)

            if (parent) {
              parent.children.splice(parent.children.indexOf(entry), 1)
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

export default EditNote
