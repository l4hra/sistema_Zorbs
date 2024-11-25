import {
  cadastroCommand,
  atualizaCommand,
  editarCommand,
} from "./src/controllers/CommandController.js";
import { getCompanies } from "./src/models/CompaniesModel.js";
import {
  createCompanies,
  excluirCompanies,
  atualizaCompanies,
} from "./src/controllers/CompaniesController.js";
import {
  criarItemCommand,
  atualizaItemCommand,
} from "./src/controllers/Item_CommandController.js";
import { getUsers } from "./src/models/UserModel.js";
import {
  getAllCommands,
  getFilterCommands,
} from "./src/models/CommandModel.js";
import { getAllItemCommands } from "./src/models/Item_CommandModel.js";
import {
  cadastroUser,
  excluirUsers,
  atualizaUsers,
} from "./src/controllers/UserController.js";
import cors from "cors";
import express from "express";

import {
  cadastroProduct,
  excluirProduct,
  atualizaProduct,
  listaProdutos,
} from "./src/controllers/ProductsController.js";
//import { getProducts } from './src/models/ProductModel.js';

const app = express();
const port = 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization", // apenas requisições vindas desse localhost:5173 serão permitidas
  })
);
app.use(express.json());

app.post("/cadastroCommand", cadastroCommand);
app.get("/commands", getAllCommands);
app.get("/commandsFilter", getFilterCommands);
app.put("/commands/:id", atualizaCommand);
// app.put("/commandEdit/:id", editarCommand);

// app.delete("/products/:id", updateCommand);

app.post("/createItemCommand", criarItemCommand);
app.get("/itemCommands", getAllItemCommands);
app.put("/itemCommands/:id", atualizaItemCommand);

app.post("/registerProduct", cadastroProduct);
//app.get('/products', getProducts);
//Rota filtrando categoria
app.get("/products/:categoria?", listaProdutos);
app.delete("/products/:id", excluirProduct);
app.put("/products/:id", atualizaProduct);

app.get("/companies", getCompanies);
app.post("/createCompanies", createCompanies);
app.delete("/deleteCompanies/:id", excluirCompanies);
app.put("/updateCompanies/:id", atualizaCompanies);

app.get("/users", getUsers);
app.post("/cadastroUser", cadastroUser);
app.delete("/deleteUser/:id", excluirUsers);
app.put("/updateUsers/:id", atualizaUsers);

app.get("/", (req, res) => {
  res.send("API funcionando");
});

app.listen(port, () => {
  console.log(`API funcionando na porta ${port}`);
});
