const express = require("express"); // importa bibblioteca
const cors = require("cors");
const path = require("path");
const { testConection } = require("./src/database/config");

const userRouter = require("./src/routes/UserRoutes");

const app = express();

// Middlewares
app.use(express.json()); // transforma corpo da requisição
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // libera no frontEnd
app.use(express.static(path.join(__dirname, "public"))); // permite acessar os arquivos(html/css/js) pela url

// Rotas
app.use("/users", userRouter);


// Inicialização
function startServer() {
    testConection()
        .then((dbConnect) => {
            if (!dbConnect) {
                console.log("Não Subiu!");
                process.exit(1);
                return;
            }

            app.listen(3000, function () {
                console.log("Estamos de Pé na porta 3000");
            });
        })
        .catch(function (error) {
            console.error("Erro ao inicializar o servidor", error.message);
            process.exit(1);
        });
}
//pronto para rodar
startServer();

module.exports = { app };
