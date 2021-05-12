const Associacao = require("../models/associacao.model");

// Cria e Salva uma nova associação
exports.create = (req, res) => {
    // Valida a requisição
    if (!req.body) {
        res.status(400).send({
            message: "Os dados não podem ser vazios!"
        });
    }

    // Cria uma nova associação
    const associacao = new Associacao({
        laboratorio_id: req.body.laboratorio_id,
        exame_id: req.body.exame_id
    });

    // Salva exame criado no banco
    Associacao.create(req.body.laboratorio_id, req.body.exame_id, associacao, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Ocorreu algum erro durante a associação!"
            });
        else res.send(data);
    });
};

// Deleta uma associacso pelos ids passados na requisição
exports.delete = (req, res) => {
    Associacao.remove(req.params.ascId, req.params.labId, req.params.exId,(err, data) => {
        if (err) {
            if (err.kind === "Associação não encontrada!") {
                res.status(404).send({
                    message: `Não foi possível encontrar a associação com o id ${req.params.ascId}!`
                });
            } else {
                res.status(500).send({
                    message: "Não foi possível deletar a associação com o id " + req.params.ascId
                });
            }
        } else if (data.message) {
            res.status(404).send({
                message: data.message
            });
        } else res.send({ message: "Associação deletada com sucesso!" });
    });
};

// Delete todas as associações
exports.deleteAll = (req, res) => {
    Associacao.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Ocorreu algum erro durante a exclusão das associações!"
            });
        else res.send({ message: "Associações deletadas com sucesso!" });
    });
};
