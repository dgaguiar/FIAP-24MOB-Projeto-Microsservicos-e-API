const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.json());

app.use(cors());

const rotaClientes = require("../InfoFinanceiras/routes/routes");

app.use("/api/financeiro",rotaClientes);

app.listen(5001, () =>
  console.log(`Servidor on-line`)
);
