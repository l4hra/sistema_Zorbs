import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Divider from '@mui/material/Divider';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { db } from "../../firebase-config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/DeleteForever';
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Modal from '@mui/material/Modal';
import AddProducts from './AddProducts';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ProductsList() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rows, setRows] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // Estado para armazenar o termo de pesquisa
    const empCollectionRef = collection(db, "products");
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // const setRows = useAppStore((state) => state.setRows)
    // const rows = useAppStore((state) => state.rows)

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const data = await getDocs(empCollectionRef);
        setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

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
            text: "Confirme para deletar produto!",
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
        const userDoc = doc(db, "products", id);
        await deleteDoc(userDoc);
        Swal.fire("Deletado com sucesso!", "Seu produto foi deletado.", "success");
        getUsers();
    };

    // Função para formatar os preços como "R$"
    const formatPrice = (value) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    };

    // Função para filtrar os produtos com base no termo de busca
    const filteredRows = rows.filter((row) =>
        row.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div>
                <Modal
                    open={open}
                    // onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <AddProducts closeEvent={handleClose}/>
                    </Box>
                </Modal>
            </div>
            <Paper sx={{ width: '100%', overflow: 'hidden', padding: '16px' }}>
                <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ paddingLeft: "16px", paddingBottom: "10px", fontWeight: "bold" }}
                >
                    Produtos Cadastrados
                </Typography>
                <Box height={10} />

                {/* Layout flex para o botão e o campo de pesquisa */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 2,
                        paddingLeft: '16px',
                        paddingRight: '16px', // Espaçamento lateral
                    }}
                >
                    {/* Campo de pesquisa */}
                    <TextField
                        label="Pesquisar Produtos"
                        variant="outlined"
                        size="small"
                        value={searchTerm} // Conectado ao estado de pesquisa
                        onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o estado ao digitar
                        sx={{ width: 300 }}
                    />

                    {/* Botão de Cadastrar Produtos */}
                    <Button
                        variant="contained"
                        endIcon={<AddCircleIcon />}
                        onClick={handleOpen}
                        sx={{
                            backgroundColor: "#578eda",
                            ':hover': { backgroundColor: "#174aa4" },
                            height: "40px",
                        }}
                    >
                        Cadastrar Produtos
                    </Button>
                </Box>

                <Box height={10} />
                <Divider />

                {/* Tabela de Produtos */}
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    align="left"
                                    style={{ minWidth: "100px", backgroundColor: "#136b69", color: "#fff", fontWeight: "bold", fontSize: "18px" }}
                                >
                                    Nome
                                </TableCell>
                                <TableCell
                                    align="center"
                                    style={{ minWidth: "100px", backgroundColor: "#136b69", color: "#fff", fontWeight: "bold", fontSize: "18px" }}
                                >
                                    Tipo
                                </TableCell>
                                <TableCell
                                    align="center"
                                    style={{ minWidth: "100px", backgroundColor: "#136b69", color: "#fff", fontWeight: "bold", fontSize: "18px" }}
                                >
                                    Preço de Custo
                                </TableCell>
                                <TableCell
                                    align="center"
                                    style={{ minWidth: "100px", backgroundColor: "#136b69", color: "#fff", fontWeight: "bold", fontSize: "18px" }}
                                >
                                    Preço de Venda
                                </TableCell>
                                <TableCell
                                    align="center"
                                    style={{ minWidth: "100px", backgroundColor: "#136b69", color: "#fff", fontWeight: "bold", fontSize: "18px" }}
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
                                        {/* Formatação dos preços */}
                                        <TableCell align="center">{formatPrice(row.preco_custo)}</TableCell>
                                        <TableCell align="center">{formatPrice(row.preco_venda)}</TableCell>
                                        <TableCell align="center">
                                            <Stack spacing={2} direction="row" justifyContent="center" alignItems="center">
                                                <EditIcon
                                                    style={{
                                                        fontSize: "20px",
                                                        color: "#578eda",
                                                        cursor: "pointer",
                                                    }}
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

                {/* Paginação com tradução */}
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
