const {
  createCommand,
  getAllCommands,
  getCommandById,
  updateCommand,
} = require("../models/CommandModel.js");

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

// Get all commands
export async function atualizaCommands(req, res) {
  const [status, resposta] = await getAllCommands();
  res.status(status).json(resposta);
}

// Get a specific command by ID
// export async function getCommandById(req, res) {
//   const { id } = req.params;
//   const [status, resposta] = await getCommandById(id);
//   res.status(status).json(resposta);
// }

// Update a command
export async function atualizaCommand(req, res) {
  const { id } = req.params;
  const commandData = req.body;
  const [status, resposta] = await updateCommand(id, commandData);
  res.status(status).json(resposta);
}

// Delete a command
// export async function deleteCommand(req, res) {
//   const { id } = req.params;
//   const [status, resposta] = await deleteCommand(id);
//   res.status(status).json(resposta);
// }
