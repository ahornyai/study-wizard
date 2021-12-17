import { DataTypes, Model, Optional } from 'sequelize'
import connection from '../connection'

interface UserAttributes {
  id: number
  email: string
  username: string
  password: string

  lastLogin?: Date
  regDate?: Date
}

class UserModel extends Model<UserAttributes, UserInput> implements UserAttributes {
    public id!: number
    public email!: string
    public username!: string
    public password!: string

    public readonly lastLogin!: Date
    public readonly regDate!: Date
}

UserModel.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
    sequelize: connection
})


export interface UserInput extends Optional<UserAttributes, 'id' | 'lastLogin' | 'regDate'> {}
export interface UserOuput extends Required<UserAttributes> {}

export default UserModel