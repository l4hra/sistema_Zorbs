import { useState, useEffect } from "react";
import { Typography, Box, TextField, InputAdornment, IconButton, Button, MenuItem } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Swal from "sweetalert2";

export default function EditUsers({ closeEvent, refreshUser, user }) {
    const [type_of_acess, setTypeOfAccess] = useState(user?.type_of_acess || "");
    const [status, setStatus] = useState(user?.status || "");
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [telefone, setTelefone] = useState(user?.telefone || "");

    const [errors, setErrors] = useState({
        name: false,
        email: false,
        telefone: false,
        type_of_acess: false,
        status: false,
    });

    useEffect(() => {
        if (user) {
            setTypeOfAccess(user.type_of_acess);
            setStatus(user.status);
            setName(user.name);
            setEmail(user.email);
            setTelefone(user.telefone);
        }
    }, [user]);

    const updateUser = async () => {
        if (!handleValidation()) {
            return;
        }

        const response = await fetch(`http://localhost:5000/atualizaUsers/${user.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                telefone,
                type_of_acess,
                status,
            }),
        });

        if (response.ok) {
            Swal.fire("Editado com sucesso!", "Seu usuário foi atualizado.", "success");
            refreshUser();
            closeEvent();
        } else {
            Swal.fire("Erro!", "Não foi possível atualizar o usuário.", "error");
        }
    };

    const handleValidation = () => {
        const newErrors = {
            name: !name,
            email: !email || !validateEmail(email),
            telefone: !telefone || telefone.length < 19,
            type_of_acess: !type_of_acess,
            status: !status,
        };
        setErrors(newErrors);

        // Verifica se há algum erro
        return !Object.values(newErrors).includes(true);
    };

    // Validação de e-mail
    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    };

    // Formatação de telefone
    const formatPhone = (value) => {
        value = value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
        return value
            .replace(/^(\d{2})(\d)/g, "+$1 $2") // Adiciona o código do país
            .replace(/(\d{2})(\d)/, "($1) $2") // Adiciona o DDD entre parênteses
            .replace(/(\d{5})(\d)/, "$1-$2"); // Adiciona o hífen no meio do número
    };

    const handleChangePhone = (e) => {
        const formattedPhone = formatPhone(e.target.value);
        setTelefone(formattedPhone);
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
        <Box sx={{ width: 850, bgcolor: "background.paper", p: 9, boxShadow: 24 }}>
            <Typography id="modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
                Editar Usuário
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
                value={name || ""}
                inputProps={{ maxLength: 50 }} // Limite de 50 caracteres para o nome
            />

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "0.9em" }}>
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
                    helperText={errors.email && "Formato de e-mail inválido"}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email || ""}
                    inputProps={{ maxLength: 40 }} // Limite de 50 caracteres para o email

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
                    helperText={errors.telefone && "Por favor, insira o telefone corretamente"}
                    placeholder="+xx (xx) xxxxx-xxxx"
                    onChange={handleChangePhone} // Aplica a função de formatação de telefone
                    value={telefone || ""}
                    inputProps={{
                        maxLength: 19,
                    }}
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
                    value={type_of_acess || ""}
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
                    value={status || ""}
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
                        backgroundColor: "#f8615b",
                        "&:hover": {
                            backgroundColor: "#FF0000",
                        },
                    }}
                >
                    Cancelar
                </Button>
                <Button
                    onClick={updateUser}
                    sx={{
                        width: 150,
                        color: "white",
                        backgroundColor: "#09A176",
                        "&:hover": {
                            backgroundColor: "#388e3c",
                        },
                    }}
                >
                    Atualizar
                </Button>
            </Box>
        </Box>
    );
}
