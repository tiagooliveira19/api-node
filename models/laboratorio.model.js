const sql = require("./db");

// Constructor
const Laboratorio = function (laboratorio) {
    this.nome = laboratorio.nome;
    this.endereco = laboratorio.endereco;
    this.status = laboratorio.status;
}

Laboratorio.create = (newLab, result) => {
    sql.query("INSERT INTO laboratorios SET ?", newLab, (err, res) => {
        if (err) {
            console.log("Erro: ", err);
            result(err, null);
            return;
        }

        console.log("Laboratório criado: ", { id: res.insertId, ...newLab });
        result(null, { id: res.insertId, ...newLab });
    });
};

Laboratorio.findByStatus = (labStatus, result) => {
    sql.query('SELECT * FROM laboratorios WHERE status = ?', [labStatus] , (err, res) => {
        if (err) {
            console.log("Erro: ", err);
            result(err, null);
            return;
        }

        console.log("Laboratório(s) encontrado(s): ", res);
        result(null, res);
    });
};

Laboratorio.findById = (labId, result) => {
    sql.query('SELECT * FROM laboratorios WHERE id = ?', [labId] , (err, res) => {
        if (err) {
            console.log("Erro: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Laboratório encontrado: ", res[0]);
            result(null, res[0]);
            return;
        }

        // Laboratório não encontrado com o id passado
        result({ kind: "Laboratório não encontrado!" }, null);
    });
};

Laboratorio.getAll = result => {
    sql.query("SELECT * FROM laboratorios", (err, res) => {
        if (err) {
            console.log("Erro: ", err);
            result(err, null);
            return;
        }

        console.log("Laboratórios: ", res);
        result(null, res);
    });
};

Laboratorio.updateById = (id, laboratorio, result) => {
    sql.query("UPDATE laboratorios SET nome = ?, endereco = ?, status = ? WHERE id = ?", [laboratorio.nome, laboratorio.endereco, laboratorio.status, id],
        (err, res) => {
            if (err) {
                console.log("Erro: ", err);
                result(err, null);
                return;
            }

            if (res.affectedRows === 0) {
                // Laboratório não encontrado com o id passado
                result({ kind: "Laboratório não encontrado!" }, null);
                return;
            }

            console.log("Laboratório atualizado: ", { id: id, ...laboratorio });
            result(null, { id: id, ...laboratorio });
        });
};

Laboratorio.remove = (id, result) => {
    sql.query("DELETE FROM laboratorios WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("Erro: ", err);
            result(err, null);
            return;
        }

        if (res.affectedRows === 0) {
            // Laboratório não encontrado com o id passado
            result({ kind: "Laboratório não encontrado!" }, null);
            return;
        }

        console.log("Laboratório deletado: ", id);
        result(null, res);
    });
};

Laboratorio.removeAll = result => {
    sql.query("DELETE FROM laboratorios", (err, res) => {
        if (err) {
            console.log("Erro: ", err);
            result(err, null);
            return;
        }

        console.log(`Deletados ${res.affectedRows} laboratório(s)!`);
        result(null, res);
    });
};

module.exports = Laboratorio;
