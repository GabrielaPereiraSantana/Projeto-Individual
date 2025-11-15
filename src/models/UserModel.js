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
        SELECT id, nome, email, qtdGato, sexo, dtNasc, mesCadastro 
        FROM usuario 
        WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando SQL:\n" + query);
    return database.executar(query);
}

module.exports = {
    cadastrar,
    verificarEmailExiste,
    login
};
