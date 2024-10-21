import { addProducts, deleteProduct } from "../models/ProductModel.js";

export async function cadastroProduct(req, res){
    console.log('ProductsController cadastroProduto');
    const product = req.body;
    try {
        //Declarando status com o codigo da resposta e resposta JSON
        const [status, resposta] = await addProducts(product);
        res.status(status).json(resposta);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}

export async function excluirProduct(req, res) {
    console.log('ProductsController excluirProduct');
    const { id } = req.params;
    try {
        // Chamando a função de exclusão do produto e capturando status e mensagem de resposta
        const [status, resposta] = await deleteProduct(id);
        res.status(status).json(resposta);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erro ao deletar produto', error });
    }
}


