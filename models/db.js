const mysql = require("mysql");
const dbConfig = require("../config/db.config");

// Cria a conexão com o banco de dados
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

// Abre a conexão com o MySQL
connection.connect(error => {
    if (error) throw error;
    console.log("Banco de dados conectado com sucesso!");
});

module.exports = connection;
