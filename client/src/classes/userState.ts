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

  public flashcards: ExerciseState<any> //todo: types
  public timeline: ExerciseState<any>
  public labeling: ExerciseState<any>

  public constructor(noteId: string, userId: number, flashcards: ExerciseState<any>, timeline: ExerciseState<any>, labeling: ExerciseState<any>) {
    this.noteId = noteId
    this.userId = userId
    this.flashcards = flashcards
    this.timeline = timeline
    this.labeling = labeling
  }
}

export class UserState {
  public id: number
  public username: string
  public notes: NoteState[]

  private constructor(id: number, username: string, notes: NoteState[]) {
    this.id = id
    this.username = username
    this.notes = notes
  }

  static createOrGet(id: number, username: string, notes: NoteState[]): UserState {
    let stateItem = localStorage.getItem("state")

    if (stateItem) {
      let state = JSON.parse(stateItem) as UserState

      if (state.id === id) {
        return state
      } else {
        localStorage.removeItem("state")
      }
    }

    let state = new UserState(id, username, notes)
    localStorage.setItem("state", JSON.stringify(state))

    return state
  }
}