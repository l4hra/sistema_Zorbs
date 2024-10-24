import mysql from 'mysql2/promise';
import db from '../../conexao.js';
import { validateProductData, validateProductId } from '../validations/productsValidation.js';

// Função para cadastrar produtos
export async function addProducts(products) {
    const errors = validateProductData(products);

    if (errors.length > 0) {
        return [400, errors];
    }

    const conexao = mysql.createPool(db);
    const sql = `INSERT INTO products (name, type, category, unidade_medida, preco_custo, preco_venda, observacao)
    VALUES (?,?,?,?,?,?,?)`;
    const params = [
      products.name,
      products.type,
      products.category,
      products.unidade_medida,
      products.preco_custo,
      products.preco_venda,
      products.observacao,  
    ];

    try {
        const [retorno] = await conexao.query(sql, params);
        console.log('Prouto cadastrado');
        return [201, 'Produto cadastrado']
    } catch (error) {
        console.log(error);
        return [500, error]
    }
}

// Função para vizualizar produtos
export async function getProducts(req, res) {
    console.log('ProductsController getProducts');
    const conexao = mysql.createPool(db);
    try {
        const [rows] = await conexao.query('SELECT * FROM products');
        res.status(200).json(rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erro ao buscar produtos', error });
    }
}

// Função para deletar produtos
export async function deleteProduct(id) {
    const idErrors = validateProductId(id);

    if (idErrors.length > 0) {
        return [400, idErrors];
    }

    const conexao = mysql.createPool(db);
    const sql = 'DELETE FROM products WHERE id = ?';
    
    try {
        const [result] = await conexao.query(sql, [id]);
        if (result.affectedRows > 0) {
            console.log('Produto deletado');
            return [200, 'Produto deletado com sucesso'];
        } else {
            return [404, 'Produto não encontrado'];
        }
    } catch (error) {
        console.log(error);
        return [500, 'Erro ao deletar o produto'];
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

    const conexao = mysql.createPool(db);
    const sql = `UPDATE products SET name = ?, type = ?, category = ?, unidade_medida = ?, preco_custo = ?, preco_venda = ?, observacao = ?
                 WHERE id = ?`;
    const params = [
        product.name,
        product.type,
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