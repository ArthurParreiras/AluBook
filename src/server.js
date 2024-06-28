const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const cors = require('cors'); // Importando o pacote cors

const app = express();
const port = 3000;

// Middleware para habilitar CORS
app.use(cors());

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// Middleware para parsear JSON e URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectar ao banco de dados SQLite
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados', err);
    } else {
        console.log('Conectado ao banco de dados SQLite');
    }
});

// Criação da tabela de clientes (se não existir)
db.run(`CREATE TABLE IF NOT EXISTS clientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    telefone TEXT NOT NULL,
    cpf TEXT NOT NULL UNIQUE
)`);

// Rota para criar um novo cliente
app.post('/criar-cliente', (req, res) => {
    const { nome, telefone, cpf } = req.body;

    if (!nome || !telefone || !cpf) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const sql = `INSERT INTO clientes (nome, telefone, cpf) VALUES (?, ?, ?)`;
    db.run(sql, [nome, telefone, cpf], function (err) {
        if (err) {
            console.error('Erro ao inserir cliente:', err.message);
            return res.status(500).json({ error: 'Erro ao criar cliente.' });
        }
        res.status(201).json({ message: 'Cliente criado com sucesso!', id: this.lastID });
    });
});

// Rota para excluir cliente pelo CPF
app.delete('/excluir-cliente/:cpf', (req, res) => {
    const cpf = req.params.cpf;
    const sql = 'DELETE FROM clientes WHERE cpf = ?';
    db.run(sql, [cpf], function (err) {
        if (err) {
            console.error('Erro ao excluir cliente:', err.message);
            return res.status(500).json({ error: 'Erro ao excluir cliente' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        res.status(200).json({ message: 'Cliente excluído com sucesso!' });
    });
});

// Rota para consultar um cliente pelo CPF
app.get('/consultar-cliente/:cpf', (req, res) => {
    const cpf = req.params.cpf;
    const sql = 'SELECT * FROM clientes WHERE cpf = ?';

    db.get(sql, [cpf], (err, row) => {
        if (err) {
            console.error('Erro ao consultar cliente:', err.message);
            res.status(500).json({ error: 'Erro ao consultar cliente' });
        } else if (!row) {
            res.status(404).json({ error: 'Cliente não encontrado' });
        } else {
            res.json(row);
        }
    });
});

// Criação da tabela de livros (se não existir)
db.run(`CREATE TABLE IF NOT EXISTS livros (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    autor TEXT NOT NULL,
    nome_livro TEXT NOT NULL,
    genero TEXT NOT NULL,
    anoLivro INTEGER NOT NULL,
    qtdLivros INTEGER NOT NULL,
    id_livro TEXT NOT NULL UNIQUE
)`);

// Rota para cadastrar um livro
app.post('/livros', (req, res) => {
    const { autor, nomeLivro, genero, idLivro, anoLivro, qtdLivros } = req.body;

    const sql = `INSERT INTO livros (autor, nome_livro, genero, id_livro, anoLivro, qtdLivros) VALUES (?, ?, ?, ?, ?, ?)`;
    const params = [autor, nomeLivro, genero, idLivro, anoLivro, qtdLivros];

    db.run(sql, params, function(err) {
        if (err) {
            console.error('Erro ao inserir livro', err);
            res.status(400).json({ success: false, message: 'Erro ao cadastrar livro. ' + err.message });
        } else {
            res.json({ success: true, message: 'Livro cadastrado com sucesso!' });
        }
    });
});

// Rota para excluir um livro pelo ID
app.delete('/livros/:id', (req, res) => {
    const idLivro = req.params.id;
    
    db.run('DELETE FROM livros WHERE id_livro = ?', [idLivro], function(err) {
        if (err) {
            res.json({ success: false, message: 'Erro ao excluir livro.' });
            return console.error(err.message);
        }
        if (this.changes === 0) {
            res.json({ success: false, message: 'Livro não encontrado.' });
        } else {
            res.json({ success: true, message: 'Livro excluído com sucesso.' });
        }
    });
});

// Rota para obter todos os livros
app.get('/livros', (req, res) => {
    db.all('SELECT * FROM livros', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});


// Criação da tabela de empréstimos (se não existir)
db.run(`CREATE TABLE IF NOT EXISTS emprestimos (
    idEmprestimo INTEGER PRIMARY KEY,
    nomeCliente TEXT NOT NULL,
    nomeLivro TEXT NOT NULL
)`);

// Rota para criar um novo empréstimo
app.post('/criar-emprestimo', (req, res) => {
    const { idEmprestimo ,nomeCliente, nomeLivro } = req.body;

    if (!nomeCliente || !nomeLivro) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const sql = `INSERT INTO emprestimos (idEmprestimo ,nomeCliente, nomeLivro) VALUES (?, ?, ?)`;
    db.run(sql, [idEmprestimo, nomeCliente, nomeLivro], function (err) {
        if (err) {
            console.error('Erro ao inserir empréstimo:', err.message);
            return res.status(500).json({ error: 'Erro ao criar empréstimo.' });
        }
        res.status(201).json({ message: 'Empréstimo criado com sucesso!', id: this.lastID });
    });
});

// Rota para excluir empréstimo pelo ID
app.delete('/excluir-emprestimo/:idEmprestimo', (req, res) => {
    const idEmprestimo = req.params.idEmprestimo;
    const sql = 'DELETE FROM emprestimos WHERE idEmprestimo = ?';
    db.run(sql, [idEmprestimo], function (err) {
        if (err) {
            console.error('Erro ao excluir empréstimo:', err.message);
            return res.status(500).json({ error: 'Erro ao excluir empréstimo' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Empréstimo não encontrado' });
        }
        res.status(200).json({ message: 'Empréstimo excluído com sucesso!' });
    });
});

// Rota para obter todos os empréstimos
app.get('/emprestimos', (req, res) => {
    db.all('SELECT * FROM emprestimos', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

