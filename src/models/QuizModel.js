var database = require("../database/config"); 

function getQuiz(id) {
    const query = `
        SELECT 
            q.id AS quizId,
            q.titulo AS quizTitulo,
            p.id AS perguntaId,
            p.conteudo AS pergunta,
            r.id AS respostaId,
            r.conteudo AS resposta,
            r.estaCorreta AS correta
        FROM quiz q
        JOIN perguntas p ON p.fkQuiz = q.id
        JOIN repostas r ON r.fkPergunta = p.id
        WHERE q.id = ${id} 
        ORDER BY p.id, r.id;
    `;

    return database.executar(query)
        .then(result => result)
        .catch(error => {
            console.error("Erro no model getQuiz:", error);
            throw error;
        });
}

module.exports = {
    getQuiz
};
