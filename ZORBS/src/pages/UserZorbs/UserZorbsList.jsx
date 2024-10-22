import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";

function UserZorbsList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false); // Estado para o modal de edição
  const [selectedEmpresas, setSelectedEmpresas] = useState(null); // Estado para o produto selecionado

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getEmpresas();
  }, []);

  // Função para obter empresas do arquivo JSON
  const getEmpresas = async () => {
    try {
      const response = await fetch('http://localhost:5002/empresas');
      const data = await response.json();
      setRows(data);
    } catch (error) {
      console.error("Erro ao buscar empresas:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteEmpresa = (id) => {
    Swal.fire({
      title: "Tem certeza?",
      text: "Confirme para deletar a empresa!",
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
    await fetch(`http://localhost:5002/empresas/${id}`, {
      method: 'DELETE'
    });
    Swal.fire("Deletado com sucesso!", "A empresa foi deletado.", "success");
    getEmpresas();
  };


  // Função para filtrar os produtos com base no termo de busca
  const filteredRows = rows.filter((row) =>
    row.razao_social.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Funções para editar empresa
  const handleEditOpen = (empresa) => {
    setSelectedEmpresas(empresa);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setSelectedEmpresas(null);
  };


  return (
    <>
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
          Usuários Zorbs
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
            label="Pesquisar Empresas"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: 300 }}
          />

          <Button
            variant="contained"
            endIcon={<AddCircleIcon />}
            onClick={() => {
              navigate("/AddUsersZorbs");
            }}
            sx={{
              backgroundColor: "#578eda",
              ":hover": { backgroundColor: "#174aa4" },
              height: "40px",
            }}
          >
            Cadastrar Empresa
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
                    backgroundColor: "#054f77",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  Razão Social
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    minWidth: "100px",
                    backgroundColor: "#054f77",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  Nome Fantasia
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    minWidth: "100px",
                    backgroundColor: "#054f77",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  CNPJ
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    minWidth: "100px",
                    backgroundColor: "#054f77",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  Status
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    minWidth: "100px",
                    backgroundColor: "#054f77",
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
                    <TableCell align="left" style={{ fontSize: "17px" }}>{row.razao_social}</TableCell>
                    <TableCell align="center" style={{ fontSize: "17px" }}>{row.nome_fantasia}</TableCell>
                    <TableCell align="center" style={{ fontSize: "17px" }}>{row.CNPJ}</TableCell>
                    <TableCell align="center" style={{ fontSize: "17px" }}>{row.status}</TableCell>
                    <TableCell align="center" style={{ fontSize: "17px" }}>
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
                          onClick={() => deleteEmpresa(row.id)}
                        />
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[15, 10, 25]}
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
  )
}

export default UserZorbsList
