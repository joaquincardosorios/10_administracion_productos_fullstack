import express from 'express'
import colors from 'colors'
import router from './router'
import db from './config/db'

// Contectar a DB
async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        console.log(colors.blue.bold('Conectado a la base de datos'))
    } catch (error) {
        // console.log(error)
        console.log(colors.red.bold('Hubo un error al conectar a la base de datos.'))
    }
}

connectDB()

// Instancia del express
const server = express()

// Leer datos de formularios
server.use(express.json())

server.use('/api/products', router)

export default server
