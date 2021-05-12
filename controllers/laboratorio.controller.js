const Laboratorio = require("../models/laboratorio.model");

// Cria e Salva um novo laboratório
exports.create = (req, res) => {
    // Valida a requisição
    if (!req.body) {
        res.status(400).send({
            message: "Os dados não podem ser vazios!"
        });
    }

    // Cria um novo laboratório
    const laboratorio = new Laboratorio({
        nome: req.body.nome,
        endereco: req.body.endereco,
        status: req.body.status
    });

    // Salva laboratório criado no banco
    Laboratorio.create(laboratorio, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Ocorreu algum erro durante a criação do laboratório!"
            });
        else res.send(data);
    });
};

// Busca todos os laboratórios
exports.findAll = (req, res) => {
    Laboratorio.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Ocorreu algum erro durante a busca dos laboratórios!"
            });
        else res.send(data);
    });
};

// Busca um laboratório pelo status
exports.findStatus = (req, res) => {
    Laboratorio.findByStatus(req.params.labStatus, (err, data) => {
        if (err) {
            if (err.kind === "Laboratório(s) não encontrado(s)!") {
                res.status(404).send({
                    message: `Não foi possível encontrar laboratório(s) com status ${req.params.labStatus}!`
                });
            } else {
                res.status(500).send({
                    message: "Erro ao buscar laboratório(s) com status " + req.params.labStatus
                });
            }
        } else res.send(data);
    });
};

// Busca um laboratório pelo id
exports.findOne = (req, res) => {
    Laboratorio.findById(req.params.labId, (err, data) => {
        if (err) {
            if (err.kind === "Laboratório não encontrado!") {
                res.status(404).send({
                    message: `Não foi possível encontrar o laboratório com o id ${req.params.labId}!`
                });
            } else {
                res.status(500).send({
                    message: "Erro ao buscar o laboratório com o id " + req.params.labId
                });
            }
        } else res.send(data);
    });
};

// Atualiza um laboratorio pelo id passado na requisição
exports.update = (req, res) => {
    // Valida a requisição
    if (!req.body) {
        res.status(400).send({
            message: "Os dados não podem ser vazios!"
        });
    }

    Laboratorio.updateById(
        req.params.labId,
        new Laboratorio(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "Laboratório não encontrado!") {
                    res.status(404).send({
                        message: `Não foi possível encontrar o laboratório com o id ${req.params.labId}!`
                    });
                } else {
                    res.status(500).send({
                        message: "Erro ao atualizar laboratório com o id " + req.params.labId
                    });
                }
            } else res.send(data);
        }
    );
};

// Deleta um laboratorio pelo id passado na requisição
exports.delete = (req, res) => {
    Laboratorio.remove(req.params.labId, (err, data) => {
        if (err) {
            if (err.kind === "Laboratório não encontrado!") {
                res.status(404).send({
                    message: `Não foi possível encontrar o laboratório com o id ${req.params.labId}!`
                });
            } else {
                res.status(500).send({
                    message: "Não foi possível deletar o laboratório com o id " + req.params.labId
                });
            }
        } else res.send({ message: "Laboratório deletado com sucesso!" });
    });
};

// Delete todos os laboratórios
exports.deleteAll = (req, res) => {
    Laboratorio.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Ocorreu algum erro durante a exclusão dos laboratórios!"
            });
        else res.send({ message: "Laboratórios deletados com sucesso!" });
    });
};
