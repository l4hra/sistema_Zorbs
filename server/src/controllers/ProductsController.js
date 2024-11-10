import { addProducts, deleteProduct, getProducts, updateProduct } from "../models/ProductModel.js";
import { validateProductData, validateProductId } from "../validations/productsValidation.js";

export async function cadastroProduct(req, res){
    console.log('ProductsController cadastroProduto');
    const product = req.body;

    // Validar os dados do produto antes de cadastrar
    const validationErrors = validateProductData(product);
    if (validationErrors.length > 0) {
        return res.status(400).json({ errors: validationErrors });
    }

    try {
        //Declarando status com o codigo da resposta e resposta JSON
        const [status, resposta] = await addProducts(product);
        res.status(status).json(resposta);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Erro ao cadastrar produto', error });
    }
}

export async function listaProdutos(req,res) {
        console.log('ProductsController :: listaProdutos')
        const {categoria} = req.params;

        try {
            const [status,resposta] = await getProducts(categoria);
            res.status(status).json(resposta);
        } catch (error) {
            res.status(500).json({message:'Erro ao exibir'})
        }
}

export async function excluirProduct(req, res) {
    console.log(`ProductsController excluirProduct`);
    const { id } = req.params;
    
    // Validar o ID do produto antes de excluir
    const validationErrors = validateProductId(Number(id));
    if (validationErrors.length > 0) {
        return res.status(400).json({ errors: validationErrors });
    }

    try {
        // Chamando a função de exclusão do produto e capturando status e mensagem de resposta
        const [status, resposta] = await deleteProduct(Number(id));
        res.status(status).json(resposta);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erro ao deletar produto', error });
    }
}

export async function atualizaProduct(req, res) {
    console.log('ProductsController atualizaProduct');
    const { id } = req.params;
    const product = req.body;

    // Validar o ID e os dados do produto antes de atualizar
    const validationErrors = [
        ...validateProductId(Number(id)),
        ...validateProductData(product)
    ];

    if (validationErrors.length > 0) {
        return res.status(400).json({ errors: validationErrors });
    }
    
    try {
        const [status, resposta] = await updateProduct(Number(id), product);
        res.status(status).json(resposta);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erro ao atualizar produto', error });
    }
}
