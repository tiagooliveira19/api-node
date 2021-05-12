module.exports = app => {
    const exames = require("../controllers/exame.controller");

    // Cria um novo laboratório
    app.post("/exames", exames.create);

    // Busca todos os laboratórios
    app.get("/exames", exames.findAll);

    // Busca exames pelo status
    app.post("/exames/:exStatus", exames.findStatus);

    // Busca exames pelo nome
    app.post("/exames/:exName", exames.findName);

    // Busca laboratorio pelo id
    app.get("/exames/:exId", exames.findOne);

    // Atualiza laboratorio pelo id
    app.put("/exames/:exId", exames.update);

    // Deleta laboratorio pelo id
    app.delete("/exames/:exId", exames.delete);

    // Deleta todos os exames
    app.delete("/exames", exames.deleteAll);
};
