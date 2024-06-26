const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

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
app.post('/clientes', (req, res) => {
    const { nome, telefone, cpf } = req.body;

    const sql = `INSERT INTO clientes (nome, telefone, cpf) VALUES (?, ?, ?)`;
    const params = [nome, telefone, cpf];

    db.run(sql, params, function(err) {
        if (err) {
            console.error('Erro ao inserir cliente', err);
            res.status(400).json({ success: false, message: 'Erro ao cadastrar cliente. ' + err.message });
        } else {
            res.json({ success: true, message: 'Cliente cadastrado com sucesso!' });
        }
    });
});

// Rota para excluir um cliente
app.delete('/clientes/:cpf', (req, res) => {
    const { cpf } = req.params;

    const sql = `DELETE FROM clientes WHERE cpf = ?`;
    const params = [cpf];

    db.run(sql, params, function(err) {
        if (err) {
            console.error('Erro ao excluir cliente', err);
            res.status(400).json({ success: false, message: 'Erro ao excluir cliente. ' + err.message });
        } else {
            res.json({ success: true, message: 'Cliente excluído com sucesso!' });
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






app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});






