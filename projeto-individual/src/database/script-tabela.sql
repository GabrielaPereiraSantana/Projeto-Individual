CREATE DATABASE catJournal;
use catJournal;

CREATE TABLE usuario (
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(100),
email VARCHAR(100) UNIQUE,
senha VARCHAR(500),
qtdGato INT,
sexo VARCHAR(50), 
CONSTRAINT cksexo CHECK (sexo IN( 'Feminino', 'Masculino', 'Prefiro não informar')),
dtNasc DATE,
papelUsuario VARCHAR(50),
mesCadastro INT,
CONSTRAINT ckPapel CHECK (papelUsuario IN('comum', 'admin')));


INSERT INTO usuario (nome, email, senha, qtdGato, sexo, dtNasc, papelUsuario,mesCadastro) VALUES
	('Eduardo', 'eduardo@gmail.com', '12345', 1, 'Masculino', '2005-08-03', 'admin', 7);


select * from usuario;
SELECT * FROM usuario WHERE email = 'gabi@teste.com' AND senha = '1234';

SELECT id, nome,email, qtdGato
FROM usuario
ORDER BY qtdGato DESC; 	

SELECT id, nome,email, qtdGato FROM usuario ORDER BY qtdGato DESC;


CREATE TABLE quiz (
id INT PRIMARY KEY AUTO_INCREMENT,
titulo VARCHAR(100));

CREATE TABLE perguntas 
(id INT PRIMARY KEY AUTO_INCREMENT,
conteudo VARCHAR(100),
fkQuiz INT,
CONSTRAINT fkQuizPerguntas
FOREIGN KEY (fkQuiz) REFERENCES quiz(id));

CREATE TABLE repostas (
id INT PRIMARY KEY AUTO_INCREMENT,
conteudo VARCHAR(100),
estaCorreta BOOLEAN,
fkPergunta INT, 
CONSTRAINT fkRespostasPergunta
FOREIGN KEY (fkPergunta) REFERENCES perguntas(id));

CREATE TABLE pontuacao (
id INT PRIMARY KEY AUTO_INCREMENT,
pontuacaoTotal INT,
fkUser INT,
CONSTRAINT fkUserPontuacao 
FOREIGN KEY (fkUser) REFERENCES usuario(id),
fkQuiz INT,
CONSTRAINT fkQuizPontuacao 
FOREIGN KEY (fkQuiz) REFERENCES quiz(id));


INSERT INTO quiz (titulo) VALUES
('Quiz de Cuidados com Gatos');

INSERT INTO perguntas (conteudo, fkQuiz) VALUES
('Com que frequência a caixa de areia do gato deve ser limpa?', 1),
('Qual é a melhor forma de hidratar um gato?', 1),
('O que é essencial ter em casa para um gato viver bem?', 1),
('Com que frequência os gatos devem visitar o veterinário?', 1),
('Qual tipo de alimentação é mais recomendada para gatos?', 1);


INSERT INTO repostas (conteudo, estaCorreta, fkPergunta) VALUES
('Uma vez por semana', 0, 1),
('A cada 2 dias', 0, 1),
('Todos os dias', 1, 1),
('Somente quando estiver muito suja', 0, 1),
('Somente oferecendo leite', 0, 2),
('Deixando sempre água fresca disponível', 1, 2),
('Dando água apenas à noite', 0, 2),
('Misturando água na ração seca todos os dias', 0, 2),
('Arranhador', 0, 3),
('Brinquedos e caminhas', 0, 3),
('Caixa de areia, água fresca e alimentação adequada', 1, 3),
('Coleira e passeios diários', 0, 3),
('Apenas quando estão doentes', 0, 4),
('Uma vez por ano', 1, 4),
('A cada 5 anos', 0, 4),
('Gatos não precisam ir ao veterinário', 0, 4),
('A mesma comida que os humanos comem', 0, 5),
('Somente sachê', 0, 5),
('Ração específica para gatos', 1, 5),
('Leite com pão', 0, 5);

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
WHERE q.id = 1
ORDER BY p.id, r.id;

select * from pontuacao;


SELECT 
    u.id AS idUsuario,
    u.nome,
    SUM(p.pontuacaoTotal) AS totalPontos,
    RANK() OVER (ORDER BY SUM(p.pontuacaoTotal) DESC) AS posicao
FROM usuario u
JOIN pontuacao p ON p.fkUser = u.id
GROUP BY u.id, u.nome
ORDER BY totalPontos DESC;


INSERT INTO quiz (titulo) VALUES
('Quiz de Conhecimentos Gerais sobre Gatos - Nível Médio');

INSERT INTO perguntas (conteudo, fkQuiz) VALUES
('Por que os gatos costumam amassar com as patas?', 2),
('Qual sentido é mais desenvolvido nos gatos?', 2),
('O que a cauda do gato geralmente indica?', 2),
('Qual é a temperatura corporal normal de um gato?', 2),
('Por que os gatos comem grama ocasionalmente?', 2);

INSERT INTO perguntas (conteudo, fkQuiz) VALUES
('O que é considerado um comportamento normal para um gato saudável ao usar a caixa de areia?', 2);

INSERT INTO repostas (conteudo, estaCorreta, fkPergunta) VALUES
('Para marcar território', 0, 6),
('Para afiar as unhas', 0, 6),
('Porque é um comportamento de conforto e lembrança da maternidade', 1, 6),
('Para pedir comida', 0, 6),
('Visão', 0, 7),
('Audição', 0, 7),
('Olfato', 0, 7),
('Audição e visão noturna altamente desenvolvidas', 1, 7),
('Apenas equilíbrio', 0, 8),
('Estado emocional e equilíbrio', 1, 8),
('Serve só para se aquecer', 0, 8),
('É usada apenas para comunicar dor', 0, 8),
('Por curiosidade, sem função específica', 0, 10),
('Para ajudar na digestão e expulsar bolas de pelo', 1, 10),
('Porque estão desidratados', 0, 10),
('Para obter nutrientes que não conseguem na ração', 0, 10),
('Ir à caixa apenas uma vez por semana', 0, 11),
('Evitar a caixa de areia sempre que possível', 0, 11),
('Usar a caixa de areia de 1 a 3 vezes por dia', 1, 11),
('Enterrar completamente as fezes sempre que usar', 0, 11);

INSERT INTO quiz (titulo) VALUES
('Quiz de Conhecimentos Avançados sobre Gatos - Nível Difícil');

INSERT INTO perguntas (conteudo, fkQuiz) VALUES
('O que é a síndrome de hiperestesia felina?', 3),
('Qual é a função principal do órgão de Jacobson nos gatos?', 3),
('O que significa quando um gato mexe apenas a ponta da cauda repetidamente?', 3),
('Qual é a causa mais comum de doença renal crônica em gatos idosos?', 3),
('Por que os gatos raramente mostram sinais evidentes de dor?', 3);

INSERT INTO repostas (conteudo, estaCorreta, fkPergunta) VALUES
('Uma alergia comum à poeira', 0, 17),
('Uma condição neurológica que causa hipersensibilidade na pele', 1, 17),
('Um distúrbio causado por excesso de vitaminas', 0, 17),
('Uma infecção parasitária rara', 0, 17),
('Ajudar na visão noturna', 0, 18),
('Detectar odores complexos e feromônios', 1, 18),
('Controlar a temperatura corporal', 0, 18),
('Ampliar a audição de frequências baixas', 0, 18),
('Curiosidade com leve excitação', 1, 19),
('Sono profundo', 0, 19),
('Dor intensa', 0, 19),
('Comportamento de caça completamente agressivo', 0, 19),
('Infecções bacterianas recorrentes', 0, 20),
('Degeneração natural dos rins relacionada à idade', 1, 20),
('Baixa ingestão de proteína', 0, 20),
('Alergia alimentar prolongada', 0, 20),
('Porque possuem tolerância natural muito alta', 0, 21),
('Porque sua fisiologia impede demonstrações de dor', 0, 21),
('Porque são predadores e escondem fragilidades instintivamente', 1, 21),
('Porque a maioria das dores felinas é imperceptível', 0, 21);




	SELECT 
		u.id AS idUsuario,
		u.nome,
		u.email,
		SUM(p.pontuacaoTotal) AS totalPontos
	FROM usuario u
	JOIN pontuacao p ON p.fkUser = u.id
	GROUP BY u.id, u.nome, u.email
	ORDER BY totalPontos DESC;


select * from usuario;


select*from pontuacao;

