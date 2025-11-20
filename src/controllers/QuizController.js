var quizModel = require("../models/QuizModel");


function getQuiz(req, res) {
    const idQuiz = req.params.id;

    if (!idQuiz) {
        return res.status(400).json({
            message: "ID do quiz não informado."
        });
    }

    quizModel.getQuiz(idQuiz)
        .then((resultado) => {
            if (!resultado || resultado.length === 0) {
                return res.status(404).json({
                    message: "Nenhum dado encontrado para este quiz."
                });
            }

            return res.status(200).json({
                message: "Quiz encontrado com sucesso.",
                data: resultado
            });
        })
        .catch((erro) => {
            console.error("Erro interno no quizController:", erro);
            return res.status(500).json({
                message: "Erro interno ao buscar quiz.",
                errorInfo: erro.message
            });
        });
}

module.exports = {
    getQuiz
};