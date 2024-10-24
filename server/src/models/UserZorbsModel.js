import mysql from 'mysql2/promise';
import db from '../../conexao.js';
import { validateUserZorbsData } from '../validations/userZorbsValidation.js'
// Função para cadastrar produtos
export async function addEmpresa(empresa) {
    const errors = validateUserZorbsData(empresa);

    if (errors.length > 0) {
        return [400, errors];
    }

    const conexao = mysql.createPool(db);
    const sql = `INSERT INTO empresas (name, type, category, unidade_medida, preco_custo, preco_venda, observacao)
    VALUES (?,?,?,?,?,?,?)`;
    const params = [
        empresa.name,
        empresa.type,
        empresa.category,
        empresa.unidade_medida,
        empresa.preco_custo,
        empresa.preco_venda,
        empresa.observacao,
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