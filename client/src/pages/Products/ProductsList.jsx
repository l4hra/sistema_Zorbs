import { useState, useEffect, useMemo } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  Box,
  Stack,
  TextField,
  Typography,
  Modal,
} from "@mui/material";
import {
  AddCircle as AddCircleIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import Swal from "sweetalert2";
import AddProducts from "../../components/CreateProducts/AddProducts";
import EditProduct from "../../components/EditProducts/EditProduct";

// Constantes de estilo do modal
const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: "800px",
  bgcolor: "#ffffff",
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
  p: 4,
  outline: "none",
  maxHeight: "90vh",
  overflowY: "auto",
};

// Hook customizado para gerenciar produtos
const useProducts = (url) => {
  const [rows, setRows] = useState([]);

  const getProducts = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setRows(data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [url]);

  return [rows, getProducts];
};

export default function ProductsList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [searchTerm, setSearchTerm] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const [rows, getProducts] = useProducts('http://localhost:5000/products');

  const handleOpen = () => setAddOpen(true);
  const handleClose = () => setAddOpen(false);

  const toggleStatus = async (product) => {
    try {
        const newStatus = product.status === "Ativo" ? "Inativo" : "Ativo";
        await fetch(`http://localhost:5000/products/${product.id}/status`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: product.status }),
        });
        Swal.fire(
            "Sucesso!",
            `Produto atualizado para ${newStatus}`,
            "success"
        );
        getProducts(); // Atualiza a tabela
    } catch (error) {
        console.error("Erro ao atualizar status do produto:", error);
        Swal.fire("Erro!", "Não foi possível atualizar o status.", "error");
    }
};

  const formatPrice = (value) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

  const filteredRows = useMemo(
    () => rows.filter((row) => row.name.toLowerCase().includes(searchTerm.toLowerCase())),
    [rows, searchTerm]
  );

  return (
    <>
      <Modal open={addOpen} onClose={handleClose}>
        <Box sx={styleModal}>
          <AddProducts closeEvent={handleClose} refreshProducts={getProducts} />
        </Box>
      </Modal>
      <Modal open={editOpen} onClose={() => setEditOpen(false)}>
        <Box sx={styleModal}>
          <EditProduct
            product={selectedProduct}
            closeEvent={() => setEditOpen(false)}
            refreshProducts={getProducts}
          />
        </Box>
      </Modal>

      <Paper sx={{ width: "100%", padding: "16px", boxShadow: "0px 0px 3px rgba(0,0,0,0.50)" }}>
        <Typography variant="h5" sx={{ paddingBottom: "10px", fontWeight: "bold" }}>
          Produtos Cadastrados
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
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
            sx={{ backgroundColor: "#578eda", ":hover": { backgroundColor: "#174aa4" } }}
          >
            Cadastrar Produtos
          </Button>
        </Box>

        <TableContainer sx={{ maxHeight: 950 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {["Nome", "Categoria", "Preço de Custo", "Preço de Venda", "Status", "Opções"].map((header) => (
                  <TableCell
                    key={header}
                    align="center"
                    sx={{
                      minWidth: "100px",
                      backgroundColor: "#054f77",
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: "18px",
                    }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell align="center" sx={{ fontSize: "17px" }}>{row.name}</TableCell>
                  <TableCell align="center" sx={{ fontSize: "17px" }}>{row.category}</TableCell>
                  <TableCell align="center" sx={{ fontSize: "17px" }}>{formatPrice(row.preco_custo)}</TableCell>
                  <TableCell align="center" sx={{ fontSize: "17px" }}>{formatPrice(row.preco_venda)}</TableCell>
                  <TableCell align="center" sx={{ fontSize: "17px" }}>{row.status}</TableCell>
                  <TableCell align="center" sx={{ fontSize: "17px" }}>
                    <Stack direction="row" spacing={2} justifyContent="center">
                      <EditIcon
                        sx={{ fontSize: "20px", color: "#578eda", cursor: "pointer" }}
                        onClick={() => {
                          setSelectedProduct(row);
                          setEditOpen(true);
                          
                        }}
                      />
                     {row.status === "Ativo" ? (
                        <CancelRoundedIcon
                          sx={{ fontSize: "20px", color: "#f8615b", cursor: "pointer" }}
                            onClick={() => toggleStatus(row)}
                        />
                        ) : (
                        <CheckCircleRoundedIcon
                          sx={{ fontSize: "20px", color: "#4caf50", cursor: "pointer" }}
                            onClick={() => toggleStatus(row)}
                        />
                      )}
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[15, 25, 35]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          labelRowsPerPage="Linhas por página:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}–${to} de ${count !== -1 ? count : `mais de ${to}`}`
          }
        />
      </Paper>
    </>
  );
}
