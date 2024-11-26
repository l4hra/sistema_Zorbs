import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import toast from "react-hot-toast";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField, Divider } from "@mui/material";
import TableComponent from "./TableCommand";
import IceCreamModal from "./IceCreamModal";
// import AcaiModal from "./AcaiModal";
import axios from "axios";

export default function CommandModal({ updateBoard }) {
  const [open, setOpen] = useState(false);
  const [iceCreams, setIceCreams] = useState([]);
  const [selectedBeverages, setSelectedBeverages] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [listItems, setListItems] = useState([]);
  const handleOpen = () => {
    setOpen(true);
  };

  const fetchProducts = async (categoria) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/products`
        // {
        //   params: { categoria },  // Passa a categoria como parâmetro
        // }
      );
      if (response.status === 200) {
        const activeProducts = response.data.filter((product) => product.status === "Ativo");
        setListItems(activeProducts); // Atualiza o estado com os produtos recebidos
      }
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  // Criar Comanda
  const fetchCommand = async () => {
    if (selectedBeverages.length === 0 && iceCreams.length === 0) {
      toast.error("A comanda não pode ser criada  vazia.", {
        position: "bottom-left",
        duration: 5000,
      });

      return;
    }

    if (!selectedPayment) {
      toast.error("Selecione uma forma de pagamento.", {
        position: "bottom-left",
        duration: 5000,
      });
      return;
    }

    try {
      const commandData = {
        date_opening: new Date(),
        totalPrice: total,
        payment: selectedPayment.label,
        incompleted: 1,
      };
      const response = await axios.post(
        "http://localhost:5000/cadastroCommand",
        commandData
      );
      for (const product of selectedBeverages) {
        const productData = {
          id_products: product.id,
          id_command: response.data.id_command,
          name: null,
          qtd_products: product.quantity,
          value_item: product.preco_venda,
          und_medida: "unidade",
        };
        await axios.post(
          "http://localhost:5000/createItemCommand",
          productData
        );
      }
      for (const ice of iceCreams) {
        const iceData = {
          id_products: null, //sorvete não tem id por enquanto..
          id_command: response.data.id_command,
          name: ice.name,
          qtd_products: ice.weight,
          value_item: ice.price,
          und_medida: "kg",
        };
        await axios.post("http://localhost:5000/createItemCommand", iceData);
      }

      // updateBoard();

      //chamar toast
      toast.success(response.data.message, {
        position: "bottom-left",
        duration: 5000,
      });

      handleClose();
    } catch (error) {
      toast.error("Erro ao criar a comanda", {
        position: "bottom-left",
        duration: 5000,
      });
    }
  };

  const handleIceCreamDataChange = (data) => {
    setIceCreams((prevIceCreams) => [...prevIceCreams, data]);
  };

  const handlePaymentChange = (event, value) => {
    setSelectedPayment(value);
  };

  const handleBeveragesChange = (event, value) => {
    setSelectedBeverages(
      value.map((item) => {
        return { ...item, quantity: item?.quantity ?? 1 };
      })
    );
  };

  const handleIceCreamsChange = (event, value) => setIceCreams(value);

  const allSelectedProducts = [...selectedBeverages, ...iceCreams];

  const handleClose = () => {
    setOpen(false);
    setSelectedBeverages([]);
    setIceCreams([]);
    setSelectedPayment(null);
    // setAcai([]);
  };

  const handleQuantity = (id, list, operator) => {
    if (operator === "+") {
      const newItems = list.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity ? item.quantity + 1 : 1 };
        }
        return item;
      });
      return newItems;
    } else if (operator === "-") {
      const newItems = list.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity ? item.quantity - 1 : 0 };
        }
        return item;
      });
      return newItems.filter((item) => item.quantity > 0);
    }
  };

  const handleQuantityChange = (id, operator) => {
    if (operator === "+") {
      const newItems = handleQuantity(id, allSelectedProducts, operator);
      setSelectedBeverages(
        newItems.filter((item) => !item.hasOwnProperty("weight"))
      );
      setIceCreams(newItems.filter((item) => item.hasOwnProperty("weight")));
    } else if (operator === "-") {
      const newItems = handleQuantity(id, allSelectedProducts, operator);
      setSelectedBeverages(
        newItems.filter((item) => !item.hasOwnProperty("weight"))
      );
      setIceCreams(newItems.filter((item) => item.hasOwnProperty("weight")));
    }
  };

  const total = allSelectedProducts.reduce(
    (acc, item) =>
      acc + (item.preco_venda ?? item.price) * (item?.quantity ?? 1),
    0
  );

  useEffect(() => {
    fetchProducts();
  }, []);

  const payment = [
    { id: "1", label: "Pix" },
    {
      id: "2",
      label: "Dinheiro",
    },
    {
      id: "3",
      label: "Cartão de crédito",
    },
    {
      id: "4",
      label: "Cartão de débito",
    },
    {
      id: "5",
      label: "Cartão refeição",
    },
    {
      id: "6",
      label: "Cartão alimentação",
    },
    {
      id: "7",
      label: "Não definido",
    },
  ];
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          margin: "2rem",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <Button
          onClick={handleOpen}
          sx={{
            backgroundColor: "#054f77",
            color: "#fff",
            width: "10%",
            padding: "10px",
          }}
        >
          + Nova comanda
        </Button>

        {/* <h2>Comandas</h2> */}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 1100,
            bgcolor: "background.paper",
            p: 4,
            overflowY: "auto",
            outline: "none",
            boxShadow: 20,
            borderRadius: "5px",
            "&::-webkit-scrollbar": {
              width: "0px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "transparent",
            },
          }}
        >
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Novo pedido
          </Typography>
          <Box height={10} />
          <Divider />
          <Box height={20} />
          <Autocomplete
            multiple
            sx={{ width: "100%" }}
            id="tags-outlined"
            options={listItems.filter(
              (item) => !selectedBeverages.map((e) => e.id).includes(item.id)
            )}
            getOptionLabel={(option) => option.name}
            filterSelectedOptions
            onChange={handleBeveragesChange}
            renderInput={(params) => <TextField {...params} label="Produtos" />}
            value={selectedBeverages}
            noOptionsText={listItems.length === 0 ? "Nenhum produto encontrado." : "Nenhum produto disponível."}
          />

          <div
            className="organize"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: "1.2em",
              marginTop: "15px",
              marginBottom: "25px",
            }}
          >
            <div
              className="sorvete"
              style={{ display: "flex", gap: "5px", alignItems: "center" }}
            >
              <Autocomplete
                sx={{ width: "90%" }}
                multiple
                id="tags-outlined"
                getOptionLabel={(option) => option.name}
                options={iceCreams}
                filterSelectedOptions
                onChange={handleIceCreamsChange}
                noOptionsText="Nenhum sorvete"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Sorvetes"
                    placeholder="Sorvetes"
                  />
                )}
                value={iceCreams}
              />

              <IceCreamModal onDataChange={handleIceCreamDataChange} />
            </div>
            <Autocomplete
              disablePortal
              options={payment}
              getOptionLabel={(option) => option.label}
              value={selectedPayment}
              onChange={handlePaymentChange}
              renderInput={(params) => (
                <TextField {...params} label="Forma de pagamento" />
              )}
            />
          </div>

          <TableComponent
            allSelectedProducts={allSelectedProducts}
            handleQuantityChange={handleQuantityChange}
            total={total}
          />

          <div
            className="buttons"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "15px",
              marginTop: "1rem",
            }}
          >
            <Button
              style={{
                backgroundColor: "#F9A7AB",
                color: "#fff",
                width: "15%",
              }}
              onClick={fetchCommand}
            >
              Criar
            </Button>

            <Button
              onClick={handleClose}
              style={{
                backgroundColor: "#C64444",
                color: "#fff",
                width: "15%",
              }}
            >
              Cancelar
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
