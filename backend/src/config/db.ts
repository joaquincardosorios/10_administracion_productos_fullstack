import dotenv from 'dotenv'
import { Sequelize} from 'sequelize'
dotenv.config()

const db = new Sequelize(
    process.env.DB_URI, 
    {
        dialectOptions: {
            ssl : {
                require: false
            }
        }
    }
)

export default db