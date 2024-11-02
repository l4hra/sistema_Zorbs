import {
  createItemCommand,
  updateItemCommand,
} from "../models/Item_CommandModel.js";

// Create a new command
export async function criarItemCommand(req, res) {
  console.log("COmandaItemController cadastroItemComanda");

  const itemCommand = req.body;
  try {
    //Declarando status com o codigo da resposta e resposta JSON
    const [status, resposta] = await createItemCommand(itemCommand);
    res.status(status).json(resposta);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro ao atualizar item", error });
  }
}

// Update a command
export async function atualizaItemCommand(req, res) {
  const { id } = req.params;
  const itemCommand = req.body;
  try {
    const [status, resposta] = await updateItemCommand(id, itemCommand);
    res.status(status).json(resposta);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro ao atualizar comanda", error });
  }
}
