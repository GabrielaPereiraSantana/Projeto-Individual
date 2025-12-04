var database = require("../database/config");

function pontuar(idUsuario, idQuiz, totalPontuacao) {
    console.log(pontuar)

    var query = `
        INSERT INTO pontuacao
        (pontuacaoTotal, fkUser, fkQuiz)
        VALUES
        (${totalPontuacao}, ${idUsuario}, ${idQuiz});
    `;

    console.log("Executando SQL:\n" + query);
    return database.executar(query);
}

function rankingData() {

    var query = `
        SELECT 
            u.id AS idUsuario,
            u.nome,
            u.email,
            SUM(p.pontuacaoTotal) AS totalPontos
        FROM usuario u
        JOIN pontuacao p ON p.fkUser = u.id
        GROUP BY u.id, u.nome, u.email
        ORDER BY totalPontos DESC;
    `;

    console.log("Executando SQL:\n" + query);
    return database.executar(query);
}


module.exports = {
    pontuar,
    rankingData
};
