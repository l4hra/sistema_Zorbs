import { useEffect, useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import Columns from "../KanbanList/Column";
import AlarmIcon from "@mui/icons-material/Alarm";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import ModalPagamento from "./CommandPaga";

export default function Kanban() {
  const [completed, setCompleted] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const [canceled, setcanceled] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const [commands, setCommands] = useState([]);

  const handleClose = () => {
    setOpenDialog(false);
  };

  async function carregaComanda() {
    try {
      const response = await fetch("http://localhost:5000/itemCommands");
      const data = await response.json();
      console.log("oioi", data);

      setCommands(data);
    } catch (error) {
      console.error("Erro ao buscar as comandas:", error);
    }
  }
  useEffect(() => {
    carregaComanda();
  }, []);

  useEffect(() => {
    setCompleted(commands.filter((pedido) => pedido.completed));
    setIncomplete(commands.filter((pedido) => pedido.incompleted));
    setcanceled(commands.filter((pedido) => pedido.canceled));
  }, [commands]);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;
  
    if (!destination || !source || source.droppableId === destination.droppableId) {
      return; // Não faz nada se não houver destino ou se for na mesma coluna
    }
  
    // Encontre a task usando o item_id, que é agora o draggableId
    const task = findItemById(draggableId, [...incomplete, ...completed, ...canceled]);
    deletePreviousState(source.droppableId, task.item_id); // Use item_id para remover
  
    setNewState(destination.droppableId, task);
  };

  function deletePreviousState(sourceDroppableId, taskId) {
    switch (sourceDroppableId) {
      case "1":
        setIncomplete(removeItemById(taskId, incomplete));
        break;
      case "2":
        setCompleted(removeItemById(taskId, completed));
        break;
      case "3":
        setcanceled(removeItemById(taskId, canceled));
        break;
    }
  }
  function setNewState(destinationDroppableId, task) {
    let updatedTask;
    switch (destinationDroppableId) {
      case "1": // TO DO
        updatedTask = { ...task, completed: false };
        setIncomplete([updatedTask, ...incomplete]);
        break;
      case "2": // DONE
        updatedTask = { ...task, completed: true };
        setCompleted([updatedTask, ...completed]);
        break;

      case "3": // canceled
        updatedTask = { ...task, completed: false };
        setcanceled([updatedTask, ...canceled]);
        break;
    }
  }
  function findItemById(id, array) {
    return array.find((item) => item.id_command == id);
  }

  function removeItemById(id, array) {
    return array.filter((item) => item.id_command != id);
  }
  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Columns
            title={"PENDENTE"}
            tasks={incomplete}
            id={"1"}
            color={"#f0ca00"}
            icon={<AlarmIcon />}
          />
          <Columns
            title={"FINALIZADO"}
            tasks={completed}
            id={"2"}
            color={"#08dd00"}
            icon={<CheckIcon />}
          />
          <Columns
            title={"CANCELADO"}
            tasks={canceled}
            id={"3"}
            color={"#BA1D1D"}
            icon={<ClearIcon />}
          />
        </div>
        <ModalPagamento open={openDialog} handleClose={handleClose} />
      </DragDropContext>
    </>
  );
}
