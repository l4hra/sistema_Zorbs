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

export default function UsersList() {
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false); // Estado para o modal de edição
  const [editParms, setEditParms] = useState(null);
  

  
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
    const response = await fetch('http://localhost:5000/users');
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

  const deleteUser = async (id) => {
    const result = await Swal.fire({
      title: "Tem certeza?",
      text: "Confirme para deletar o usuário!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, deletar",
    })
      if (result.isConfirmed) {
        await fetch(`http://localhost:5000/deleteUser/${id}`, { method: 'DELETE' });
        Swal.fire("Deletado com sucesso!", "Usuário foi deletado.", "success");
        getUser();
      }
    };
  
  // Funções para editar produtos
  const handleEditOpen = (user) => {
    setEditParms(user);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setEditParms(null);
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
         user={editParms} 
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

        <Paper sx={{ width: "100%", padding: "16px", boxShadow: "0px 0px 3px rgba(0,0,0,0.50)" }}>
        <Typography variant="h5" sx={{ paddingBottom: "10px", fontWeight: "bold" }}>
          Usuários Cadastrados
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
          <TextField
            variant="outlined"
            label="Pesquisar Usuários"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: 300 }}
          />

          <Button
            variant="contained"
            onClick={handleClickOpen}
            sx={{
              backgroundColor: "#578eda",
              ":hover": { backgroundColor: "#174aa4" },
              height: "40px",
            }}
          >
            Cadastrar Usuário
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
                      backgroundColor: "#054f77",
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
                    <TableCell align="center" sx={{fontSize: "17px"}}>{row.id}</TableCell>
                    <TableCell align="center" sx={{fontSize: "17px"}}>{row.name}</TableCell>
                    <TableCell align="center" sx={{fontSize: "17px"}}>{row.type_of_acess}</TableCell>
                    <TableCell align="center" sx={{fontSize: "17px"}}>{row.status}</TableCell>
                    <TableCell align="center" sx={{fontSize: "17px"}}>
                      <Stack direction="row" spacing={2} justifyContent="center">
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
