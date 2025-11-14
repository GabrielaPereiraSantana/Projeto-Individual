USE catJournal;

CREATE TABLE usuario (
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(100),
email VARCHAR(100) UNIQUE,
senha VARCHAR(500),
qtdGato INT,
sexo VARCHAR(50), 
CONSTRAINT cksexo CHECK (sexo IN( 'Feminino', 'Masculino', 'Prefiro não informar')),
dtNasc DATE);

INSERT INTO usuario (nome, email, senha, qtdGato, sexo, dtNasc) VALUES
('Eduardo', 'eduardo@gmail.com', '12345', 1, 'Masculino', '2005-08-03');

CREATE TABLE post (
id INT PRIMARY KEY AUTO_INCREMENT,
titulo VARCHAR(150),
conteudo VARCHAR(4000),
criadoQuando DATE,
qtdLike INT,
fkUsuario INT,
CONSTRAINT fkUsuarioPost 
FOREIGN KEY (fkUsuario) REFERENCES usuario(id));