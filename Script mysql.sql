CREATE DATABASE test_pradb;
USE test_pradb;
select * from clients;
select * from users;
/*Utilizando a ORM do sequelize não foi necessário criar as tabelas por script*/
CREATE TABLE clients (
    id INT,
    cnpj bigint(255),
    nome_fantasia VARCHAR(255),
    razao_social VARCHAR(255),
    cep bigint,
    endereco varchar(255),
    numero varchar(255),
    complemento varchar(255),
    bairro varchar(255),
    cidade varchar(255),
    uf varchar(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    constraint pk_id primary key(id)
);
CREATE TABLE users (
    id INT,
    nome VARCHAR(255),
    sobrenome VARCHAR(255),
    telefone bigint,
    email varchar(255),
    senha varchar(255),
    clientId INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    constraint pk_id primary key(id),
    constraint fk_clientId foreign key(clientId) references clients(id)
);