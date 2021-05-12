const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    return res.json({ message: "Teste..." });
});

require("./routes/laboratorio.routes")(app);
require("./routes/exame.routes")(app);
require("./routes/associacao.routes")(app);

// set port, listen for requests
app.listen(3000, '127.0.0.1',() => {
    console.log("Server is running on port 3000.");
});
