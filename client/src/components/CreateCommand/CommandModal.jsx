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

export default function CommandModal() {
  const [open, setOpen] = useState(false);
  const [iceCreams, setIceCreams] = useState([]);
  // const [acai, setAcai] = useState([]);
  const [selectedBeverages, setSelectedBeverages] = useState([]);
  // const [selectedFoods, setSelectedFoods] = useState([]);
  // const [selectedPicole, setSelectedPicole] = useState([]);
  const [comandaNumber, setComandaNumber] = useState(0);
  const [listItems, setListItems] = useState([]);
  const handleOpen = () => {
    setOpen(true);
  };

  const generateComandaTitle = (number) => {
    const formattedNumber = (number + 1).toString().padStart(3, "0");
    return `Pedido N°${formattedNumber}`;
  };

  // Listar Produtos
  const fetchProducts = async (categoria) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/products`
        // {
        //   params: { categoria },  // Passa a categoria como parâmetro
        // }
      );
      if (response.status === 200) {
        setListItems(response.data); // Atualiza o estado com os produtos recebidos
      }
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  // Listar Comandas
  const fetchCommands = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/commands`);
      if (response.status === 200) {
        setComandaNumber(response.data.at(-1).id);
      }
    } catch (error) {
      console.error("Erro ao buscar comandas:", error);
    }
  };

  // Criar Comanda
  const fetchCommand = async () => {
    console.log("fetchCommand", selectedBeverages, iceCreams, total);
    try {
      const commandData = {
        name: generateComandaTitle(comandaNumber),
        date_opening: new Date(),
        totalPrice: total,
        payment: "Cartão de Crédito",
        incompleted: 1,
      };
      const response = await axios.post(
        "http://localhost:5000/cadastroCommand",
        commandData
      );
      for (const product of selectedBeverages) {
        const productData = {
          id_products: product.id,
          id_command: comandaNumber + 1,
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
          id_command: comandaNumber + 1,
          name: ice.name,
          qtd_products: ice.weight,
          value_item: ice.price,
          und_medida: "kg",
        };
        await axios.post("http://localhost:5000/createItemCommand", iceData);
      }
      //chamar toast
      toast.success(response.data, {
        position: "bottom-left",
        duration: 5000,
      });

      handleClose();
    } catch (error) {
      console.error("Erro ao criar a comanda:", error);
    }
  };

  const handleIceCreamDataChange = (data) => {
    setIceCreams((prevIceCreams) => [...prevIceCreams, data]);
  };

  // const handleAcaiDataChange = (data) => {
  //   setAcai((prevAcai) => [...prevAcai, data]);
  // };

  const handleBeveragesChange = (event, value) => {
    setSelectedBeverages(
      value.map((item) => {
        return { ...item, quantity: 1 };
      })
    );
  };
  // const handleFoodsChange = (event, value) => setSelectedFoods(value);
  const handleIceCreamsChange = (event, value) => setIceCreams(value);
  // const handleAcaiChange = (event, value) => setAcai(value);
  // const handlePicoleChange = (event, value) => setSelectedPicole(value);

  const allSelectedProducts = [
    ...selectedBeverages,
    // ...selectedFoods,
    ...iceCreams,
    // ...acai,
    // ...selectedPicole,
  ];
  const handleClose = () => {
    setOpen(false);
    setSelectedBeverages([]);
    setIceCreams([]);
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

  // Chama a função de busca ao carregar o componente (quando a categoria for '?')
  useEffect(() => {
    fetchProducts(); // Passa a categoria "?" para buscar os produtos
    fetchCommands();
  }, []);

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
                value={iceCreams}
              />

              <IceCreamModal onDataChange={handleIceCreamDataChange} />
            </div>

            {/* <div
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
            </div> */}
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
