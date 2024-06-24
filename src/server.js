const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// Middleware para configurar cabeçalhos CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Cria uma conexão com o banco de dados SQLite
const db = new sqlite3.Database('alubook.db', (err) => {
  if (err) {
    console.error('Erro ao abrir o banco de dados:', err.message);
  } else {
    console.log('Conexão estabelecida com sucesso ao banco de dados SQLite');
  }
});

// Rota para consultar cliente por CPF
app.get('/consultar-cliente/:cpf', (req, res) => {
  const cpfCliente = req.params.cpf;

  const query = 'SELECT * FROM cliente WHERE cpf_cliente = ?';
  db.get(query, [cpfCliente], (err, row) => {
    if (err) {
      console.error('Erro ao consultar cliente:', err.message);
      res.status(500).json({ error: 'Erro ao consultar cliente' });
    } else {
      res.status(200).json(row);
    }
  });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

