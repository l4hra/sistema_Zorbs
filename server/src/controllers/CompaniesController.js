import { postCompanies, deleteCompanies, updateCompanies} from '../models/CompaniesModel.js'
import { validateCompanies } from '../validations/companiesValidation.js';

export async function createCompanies(req, res){
    console.log('CompaniesController: createCompanies');
    const companies = req.body;

    try {
        //Declarando status com o codigo da resposta e resposta JSON
        const [status, resposta] = await postCompanies(companies);
        res.status(status).json(resposta);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Erro ao cadastrar empresa', error });
    }
}

export async function excluirCompanies(req, res) {
    console.log('CompaniesController: excluindoEmpresa');
    const { id } = req.params;

    // Validar o ID do produto antes de excluir
    const validationErrors = validateCompanies(Number(id));
    if (validationErrors.length > 0) {
        return res.status(400).json({ errors: validationErrors });
    }

    try {
        // Chamando a função de exclusão do produto e capturando status e mensagem de resposta
        const [status, resposta] = await deleteCompanies(Number(id));
        res.status(status).json(resposta);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erro ao deletar empresa', error });
    }
}

export async function atualizaCompanies(req, res) {
    console.log('CompaniesController: editandoEmpresa');
    const { id } = req.params;
    const companies = req.body;

    // Validar o ID e os dados do produto antes de atualizar
    const validationErrors = [
        ...validateCompanies(Number(id)),
    ];

    if (validationErrors.length > 0) {
        return res.status(400).json({ errors: validationErrors });
    }
    
    try {
        const [status, resposta] = await updateCompanies(Number(id), companies);
        res.status(status).json(resposta);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erro ao atualizar empresa', error });
    }
}