import mysql from 'mysql2/promise';
import db from '../../conexao.js';


export async function getCompanies(req, res) {
    const conexao = mysql.createPool(db);
    console.log('CompaniesController: getCompanies');
    try {
        const [rows] = await conexao.query('SELECT * FROM companies');
        res.status(200).json(rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erro ao buscar ', error });
    }
}

export async function postCompanies(companies) {
    const conexao = mysql.createPool(db);
    const sql = `INSERT INTO companies ( 
    CNPJ, 
    razao_social, 
    nome_fantasia, 
    inscricao_estadual, 
    email, 
    telefone, 
    senha_acesso, 
    data_abertura, 
    tipo_pessoa, 
    tipo_plano, 
    status, 
    CEP, 
    RUA, 
    numero, 
    bairro, 
    cidade, 
    estado, 
    complemento, 
    observacoes 
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`;
    const params = [
        companies.CNPJ,
        companies.razao_social,
        companies.nome_fantasia,
        companies.inscricao_estadual,
        companies.email, 
        companies.telefone,
        companies.senha_acesso,
        companies.data_abertura,
        companies.tipo_pessoa,
        companies.tipo_plano,
        companies.status,
        companies.CEP,
        companies.RUA,
        companies.numero,
        companies.bairro,
        companies.cidade,
        companies.estado,
        companies.complemento,
        companies.observacoes,
    ];

    try {
        const [retorno] = await conexao.query(sql, params);
        console.log('Empresa cadastrada');
        return [201, 'Empresa cadastrada']
    } catch (error) {
        console.log(error);
        return [500, error]
    }
}