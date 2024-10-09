import React from 'react';
import { useState } from 'react';
import { IconButton, Typography, Box, Grid, TextField, Button, MenuItem, Modal, FormControl, InputLabel, Select, Grid2 } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";

export default function NewUsersModal({ closeEvent }) {
    const [access, setAccess] = useState('');
    const [status, setStatus] = useState('');

    const handleChangeSetAccess = (event) => {
        setAccess(event.target.value);
    };
    const handleChangeSetStatus = (event) => {
        setStatus(event.target.value);
    };

    return (
        <Modal
            open={true}
            onClose={closeEvent}
            aria-labelledby="modal-title"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >

            <Box sx={{ width: 850, bgcolor: 'background.paper', p: 9, boxShadow: 24 }}>
                <Typography id="modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
                    Adicionar Novo Usuário
                    <IconButton
                        style={{ position: "absolute", right: 8, top: 8 }}
                        onClick={closeEvent}
                    >
                        <CloseIcon />
                    </IconButton>
                </Typography>
                <Grid >
                    <Grid item xs={12} md={6}>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="user-name"
                            name="nome"
                            label="Nome do Usuário"
                            type="text"
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} sx={{ mt: 3 }}>
                            <TextField
                                required
                                margin="dense"
                                id="user-password"
                                name="senha"
                                label="Senha"
                                type="password"
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ mt: 3 }}>
                            <TextField
                                required
                                margin="dense"
                                id="user-confirm-password"
                                name="confirmacaoSenha"
                                label="Confirma senha"
                                type="password"
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} sx={{ mt: 3 }}>
                            <TextField
                                required
                                margin="dense"
                                id="user-email"
                                name="email"
                                label="E-mail"
                                type="email"
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ mt: 3 }}>
                            <TextField
                                required
                                margin="dense"
                                id="user-phone"
                                name="telefone"
                                label="Telefone"
                                type="tel"
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} sx={{ mt: 4 }}>
                            <FormControl fullWidth>
                                <InputLabel id="type-of-acess">Tipo de acesso:</InputLabel>
                                <Select
                                    labelId="type-of-acess-label"
                                    id="type-of-acess"
                                    value={access}
                                    label="Tipo de acesso:"
                                    onChange={handleChangeSetAccess}
                                >
                                    <MenuItem value={'type1'}>Tipo 1</MenuItem>
                                    <MenuItem value={'type2'}>Tipo 2</MenuItem>
                                    <MenuItem value={'type3'}>Tipo 3</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ mt: 4 }}>
                            <FormControl fullWidth>
                                <InputLabel id="status">Status</InputLabel>
                                <Select
                                    labelId="status-label"
                                    id="status"
                                    value={status}
                                    label="Status"
                                    onChange={handleChangeSetStatus}
                                >
                                    <MenuItem value={'on'}>Ativado</MenuItem>
                                    <MenuItem value={'off'}>Desativado</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                <Button
                        onClick={closeEvent}
                        sx={{
                            width: 150,
                            color: 'white',
                            mr: 1,
                            backgroundColor: '#F90808',
                            "&:hover": {
                                backgroundColor: '#115293',
                                
                            }
                        }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={() => { console.log("Save logic here"); }}
                        sx={{
                            width: 150,
                            color: 'white',
                            backgroundColor: '#09A176',
                            "&:hover": {
                                backgroundColor: '#388e3c',
                            }
                        }}
                    >
                        Salvar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

/*
                            <Button onClick={handleClose}>Cancelar</Button>
                            <Button type="submit" onClick={handleClose}>Salvar</Button>
                        </DialogActions>

                        );
}
*/