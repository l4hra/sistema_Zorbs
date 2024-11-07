import { addUser, deleteUser, updateUsers } from "../models/UserModel.js";

export async function cadastroUser(req, res){
    console.log('UserController cadastroUsuario');
    const user = req.body;

    // Validar os dados do produto antes de cadastrar
    // const validationErrors = validateUserData(user);
    // if (validationErrors.length > 0) {
    //     return res.status(400).json({ errors: validationErrors });
    // }

    try {
        //Declarando status com o codigo da resposta e resposta JSON
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

    // Validar o ID do produto antes de excluir
    //  const validationErrors = deleteUsers(Number(id));
    //  if (validationErrors.length > 0) {
    //      return res.status(400).json({ errors: validationErrors });
    //  }

    try {
        // Chamando a função de exclusão do usuário e capturando status e mensagem de resposta
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

    // Validar o ID e os dados do produto antes de atualizar
    // const validationErrors = [
    //      ...validateCompanies(Number(id)),
    //  ];

    //  if (validationErrors.length > 0) {
    //      return res.status(400).json({ errors: validationErrors });
    //  }
    
    try {
        const [status, resposta] = await updateUsers((id), users);
        res.status(status).json(resposta);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erro ao atualizar usuário', error });
    }
}