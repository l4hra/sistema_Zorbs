import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Divider from "@mui/material/Divider";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteForever";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AddProducts from "./AddProducts";
import EditProduct from "./EditProduct"; 

// Style do modal
const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%", // Aumente para 80% da largura da tela
  maxWidth: "800px", // Limite a largura máxima
  bgcolor: "#ffffff", 
  borderRadius: "12px", 
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)", 
  p: 4,
  outline: "none", 
  maxHeight: "90vh", 
  overflowY: "auto", 
};

export default function ProductsList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false); // Estado para o modal de edição
  const [selectedProduct, setSelectedProduct] = useState(null); // Estado para o produto selecionado

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getProducts();
  }, []);

  // Função para obter produtos do arquivo JSON
  const getProducts = async () => {
    const response = await fetch('http://localhost:3000/products'); // Altere o caminho conforme necessário
    const data = await response.json();
    setRows(data);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteProduct = (id) => {
    Swal.fire({
      title: "Tem certeza?",
      text: "Confirme para deletar o produto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, deletar",
    }).then((result) => {
      if (result.value) {
        deleteApi(id);
      }
    });
  };

  const deleteApi = async (id) => {
    await fetch(`http://localhost:3000/products/${id}`, {
      method: 'DELETE'
    });
    Swal.fire("Deletado com sucesso!", "Seu produto foi deletado.", "success");
    getProducts();
  };

  // Função para formatar os preços como "R$"
  const formatPrice = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  // Função para filtrar os produtos com base no termo de busca
  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Funções para editar produtos
  const handleEditOpen = (product) => {
    setSelectedProduct(product);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <div>
        <Modal
          open={open}
          onClose={(event, reason) => {
            if (reason !== "backdropClick") {
              handleClose();
            }
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleModal}>
            <AddProducts closeEvent={handleClose} refreshProducts={getProducts} />
          </Box>
        </Modal>
        <Modal
          open={editOpen}
          onClose={(event, reason) => {
            if (reason !== "backdropClick") {
              handleEditClose();
            }
          }}
          aria-labelledby="modal-edit-title"
          aria-describedby="modal-edit-description"
        >
          <Box sx={styleModal}>
            <EditProduct 
              product={selectedProduct} 
              closeEvent={handleEditClose} 
              refreshProducts={getProducts} 
            />
          </Box>
        </Modal>
      </div>

      <Paper sx={{ width: "100%", overflow: "hidden", padding: "16px" }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            paddingLeft: "16px",
            paddingBottom: "10px",
            fontWeight: "bold",
          }}
        >
          Produtos Cadastrados
        </Typography>
        <Box height={10} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 2,
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
        >
          <TextField
            label="Pesquisar Produtos"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: 300 }}
          />

          <Button
            variant="contained"
            endIcon={<AddCircleIcon />}
            onClick={handleOpen}
            sx={{
              backgroundColor: "#578eda",
              ":hover": { backgroundColor: "#174aa4" },
              height: "40px",
            }}
          >
            Cadastrar Produtos
          </Button>
        </Box>

        <Box height={10} />
        <Divider />

        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="left"
                  style={{
                    minWidth: "100px",
                    backgroundColor: "#136b69",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  Nome
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    minWidth: "100px",
                    backgroundColor: "#136b69",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  Tipo
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    minWidth: "100px",
                    backgroundColor: "#136b69",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  Preço de Custo
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    minWidth: "100px",
                    backgroundColor: "#136b69",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  Preço de Venda
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    minWidth: "100px",
                    backgroundColor: "#136b69",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  Opções
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="center">{row.type}</TableCell>
                    <TableCell align="center">{formatPrice(row.preco_custo)}</TableCell>
                    <TableCell align="center">{formatPrice(row.preco_venda)}</TableCell>
                    <TableCell align="center">
                      <Stack
                        spacing={2}
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <EditIcon
                          style={{
                            fontSize: "20px",
                            color: "#578eda",
                            cursor: "pointer",
                          }}
                          onClick={() => handleEditOpen(row)} 
                        />
                        <DeleteIcon
                          style={{
                            fontSize: "20px",
                            color: "#f8615b",
                            cursor: "pointer",
                          }}
                          onClick={() => deleteProduct(row.id)} 
                        />
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Linhas por página:" // Texto traduzido
          labelDisplayedRows={({ from, to, count }) =>
            `${from}–${to} de ${count !== -1 ? count : `mais de ${to}`}`
          }
        />
      </Paper>
    </>
  );
}
