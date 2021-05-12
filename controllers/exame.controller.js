const Exame = require("../models/exame.model");

// Cria e Salva um novo exame
exports.create = (req, res) => {
    // Valida a requisição
    if (!req.body) {
        res.status(400).send({
            message: "Os dados não podem ser vazios!"
        });
    }

    // Cria um novo exame
    const exame = new Exame({
        nome: req.body.nome,
        tipo: req.body.tipo,
        status: req.body.status
    });

    // Salva exame criado no banco
    Exame.create(exame, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Ocorreu algum erro durante a criação do exame!"
            });
        else res.send(data);
    });
};

// Busca todos os exames
exports.findAll = (req, res) => {
    Exame.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Ocorreu algum erro durante a busca dos exames!"
            });
        else res.send(data);
    });
};

// Busca um exame pelo status
exports.findStatus = (req, res) => {
    Exame.findByStatus(req.params.exStatus, (err, data) => {
        if (err) {
            if (err.kind === "Exame(s) não encontrado(s)!") {
                res.status(404).send({
                    message: `Não foi possível encontrar exame(s) com status ${req.params.exStatus}!`
                });
            } else {
                res.status(500).send({
                    message: "Erro ao buscar exame(s) com status " + req.params.exStatus
                });
            }
        } else res.send(data);
    });
};

// Busca um exame pelo nome
exports.findName = (req, res) => {
    Exame.findByName(req.params.exName, (err, data) => {
        if (err) {
            if (err.kind === "Exame(s) não encontrado(s) no(s) laboratório(s)!") {
                res.status(404).send({
                    message: `Não foi possível encontrar exame(s) com o nome ${req.params.exName}!`
                });
            } else {
                res.status(500).send({
                    message: "Erro ao buscar exame(s) com o nome " + req.params.exName
                });
            }
        } else res.send(data);
    });
};

// Busca um exame pelo id
exports.findOne = (req, res) => {
    Exame.findById(req.params.exId, (err, data) => {
        if (err) {
            if (err.kind === "Exame não encontrado!") {
                res.status(404).send({
                    message: `Não foi possível encontrar o exame com o id ${req.params.exId}!`
                });
            } else {
                res.status(500).send({
                    message: "Erro ao buscar o exame com o id " + req.params.exId
                });
            }
        } else res.send(data);
    });
};

// Atualiza um exame pelo id passado na requisição
exports.update = (req, res) => {
    // Valida a requisição
    if (!req.body) {
        res.status(400).send({
            message: "Os dados não podem ser vazios!"
        });
    }

    Exame.updateById(
        req.params.exId,
        new Exame(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "Exame não encontrado!") {
                    res.status(404).send({
                        message: `Não foi possível encontrar o exame com o id ${req.params.exId}!`
                    });
                } else {
                    res.status(500).send({
                        message: "Erro ao atualizar exame com o id " + req.params.exId
                    });
                }
            } else res.send(data);
        }
    );
};

// Deleta um exame pelo id passado na requisição
exports.delete = (req, res) => {
    Exame.remove(req.params.exId, (err, data) => {
        if (err) {
            if (err.kind === "Exame não encontrado!") {
                res.status(404).send({
                    message: `Não foi possível encontrar o exame com o id ${req.params.exId}!`
                });
            } else {
                res.status(500).send({
                    message: "Não foi possível deletar o exame com o id " + req.params.exId
                });
            }
        } else res.send({ message: "Exame deletado com sucesso!" });
    });
};

// Delete todos os exames
exports.deleteAll = (req, res) => {
    Exame.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Ocorreu algum erro durante a exclusão dos exames!"
            });
        else res.send({ message: "Exames deletados com sucesso!" });
    });
};
