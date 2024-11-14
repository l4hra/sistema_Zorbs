import { Draggable } from "@hello-pangea/dnd";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { IconButton } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import EditCommand from "../EditCommand/EditcommandModal";

function NotaFiscalButton({ task }) {
  // Função para gerar o conteúdo da nota fiscal
  const gerarConteudoNotaFiscal = () => {
    // Gerando a lista de produtos dinamicamente
    const listaDeProdutos = task.items
      .map((item, index) => {
        return `${item.qtd_products}}. ${item.name} -  ${item.und_medida}`;
      })
      .join("\n");

    // Construindo o texto da nota fiscal
    const notaFiscal = `
       Sorveteria Zorbs   
    
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
                <NotaFiscalButton task={task} />
                <EditCommand
                  id={task.id_command}
                  nameCommand={task.name}
                  items={task.items}
                  totalPrice={task.totalPrice}
                  qtdProduct={task.qtd_products}
                />
              </div>
            </div>
            {provided.placeholder}
          </div>
        )}
      </Draggable>
    </>
  );
}
