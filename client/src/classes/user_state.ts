import FlashCardState from "./exercise_states/flashcardstate"
import Note from "./note"

export class ExerciseState<T> {
  public correct: number
  public incorrect: number
  public total: number
  public current: T

  public constructor(current: T, total: number, correct: number = 0, incorrect: number = 0) {
    this.current = current
    this.correct = correct
    this.incorrect = incorrect
    this.total = total
  }
}

export class NoteState {
  public noteId: string
  public userId: number

  public flashcards: ExerciseState<FlashCardState>
  public timeline: ExerciseState<any> //todo
  public labeling: ExerciseState<any>

  public constructor(note: Note, userId: number) {
    this.noteId = note.id
    this.userId = userId
    this.flashcards = new ExerciseState(new FlashCardState(note), note.getDefinitions().length)
    this.timeline = new ExerciseState(null, 0)
    this.labeling = new ExerciseState(null, 0)
  }
}

export class UserState {
  public userId: number
  public notes: NoteState[]

  private constructor(userId: number, notes: NoteState[]) {
    this.userId = userId
    this.notes = notes
  }

  public getNoteState(note: Note): NoteState { // or create if neccessary
    let noteState = this.notes.find(state => state.noteId === note.id)

    if (!noteState) {
      noteState = new NoteState(note, this.userId)
      this.notes.push(noteState)
      this.save()
    }

    return noteState
  }

  public deleteNoteState(note: Note): boolean {
    const index = this.notes.findIndex(state => state.noteId === note.id)

    if (index !== -1) {
      this.notes.splice(index, 1)
      this.save()

      return true
    }

    return false
  }

  public save(): UserState {
    localStorage.setItem("state", JSON.stringify(this))

    return this
  }

  static createOrGet(userId: number, notes: NoteState[] = []): UserState {
    let stateItem = localStorage.getItem("state")

    if (stateItem) {
      let state = JSON.parse(stateItem) as UserState

      if (state.userId === userId) {
        state = new UserState(userId, state.notes) // prototype copying

        return state
      } else {
        localStorage.removeItem("state")
      }
    }

    return new UserState(userId, notes).save()
  }

}