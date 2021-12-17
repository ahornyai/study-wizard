import { Dialect, Sequelize } from 'sequelize'

const dbName = process.env.DB_NAME as string
const username = process.env.DB_USER as string
const host = process.env.DB_HOST
const driver = process.env.DB_DRIVER as Dialect
const password = process.env.DB_PASSWORD

const connection = new Sequelize(dbName, username, password, {
  host: host,
  dialect: driver
})

export default connection