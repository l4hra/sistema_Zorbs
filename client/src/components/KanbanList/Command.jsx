import { Draggable } from "@hello-pangea/dnd";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { IconButton } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import EditCommand from "../EditCommand/EditcommandModal";

import moment from "moment";

function NotaFiscalButton({ task }) {
  const gerarConteudoNotaFiscal = () => {
    const listaDeProdutos = task.items
      .map((item, index) => {
        return `${item.qtd_products}}. ${item.name} -  ${item.und_medida}`;
      })
      .join("\n");

    // Construindo o texto da nota fiscal
    const notaFiscal = `
       Sorveteria Dona Ana   
    
    ----------------------------------------     
      Produtos:  
      ${listaDeProdutos}  
    ----------------------------------------    
       Total: R$ ${task.totalPrice ?? 0}
       Data do cupom fiscal: ${new Date().toLocaleDateString()} as ${new Date().toLocaleTimeString()}         
    ----------------------------------------    
       Obrigado pela sua compra!     
    `;

    return notaFiscal;
  };

  // Função para gerar e baixar o arquivo .txt
  const gerarTxtNotaFiscal = () => {
    const conteudo = gerarConteudoNotaFiscal();
    const blob = new Blob([conteudo], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "nota_fiscal.txt";
    link.click();
  };

  // Botão para download da nota fiscal
  return (
    <IconButton variant="contained" onClick={gerarTxtNotaFiscal}>
      <DownloadIcon />
    </IconButton>
  );
}

export default function Command({ task, index }) {
  const formatTime = (datetime) => {
    if (!datetime) return "Data inválida";
    try {
      const localTime = moment(datetime).format("HH:mm");
      return localTime;
    } catch (error) {
      console.error("Erro ao formatar horário:", error.message || error);
      return "Erro no horário";
    }
  };

  return (
    <>
      <Draggable
        draggableId={`${task.id_command}`}
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
                <h3>#Pedido N°00{task.id_command}</h3>

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
                  // Define a quantidade com base na unidade de medida
                  const quantidade =
                    item.und_medida === "kg"
                      ? parseFloat(item.qtd_products).toFixed(3) // Decimal para 'kg'
                      : parseInt(item.qtd_products, 10); // Inteiro para 'unidade'

                  return (
                    <div key={index}>
                      {item.name} ({quantidade} {item.und_medida})
                    </div>
                  );
                })}
              </h5>

              <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                <NotaFiscalButton task={task} />
                {(task?.incompleted && (
                  <EditCommand
                    id={task.id_command}
                    nameCommand={task.name}
                    paymentIs={task.payment}
                    items={task.items}
                    totalPrice={task.totalPrice}
                    qtdProduct={task.qtd_products}
                  />
                )) ||
                  null}
              </div>
            </div>
            {provided.placeholder}
          </div>
        )}
      </Draggable>
    </>
  );
}
