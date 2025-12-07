var AMBIENTE_PROCESSO = 'desenvolvimento';
require("dotenv").config();

var express = require("express"); // importa biblioteca
var cors = require("cors");
var path = require("path");
var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;


var app = express();

var userRouter = require("./src/routes/UserRoutes");
var quizRouter = require("./src/routes/QuizRoutes");
var scoreRouter = require("./src/routes/ScoreRoutes");
var indexRouter = require("./src/routes/index");



// Middlewares
app.use(express.json()); // transforma corpo da requisição
app.use(express.urlencoded({ extended: false }));
app.use(cors()); // libera no frontEnd
app.use(express.static(path.join(__dirname, "public"))); // permite acessar os arquivos(html/css/js) pela url

// Rotas
app.use("/", indexRouter)
app.use("/users", userRouter);
app.use("/quiz", quizRouter);
app.use("/score", scoreRouter)







app.listen(PORTA_APP, function () {
    console.log(`
    ##   ##  ######   #####             ####       ##     ######     ##              ##  ##    ####    ######  
    ##   ##  ##       ##  ##            ## ##     ####      ##      ####             ##  ##     ##         ##  
    ##   ##  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##        ##   
    ## # ##  ####     #####    ######   ##  ##   ######     ##     ######   ######   ##  ##     ##       ##    
    #######  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##      ##     
    ### ###  ##       ##  ##            ## ##    ##  ##     ##     ##  ##             ####      ##     ##      
    ##   ##  ######   #####             ####     ##  ##     ##     ##  ##              ##      ####    ######  
    \n\n\n                                                                                                 
    Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar .: http://${HOST_APP}:${PORTA_APP} :. \n\n
    Você está rodando sua aplicação em ambiente de .:${process.env.AMBIENTE_PROCESSO}:. \n\n
    \tSe .:desenvolvimento:. você está se conectando ao banco local. \n
    \tSe .:producao:. você está se conectando ao banco remoto. \n\n
    \t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'\n\n`);
});


