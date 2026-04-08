const db = require('../config/db');

const carroModel = {
    getAll: (limit, offset, callback) => {
        db.query(
            'SELECT * FROM carros LIMIT ? OFFSET ?',
            [limit, offset],
            callback
        );
    },

    getCount: (callback) => {
        db.query('SELECT COUNT(*) as total FROM carros', callback);
    },

    getById: (id, callback) => {
        db.query('SELECT * FROM carros WHERE id = ?', [id], callback);
    },

    create: (data, callback) => {
        const { marca, modelo, ano, cor, preco, descricao } = data;

        if (!marca || !modelo) {
            return callback(new Error('Marca e modelo são obrigatórios'));
        }

        db.query(
            'INSERT INTO carros (marca, modelo, ano, cor, preco, descricao) VALUES (?, ?, ?, ?, ?, ?)',
            [marca, modelo, ano || new Date().getFullYear(), cor || null, preco || null, descricao || null],
            callback
        );
    },

    update: (id, data, callback) => {
        const { marca, modelo, ano, cor, preco, descricao } = data;

        if (!marca || !modelo) {
            return callback(new Error('Marca e modelo são obrigatórios'));
        }

        db.query(
            'UPDATE carros SET marca = ?, modelo = ?, ano = ?, cor = ?, preco = ?, descricao = ? WHERE id = ?',
            [marca, modelo, ano || new Date().getFullYear(), cor || null, preco || null, descricao || null, id],
            callback
        );
    },

    delete: (id, callback) => {
        db.query('DELETE FROM carros WHERE id = ?', [id], callback);
    }
};

module.exports = carroModel;