import { useEffect, useState } from "react";
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
  Modal,
  Stack,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import NewUsersModal from "./NewUsersModal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteForever";
import EditUsers from "./EditUsers";
import Swal from "sweetalert2";

const columns = [
  { id: "code", label: "Código", minWidth: 170 },
  { id: "name", label: "Nome", minWidth: 100 },
  { id: "acess", label: "Acesso", minWidth: 170 },
  { id: "status", label: "Status", minWidth: 170 },
  { id: "option", label: "Opções", minWidth: 170 },
];


export default function UsersList() {
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false); // Estado para o modal de edição
  const [selectedUser, setSelectedUser] = useState(null); // Estado para o produto selecionado
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getUser = async () => {
    const response = await fetch('http://localhost:3000/user');
    const data = await response.json();
    setRows(data);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteUser = (id) => {
    Swal.fire({
      title: "Tem certeza?",
      text: "Confirme para deletar o usuário!",
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

  //Função delete
  const deleteApi = async (id) => {
    await fetch(`http://localhost:3000/user/${id}`, {
      method: 'DELETE'
    });
    Swal.fire("Deletado com sucesso!", "Usuário foi deletado.", "success");
    getUser();
  };

  // Funções para editar produtos
  const handleEditOpen = (user) => {
    setSelectedUser(user);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setSelectedUser(null);
  };

  return (
    <>
       <Modal
            open={editOpen}
            aria-labelledby="modal-title"
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
         <EditUsers
         user={selectedUser} 
         closeEvent={handleEditClose} 
         refreshUser={getUser} />

        </Modal>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <NewUsersModal closeEvent={handleClose} refreshUser={getUser} />
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
            sx={{
              backgroundColor: "#578eda",
              ":hover": { backgroundColor: "#174aa4" },
              height: "40px",
            }}
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
              {filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                    <TableCell align="center">{row.id}</TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.type_of_acess}</TableCell>
                    <TableCell align="center">{row.status}</TableCell>
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
                          onClick={() => deleteUser(row.id)}
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
