var database = require("../database/config");

// CADASTRAR USUÁRIO
function cadastrar(nome, email, senha, qtdGato, sexo, dtNasc) {

    // gera o mês atual para mesCadastro
    var mesCadastro = new Date().getMonth() + 1;

    var query = `
        INSERT INTO usuario 
        (nome, email, senha, qtdGato, sexo, dtNasc, papelUsuario, mesCadastro)
        VALUES 
        ('${nome}', '${email}', '${senha}', ${qtdGato}, '${sexo}', '${dtNasc}', 'comum', ${mesCadastro});
    `;

    console.log("Executando SQL:\n" + query);
    return database.executar(query);
}

// VERIFICAR SE EMAIL JÁ EXISTE
function verificarEmailExiste(email) {
    var query = `
        SELECT id 
        FROM usuario 
        WHERE email = '${email}'
        LIMIT 1;
    `;
    console.log("Executando SQL:\n" + query);
    return database.executar(query);
}


// LOGIN
function login(email, senha) {
    var query = `
        SELECT id, nome, email, qtdGato, sexo, dtNasc, mesCadastro, papelUsuario
        FROM usuario 
        WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando SQL:\n" + query);
    return database.executar(query);
}

//PROCURA O USUARIO PELO ID
function usuarioId(id) {
    const query = `
        SELECT * FROM usuario 
        WHERE id = ${id};
    `;
    return database.executar(query)
        .then(result => {
            if (result.length > 0) {
                return result[0];
            }
            return null;
        })
        .catch((error) => {
            console.log("erro no model de usuário function UsuarioId");
            throw new Error("ERRO AO PROCURAR USUARIO PELO ID: " + error.message);
        });
}


// BUSCAR TODOS USUÁRIOS
function getAll() {
    var instrucaoSql = `
        SELECT * FROM usuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function getCats() {
    var instrucaoSql = `SELECT id, nome, email, qtdGato FROM usuario ORDER BY qtdGato DESC`
    console.log("Executando a instrução SQL:  \n" + instrucaoSql)
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar,
    verificarEmailExiste,
    login,
    usuarioId,
    getAll,
    getCats
};
