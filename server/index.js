import cors from "cors";
import express from "express";
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
import { getUsers, login, forgotPassword } from "./src/models/UserModel.js";
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
import {
  cadastroProduct,
  atualizaProduct,
  listaProdutos,
  toggleProduct,
} from "./src/controllers/ProductsController.js";
import { authenticateToken } from "./src/middlewares/authMiddleware.js";
import { checkAccessLevel } from "./src/middlewares/authMiddleware.js";

const app = express();
const port = 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE,PATCH",
    allowedHeaders: "Content-Type,Authorization", // apenas requisições vindas desse localhost:5173 serão permitidas
  })
);
app.use(express.json());

//Rotas Login
app.post("/login", login);
app.post("/forgot-password", forgotPassword);

//Rotas Comandas
app.post("/cadastroCommand", cadastroCommand);
app.get("/commands", getAllCommands);
app.get("/commandsFilter", getFilterCommands);
app.put("/commands/:id", atualizaCommand);
// app.put("/commandEdit/:id", editarCommand);

//Rotas Item comanda
app.post("/createItemCommand", criarItemCommand);
app.get("/itemCommands", getAllItemCommands);
app.put("/itemCommands/:id", atualizaItemCommand);

//Rotas Produtos
app.post("/registerProduct", cadastroProduct);
app.get("/products/:categoria?", listaProdutos);
app.put("/products/:id", atualizaProduct);
app.patch("/products/:id/status", toggleProduct);

//Rota Empresa
app.get("/companies", getCompanies);
app.post("/createCompanies", createCompanies);
app.delete("/deleteCompanies/:id", excluirCompanies);
app.put("/updateCompanies/:id", atualizaCompanies);

//Rota usuários
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
