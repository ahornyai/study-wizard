import CreateNoteHeader from "../elements/create_note/CreateNoteHeader";
import CreateNoteCard from "../elements/create_note/CreateNoteCard";

const CreateNote = () => {
    return (
      <div className="text-white container mx-auto py-16 text-center">
        <h1 className="text-3xl font-bold">Create note</h1>


        <div className="grid grid-cols-1 mt-10 gap-3">
          <CreateNoteHeader />
          <CreateNoteCard cardType={ 'note' } />
          <CreateNoteCard cardType={ 'definition' } />
          <CreateNoteCard cardType={ 'note' } />
          <CreateNoteCard cardType={ 'definition' } />
        </div>
      </div>
    )
}

export default CreateNote;
