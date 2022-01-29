import { DataTypes, Model, Optional } from 'sequelize'
import connection from '../connection'

//number = percentage
interface LearningStatisticAttributes {
  id: number
  noteId: string
  userId: number

  definitionCorrect: number
  cardCorrect: number
  sentenceFillingCorrect: number
}

export class LearningStatisticModel extends Model<LearningStatisticAttributes, LearningStatisticInput> implements LearningStatisticAttributes {
  public id!: number
  public noteId!: string
  public userId!: number

  public definitionCorrect!: number
  public cardCorrect!: number
  public sentenceFillingCorrect!: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

LearningStatisticModel.init({
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
  definitionCorrect: {
    type: DataTypes.TINYINT.UNSIGNED,
    allowNull: false,
    defaultValue: () => 0
  },
  cardCorrect: {
    type: DataTypes.TINYINT.UNSIGNED,
    allowNull: false,
    defaultValue: () => 0
  },
  sentenceFillingCorrect: {
    type: DataTypes.TINYINT.UNSIGNED,
    allowNull: false,
    defaultValue: () => 0
  }
}, {
  tableName: 'learning_status',
  timestamps: true,
  sequelize: connection
})

export interface LearningStatisticInput extends Optional<LearningStatisticAttributes, 'id'> { }
export interface LearningStatisticOuput extends Required<LearningStatisticAttributes> { }