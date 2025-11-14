const express = require("express"); // importa bibblioteca
const cors = require("cors");
const path = require("path");
const { testConection } = require("../src/config/database");

const userRouter = require("./routes/UserRoutes");

const app = express();

// Middlewares
app.use(express.json()); // transforma corpo da requisição
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // libera no frontEnd
app.use(express.static(path.join(__dirname, "public"))); // permite acessar os arquivos(html/css/js) pela url

// Rotas
app.use("/users", userRouter);


// Inicialização
async function startServer() {
    try {
        const dbConnect = await testConection(); 
        if (!dbConnect) {
            console.log("Não Subiu!");
            process.exit(1); // fecha o processo e não sobe a aplicação
        }

        app.listen(3000, () => {
            console.log("Estamos de Pé na porta 3000");
        });
    } catch (error) {
        console.error("Erro ao inicializar o servidor", error.message);
        process.exit(1);
    }
}
//pronto para rodar
startServer();

module.exports = { app };
