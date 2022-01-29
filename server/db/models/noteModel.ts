import { nanoid } from 'nanoid'
import { DataTypes, Model, Optional } from 'sequelize'
import connection from '../connection'

export enum EntryType {
  NOTE,
  DEFINITION
}

export class NoteEntry {
  id: string
  type: EntryType
  depth: number
  children: NoteEntry[]
  values: string[] = []

  constructor(id: string, type: EntryType, depth: number, children: NoteEntry[], values: string[]) {
    this.id = id
    this.type = type
    this.depth = depth
    this.children = children
    this.values = values
  }

}

interface NoteAttributes {
  id: string
  inviteId?: string
  authorId: number
  title: string
  content: NoteEntry[]
}

export class NoteModel extends Model<NoteAttributes, NoteInput> implements NoteAttributes {
  [x: string]: any
  public id!: string
  public inviteId!: string
  public authorId!: number
  public title!: string
  public content!: NoteEntry[]

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

NoteModel.init({
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: () => nanoid(),
    primaryKey: true,
  },
  inviteId: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: () => nanoid(),
    unique: true,
  },
  authorId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.JSON,
    allowNull: false,
  }
}, {
  tableName: 'notes',
  timestamps: true,
  sequelize: connection
})

export interface NoteInput extends Optional<NoteAttributes, 'id'> { }
export interface NoteOuput extends Required<NoteAttributes> { }