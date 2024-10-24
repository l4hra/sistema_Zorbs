import mysql from 'mysql2/promise';
import db from '../../conexao.js';
import { validateUserZorbsData } from '../validations/userZorbsValidation.js'

export async function getEmpresas(req, res) {
    console.log('EmpresasController getProducts');
    const conexao = mysql.createPool(db);
    try {
        const [rows] = await conexao.query('SELECT * FROM empresas');
        res.status(200).json(rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erro ao buscar empresas', error });
    }
}

// Função para cadastrar empresas
export async function addEmpresa(empresa) {
    const errors = validateUserZorbsData(empresa);

    if (errors.length > 0) {
        return [400, errors];
    }

    const conexao = mysql.createPool(db);
    const sql = `INSERT INTO empresas (CNPJ, razao_social, nome_fantasia, inscricao_estadual, email, telefone, senha_acesso, data_abertura, tipo_pessoa, tipo_plano,
    status, CEP, RUA, numero, bairro, cidade, estado, complemento, observacoes)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    const params = [
        empresa.CNPJ,
        empresa.razao_social,
        empresa.nome_fantasia,
        empresa.inscricao_estadual,
        empresa.email,
        empresa.telefone,
        empresa.senha_acesso,
        empresa.data_abertura,
        empresa.tipo_pessoa,
        empresa.tipo_plano,
        empresa.status,
        empresa.CEP,
        empresa.RUA,
        empresa.numero,
        empresa.bairro,
        empresa.cidade,
        empresa.estado,
        empresa.complemento,
        empresa.observacoes,
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