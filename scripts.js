const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configuration PostgreSQL
const pool = new Pool({
    user: 'myuser',
    host: process.env.DB_HOST || '20.199.84.234',
    database: 'mydb',
    password: 'mypassword',
    port: 5432,
});

// Routes API
app.get('/api/hello', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM test ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/hello', async (req, res) => {
    const { description } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO test (description) VALUES ($1) RETURNING *',
            [description]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000');
});