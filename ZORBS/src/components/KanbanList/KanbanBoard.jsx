import { useEffect, useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import Columns from "../KanbanList/Column";

export default function Kanban() {
  const [completed, setCompleted] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const [backlog, setBacklog] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => {
        setCompleted(json.filter((task) => task.completed));
        setIncomplete(json.filter((task) => !task.completed));
      });
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
            title={"EM ESPERA"}
            tasks={incomplete}
            id={"1"}
            color={"#BA1D1D"}
          />
          <Columns
            title={"PENDENTE"}
            tasks={completed}
            id={"2"}
            color={"#f0ca00"}
          />
          <Columns
            title={"FINALIZADO"}
            tasks={backlog}
            id={"3"}
            color={"#08dd00"}
          />
        </div>
      </DragDropContext>
    </>
  );
}
