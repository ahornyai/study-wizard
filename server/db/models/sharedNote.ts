import { DataTypes, Model, Optional } from 'sequelize'
import connection from '../connection'

interface SharedNoteAttributes {
    id: number
    noteId: string
    userId: number
    canWrite?: boolean
    canManagePerms?: boolean
}

class SharedNoteModel extends Model<SharedNoteAttributes, SharedNoteInput> implements SharedNoteAttributes {
    public id!: number
    public noteId!: string
    public userId!: number
    public canWrite!: boolean
    public canManagePerms!: boolean

    public readonly createdAt!: Date
    public readonly updatedAt!: Date
}

SharedNoteModel.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    noteId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    canWrite: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    canManagePerms: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    tableName: 'shared_notes',
    timestamps: true,
    sequelize: connection
})

export interface SharedNoteInput extends Optional<SharedNoteAttributes, 'id'> {}
export interface SharedNoteOuput extends Required<SharedNoteAttributes> {}

export default SharedNoteModel