const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dbPath = path.resolve(__dirname, 'db', 'alubook.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados SQLite:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
    }
});

// Rota para consultar um cliente pelo CPF
app.get('/consultar-cliente/:cpf', (req, res) => {
    const cpf = req.params.cpf;
    const sql = 'SELECT * FROM cliente WHERE cpf_cliente = ?';

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

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});


