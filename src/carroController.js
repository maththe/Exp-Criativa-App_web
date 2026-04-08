const carroModel = require('./carroModel');

const carroController = {
    getCarros: (req, res) => {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        // Obter contagem total
        carroModel.getCount((err, countResults) => {
            if (err) return res.status(500).json({ error: err.message });

            const total = countResults[0].total;

            // Obter carros paginados
            carroModel.getAll(limit, offset, (err, results) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json({
                    carros: results,
                    total: total,
                    page: page,
                    limit: limit,
                    totalPaginas: Math.ceil(total / limit)
                });
            });
        });
    },

    getCarroById: (req, res) => {
        const { id } = req.params;

        carroModel.getById(id, (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!results || results.length === 0)
                return res.status(404).json({ message: 'Carro não encontrado' });

            res.json(results[0]);
        });
    },

    createCarro: (req, res) => {
        carroModel.create(req.body, (err, results) => {
            if (err) return res.status(400).json({ message: err.message });
            res.status(201).json({
                id: results.insertId,
                message: 'Carro criado com sucesso'
            });
        });
    },

    updateCarro: (req, res) => {
        const { id } = req.params;

        carroModel.update(id, req.body, (err, results) => {
            if (err) return res.status(400).json({ message: err.message });
            if (!results.affectedRows)
                return res.status(404).json({ message: 'Carro não encontrado' });

            res.json({ message: 'Atualizado com sucesso' });
        });
    },

    deleteCarro: (req, res) => {
        const { id } = req.params;

        carroModel.delete(id, (err, results) => {
            if (err) return res.status(500).json({ message: err.message });
            if (!results.affectedRows)
                return res.status(404).json({ message: 'Carro não encontrado' });

            res.json({ message: 'Removido com sucesso' });
        });
    }
};

module.exports = carroController;