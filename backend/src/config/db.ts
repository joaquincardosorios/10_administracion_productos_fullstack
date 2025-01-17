import dotenv from 'dotenv'
import { Sequelize} from 'sequelize-typescript'
dotenv.config()

const db = new Sequelize(process.env.DB_URI, {
    dialectOptions: {
        ssl : {
            require: false
        }
    },
    models: [__dirname + '/../models/**/*.ts']
})

export default db