const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('public'));

// Conexão com o banco de dados SQLite
const db = new sqlite3.Database('./db/alubook.db', (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados SQLite:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
        db.run(`CREATE TABLE IF NOT EXISTS clientes (
            id_cliente INTEGER PRIMARY KEY AUTOINCREMENT,
            nome_cliente TEXT NOT NULL,
            tel_cliente TEXT NOT NULL,
            cpf_cliente TEXT NOT NULL UNIQUE
        )`, (err) => {
            if (err) {
                console.error('Erro ao criar a tabela clientes:', err.message);
            }
        });
    }
});

// Rota para criar um novo cliente
app.post('/criar-cliente', (req, res) => {
    const { nome, telefone, cpf } = req.body;

    if (!nome || !telefone || !cpf) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const sql = `INSERT INTO clientes (nome_cliente, tel_cliente, cpf_cliente) VALUES (?, ?, ?)`;
    db.run(sql, [nome, telefone, cpf], function (err) {
        if (err) {
            if (err.code === 'SQLITE_CONSTRAINT' && err.message.includes('UNIQUE constraint failed: clientes.cpf_cliente')) {
                return res.status(400).json({ error: 'CPF já cadastrado.' });
            } else {
                console.error('Erro ao inserir cliente:', err.message);
                return res.status(500).json({ error: 'Erro ao criar cliente.' });
            }
        }
        res.status(201).json({ message: 'Cliente criado com sucesso!', id: this.lastID });
    });
});

// Rota para consultar cliente pelo CPF
app.get('/consultar-cliente/:cpf', (req, res) => {
    const cpf = req.params.cpf;
    const sql = 'SELECT * FROM clientes WHERE cpf_cliente = ?';
    db.get(sql, [cpf], (err, row) => {
        if (err) {
            console.error('Erro ao consultar cliente:', err.message);
            return res.status(500).json({ error: 'Erro ao consultar cliente' });
        }
        if (!row) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        res.json(row);
    });
});

// Rota para excluir cliente pelo CPF
app.delete('/excluir-cliente/:cpf', (req, res) => {
    const cpf = req.params.cpf;
    const sql = 'DELETE FROM clientes WHERE cpf_cliente = ?';
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

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});




