import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Divider,
  Button,
  Box,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  AddCircle as AddCircleIcon,
  Edit as EditIcon,
  DeleteForever as DeleteIcon,
} from "@mui/icons-material";
import Swal from "sweetalert2";

// Hook customizado para gerenciar empresas
const useCompanies = (url) => {
  const [rows, setRows] = useState([]);

  const getCompanies = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      setRows(data);
    } catch (error) {
      console.error("Erro ao buscar empresas:", error);
    }
  };

  useEffect(() => {
    getCompanies();
  }, [url]);

  return [rows, getCompanies];
}

export default function CompaniesList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [searchTerm, setSearchTerm] = useState("");

  const [rows, getCompanies] = useCompanies('http://localhost:5000/companies');

  const deleteCompanies = async (id) => {
    const result = await Swal.fire({
      title: "Tem certeza?",
      text: "Confirme para deletar a empresa!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, deletar",
    });
    if (result.isConfirmed) {
      await fetch(`http://localhost:5000/deleteCompanies/${id}`, { method: 'DELETE' });
      Swal.fire("Deletado com sucesso!", "A empresa foi deletada.", "success");
      getCompanies();
    }
  };

  // Função para filtrar as empresa com base no termo de busca
  const filteredRows = useMemo(
    () => rows.filter((row) => row.razao_social.toLowerCase().includes(searchTerm.toLowerCase())),
    [rows, searchTerm]
  );

  // Funções para editar empresa passando por navegação
  const handleEditOpen = (companies) => {
    navigate("/EditCompanies", { state: { companies } });
  };


  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden", padding: "16px", boxShadow: "0px 0px 3px 0px rgba(0,0,0,0.50)" }}>
        <Typography variant="h5"
          sx={{
            paddingBottom: "10px",
            fontWeight: "bold",
          }}
        >
          Usuários Zorbs
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 2
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
              navigate("/CreateCompanies");
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

        <Divider />
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {["Razão Social", "Nome Fantasia", "CNPJ", "Status", "Opções"].map((header) => (
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
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  <TableCell align="center" style={{ fontSize: "17px" }}>{row.razao_social}</TableCell>
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
                        onClick={() => deleteCompanies(row.id)}
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
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          labelRowsPerPage="Linhas por página:" // Texto traduzido
          labelDisplayedRows={({ from, to, count }) =>
            `${from}–${to} de ${count !== -1 ? count : `mais de ${to}`}`
          }
        />
      </Paper>
    </>
  )
}

