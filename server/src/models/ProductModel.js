import mysql from 'mysql2/promise';
import db from '../../conexao.js';

export async function addProducts(products) {
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
        const msg = await error.json();
        console.log(msg);
        return [500, msg]
    }
}

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

export async function deleteProduct(id) {
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
