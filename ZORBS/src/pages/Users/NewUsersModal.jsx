import React from 'react'
import { FormControl, Select, MenuItem, InputLabel, Button, DialogTitle, DialogContent, DialogActions, TextField, Grid } from '@mui/material';

export default function NewUsersModal({ closeEvent }) {
    const [acess, setAcess] = React.useState('');
    const [status, setStatus] = React.useState('');

    const handleChangeSetAcess = (event) => {
        setAcess(event.target.value);
    };
    const handleChangeSetStatus = (event) => {
        setStatus(event.target.value);
    };
    const handleClose = () => {
        closeEvent();  // Chama a função handleClose do componente pai
    };

    return (
        <>
            <DialogTitle id="dialog-title">Adicionar Novo Usuário</DialogTitle>
            <DialogContent dividers>
                <Grid>
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
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
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
                    <Grid item xs={12} md={6}>
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
                    <Grid item xs={12} md={6}>
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
                    <Grid item xs={12} md={6}>
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
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel id="type-of-acess">Tipo de acesso:</InputLabel>
                            <Select
                                labelId="type-of-acess-label"
                                id="type-of-acess"
                                value={acess}
                                label="Tipo de acesso:"
                                onChange={handleChangeSetAcess}
                            >
                                <MenuItem value={'type1'}>Tipo 1</MenuItem>
                                <MenuItem value={'type2'}>Tipo 2</MenuItem>
                                <MenuItem value={'type3'}>Tipo 3</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
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
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button type="submit" onClick={handleClose}>Salvar</Button>
            </DialogActions>
        </>
    );
}
