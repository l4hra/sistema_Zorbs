import express from 'express';
import { createCompanies, excluirCompanies, atualizaCompanies  } from './src/controllers/CompaniesController.js'
import { cadastroProduct, excluirProduct, atualizaProduct, listaProdutos } from './src/controllers/ProductsController.js';
import {cadastroUser, excluirUsers, atualizaUsers} from './src/controllers/UserController.js'
import { getCompanies } from './src/models/CompaniesModel.js'
//import { getProducts } from './src/models/ProductModel.js';
import { getUsers } from './src/models/UserModel.js';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(cors({
    origin: 'http://localhost:5173' // apenas requisições vindas desse localhost:5173 serão permitidas
}));
app.use(express.json());


app.post('/registerProduct', cadastroProduct);
//app.get('/products', getProducts);
//Rota filtrando categoria
app.get('/products/:categoria?', listaProdutos);
app.delete('/products/:id', excluirProduct);
app.put('/products/:id', atualizaProduct);

app.get('/companies', getCompanies);
app.post('/createCompanies', createCompanies);
app.delete('/deleteCompanies/:id', excluirCompanies);
app.put('/updateCompanies/:id', atualizaCompanies);

app.get('/users', getUsers);
app.post('/cadastroUser', cadastroUser);
app.delete('/deleteUser/:id', excluirUsers);
app.put('/updateUsers/:id', atualizaUsers)

app.get('/', (req, res) => {
    res.send('API funcionando');
});

app.listen(port, () => {
    console.log(`API funcionando na porta ${port}`);
});
