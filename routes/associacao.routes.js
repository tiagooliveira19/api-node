module.exports = app => {
    const associacoes = require("../controllers/associacao.controller");

    // Cria uma nova associção
    app.post("/associacoes", associacoes.create);

    // Deleta uma associção pelos ids passados pela requisição
    app.delete("/associacoes/:ascId/:labId/:exId", associacoes.delete);

    // Deleta todos os associacoes
    app.delete("/associacoes", associacoes.deleteAll);
};
