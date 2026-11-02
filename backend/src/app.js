const express = require("express");
const cors = require("cors");

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "ServisMás API funcionando correctamente",
  });
});

module.exports = app;
