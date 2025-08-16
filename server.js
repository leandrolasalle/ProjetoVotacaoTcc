// server.js
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Define a pasta raiz de onde os arquivos serão servidos
const publicPath = path.join(__dirname, "public");

// Middleware para servir arquivos estáticos (html, css, js, imagens, etc.)
app.use(express.static(publicPath));

// Caso o usuário acesse "/" sem especificar arquivo, abre o index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
