const sql = require("./db");

// Constructor
const Exame = function (exame) {
    this.nome = exame.nome;
    this.tipo = exame.tipo;
    this.status = exame.status;
}

Exame.create = (newEx, result) => {
    sql.query("INSERT INTO exames SET ?", newEx, (err, res) => {
        if (err) {
            console.log("Erro: ", err);
            result(err, null);
            return;
        }

        console.log("Exame criado: ", { id: res.insertId, ...newEx });
        result(null, { id: res.insertId, ...newEx });
    });
};

Exame.findByStatus = (exStatus, result) => {
    sql.query('SELECT * FROM exames WHERE status = ?', [exStatus] , (err, res) => {
        if (err) {
            console.log("Erro: ", err);
            result(err, null);
            return;
        }

        console.log("Exame(s) encontrado(s): ", res);
        result(null, res);
    });
};

Exame.findByName = (exName, result) => {
    sql.query('SELECT e.nome AS exame, l.nome AS laboratorio FROM exames e JOIN associacao a ON e.id = a.exame_id JOIN laboratorios l ON a.laboratorio_id = l.id WHERE e.nome ?', [exName] , (err, res) => {
        if (err) {
            console.log("Erro: ", err);
            result(err, null);
            return;
        }

        console.log("Exame(s) encontrado(s) no(s) laboratório(s): ", res);
        result(null, res);
    });
};

Exame.findById = (exId, result) => {
    sql.query('SELECT * FROM exames WHERE id = ?', [exId] , (err, res) => {
        if (err) {
            console.log("Erro: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Exame encontrado: ", res[0]);
            result(null, res[0]);
            return;
        }

        // Laboratório não encontrado com o id passado
        result({ kind: "Exame não encontrado!" }, null);
    });
};

Exame.getAll = result => {
    sql.query("SELECT * FROM exames", (err, res) => {
        if (err) {
            console.log("Erro: ", err);
            result(err, null);
            return;
        }

        console.log("Exames: ", res);
        result(null, res);
    });
};

Exame.updateById = (id, exame, result) => {
    sql.query("UPDATE exames SET nome = ?, tipo = ?, status = ? WHERE id = ?", [exame.nome, exame.tipo, exame.status, id],
        (err, res) => {
            if (err) {
                console.log("Erro: ", err);
                result(err, null);
                return;
            }

            if (res.affectedRows === 0) {
                // Exame não encontrado com o id passado
                result({ kind: "Exame não encontrado!" }, null);
                return;
            }

            console.log("Exame atualizado: ", { id: id, ...exame });
            result(null, { id: id, ...exame });
        });
};

Exame.remove = (id, result) => {
    sql.query("DELETE FROM exames WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("Erro: ", err);
            result(err, null);
            return;
        }

        if (res.affectedRows === 0) {
            // Exame não encontrado com o id passado
            result({ kind: "Exame não encontrado!" }, null);
            return;
        }

        console.log("Exame deletado: ", id);
        result(null, res);
    });
};

Exame.removeAll = result => {
    sql.query("DELETE FROM exames", (err, res) => {
        if (err) {
            console.log("Erro: ", err);
            result(err, null);
            return;
        }

        console.log(`Deletados ${res.affectedRows} exame(s)!`);
        result(null, res);
    });
};

module.exports = Exame;
