import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField, Divider } from "@mui/material";
import TableComponent from "./TableCommand";
import IceCreamModal from "./IceCreamModal";
import AcaiModal from "./AcaiModal";
import axios from "axios";

export default function CommandModal() {
  const [open, setOpen] = useState(false);
  const [iceCreams, setIceCreams] = useState([]);
  const [acai, setAcai] = useState([]);
  const [selectedBeverages, setSelectedBeverages] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [selectedPicole, setSelectedPicole] = useState([]);
  const [comandaNumber, setComandaNumber] = useState(1);
  const handleOpen = () => {
    setOpen(true);
    setComandaNumber(comandaNumber + 1);
  };

  const generateComandaTitle = (number) => {
    const formattedNumber = number.toString().padStart(3, "0");
    return `Pedido N°${formattedNumber}`;
  };

  const [listItems, setListItems] = useState([]);

  // Listar Bebidas
  const fetchBebida = async (categoria) => {
    try {
      const response = await axios.get(`http://localhost:5000/products`, {
        params: { categoria },  // Passa a categoria como parâmetro
      });
      if (response.status === 200)  {
        setListItems(response.data);  // Atualiza o estado com os produtos recebidos
      }
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  // Chama a função de busca ao carregar o componente (quando a categoria for 'bebida')
  useEffect(() => {
    fetchBebida("Bebida");  // Passa a categoria "bebida" para buscar os produtos
  }, []);

  const handleIceCreamDataChange = (data) => {
    setIceCreams((prevIceCreams) => [...prevIceCreams, data]);
  };

  const handleAcaiDataChange = (data) => {
    setAcai((prevAcai) => [...prevAcai, data]);
  };

  const handleBeveragesChange = (event, value) => setSelectedBeverages(value);
  const handleFoodsChange = (event, value) => setSelectedFoods(value);
  const handleIceCreamsChange = (event, value) => setIceCreams(value);
  const handleAcaiChange = (event, value) => setAcai(value);
  const handlePicoleChange = (event, value) => setSelectedPicole(value);

  const allSelectedProducts = [
    ...selectedBeverages,
    ...selectedFoods,
    ...iceCreams,
    ...acai,
    ...selectedPicole,
  ];

  const handleClose = () => {
    setOpen(false);
    setIceCreams([]);
    setAcai([]);
  };

  const listItemsFoods = [
    { id: 1, name: "Chips", quantity: 2 },
    { id: 2, name: "Doces", price: 10, quantity: 2 },
    { id: 3, name: "Bala", price: 10, quantity: 2 },
  ];

  const listPicole = [
    { id: 1, name: "Tablito recheado", price: 10, quantity: 2 },
    { id: 2, name: "Picole de coco", price: 10, quantity: 2 },
    { id: 3, name: "Picole de limão", price: 10, quantity: 2 },
  ];

  const handleQuantityChange = (id, delta) => {
    const newItems = allSelectedProducts.map((item) => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + delta); // Não permite quantidade negativa
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setIceCreams(newItems.filter((item) => item.category === "iceCream"));
    setAcai(newItems.filter((item) => item.category === "acai"));
    setSelectedBeverages(
      newItems.filter((item) => item.category === "beverage")
    );
    setSelectedFoods(newItems.filter((item) => item.category === "food"));
    setSelectedPicole(newItems.filter((item) => item.category === "picole"));
  };

  const total = allSelectedProducts.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

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

        <h2>Comandas</h2>
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
            {generateComandaTitle(comandaNumber)}
          </Typography>
          <Box height={10} />
          <Divider />
          <Box height={20} />
          <Autocomplete
              multiple
              sx={{ width: "100%" }}
              id="tags-outlined"
              options={listItems}
              getOptionLabel={(option) => option.name}
              filterSelectedOptions
              onChange={handleBeveragesChange}
              renderInput={(params) => (
                <TextField {...params} label="Produtos" />
              )}
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
            

            {/* <Autocomplete
              multiple
              id="tags-outlined"
              options={listItemsFoods}
              getOptionLabel={(option) => option.name}
              filterSelectedOptions
              onChange={handleFoodsChange}
              renderInput={(params) => (
                <TextField {...params} label="Comidas" placeholder="Comidas" />
              )}
            /> */}

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
              />

              <IceCreamModal onDataChange={handleIceCreamDataChange} />
            </div>

            <div
              className="acai"
              style={{ display: "flex", gap: "5px", alignItems: "center" }}
            >
              <Autocomplete
                sx={{ width: "90%" }}
                multiple
                id="tags-outlined"
                getOptionLabel={(option) => option.name}
                options={acai}
                filterSelectedOptions
                noOptionsText="Nenhum açaí"
                onChange={handleAcaiChange}
                renderInput={(params) => (
                  <TextField {...params} label="Açaí" placeholder="Açaí" />
                )}
              />

              <AcaiModal onDataChange={handleAcaiDataChange} />
            </div>
            {/* <Autocomplete
              multiple
              id="tags-outlined"
              options={listPicole}
              getOptionLabel={(option) => option.name}
              filterSelectedOptions
              onChange={handlePicoleChange}
              renderInput={(params) => (
                <TextField {...params} label="Picolé" placeholder="Picolé" />
              )}
            /> */}
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
