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

//PROCURA O USUARIO PELO ID
function usuarioId(id) {
    const query = `SELECT * FROM usuario WHERE id = ?`
    return pool
        .execute(query, [id])
        .then(([result]) => {
            if (result.length > 0) {
                return result[0];
            }
            return null;
        })
        .catch((error) => {
            console.log("erro no model de usuário function UsuarioId");
            throw new Error("ERRO AO PROCURAR USUARIO PELO ID");
        });
}


//ATUALIZA
function update(usuario) {
    const { id, nome, email, qtdGato, sexo, dtNasc, senha } = usuario;

    console.log(usuario);

    const query = `
        UPDATE usuario
        SET nome    = ?,
            email   = ?,
            qtdGato = ?,
            sexo    = ?,
            dtNasc  = ?,
            senha   = ?
        WHERE id = ?`;

    return pool
        .execute(query, [nome, email, qtdGato, sexo, dtNasc, senha, id])
        .then(([result]) => result)
        .catch((error) => {
            console.error("Erro ao atualizar usuário:", error);
            throw error; 
        });
}


module.exports = {
    cadastrar,
    verificarEmailExiste,
    login,
    usuarioId,
    update
};
