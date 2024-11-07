import { Draggable } from "@hello-pangea/dnd";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { IconButton } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import EditCommand from "../EditCommand/EditCommand";
import { useEffect, useState } from "react";

function NotaFiscalButton() {
  const gerarConteudoNotaFiscal = () => {
    const notaFiscal = `       Sorveteria Zorbs       ----------------------------------------       Produtos:       1. Sorvete de Chocolate - R$ 10,00       2. Milkshake de Morango - R$ 12,00       3. Sundae de Caramelo - R$ 8,50              Total: R$ 30,50       Data: ${new Date().toLocaleDateString()}        Hora: ${new Date().toLocaleTimeString()}       ----------------------------------------       Obrigado pela sua compra!     `;
    return notaFiscal;
  };

  const gerarTxtNotaFiscal = () => {
    const conteudo = gerarConteudoNotaFiscal();
    const blob = new Blob([conteudo], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "nota_fiscal.txt";
    link.click();
  };

  return (
    <IconButton variant="contained" onClick={gerarTxtNotaFiscal}>
      <DownloadIcon />
    </IconButton>
  );
}

export default function Command({ task, index }) {
  const [commands, setCommands] = useState([]);
  const [name, setName] = useState();
  const [date, setDate] = useState();

  useEffect(() => {
    carregaComanda();
  }, []);

  const carregaComanda = async () => {
    try {
      const response = await fetch("http://localhost:5000/commands");
  console.log(response, 'oi')

      const data = await response.json();
      setName(data.name);
      setDate(data.date_opening);
      // setCommands(data);
    } catch (error) {
      console.error("Erro ao buscar as comandas:", error);
    }
  };

  console.log(name, 'nome')
  return (
    <>
      <Draggable
        draggableId={`${task.command_id}`} // use apenas se command_id for único
        key={task.command_id}
        index={index}
      >
        {(provided, snapshot) => (
          <div
          className="container"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          >
            <div
              style={{
                padding: "0.8rem",
                backgroundColor: "#eeebeb",
                borderRadius: "5px",
                marginBottom: "6px",
              }}
              >
              <span
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <h3>#{task.command_name}</h3>

                <div
                  style={{
                    fontWeight: "bold",
                    fontFamily: "Electrolize",
                    display: "flex",
                    gap: "5px",
                  }}
                >
                  {formatTime(task.date_opening)}
                  <AccessTimeIcon style={{ width: "1rem" }} />
                </div>
              </span>
              <h4>Total: R${task.totalPrice}</h4>

              <h5>Forma de pagamento: {task.payment}</h5>
              <p>Produto: {task.product_name}</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                {/* <p>{task.produtos.join(",")}</p> */}
              </div>

              <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                <NotaFiscalButton />
                <EditCommand />
              </div>
            </div>
            {provided.placeholder}
          </div>
        )}
      </Draggable>
    </>
  );
}
