import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import toast from "react-hot-toast";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField, Divider } from "@mui/material";
import TableComponent from "./EditTableCommand";
import IceCreamModal from "./EditIceCreamModal";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
// import AcaiModal from "./AcaiModal";
import axios from "axios";

export default function CommandModal({ id, items, totalPrice, qtdProduct }) {
  const [open, setOpen] = useState(false);
  const [iceCreams, setIceCreams] = useState([]);
  const [selectedBeverages, setSelectedBeverages] = useState([]);
  const [listItems, setListItems] = useState([]);
  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    // Filtra bebidas e sorvetes da lista inicial
    const initialBeverages = items.filter((item) => !item.weight); // Bebidas
    const initialIceCreams = items.filter((item) => item.weight); // Sorvetes

    // Define o estado inicial
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
  }, [items]);

  const fetchProducts = async (categoria) => {
    try {
      const response = await axios.get(`http://localhost:5000/products`);
      if (response.status === 200) {
        setListItems(response.data); // Atualiza o estado com os produtos recebidos
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

    try {
      const commandData = [...selectedBeverages, ...iceCreams].map((item) => {
        const isIceCream = item.hasOwnProperty("weight");

        return {
          id_products: item.id || null,
          id_command: id,
          name: item.name || null,
          qtd_products: isIceCream ? ice.weight : product.quantity,
          value_item: (item.preco_venda || item.price || "0.00").toString(),
          und_medida: item.und_medida || (isIceCream ? "kg" : "unidade"),
        };
      });

      await axios.put(`http://localhost:5000/itemCommands`, {
        items: commandData,
      });
      toast.success("Comanda atualizada com sucesso!", {
        position: "bottom-left",
        duration: 5000,
      });
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
      //se estiver adicionando
      const newItems = list.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity ? item.quantity + 1 : 1 };
        }
        return item;
      });
      return newItems;
    } else if (operator === "-") {
      //se estiver removendo
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

  const total = allSelectedProducts.reduce(
    (acc, item) =>
      acc + (item.preco_venda ?? item.price) * (item?.quantity ?? 1),
    0
  );

  useEffect(() => {
    fetchProducts();
  }, []);

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
        <IconButton>
          <EditIcon onClick={handleOpen} />
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
              (item) => !selectedBeverages.some((e) => e.id === item.id)
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
          </div>

          <TableComponent
            allSelectedProducts={[...selectedBeverages, ...iceCreams]}
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
              onClick={fetchUpdateCommand}
            >
              Editar
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
