import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import toast from "react-hot-toast";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField, Divider, InputAdornment } from "@mui/material";
import TableComponent from "./TableCommand";
import IceCreamModal from "./IceCreamModal";
import axios from "axios";
import {
  AddCircle as AddCircleIcon,
} from "@mui/icons-material";

export default function CommandModal() {
  const [open, setOpen] = useState(false);
  const [iceCreams, setIceCreams] = useState([]);
  const [selectedBeverages, setSelectedBeverages] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [listItems, setListItems] = useState([]);
  const [commands, setCommands] = useState([]);
  const [amountGiven, setAmountGiven] = useState("");
  const [change, setChange] = useState(0);

  const handleOpen = () => {
    setOpen(true);
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/products`
      );
      if (response.status === 200) {
        const activeProducts = response.data.filter((product) => product.status === "Ativo");
        setListItems(activeProducts);
      }
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  const fetchCommands = async () => {
    try {
      const response = await axios.get("http://localhost:5000/commands");
      setCommands(response.data);
    } catch (error) {
      console.error("Erro ao buscar comandas:", error);
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
        date_opening: new Date().toISOString().slice(0, 19).replace('T', ' '), // Formato compatível com MySQL
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

      //chamar toast
      toast.success(response.data.message, {
        position: "bottom-left",
        duration: 5000,
      });
      fetchCommands();
      handleClose();
      setTimeout(() => {
        location.reload(true);
      }, 500); // improvisado para mostrar as comandas tem que arrumar isso 
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
    if (value?.label !== "Dinheiro") {
      setAmountGiven("");
      setChange(0);
    }
  };

  const handleAmountGivenChange = (event) => {
    const value = parseFloat(event.target.value);
    setAmountGiven(parseFloat(value.toFixed(3)));

    if (!isNaN(value) && value >= total) {
      setChange(parseFloat((value - total).toFixed(2)));
    } else {
      setChange(0);
    }
  };

  const handleBeveragesChange = (event, value) => {
    setSelectedBeverages(
      value.map((item) => {
        return { ...item, quantity: Math.round(item?.quantity ?? 1) };
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
    setAmountGiven("");
    setChange(0);
  };

  const handleQuantity = (id, list, operator) => {
    if (operator === "+") {
      const newItems = list.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: Math.round(item.quantity ? item.quantity + 1 : 1) };
        }
        return item;
      });
      return newItems;
    } else if (operator === "-") {
      const newItems = list.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: Math.round(item.quantity ? item.quantity - 1 : 0) };
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
          endIcon={<AddCircleIcon />}
          onClick={handleOpen}
          sx={{
            backgroundColor: "#578eda", ":hover": { backgroundColor: "#174aa4" },
            color: "#fff",
            width: "200px",
            padding: "10px",
            fontWeight: "bold",
          }}
        >
          Nova comanda
        </Button>
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
   
          {selectedPayment?.label === "Dinheiro" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", paddingBottom: "15px"}}>
              <TextField
                type="number"
                label="Valor recebido"
                value={amountGiven}
                onChange={handleAmountGivenChange}
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                  },
                }}
                sx={{ width: "100%" }}
                inputProps={{
                  min: 0,
                }}
              />
              <Typography variant="body1">
              Troco: R$ {parseFloat(change.toFixed(2))}
              </Typography>
            </div>
          )}

          <TableComponent
            allSelectedProducts={allSelectedProducts.map(product => ({
              ...product,
              quantity: Math.round(product.quantity),
            }))}
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
              sx={{
                backgroundColor: "#46C001",
                "&:hover": {
                  backgroundColor: "#3EA201",
                },
                color: "#fff",
                width: "15%",
              }}
              onClick={fetchCommand}
            >
              Criar
            </Button>

            <Button
              onClick={handleClose}
              sx={{
                color: "#fff",
                width: "15%",
                backgroundColor: "#f8615b",
                "&:hover": {
                  backgroundColor: "#FF0000",
                },
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
