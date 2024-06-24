const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Cria a conexão com o banco de dados SQLite
const db = new sqlite3.Database('alubook.db', err => {
  if (err) {
    console.error('Erro ao abrir o banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite');
    // Cria as tabelas se elas não existirem
    db.run(`
      CREATE TABLE IF NOT EXISTS funcionario (
        cpf_func TEXT PRIMARY KEY,
        nome_func TEXT
      )
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS cliente (
        cpf_cliente TEXT PRIMARY KEY,
        nome_cliente TEXT,
        tel_cliente TEXT
      )
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS cadastro_cliente (
        cod_cadastro INTEGER PRIMARY KEY AUTOINCREMENT,
        nome_cliente TEXT,
        tel_cliente TEXT,
        FOREIGN KEY (nome_cliente) REFERENCES cliente(nome_cliente),
        FOREIGN KEY (tel_cliente) REFERENCES cliente(tel_cliente)
      )
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS livro (
        id_livro INTEGER PRIMARY KEY AUTOINCREMENT,
        nome_livro TEXT,
        autor_livro TEXT
      )
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS reserva (
        num_reserva INTEGER PRIMARY KEY AUTOINCREMENT,
        nome_cliente TEXT,
        cod_cliente INTEGER,
        data_reserva DATE,
        data_devol DATE,
        FOREIGN KEY (nome_cliente) REFERENCES cliente(nome_cliente),
        FOREIGN KEY (cod_cliente) REFERENCES cliente(cpf_cliente)
      )
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS pega_emprestado (
        num_reserva INTEGER,
        nome_cliente TEXT,
        cod_cliente INTEGER,
        PRIMARY KEY (num_reserva, nome_cliente, cod_cliente),
        FOREIGN KEY (num_reserva) REFERENCES reserva(num_reserva),
        FOREIGN KEY (nome_cliente) REFERENCES cliente(nome_cliente),
        FOREIGN KEY (cod_cliente) REFERENCES cliente(cpf_cliente)
      )
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS devolucao (
        num_reserva INTEGER PRIMARY KEY,
        nome_cliente TEXT,
        cod_cliente INTEGER,
        data_reserva DATE,
        data_devol DATE,
        FOREIGN KEY (num_reserva) REFERENCES reserva(num_reserva),
        FOREIGN KEY (nome_cliente) REFERENCES cliente(nome_cliente),
        FOREIGN KEY (cod_cliente) REFERENCES cliente(cpf_cliente)
      )
    `);
  }
});

// Rota para consultar cliente por CPF
app.get('/api/clientes/:cpf_cliente', (req, res) => {
  const cpfCliente = req.params.cpf_cliente;
  db.get('SELECT * FROM cliente WHERE cpf_cliente = ?', [cpfCliente], (err, row) => {
    if (err) {
      console.error('Erro ao consultar cliente:', err.message);
      res.status(500).send('Erro ao consultar cliente');
    } else {
      if (row) {
        res.json(row);
      } else {
        res.status(404).send('Cliente não encontrado');
      }
    }
  });
});

// Rota para consultar funcionário por CPF
app.get('/api/funcionarios/:cpf_func', (req, res) => {
  const cpfFuncionario = req.params.cpf_func;
  db.get('SELECT * FROM funcionario WHERE cpf_func = ?', [cpfFuncionario], (err, row) => {
    if (err) {
      console.error('Erro ao consultar funcionário:', err.message);
      res.status(500).send('Erro ao consultar funcionário');
    } else {
      if (row) {
        res.json(row);
      } else {
        res.status(404).send('Funcionário não encontrado');
      }
    }
  });
});

// Adicione outras rotas e lógica aqui, conforme necessário

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
