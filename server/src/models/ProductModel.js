import conexao from '../../conexao.js';
import { validateProductData, validateProductId } from '../validations/productsValidation.js';

// Função para cadastrar produtos
export async function addProducts(products) {
    const errors = validateProductData(products);

    if (errors.length > 0) {
        return [400, errors];
    }

    const sql = `INSERT INTO products (name, category, unidade_medida, preco_custo, preco_venda, observacao)
    VALUES (?,?,?,?,?,?)`;
    const params = [
      products.name,
      products.category,
      products.unidade_medida,
      products.preco_custo,
      products.preco_venda,
      products.observacao,  
    ];

    try {
        const [retorno] = await conexao.query(sql, params);
        return [201, 'Produto cadastrado']
    } catch (error) {
        return [500, error]
    }
}

// Função para vizualizar produtos
export async function getProducts(categoria) {
    let filtros = '';
    if (categoria){
        filtros = `WHERE category='${categoria}'`
    }
    try {
        const [rows] = await conexao.query(`SELECT * FROM products ${filtros}`);
        return [200,rows];
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erro ao buscar produtos', error });
    }
}

// Função para editar produtos
export async function updateProduct(id, product) {
    const idErrors = validateProductId(id);
    const productErrors = validateProductData(product);
    const errors = [...idErrors, ...productErrors];

    if (errors.length > 0) {
        return [400, errors];
    }

    const sql = `UPDATE products SET name = ?, category = ?, unidade_medida = ?, preco_custo = ?, preco_venda = ?, observacao = ?
                 WHERE id = ?`;
    const params = [
        product.name,
        product.category,
        product.unidade_medida,
        product.preco_custo,
        product.preco_venda,
        product.observacao,
        id
    ];

    try {
        const [result] = await conexao.query(sql, params);
        if (result.affectedRows > 0) {
            console.log('Produto atualizado');
            return [200, 'Produto atualizado com sucesso'];
        } else {
            return [404, 'Produto não encontrado'];
        }
    } catch (error) {
        console.log(error);
        return [500, 'Erro ao atualizar o produto'];
    }
}

export async function toggleProductStatus(id, status) {
    const sql = `UPDATE products SET status = ? WHERE id = ?`;
    const newStatus = status === 'Ativo' ? 'Inativo' : 'Ativo';

    try {
        const [result] = await conexao.query(sql, [newStatus, id]);
        if (result.affectedRows > 0) {
            console.log(`Produto ${id} atualizado para ${newStatus}`);
            return [200, `Produto atualizado para ${newStatus}`];
        } else {
            return [404, 'Produto não encontrado'];
        }
    } catch (error) {
        console.log(error);
        return [500, 'Erro ao atualizar o status do produto'];
    }
}
