const scoreModel = require("../models/ScoreModel");

function pontuar(req, res) {
    const { idUsuario, idQuiz, totalPontuacao } = req.body;
    console.log("---------- Entrou na função pontuar! ----------");
    scoreModel.pontuar(idUsuario, idQuiz, totalPontuacao)
        .then(resultado => {
            return res.status(201).json({
                message: "Pontuou com sucesso",
                resultado: resultado
            });
        })
        .catch(erro => {
            return res.status(500).json({
                message: "ERROR INTERNO",
                errorInfo: erro
            });
        });
}



function ranking(req, res) {

    scoreModel.rankingData().then(function (resultado) {

        if (!resultado || resultado.length === 0) {
            return res.status(500).json({
                message: "Pontuação não encontrada"
            });
        }

        return res.status(200).json({
            message: "Pontuação encontrada com sucesso",
            data: resultado
        });

    }).catch(function (erro) {

        return res.status(500).json({
            message: "ERROR INTERNO",
            errorInfo: erro
        });

    });
}


module.exports = {
    pontuar,
    ranking
};
