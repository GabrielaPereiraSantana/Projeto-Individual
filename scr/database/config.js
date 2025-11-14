const mysql = require("mysql2/promise")

require("dotenv").config()
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}

const pool = mysql.createPool({ // cria um pool de conexões
    ...dbConfig, 
    waitForConnections: true, 
    connectionLimit: 10, 
    queueLimit: 0
})

async function testConection() {
    try {
        const conection = await pool.getConnection()
        console.log("Conexão com MySql estabelecida")
        conection.release()
        return true
    } catch (error) {
        console.error("Conexão com MySql não estabelecida", error.message)
        return false
    }
}


module.exports = {
    pool,
    testConection
}