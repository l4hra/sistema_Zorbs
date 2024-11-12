import { Draggable } from "@hello-pangea/dnd";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { IconButton } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import EditCommand from "../EditCommand/EditcommandModal";
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
  const formatTime = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <Draggable
        draggableId={`${task.id_command}`} // use apenas se id for único
        key={task.id_command}
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
                <h3>#{task.name}</h3>

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
              <h5>
                Produtos:
                {task.items.map((item, index) => {
                  return (
                    <div key={index}>
                      {item.name} ({item.qtd_products} {item.und_medida})
                    </div>
                  );
                })}
              </h5>
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
