import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import toast from "react-hot-toast";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField, Divider, InputAdornment } from "@mui/material";
import TableComponent from "./EditTableCommand";
import IceCreamModal from "./EditIceCreamModal";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import axios from "axios";

export default function CommandModal({
  id,
  items,
  totalPrice,
  qtdProduct,
  paymentIs,
}) {
  const [open, setOpen] = useState(false);
  const [iceCreams, setIceCreams] = useState([]);
  const [selectedBeverages, setSelectedBeverages] = useState([]);
  const [listItems, setListItems] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [amountGiven, setAmountGiven] = useState("");
  const [change, setChange] = useState(0);

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    const initialBeverages = items.filter(
      (item) => item.und_medida !== "kg" // Bebidas
    );
    const initialIceCreams = items.filter(
      (item) => item.und_medida === "kg" // Sorvetes
    );

    setSelectedBeverages(
      initialBeverages.map((item) => ({
        ...item,
        quantity: item.qtd_products || item.quantity || 1,
      }))
    );

    setIceCreams(
      initialIceCreams.map((item) => ({
        ...item,
        weight: item.qtd_products || item.weight || 1,
      }))
    );

    const initialPayment = payment.find((option) => option.label === paymentIs);
    setSelectedPayment(initialPayment || null);
  }, [items, paymentIs]);

  const fetchProducts = async (categoria) => {
    try {
      const response = await axios.get(`http://localhost:5000/products`);
      if (response.status === 200) {
        setListItems(response.data);
      }
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  const fetchUpdateCommand = async () => {
    if (selectedBeverages.length === 0 && iceCreams.length === 0) {
      toast.error("A comanda não pode ser atualizada vazia.", {
        position: "bottom-left",
        duration: 5000,
      });
      return;
    }

    if (!selectedPayment) {
      toast.error("Selecione uma forma de pagamento para atualizar o pedido.", {
        position: "bottom-left",
        duration: 5000,
      });
      return;
    }
    try {
      const commandData = [...selectedBeverages, ...iceCreams].map((item) => {
        const isIceCream = item.hasOwnProperty("weight");

        return {
          id_products: item.id || null,
          id_command: id,
          name: item.name || null,
          qtd_products: isIceCream ? item.weight : item.quantity,
          value_item: (
            item.preco_venda ||
            item.price ||
            item.value_item ||
            "0.00"
          ).toString(),
          und_medida: item.und_medida || (isIceCream ? "kg" : "unidade"),
        };
      });

      await axios.put(`http://localhost:5000/itemCommands/${id}`, {
        items: commandData,
        payment: selectedPayment.label,
      });
      toast.success("Comanda atualizada com sucesso!", {
        position: "bottom-left",
        duration: 5000,
      });

      handleClose();

      setTimeout(() => {
        location.reload(true);
      }, 1000); // improvisado para mostrar as comandas tem que arrumar isso
    } catch (error) {
      console.error("Erro ao atualizar a comanda:", error);
      toast.error("Erro ao atualizar a comanda.", {
        position: "bottom-left",
        duration: 5000,
      });
    }
  };

  const handleIceCreamDataChange = (data) => {
    setIceCreams((prevIceCreams) => [...prevIceCreams, data]);
  };

  const handleBeveragesChange = (event, value) => {
    const updatedBeverages = value.map((item) => ({
      ...item,
      quantity: item?.quantity ?? 1,
    }));
    setSelectedBeverages(updatedBeverages);
  };
  const handleIceCreamsChange = (event, value) => {
    setIceCreams(
      value.map((item) => ({
        ...item,
        weight: item?.weight ?? 1,
      }))
    );
  };
  const allSelectedProducts = [...selectedBeverages, ...iceCreams];

  const handleClose = () => {
    setOpen(false);
    // setSelectedBeverages([]);
    // setIceCreams([]);
    // setAcai([]);
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
    const updatedItems = handleQuantity(id, allSelectedProducts, operator);
    const updatedBeverages = updatedItems.filter(
      (item) => !item.hasOwnProperty("weight")
    );
    const updatedIceCreams = updatedItems.filter((item) =>
      item.hasOwnProperty("weight")
    );

    setSelectedBeverages(updatedBeverages);
    setIceCreams(updatedIceCreams);
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
    setAmountGiven(event.target.value);

    if (!isNaN(value) && value >= total) {
      setChange(value - total);
    } else {
      setChange(0);
    }
  };

  const total = allSelectedProducts.reduce(
    (acc, item) =>
      acc +
      (item.preco_venda || item.price || item.value_item || 0) *
        (item?.quantity ?? 1),
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
          margin: "1rem",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <IconButton onClick={handleOpen}>
          <EditIcon />
        </IconButton>
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
            Pedido N°00{id}
          </Typography>
          <Box height={10} />
          <Divider />
          <Box height={20} />
          <Autocomplete
            multiple
            sx={{ width: "100%" }}
            id="tags-outlined"
            options={listItems.filter(
              (item) =>
                item.und_medida !== "kg" && // Não deve ser sorvete
                !selectedBeverages.some((e) => e.id === item.id) // Não deve já estar selecionado
            )}
            getOptionLabel={(option) => option.name}
            filterSelectedOptions
            onChange={handleBeveragesChange}
            renderInput={(params) => <TextField {...params} label="Produtos" />}
            value={selectedBeverages}
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
                multiple
                sx={{ width: "90%" }}
                id="tags-outlined"
                options={listItems.filter(
                  (item) =>
                    item.und_medida === "kg" && // Deve ser sorvete
                    !iceCreams.some((e) => e.id === item.id) // Não deve já estar selecionado
                )}
                getOptionLabel={(option) => option.name}
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                paddingBottom: "15px",
              }}
            >
              <TextField
                type="number"
                label="Valor recebido"
                value={amountGiven}
                onChange={handleAmountGivenChange}
                sx={{ width: "100%" }}
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                  },
                }}
                inputProps={{
                  min: 0,
                }}
              />
              <Typography variant="body1">
                Troco: R$ {change.toFixed(2)}
              </Typography>
            </div>
          )}

          <TableComponent
            allSelectedProducts={allSelectedProducts.map((product) => ({
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
                backgroundColor: "#1976d2",
                "&:hover": {
                  backgroundColor: "#115293",
                },
                color: "#fff",
                width: "15%",
              }}
              onClick={fetchUpdateCommand}
            >
              Editar
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
