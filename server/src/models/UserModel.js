import mysql from 'mysql2/promise';
import db from '../../conexao.js';


// Função para vizualizar usuários
export async function getUsers(req, res) {
    console.log('UsersController getUsers');
    const conexao = mysql.createPool(db);
    try {
        const [rows] = await conexao.query('SELECT * FROM users');
        res.status(200).json(rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erro ao buscar usuário', error });
    }
}

// Função para cadastrar produtos
export async function addUser(users) {
    // const errors = validateUserData(users)

    // if (errors.length > 0) {
    //     return [400, errors];
    // }

    const conexao = mysql.createPool(db);
    const sql = `INSERT INTO users (name, passaword, confirm_ps, 
    email, telefone, type_of_acess, status)
    VALUES (?,?,?,?,?,?,?)`;
    const params = [
        users.name,
        users.passaword,
        users.confirm_ps,
        users.email,
        users.telefone,
        users.type_of_acess,
        users.status,  
    ];

    try {
        const [retorno] = await conexao.query(sql, params);
        console.log('Usuário cadastrado');
        return [201, 'Usuário cadastrado']
    } catch (error) {
        console.log(error);
        return [500, error]
    }
}

export async function deleteUser(id) {

    const conexao = mysql.createPool(db);
    const sql = 'DELETE FROM users WHERE id = ?';

    try {
        const [result] = await conexao.query(sql, [id]);
        if (result.affectedRows > 0) {
            console.log('Usuario deletado');
            return [200, 'Usuario deletado com sucesso'];
        } else {
            return [404, 'Usuario não encontrado'];
        }
    } catch (error) {
        console.log(error);
        return [500, 'Erro ao deletar usuario'];
    }
}

export async function updateUsers(id, users) {
    // const idErrors = validateUsers(id);
    // const errors = [...idErrors];

    // if (errors.length > 0) {
    //     return [400, errors];
    // }

    const conexao = mysql.createPool(db);
    const sql = `UPDATE users SET 
    name = ?,
    passaword = ?,
    confirm_ps = ?, 
    email = ?, 
    telefone = ?, 
    type_of_acess = ?, 
    status = ?
    WHERE id = ?`;
    const params = [
        users.name,
        users.passaword,
        users.confirm_ps,
        users.email,
        users.telefone,
        users.type_of_acess,
        users.status, 
        id
    ];

    try {
        const [result] = await conexao.query(sql, params);
        if (result.affectedRows > 0) {
            console.log('Usuário atualizado');
            return [200, 'Usuário atualizado com sucesso'];
        } else {
            return [404, 'Usuário não encontrado'];
        }
    } catch (error) {
        console.log(error);
        return [500, 'Erro ao atualizar usuário'];
    }
}