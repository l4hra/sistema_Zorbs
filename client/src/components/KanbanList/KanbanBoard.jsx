import { useEffect, useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import Columns from "../KanbanList/Column";
import AlarmIcon from "@mui/icons-material/Alarm";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import toast from "react-hot-toast";

import "dayjs/locale/pt-br"; // Importação do locale do Dayjs
import dayjs from "dayjs";

export default function Kanban() {
  const [completed, setCompleted] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const [canceled, setcanceled] = useState([]);

  async function carregaComanda() {
    const today = new Date().toISOString().split("T")[0];

    try {
      const response = await fetch(
        `http://localhost:5000/commands?date=${today}`
      );
      const data = await response.json();

      const grouped = data.reduce((acc, item) => {
        const { id_command, date_opening, incompleted } = item;

        if (
          !incompleted &&
          new Date(date_opening).toISOString().split("T")[0] !== today
        ) {
          return acc;
        }

        if (!acc[id_command]) {
          acc[id_command] = {
            id_command: id_command,
            date_opening: item.date_opening,
            totalPrice: item.totalPrice,
            payment: item.payment,
            completed: item.completed,
            incompleted: item.incompleted,
            canceled: item.canceled,
            items: [],
          };
        }

        acc[id_command].items.push({
          item_command_id: item.item_command_id,
          name: item?.product_name ?? item.item_name,
          qtd_products: item.qtd_products,
          und_medida: item.und_medida,
          value_item: item.value_item,
        });

        return acc;
      }, {});

      const result = Object.values(grouped);
      setCompleted(
        result.filter(
          (pedido) => pedido.completed
        )
      );
      setIncomplete(
        result.filter(
          (pedido) => pedido.incompleted
        )
      );
      setcanceled(
        result.filter(
          (pedido) => pedido.canceled
        )
      );
    } catch (error) {
      console.error("Erro ao buscar as comandas:", error);
    }
  }

  useEffect(() => {
    carregaComanda();
  }, []);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination || source.droppableId === destination.droppableId) {
      return;
    }

    const task = findItemById(draggableId, [
      ...incomplete,
      ...completed,
      ...canceled,
    ]);

    let updatedIncomplete = [...incomplete];
    let updatedCompleted = [...completed];
    let updatedCanceled = [...canceled];

    if (task.completed) {
      updatedCompleted = removeItemById(task.id_command, updatedCompleted);
    } else if (task.incompleted) {
      updatedIncomplete = removeItemById(task.id_command, updatedIncomplete);
    } else if (task.canceled) {
      updatedCanceled = removeItemById(task.id_command, updatedCanceled);
    }

    let status;
    switch (destination.droppableId) {
      case "1":
        status = "incomplete";
        updatedIncomplete.push(task);
        break;
      case "2":
        if (task.payment === "Não definido") {
          toast.error("Forma de pagamento não definida! Verifique a comanda.", {
            position: "bottom-left",
            duration: 5000,
          });
          setOpenDialog(true);
          return;
        }
        status = "completed";
        updatedCompleted.push(task);
        break;
      case "3": // Cancelado
        status = "canceled";
        updatedCanceled.push(task);
        break;
      default:
        return;
    }

    updateCommandStatus(task.id_command, status);
    setIncomplete(updatedIncomplete);
    setCompleted(updatedCompleted);
    setcanceled(updatedCanceled);
  };

  function findItemById(id, array) {
    return array.find((item) => item.id_command == id);
  }

  function removeItemById(id, array) {
    return array.filter((item) => item.id_command != id);
  }

  async function updateCommandStatus(id, status) {
    try {
      const updatedCommand = {
        completed: status === "completed",
        incompleted: status === "incomplete",
        canceled: status === "canceled",
      };

      const response = await fetch(`http://localhost:5000/commands/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCommand),
      });

      if (response.ok) {
        toast.success("Comanda atualizada com sucesso!", {
          position: "bottom-left",
          duration: 5000,
        });

        carregaComanda();
      } else {
        console.error("Erro ao atualizar a comanda");
      }
    } catch (error) {
      console.error("Erro na requisição PUT:", error);
    }
  }

  dayjs.locale("pt-br");

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
        {/* <ModalPagamento open={openDialog} handleClose={handleClose} /> */}
        {/* <CommandModal updateBoard={carregaComanda} /> */}
      </DragDropContext>
    </>
  );
}
