const express = require('express');
const db = require('../config/db');
const cors = require('cors');
const carroController = require('./carroController');

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3001;

db.getConnection((err, connection) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL com sucesso!');
    connection.release();
});


app.get('/carros', carroController.getCarros);
app.get('/carros/:id', carroController.getCarroById);
app.post('/carros', carroController.createCarro);
app.put('/carros/:id', carroController.updateCarro);
app.delete('/carros/:id', carroController.deleteCarro);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

module.exports = app;