import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { db } from "../../firebase-config";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const rows = [

];

export default function ProductsList() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rows, setRows] = useState([]);
    const empCollectionRef = collection(db, "Products");

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
            icon: "aviso",
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
        const userDoc = doc(db, "Products", id);
        await deleteDoc(userDoc);
        Swal.fire("Deletado!", "Seu produto foi deletado.", "success");
        getUsers();
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ padding: "20px" }}
            >
                Produtos Cadastrados
            </Typography>
            <Divider />
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell
                                align="left"
                                style={{ minWidth: "100px" }}
                            >
                                Nome
                            </TableCell>
                            <TableCell
                                align="center"
                                style={{ minWidth: "100px" }}
                            >
                                Tipo
                            </TableCell>
                            <TableCell
                                align="center"
                                style={{ minWidth: "100px" }}
                            >
                                Preço de Custo
                            </TableCell>
                            <TableCell
                                align="center"
                                style={{ minWidth: "100px" }}
                            >
                                Preço de Venda
                            </TableCell>
                            <TableCell
                                align="center"
                                style={{ minWidth: "100px" }}
                            >
                                Opções
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1}>
                                        <TableCell key={row.id} align="left">
                                            {row.name}
                                        </TableCell>
                                        <TableCell key={row.id} align="center">
                                            {row.tipe}
                                        </TableCell>
                                        <TableCell key={row.id} align="center">
                                            {row.preco_custo}
                                        </TableCell>
                                        <TableCell key={row.id} align="center">
                                            {row.preco_venda}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Stack spacing={2} direction="row" justifyContent="center" alignItems="center">
                                                <EditIcon
                                                    style={{
                                                        fontSize: "20px",
                                                        color: "blue",
                                                        cursor: "pointer",
                                                    }}
                                                    className="cursor-pointer"
                                                // onClick={() => editUser(row.id)}
                                                />
                                                <DeleteIcon
                                                    style={{
                                                        fontSize: "20px",
                                                        color: "darkred",
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() => {
                                                        deleteUser(row.id);
                                                    }}
                                                />
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
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
    );
}
