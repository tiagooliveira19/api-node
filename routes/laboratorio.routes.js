module.exports = app => {
    const laboratorios = require("../controllers/laboratorio.controller.js");

    // Cria um novo laboratório
    app.post("/laboratorios", laboratorios.create);

    // Busca todos os laboratórios
    app.get("/laboratorios", laboratorios.findAll);

    // Busca laboratorios pelo status
    app.post("/laboratorios/:labStatus", laboratorios.findStatus);

    // Busca laboratorio pelo id
    app.get("/laboratorios/:labId", laboratorios.findOne);

    // Atualiza laboratorio pelo id
    app.put("/laboratorios/:labId", laboratorios.update);

    // Deleta laboratorio pelo id
    app.delete("/laboratorios/:labId", laboratorios.delete);

    // Deleta todos os laboratorios
    app.delete("/laboratorios", laboratorios.deleteAll);
};
