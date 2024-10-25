import { postCompanies} from '../models/CompaniesModel.js'

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