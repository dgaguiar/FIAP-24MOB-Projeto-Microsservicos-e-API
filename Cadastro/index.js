const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.json());

app.use(cors());

const rotaClientes = require("../Cadastro/routes/users");

app.use("/api/clientes",rotaClientes);

app.listen(5000, () =>
  console.log(`Servidor on-line`)
);
