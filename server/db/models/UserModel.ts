import { DataTypes, Model, Optional } from 'sequelize'
import connection from '../connection'
import bcrypt from 'bcrypt'

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

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

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
  tableName: 'users',
  timestamps: true,
  sequelize: connection,
})

//from https://gist.github.com/JesusMurF/9d206738aa54131a6e7ac88ab2d9084e

UserModel.beforeCreate((user, options) => {
  return cryptPassword(user.password)
    .then(success => {
      user.password = success as string
    })
    .catch(err => {
      if (err) console.log(err)
    });
});

function cryptPassword(password: string) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return reject(err)

      bcrypt.hash(password, salt, (err, hash) => {
        if (err) return reject(err)
        resolve(hash)
      });
    });
  });
}

export interface UserInput extends Optional<UserAttributes, 'id' | 'lastLogin' | 'regDate'> { }
export interface UserOuput extends Required<UserAttributes> { }

export default UserModel