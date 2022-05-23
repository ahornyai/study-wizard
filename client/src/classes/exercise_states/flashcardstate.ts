import Note from "../note";
import NoteEntry from "../note_entry";

export default class FlashCardState {
  public definition: NoteEntry

  public constructor(note: Note) {
    this.definition = note.getRandomDefinition()
  }

}