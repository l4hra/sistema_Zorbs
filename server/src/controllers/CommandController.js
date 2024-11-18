import { createCommand, updateCommand } from "../models/CommandModel.js";

// Create a new command
export async function cadastroCommand(req, res) {
  const commandData = req.body;
  try {
    //Declarando status com o codigo da resposta e resposta JSON
    const [status, resposta] = await createCommand(commandData);
    res.status(status).json(resposta);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

// Update a command
export async function atualizaCommand(req, res) {
  console.log("ComandaController atualizaComanda");
  const { id } = req.params;
  const commandData = req.body;

  try {
    const [status, resposta] = await updateCommand(id, commandData);
    res.status(status).json(resposta);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro ao atualizar comanda", error });
  }
}

export async function editarCommand(req, res) {
  const { id } = req.params;
  const commandData = req.body;

  // try {
  //   const [status, resposta] = await editCommand(id, commandData);
  //   res.status(status).json(resposta);
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).json({ message: "Erro ao atualizar comanda", error });
  // }
}
