import { addUser, deleteUser, updateUsers } from "../models/UserModel.js";

export async function cadastroUser(req, res){
    console.log('UserController cadastroUsuario');
    const user = req.body;
    try {
        const [status, resposta] = await addUser(user);
        res.status(status).json(resposta);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Erro ao cadastrar usuário', error });
    }
}

export async function excluirUsers(req, res) {
    console.log('UserController: excluindoUsuario');
    const { id } = req.params;
    try {
        const [status, resposta] = await deleteUser((id));
        res.status(status).json(resposta);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erro ao deletar usuário', error });
    }
}

export async function atualizaUsers(req, res) {
    console.log('UserController: editandoUsuario');
    const { id } = req.params;
    const users = req.body;
    try {
        const [status, resposta] = await updateUsers((id), users);
        res.status(status).json(resposta);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erro ao atualizar usuário', error });
    }
}