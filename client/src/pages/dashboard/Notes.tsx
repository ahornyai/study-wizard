import axios from "axios"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import NoteCard, { Note } from "../../elements/notes/NoteCard"
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "react-loader-spinner";

const Notes = () => {
    const { t } = useTranslation()
    const [notes, setNotes] = useState<Note[]>([])
    const [page, setPage] = useState(0)
    const [hasMore, setHasMore] = useState(true)

    //axios get the notes
    const fetchNotes = () => {
      setPage(page + 1)

      axios.get("/api/notes/list?page=" + (page + 1)).then(res => {
        setNotes(notes.concat(res.data.notes))
        setHasMore(res.data.hasMore)
      })
    }

    useEffect(() => {
      fetchNotes()
    }, [])

    return (
      <div className="container mx-auto py-16 text-center lg:w-8/12">
        <h1 className="text-white text-3xl font-bold w-full">{ t('your-notes.title') }</h1>

        <InfiniteScroll
          className="pb-5"
          dataLength={ notes.length }
          next={ fetchNotes }
          hasMore={ hasMore }
          loader={ <div className="w-full flex justify-center"><Loader type={ "ThreeDots" } color="#00BFFF" /></div> }
        >
          <div id="note-holder" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-16 justify-items-center">
            { notes.map(note => <NoteCard key={ note.id } note={ note } />) }
          </div>
        </InfiniteScroll>
      </div>
    )
}

export default Notes
