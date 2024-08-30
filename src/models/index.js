import { Sequelize } from 'sequelize'
import {configDotenv} from 'dotenv'
import {config} from 'dotenv/config'

config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
  });

sequelize.authenticate()
    .then (() => console.log('Database Connected'))
    .catch (err => console.log('Error: ', err))


module.exports = sequelize;