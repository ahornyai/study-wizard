import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import InfiniteScroll from "react-infinite-scroll-component";
import { ThreeDots } from "react-loader-spinner";
import Button from "../../elements/components/Button";
import { useNavigate } from "react-router-dom";
import Note from "../../classes/note";
import NoteCard from "../../elements/notes/NoteCard";

interface NotesProps {
  shared: boolean
}

const Notes = ({ shared }: NotesProps) => {
  const { t } = useTranslation()
  const [notes, setNotes] = useState<Note[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const navigate = useNavigate()

  const fetchNotes = useCallback(() => {
    if (!hasMore) return

    axios.get(`/api/notes/list?page=${page}&shared=${shared}`).then(res => {
      setNotes(n => n.concat(res.data.notes))
      setHasMore(res.data.hasMore)
    })
  }, [page, hasMore, shared])

  useEffect(() => {
    fetchNotes()
  }, [fetchNotes])

  // not the best solution for resetting the page, but it works
  useEffect(() => {
    setHasMore(true)
    setPage(1)
    setNotes([])
  }, [shared])

  return (
    <div className="container mx-auto py-16 text-center lg:w-8/12">
      <h1 className="text-white text-3xl font-bold w-full">{shared ? t("shared-notes.title") : t("your-notes.title")}</h1>

      {!hasMore && notes.length === 0 && <h1 className="text-white text-xl mt-5 mb-3">{shared ? t("shared-notes.no-notes") : t("your-notes.no-notes")}</h1>}
      {!hasMore && notes.length === 0 && !shared && <Button onClick={() => navigate("/notes/create")} text={t("create-note.title")} size="sm" />}

      <InfiniteScroll
        className="pb-5"
        dataLength={notes.length}
        next={() => {
          setPage(page + 1)
        }}
        hasMore={hasMore}
        loader={<div className="w-full flex justify-center"><ThreeDots color="#00BFFF" /></div>}
      >
        <div id="note-holder" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-16 justify-items-center">
          {notes.map(note => <NoteCard key={note.id} note={note} />)}
        </div>
      </InfiniteScroll>
    </div>
  )
}

export default Notes
