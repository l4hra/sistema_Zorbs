import { addProducts, getProducts, updateProduct, toggleProductStatus } from "../models/ProductModel.js";
import { validateProductData, validateProductId } from "../validations/productsValidation.js";

export async function cadastroProduct(req, res){
    console.log('ProductsController: cadastroProduto');
    const product = req.body;
    const validationErrors = validateProductData(product);
    if (validationErrors.length > 0) {
        return res.status(400).json({ errors: validationErrors });
    }
    try {
        const [status, resposta] = await addProducts(product);
        console.log('ProductsController: productCadastrado', product);
        res.status(status).json(resposta);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Erro ao cadastrar produto', error });
    }
}

export async function listaProdutos(req,res) {
        console.log('ProductsController: listaProdutos')
        const {categoria} = req.params;

        try {
            const [status,resposta] = await getProducts(categoria);
            res.status(status).json(resposta);
        } catch (error) {
            res.status(500).json({message:'Erro ao exibir'})
        }
}

export async function atualizaProduct(req, res) {
    console.log('ProductsController: atualizaProduct');
    const { id } = req.params;
    const product = req.body;
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

export async function toggleProduct(req, res) {
    console.log('ProductsController: toggleProduct');
    const { id } = req.params;
    const { status } = req.body;

    try {
        const [statusCode, response] = await toggleProductStatus(Number(id), status);
        res.status(statusCode).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erro ao atualizar status do produto', error });
    }
}

