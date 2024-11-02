import express from "express";
import {
  cadastroProduct,
  excluirProduct,
  atualizaProduct,
} from "./src/controllers/ProductsController.js";
import {
  cadastroCommand,
  atualizaCommand,
} from "./src/controllers/CommandController.js";

import {
  criarItemCommand,
  atualizaItemCommand,
} from "./src/controllers/Item_CommandController.js";

import { getProducts } from "./src/models/ProductModel.js";
import { getAllCommands } from "./src/models/CommandModel.js";
import { getAllItemCommands } from "./src/models/Item_CommandModel.js";

import cors from "cors";

const app = express();
const port = 5000;

app.use(
  cors({
    origin: "http://localhost:5173", // apenas requisições vindas desse localhost:5173 serão permitidas
  })
);
app.use(express.json());

app.post("/registerProduct", cadastroProduct);
app.get("/products", getProducts);
app.delete("/products/:id", excluirProduct);
app.put("/products/:id", atualizaProduct);

app.post("/cadastroCommand", cadastroCommand);
app.get("/commands", getAllCommands);
app.put("/commands/:id", atualizaCommand);
// app.delete("/products/:id", updateCommand);

app.get("/itemCommands", getAllItemCommands);
app.post("/createItemCommand", criarItemCommand);
app.put("/itemCommands/:id", atualizaItemCommand);

app.get("/", (req, res) => {
  res.send("API funcionando");
});

app.listen(port, () => {
  console.log(`API funcionando na porta ${port}`);
});
