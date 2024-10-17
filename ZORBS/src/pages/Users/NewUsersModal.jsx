import React from "react";
import { useState } from "react";
import {
    IconButton,
    Typography,
    Box,
    TextField,
    Autocomplete,
    Button,
    MenuItem,
    Modal,
    FormControl,
    InputLabel,
    Select,
    Grid2,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";

export default function NewUsersModal({ closeEvent, refreshUser }) {
    const [type_of_acess, setTypeOfAccess] = useState("");
    const [status, setStatus] = useState("");
    const [name, setName] = useState("");
    const [passaword, setPassword] = useState("");
    const [confirm_ps, setConfirmPs] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");


    const [errors, setErrors] = useState({
        name: false,
        passaword: false,
        confirm_ps: false,
        email: false,
        telefone: false,
        type_of_acess: false,
        status: false,
    });

    const handleValidation = () => {
        let newErrors = {
            name: !name,
            passaword: !passaword,
            confirm_ps: !confirm_ps,
            email: !email,
            telefone: !telefone,
            type_of_acess: !type_of_acess,
            status: !status
        };
        setErrors(newErrors);

        // Verifica se há algum erro
        return !Object.values(newErrors).includes(true);
    };

    const createUser = async () => {
        if (!handleValidation()) {
            return;
        }

        const response = await fetch("http://localhost:3000/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                passaword,
                confirm_ps,
                email,
                telefone,
                type_of_acess,
                status,
            }),
        });

        if (response.ok) {
            Swal.fire("Criado com sucesso!", "Seu produto foi adicionado.", "success");
            refreshUser(); // Atualiza a lista de produtos
            closeEvent();
        } else {
            Swal.fire("Erro!", "Não foi possível adicionar o produto.", "error");
        }
    };

    const handleChangeSetAccess = (event) => {
        setAccess(event.target.value);
    };
    const handleChangeSetStatus = (event) => {
        setStatus(event.target.value);
    };

    const typeAcess = [
        { value: "Funcionário", label: "Funcionário" },
        { value: "Administrador", label: "Administrador" },
    ];

    const typeStatus = [
        { value: "Ativo", label: "Ativo" },
        { value: "Inativo", label: "Inativo" },
    ];

    return (
        <Modal
            open={true}
            onClose={closeEvent}
            aria-labelledby="modal-title"
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Box
                sx={{ width: 850, bgcolor: "background.paper", p: 9, boxShadow: 24 }}
            >
                <Typography id="modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
                    Adicionar Novo Usuário
                    <IconButton
                        style={{ position: "absolute", right: 8, top: 8 }}
                        onClick={closeEvent}
                    >
                        <CloseIcon />
                    </IconButton>
                </Typography>

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
                    error={errors.name}
                    helperText={errors.name && "Campo Obrigatório"}
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2,1fr)",
                        gap: "0.9em",
                    }}
                >    


                    <TextField
                        required
                        margin="dense"
                        id="user-password"
                        name="senha"
                        label="Senha"
                        type="password"
                        fullWidth
                        variant="outlined"
                        error={errors.passaword}
                        helperText={errors.passaword && "Campo Obrigatório"}
                        onChange={(e) => setPassword(e.target.value)}
                        value={passaword}
                    />

                    <TextField
                        required
                        margin="dense"
                        id="user-confirm-password"
                        name="confirmacaoSenha"
                        label="Confirmar senha"
                        type="password"
                        fullWidth
                        variant="outlined"
                        error={errors.confirm_ps}
                        helperText={errors.confirm_ps && "Campo Obrigatório"}
                        onChange={(e) => setConfirmPs(e.target.value)}
                        value={confirm_ps}
                    />
 
                    <TextField
                        required
                        margin="dense"
                        id="user-email"
                        name="email"
                        label="E-mail"
                        type="email"
                        fullWidth
                        variant="outlined"
                        error={errors.email}
                        helperText={errors.email && "Campo Obrigatório"}
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="user-phone"
                        name="telefone"
                        label="Telefone"
                        type="tel"
                        fullWidth
                        variant="outlined"
                        error={errors.telefone}
                        helperText={errors.telefone && "Campo Obrigatório"}
                        onChange={(e) => setTelefone(e.target.value)}
                        value={telefone}
                    />

                    <TextField
                        required
                        margin="dense"
                        label="Tipo de Acesso"
                        fullWidth
                        select
                        variant="outlined"
                        error={errors.type_of_acess}
                        helperText={errors.type_of_acess && "Campo Obrigatório"}
                        onChange={(e) => setTypeOfAccess(e.target.value)}
                        value={type_of_acess}
                    >
                        {typeAcess.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        required
                        margin="dense"
                        label="Tipo de Status"
                        fullWidth
                        select
                        variant="outlined"
                        error={errors.status}
                        helperText={errors.status && "Campo Obrigatório"}
                        onChange={(e) => setStatus(e.target.value)}
                        value={status}
                    >
                        {typeStatus.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>


                </div>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
                    <Button
                        onClick={closeEvent}
                        sx={{
                            width: 150,
                            color: "white",
                            mr: 1,
                            backgroundColor: "#F90808",
                            "&:hover": {
                                backgroundColor: "#115293",
                            },
                        }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={createUser}
                        sx={{
                            width: 150,
                            color: "white",
                            backgroundColor: "#09A176",
                            "&:hover": {
                                backgroundColor: "#388e3c",
                            },
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
