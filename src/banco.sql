CREATE DATABASE alubook;

USE alubook;

CREATE TABLE funcionario (
    cpf_func VARCHAR(11) PRIMARY KEY,
    nome_func VARCHAR(100)
);

CREATE TABLE cliente (
    cpf_cliente VARCHAR(11) PRIMARY KEY,
    nome_cliente VARCHAR(100),
    tel_cliente VARCHAR(15)
);

CREATE TABLE cadastro_cliente (
    cod_cadastro INT AUTO_INCREMENT PRIMARY KEY,
    nome_cliente VARCHAR(100),
    tel_cliente VARCHAR(15),
    FOREIGN KEY (nome_cliente) REFERENCES cliente(nome_cliente),
    FOREIGN KEY (tel_cliente) REFERENCES cliente(tel_cliente)
);

CREATE TABLE livro (
    id_livro INT AUTO_INCREMENT PRIMARY KEY,
    nome_livro VARCHAR(100),
    autor_livro VARCHAR(100)
);

CREATE TABLE reserva (
    num_reserva INT AUTO_INCREMENT PRIMARY KEY,
    nome_cliente VARCHAR(100),
    cod_cliente INT,
    data_reserva DATE,
    data_devol DATE,
    FOREIGN KEY (nome_cliente) REFERENCES cliente(nome_cliente),
    FOREIGN KEY (cod_cliente) REFERENCES cliente(cpf_cliente)
);

CREATE TABLE pega_emprestado (
    num_reserva INT,
    nome_cliente VARCHAR(100),
    cod_cliente INT,
    PRIMARY KEY (num_reserva, nome_cliente, cod_cliente),
    FOREIGN KEY (num_reserva) REFERENCES reserva(num_reserva),
    FOREIGN KEY (nome_cliente) REFERENCES cliente(nome_cliente),
    FOREIGN KEY (cod_cliente) REFERENCES cliente(cpf_cliente)
);

CREATE TABLE devolucao (
    num_reserva INT PRIMARY KEY,
    nome_cliente VARCHAR(100),
    cod_cliente INT,
    data_reserva DATE,
    data_devol DATE,
    FOREIGN KEY (num_reserva) REFERENCES reserva(num_reserva),
    FOREIGN KEY (nome_cliente) REFERENCES cliente(nome_cliente),
    FOREIGN KEY (cod_cliente) REFERENCES cliente(cpf_cliente)
);