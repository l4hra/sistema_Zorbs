import { addEmpresa } from "../models/UserZorbsModel";
import { validateUserZorbsData, validateUserZorbsId } from "../validations/productsValidation";

export async function cadastroUserZorbs(req, res){
    console.log('UserZorbsController cadastroUserZorbs');
    const empresa = req.body;

    // Validar os dados do produto antes de cadastrar
    const validationErrors = validateUserZorbsData(empresa);
    if (validationErrors.length > 0) {
        return res.status(400).json({ errors: validationErrors });
    }

    try {
        //Declarando status com o codigo da resposta e resposta JSON
        const [status, resposta] = await addEmpresa(empresa);
        res.status(status).json(resposta);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Erro ao cadastrar empresa', error });
    }
}