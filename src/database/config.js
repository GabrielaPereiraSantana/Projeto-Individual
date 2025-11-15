var mysql = require("mysql2");
require("dotenv").config();

var pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

function executar(instrucaoSql) {
    return new Promise(function (resolve, reject) {

        pool.getConnection(function (erro, conexao) {

            if (erro) {
                reject("ERRO NA CONEXÃO: " + erro.code);
                return;
            }

            conexao.query(instrucaoSql, function (erroConsulta, resultados) {

                conexao.release();

                if (erroConsulta) {
                    reject(erroConsulta);
                } else {
                    resolve(resultados);
                }
            });

        });

    });
}

function testConection() {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) return reject(err);

            console.log("Conexão com MySql estabelecida");
            connection.release();
            resolve(true);
        });
    });
}

module.exports = {
    executar,
    testConection
};
