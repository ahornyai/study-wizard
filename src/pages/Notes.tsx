import NoteCard from "../elements/notes/NoteCard"

const Notes = () => {
    return (
      <div className="container mx-auto py-16 text-center lg:w-8/12">
        <h1 className="text-white text-3xl font-bold">Your notes</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-16 justify-items-center">
          <div><NoteCard title="Grammar - Morphology" definitions={ 69 } author="sustown" /></div>
          <div><NoteCard title="Grammar - Morphology" definitions={ 69 } author="sustown" /></div>
          <div><NoteCard title="Grammar - Morphology" definitions={ 69 } author="sustown" /></div>
        </div>
      </div>
    )
}

export default Notes;
