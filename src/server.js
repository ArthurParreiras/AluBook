const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'alubook'
});

connection.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.stack);
    return;
  }
  console.log('Conectado ao banco de dados como id ' + connection.threadId);
});

// Rotas para a tabela funcionario
app.get('/api/funcionarios', (req, res) => {
  connection.query('SELECT * FROM funcionario', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.post('/api/funcionarios', (req, res) => {
  const { cpf_func, nome_func } = req.body;
  connection.query('INSERT INTO funcionario (cpf_func, nome_func) VALUES (?, ?)', [cpf_func, nome_func], (error) => {
    if (error) throw error;
    res.status(201).send('Funcionário adicionado com sucesso');
  });
});

app.put('/api/funcionarios/:cpf_func', (req, res) => {
  const { cpf_func } = req.params;
  const { nome_func } = req.body;
  connection.query('UPDATE funcionario SET nome_func = ? WHERE cpf_func = ?', [nome_func, cpf_func], (error) => {
    if (error) throw error;
    res.send('Funcionário atualizado com sucesso');
  });
});

app.delete('/api/funcionarios/:cpf_func', (req, res) => {
  const { cpf_func } = req.params;
  connection.query('DELETE FROM funcionario WHERE cpf_func = ?', [cpf_func], (error) => {
    if (error) throw error;
    res.send('Funcionário deletado com sucesso');
  });
});

// Rotas para a tabela cliente
app.get('/api/clientes', (req, res) => {
  connection.query('SELECT * FROM cliente', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.post('/api/clientes', (req, res) => {
  const { cpf_cliente, nome_cliente, tel_cliente } = req.body;
  connection.query('INSERT INTO cliente (cpf_cliente, nome_cliente, tel_cliente) VALUES (?, ?, ?)', [cpf_cliente, nome_cliente, tel_cliente], (error) => {
    if (error) throw error;
    res.status(201).send('Cliente adicionado com sucesso');
  });
});

app.put('/api/clientes/:cpf_cliente', (req, res) => {
  const { cpf_cliente } = req.params;
  const { nome_cliente, tel_cliente } = req.body;
  connection.query('UPDATE cliente SET nome_cliente = ?, tel_cliente = ? WHERE cpf_cliente = ?', [nome_cliente, tel_cliente, cpf_cliente], (error) => {
    if (error) throw error;
    res.send('Cliente atualizado com sucesso');
  });
});

app.delete('/api/clientes/:cpf_cliente', (req, res) => {
  const { cpf_cliente } = req.params;
  connection.query('DELETE FROM cliente WHERE cpf_cliente = ?', [cpf_cliente], (error) => {
    if (error) throw error;
    res.send('Cliente deletado com sucesso');
  });
});

// Rotas para a tabela cadastro_cliente
app.get('/api/cadastro_clientes', (req, res) => {
  connection.query('SELECT * FROM cadastro_cliente', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.post('/api/cadastro_clientes', (req, res) => {
  const { nome_cliente, tel_cliente } = req.body;
  connection.query('INSERT INTO cadastro_cliente (nome_cliente, tel_cliente) VALUES (?, ?)', [nome_cliente, tel_cliente], (error) => {
    if (error) throw error;
    res.status(201).send('Cadastro de cliente adicionado com sucesso');
  });
});

app.put('/api/cadastro_clientes/:cod_cadastro', (req, res) => {
  const { cod_cadastro } = req.params;
  const { nome_cliente, tel_cliente } = req.body;
  connection.query('UPDATE cadastro_cliente SET nome_cliente = ?, tel_cliente = ? WHERE cod_cadastro = ?', [nome_cliente, tel_cliente, cod_cadastro], (error) => {
    if (error) throw error;
    res.send('Cadastro de cliente atualizado com sucesso');
  });
});

app.delete('/api/cadastro_clientes/:cod_cadastro', (req, res) => {
  const { cod_cadastro } = req.params;
  connection.query('DELETE FROM cadastro_cliente WHERE cod_cadastro = ?', [cod_cadastro], (error) => {
    if (error) throw error;
    res.send('Cadastro de cliente deletado com sucesso');
  });
});

// Rotas para a tabela livro
app.get('/api/livros', (req, res) => {
  connection.query('SELECT * FROM livro', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.post('/api/livros', (req, res) => {
  const { nome_livro, autor_livro } = req.body;
  connection.query('INSERT INTO livro (nome_livro, autor_livro) VALUES (?, ?)', [nome_livro, autor_livro], (error) => {
    if (error) throw error;
    res.status(201).send('Livro adicionado com sucesso');
  });
});

app.put('/api/livros/:id_livro', (req, res) => {
  const { id_livro } = req.params;
  const { nome_livro, autor_livro } = req.body;
  connection.query('UPDATE livro SET nome_livro = ?, autor_livro = ? WHERE id_livro = ?', [nome_livro, autor_livro, id_livro], (error) => {
    if (error) throw error;
    res.send('Livro atualizado com sucesso');
  });
});

app.delete('/api/livros/:id_livro', (req, res) => {
  const { id_livro } = req.params;
  connection.query('DELETE FROM livro WHERE id_livro = ?', [id_livro], (error) => {
    if (error) throw error;
    res.send('Livro deletado com sucesso');
  });
});

// Rotas para a tabela reserva
app.get('/api/reservas', (req, res) => {
  connection.query('SELECT * FROM reserva', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.post('/api/reservas', (req, res) => {
  const { nome_cliente, cod_cliente, data_reserva, data_devol } = req.body;
  connection.query('INSERT INTO reserva (nome_cliente, cod_cliente, data_reserva, data_devol) VALUES (?, ?, ?, ?)', [nome_cliente, cod_cliente, data_reserva, data_devol], (error) => {
    if (error) throw error;
    res.status(201).send('Reserva adicionada com sucesso');
  });
});

app.put('/api/reservas/:num_reserva', (req, res) => {
  const { num_reserva } = req.params;
  const { nome_cliente, cod_cliente, data_reserva, data_devol } = req.body;
  connection.query('UPDATE reserva SET nome_cliente = ?, cod_cliente = ?, data_reserva = ?, data_devol = ? WHERE num_reserva = ?', [nome_cliente, cod_cliente, data_reserva, data_devol, num_reserva], (error) => {
    if (error) throw error;
    res.send('Reserva atualizada com sucesso');
  });
});

app.delete('/api/reservas/:num_reserva', (req, res) => {
  const { num_reserva } = req.params;
  connection.query('DELETE FROM reserva WHERE num_reserva = ?', [num_reserva], (error) => {
    if (error) throw error;
    res.send('Reserva deletada com sucesso');
  });
});

// Rotas para a tabela pega_emprestado
app.get('/api/pega_emprestados', (req, res) => {
  connection.query('SELECT * FROM pega_emprestado', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.post('/api/pega_emprestados', (req, res) => {
  const { num_reserva, nome_cliente, cod_cliente } = req.body;
  connection.query('INSERT INTO pega_emprestado (num_reserva, nome_cliente, cod_cliente) VALUES (?, ?, ?)', [num_reserva, nome_cliente, cod_cliente], (error) => {
    if (error) throw error;
    res.status(201).send('Pega_emprestado adicionado com sucesso');
  });
});

app.put('/api/pega_emprestados/:num_reserva/:nome_cliente/:cod_cliente', (req, res) => {
  const { num_reserva, nome_cliente, cod_cliente } = req.params;
  const { novo_num_reserva, novo_nome_cliente, novo_cod_cliente } = req.body;
  connection.query('UPDATE pega_emprestado SET num_reserva = ?, nome_cliente = ?, cod_cliente = ? WHERE num_reserva = ? AND nome_cliente = ? AND cod_cliente = ?', [novo_num_reserva, novo_nome_cliente, novo_cod_cliente, num_reserva, nome_cliente, cod_cliente], (error) => {
    if (error) throw error;
    res.send('Pega_emprestado atualizado com sucesso');
  });
});

app.delete('/api/pega_emprestados/:num_reserva/:nome_cliente/:cod_cliente', (req, res) => {
  const { num_reserva, nome_cliente, cod_cliente } = req.params;
  connection.query('DELETE FROM pega_emprestado WHERE num_reserva = ? AND nome_cliente = ? AND cod_cliente = ?', [num_reserva, nome_cliente, cod_cliente], (error) => {
    if (error) throw error;
    res.send('Pega_emprestado deletado com sucesso');
  });
});

// Rotas para a tabela devolucao
app.get('/api/devolucoes', (req, res) => {
  connection.query('SELECT * FROM devolucao', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.post('/api/devolucoes', (req, res) => {
  const { num_reserva, nome_cliente, cod_cliente, data_reserva, data_devol } = req.body;
  connection.query('INSERT INTO devolucao (num_reserva, nome_cliente, cod_cliente, data_reserva, data_devol) VALUES (?, ?, ?, ?, ?)', [num_reserva, nome_cliente, cod_cliente, data_reserva, data_devol], (error) => {
    if (error) throw error;
    res.status(201).send('Devolução adicionada com sucesso');
  });
});

app.put('/api/devolucoes/:num_reserva', (req, res) => {
  const { num_reserva } = req.params;
  const { nome_cliente, cod_cliente, data_reserva, data_devol } = req.body;
  connection.query('UPDATE devolucao SET nome_cliente = ?, cod_cliente = ?, data_reserva = ?, data_devol = ? WHERE num_reserva = ?', [nome_cliente, cod_cliente, data_reserva, data_devol, num_reserva], (error) => {
    if (error) throw error;
    res.send('Devolução atualizada com sucesso');
  });
});

app.delete('/api/devolucoes/:num_reserva', (req, res) => {
  const { num_reserva } = req.params;
  connection.query('DELETE FROM devolucao WHERE num_reserva = ?', [num_reserva], (error) => {
    if (error) throw error;
    res.send('Devolução deletada com sucesso');
  });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
