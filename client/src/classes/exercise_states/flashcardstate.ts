import Note from "../note";
import NoteEntry from "../note_entry";

export default class FlashCardState {
  public definition: NoteEntry

  public constructor(note: Note) {
    let definition = note.getRandomDefinition();

    this.definition = new NoteEntry(definition.type, 
        definition.depth, 
        definition.children, 
        undefined, // delete parent, because of circular reference
        definition.values, 
        definition.parentId);
  }

}