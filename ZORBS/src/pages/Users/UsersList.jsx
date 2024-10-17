import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  Dialog,
  Stack,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import NewUsersModal from "./NewUsersModal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteForever";

const columns = [
  { id: "code", label: "Código", minWidth: 170 },
  { id: "name", label: "Nome", minWidth: 100 },
  { id: "acess", label: "Acesso", minWidth: 170 },
  { id: "status", label: "Status", minWidth: 170 },
  { id: "option", label: "Opções", minWidth: 170 },
];

const rows = [
  { pais: "Brasil", sigla: "BR", numero1: 210147125, numero2: 8515767 },
  { pais: "Índia", sigla: "IN", numero1: 1324171354, numero2: 3287263 },
  { pais: "China", sigla: "CN", numero1: 1403500365, numero2: 9596961 },
  { pais: "Estados Unidos", sigla: "US", numero1: 327167434, numero2: 9833520 },
  { pais: "Canadá", sigla: "CA", numero1: 37602103, numero2: 9984670 },
  { pais: "Austrália", sigla: "AU", numero1: 25475400, numero2: 7692024 },
  { pais: "Alemanha", sigla: "DE", numero1: 83019200, numero2: 357578 },
  { pais: "Irlanda", sigla: "IE", numero1: 4857000, numero2: 70273 },
  { pais: "México", sigla: "MX", numero1: 126577691, numero2: 1972550 },
  { pais: "Japão", sigla: "JP", numero1: 126317000, numero2: 377973 },
  { pais: "França", sigla: "FR", numero1: 67022000, numero2: 640679 },
  { pais: "Reino Unido", sigla: "GB", numero1: 67545757, numero2: 242495 },
  { pais: "Rússia", sigla: "RU", numero1: 146793744, numero2: 17098246 },
  { pais: "Nigéria", sigla: "NG", numero1: 200962417, numero2: 923768 },
  { pais: "Itália", sigla: "IT", numero1: 60483973, numero2: 301340 },
];

export default function UsersList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <NewUsersModal closeEvent={handleClose} />
      </Dialog>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ padding: "10px", fontWeight: "bold", fontSize: "30px" }}
        >
          Usuários Cadastrados
        </Typography>
        <Divider />
        <Box
          sx={{ display: "flex", justifyContent: "space-between", padding: 2 }}
        >
          <TextField
            variant="outlined"
            label="Pesquisar produtos"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: "300px" }}
          />
          <Button
            variant="contained"
            startIcon={<AddCircleIcon />}
            onClick={handleClickOpen}
            sx={{ background: "#9FD6D2" }}
          >
            Novo Usuário
          </Button>
        </Box>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="center"
                    style={{
                      minWidth: "100px",
                      backgroundColor: "#136b69",
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: "18px",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.sigla}>
                  <TableCell align="center">{row.pais}</TableCell>
                  <TableCell align="center">{row.sigla}</TableCell>
                  <TableCell align="center">
                    {row.numero1.toLocaleString()}
                  </TableCell>
                  <TableCell align="center">
                    {row.numero2.toLocaleString()}
                  </TableCell>
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
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
