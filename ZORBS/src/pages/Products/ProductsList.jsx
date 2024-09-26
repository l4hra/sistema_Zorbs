import { useState } from 'react';
import { Typography, Divider, TableRow, TablePagination, TableHead, TableContainer, TableCell, TableBody, Table, Paper, IconButton, TextField, Button, Box } from '@mui/material';
import { Check, Close, Edit } from '@mui/icons-material';

const columns = [
    { id: 'name', label: 'Nome', minWidth: 170, align: 'left' },
    { id: 'tipo', label: 'Tipo', minWidth: 100, align: 'left' },
    {
        id: 'precoCusto',
        label: 'Preço de Custo',
        minWidth: 100,
        align: 'center',
        format: (value) => `R$ ${value.toFixed(2)}`,
    },
    {
        id: 'precoVenda',
        label: 'Preço de Venda',
        minWidth: 100,
        align: 'center',
        format: (value) => `R$ ${value.toFixed(2)}`,
    },
    {
        id: 'status',
        label: 'Status',
        minWidth: 100,
        align: 'center',
    },
    {
        id: 'opcoes',
        label: 'Opções',
        minWidth: 150,
        align: 'center',
    },
];

function createData(name, tipo, precoCusto, precoVenda, status) {
    return { name, tipo, precoCusto, precoVenda, status };
}

// Dados iniciais
const initialRows = [
    createData('Coca-Cola 600ml', 'Refrigerante', 4.5, 8, true),
    createData('Pepsi 2L', 'Refrigerante', 6.5, 10, false),
    createData('Guarana 1L', 'Refrigerante', 5.0, 11, true),
    createData('Picole de Ninho', 'Picole recheado', 3.0, 7.0, true),
    createData('Picole de Nutella', 'Picole recheado', 3.0, 7.0, true),
    createData('Picole de Choclate', 'Picole simples', 2.0, 5.0, true),
    createData('Picole de Morango', 'Picole simples', 2.0, 5.0, true),
    createData('Coca-Cola 600ml', 'Refrigerante', 4.5, 8, true),
    createData('Pepsi 2L', 'Refrigerante', 6.5, 10, false),
    createData('Guarana 1L', 'Refrigerante', 5.0, 11, true),
    createData('Picole de Ninho', 'Picole recheado', 3.0, 7.0, true),
    createData('Picole de Nutella', 'Picole recheado', 3.0, 7.0, true),
    createData('Picole de Choclate', 'Picole simples', 2.0, 5.0, true),
    createData('Picole de Morango', 'Picole simples', 2.0, 5.0, true),
];

export default function ProductsList() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(7);
    const [rows, setRows] = useState(initialRows);
    const [searchTerm, setSearchTerm] = useState('');

    const toggleStatus = (name) => {
        const updatedRows = rows.map((row) =>
            row.name === name ? { ...row, status: !row.status } : row
        );
        setRows(updatedRows);
    };

    const editProduct = (name) => {
        console.log('Editar produto:', name);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const filteredRows = rows.filter((row) =>
        row.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Paper sx={{ width: "98%", overflow: "hidden", padding: "12px" }}>
            <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ padding: "10px" }}
            >
                Produtos Cadastrados
            </Typography>
            <Divider />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 2 }}>
                <TextField
                    variant="outlined"
                    label="Pesquisar produtos"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ width: '300px' }}
                />
                <Button variant="contained" sx={{ background: "#9FD6D2" }}>
                    + Novo Produto
                </Button>
            </Box>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                    sx={{ background: "#F9A7AB", color: "#fff", fontSize: 16, fontWeight: "bold", padding: "13px" }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredRows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.name}
                                        sx={{
                                            backgroundColor: rows.indexOf(row) % 2 === 0 ? "#f5f5f5" : "#ffffff",
                                        }}
                                    >
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            if (column.id === 'status') {
                                                return (
                                                    <TableCell key={column.id} align={column.align} sx={{ padding: "8px" }}>
                                                        {row.status ? 'Ativo' : 'Inativo'}
                                                    </TableCell>
                                                );
                                            }
                                            if (column.id === 'opcoes') {
                                                return (
                                                    <TableCell key={column.id} align={column.align} sx={{ padding: "8px" }}>
                                                        <IconButton onClick={() => toggleStatus(row.name)}>
                                                            {row.status ? <Close sx={{ color: 'red' }} /> : <Check sx={{ color: 'green' }} />}
                                                        </IconButton>
                                                        <IconButton onClick={() => editProduct(row.name)}>
                                                            <Edit sx={{ color: 'blue' }} />
                                                        </IconButton>
                                                    </TableCell>
                                                );
                                            }
                                            return (
                                                <TableCell key={column.id} align={column.align} sx={{ padding: "8px" }}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[6, 10, 25]}
                component="div"
                count={filteredRows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
