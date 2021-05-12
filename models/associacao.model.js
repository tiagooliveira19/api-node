const sql = require("./db");

// Constructor
const Associacao = function (associacao) {
    this.laboratorio_id = associacao.laboratorio_id;
    this.exame_id = associacao.exame_id;
}

Associacao.create = (labId, exId, newAsc, result) => {
    sql.query("SELECT l.id AS laboratorio, e.id AS exame " +
              "FROM laboratorios l JOIN exames e WHERE l.id = ? AND e.id = ? AND l.status = 'Ativo' AND e.status = 'Ativo'", [labId, exId], (err, res) => {
        if (res.length === 0) {
            if (err) {
                console.log("Erro: ", err);
                result(err, null);
                return;
            }
            console.log("Laboratório e/ou Exame não podem estar inativos!");
            result(null, { message : "Laboratório e/ou Exame não podem estar inativos!" });

        } else {
            sql.query("INSERT INTO associacao SET ?", newAsc, (err, res) => {
                if (err) {
                    console.log("Erro: ", err);
                    result(err, null);
                    return;
                }

                console.log("Associação criada: ", { id: res.insertId, ...newAsc });
                result(null, { id: res.insertId, ...newAsc });
            });
        }
    });
};

Associacao.remove = (ascId, labId, exId, result) => {
    sql.query("SELECT a.id AS associacao, l.id AS laboratorio, e.id AS exame " +
              "FROM laboratorios l JOIN exames e JOIN associacao a WHERE a.id = ? AND l.id = ? " +
              "AND e.id = ? AND l.status = 'Ativo' AND e.status = 'Ativo'", [ascId, labId, exId], (err, res) => {

        if (res.length !== 0) {
            if (err) {
                console.log("Erro: ", err);
                result(err, null);
                return;
            }

            sql.query("DELETE FROM associacao WHERE id = ?", ascId, (err, res) => {
                if (err) {
                    console.log("Erro: ", err);
                    result(err, null);
                    return;
                }

                if (res.affectedRows === 0) {
                    // Associação não encontrada com o id passado
                    result({ kind: "Associação não encontrada!" }, null);
                    return;
                }

                console.log("Associação deletada: ", ascId);
                result(null, res);
            });

        } else {
            console.log("A associação entre laboratório e exame não existe!");
            result(null, { message : "A associação entre laboratório e exame não existe!" });
        }
    });
};

Associacao.removeAll = result => {
    sql.query("DELETE FROM associacao", (err, res) => {
        if (err) {
            console.log("Erro: ", err);
            result(err, null);
            return;
        }

        console.log(`Deletados ${res.affectedRows} associações!`);
        result(null, res);
    });
};

module.exports = Associacao;
