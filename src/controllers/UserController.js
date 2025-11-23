var userModel = require("../models/UserModel");

function cadastrar(req, res) {
    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha;
    var qtdGato = req.body.qtdGato;
    var sexo = req.body.sexo;
    var dtNasc = req.body.dtNasc;

    if (!nome || !email || !senha || !sexo) {
        return res.status(400).json({ message: "Campos obrigatórios não preenchidos." });
    }

    userModel.verificarEmailExiste(email)
        .then(resultado => {

            if (resultado.length > 0) {
                return res.status(409).json({ message: "E-mail já cadastrado." });
            }

            userModel.cadastrar(nome, email, senha, qtdGato, sexo, dtNasc)
                .then(resposta => {
                    res.status(201).json({
                        message: "Usuário criado com sucesso",
                        data: resposta
                    });
                })
                .catch(erro => {
                    res.status(500).json({ message: "Erro ao cadastrar usuário." });
                });

        })
        .catch(erro => {
            res.status(500).json({ message: "Erro ao verificar e-mail." });
        });
}


function login(req, res) {
    var email = req.body.email;
    var senha = req.body.senha;

    if (!email || !senha) {
        return res.status(400).json({ message: "Campos obrigatórios não preenchidos." });
    }

    userModel.login(email, senha)
        .then((usuarioEncontrado) => {

            if (usuarioEncontrado == null) {
                return res.status(404).json({ message: "Email ou senha inválidos" });
            }

            return res.status(200).json({
                message: "Bem vindo de volta!",
                data: usuarioEncontrado
            });
        })
        .catch((error) => {
            console.error("Erro interno no controller:", error.message);
            return res.status(500).json({
                message: "ERROR INTERNO",
                errorInfo: error.message
            });
        });
}

function usuarioId(req, res) {
    const userId = req.params.id

    if (userId == null) {
        return res.status(400).json({
            message: "ID não fornecido"
        });
    } userModel.usuarioId(userId)
        .then((userEncontrado) => {

            if (userEncontrado == null) {
                return res.status(404).json({
                    message: "Usuário não encontrado"
                });
            }

            return res.status(200).json({
                message: "Usuário encontrado",
                data: userEncontrado
            });

        }).catch((error) => {
            console.error("Erro ao buscar usuário:", error.message);
            return res.status(500).json({
                message: "ERROR INTERNO",
                errorInfo: error.message
            });
        });
}


function getAllUsers(req, res) {
    userModel.getAll()
        .then(usuariosAchados => {
            return res.status(200).json({
                message: "Usuários encontrados!",
                data: usuariosAchados 
            });
        })
        .catch(error => {
            return res.status(500).json({
                message: "ERROR INTERNO",
                errorInfo: error.message
            });
        });
}

function getCats(req, res) {
    userModel.getCats()
    .then(gatosEncontrados => {
        return res.status(200).json({
            message: "Gatos Encontrados",
            data: gatosEncontrados
        })
    })
    .catch (error => {
        return res.status(500).json({
            message: "ERROR INTERNO",
            errorInfo: error.message
        });
    });
}


module.exports = {
    cadastrar,
    login,
    usuarioId,
    getAllUsers,
    getCats
};
