import { useEffect, useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import Columns from "../KanbanList/Column";
import AlarmIcon from "@mui/icons-material/Alarm";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";

export default function Kanban() {
  const [completed, setCompleted] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const [backlog, setBacklog] = useState([]);

  useEffect(() => {
    const sorvetes = [
      {
        id: 1,
        title: "Pedido 1",
        hora: "14:00",
        produtos: ["Casquinha", "Sundae", "Milkshake"],
        totalPrice: "15,99",
        completed: true,
      },
      {
        id: 2,
        title: "Pedido 2",
        hora: "14:30",
        produtos: ["Casquinha", "Açaí", "Milkshake"],
        totalPrice: "30,00",
        completed: false,
      },
      {
        id: 3,
        title: "Pedido 3",
        hora: "15:00",
        produtos: ["Sorvete de Copo", "Sundae", "Sorvete de Palito"],
        totalPrice: "58,99",
        completed: true,
      },
      {
        id: 4,
        title: "Pedido 4",
        hora: "15:30",
        produtos: ["Casquinha", "Sorvete de Palito", "Milkshake"],
        totalPrice: "32,60",
        completed: false,
      },
      {
        id: 5,
        title: "Pedido 5",
        hora: "16:00",
        produtos: ["Sorvete de Copo", "Açaí", "Sundae"],
        totalPrice: "10,15",
        completed: true,
      },
      {
        id: 6,
        title: "Pedido 6",
        hora: "16:30",
        produtos: ["Casquinha", "Açaí", "Sorvete de Palito"],
        totalPrice: "47,50",
        completed: false,
      },
    ];

    setCompleted(sorvetes.filter((pedido) => pedido.completed));
    setIncomplete(sorvetes.filter((pedido) => !pedido.completed));
  }, []);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (
      !destination ||
      !source ||
      source.droppableId === destination.droppableId
    )
      return;

    deletePreviousState(source.droppableId, draggableId);

    const task = findItemById(draggableId, [
      ...incomplete,
      ...completed,
      ...backlog,
    ]);

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
        setBacklog(removeItemById(taskId, backlog));
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

      case "3": // BACKLOG
        updatedTask = { ...task, completed: false };
        setBacklog([updatedTask, ...backlog]);
        break;
    }
  }
  function findItemById(id, array) {
    return array.find((item) => item.id == id);
  }

  function removeItemById(id, array) {
    return array.filter((item) => item.id != id);
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
            tasks={backlog}
            id={"3"}
            color={"#BA1D1D"}
            icon={<ClearIcon />}
          />
        </div>
      </DragDropContext>
    </>
  );
}
