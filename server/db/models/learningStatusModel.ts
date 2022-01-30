import { DataTypes, Model, Optional } from 'sequelize'
import connection from '../connection'
import { NoteEntry } from './noteModel'

export class DefinitionStatus {
  public correctDefinitions: string[] = []
  public completedDefinitions: string[] = []
  public currentDefinition: string = ""
}

export class LearningCardStatus {
  public correctCards: string[] = []
  public completedCards: string[] = []
  public currentCard: string = ""
}

export class SentenceFillingStatus {
  public content: NoteEntry[] = []
}

interface LearningStatusAttributes {
  id?: number
  noteId: string
  userId: number

  definitionStatus?: DefinitionStatus
  cardStatus?: LearningCardStatus
  sentenceFillingStatus?: SentenceFillingStatus
}

export class LearningStatusModel extends Model<LearningStatusAttributes, LearningStatusInput> implements LearningStatusAttributes {
  public id!: number
  public noteId!: string
  public userId!: number

  public definitionStatus!: DefinitionStatus
  public cardStatus!: LearningCardStatus
  public sentenceFillingStatus!: SentenceFillingStatus
}

LearningStatusModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  noteId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },
  definitionStatus: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: () => new DefinitionStatus()
  },
  cardStatus: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: () => new LearningCardStatus()
  },
  sentenceFillingStatus: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: () => new SentenceFillingStatus()
  }
}, {
  tableName: 'learning_status',
  timestamps: false,
  sequelize: connection
})

export interface LearningStatusInput extends Optional<LearningStatusAttributes, 'id'> { }
export interface LearningStatusOuput extends Required<LearningStatusAttributes> { }