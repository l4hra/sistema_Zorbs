import { useState, useEffect } from "react";
import { Typography, Box, TextField, InputAdornment, IconButton, Button, MenuItem } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Swal from "sweetalert2";

export default function EditUsers({ closeEvent, refreshUser, user }) {
    const [type_of_acess, setTypeOfAccess] = useState(user?.type_of_acess || "");
    const [status, setStatus] = useState(user?.status || "");
    const [name, setName] = useState(user?.name || "");
    const [password, setPassword] = useState(user?.password || "");
    const [confirm_ps, setConfirmPs] = useState(user?.confirm_ps || "");
    const [email, setEmail] = useState(user?.email || "");
    const [telefone, setTelefone] = useState(user?.telefone || "");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPs, setShowConfirmPs] = useState(false);

    const [errors, setErrors] = useState({
        name: false,
        password: false,
        confirm_ps: false,
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
            setPassword(user.password);
            setConfirmPs(user.confirm_ps);
            setEmail(user.email);
            setTelefone(user.telefone);
        }
    }, [user]);

    const updateUser = async () => {
        if (!handleValidation()) {
            Swal.fire("Erro!", "Verifique os campos obrigatórios.", "error");
            return;
        }

        const response = await fetch(`http://localhost:5000/updateUsers/${user.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                password,
                confirm_ps,
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
            password: !validatePassword(password),
            confirm_ps: confirm_ps !== password,
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

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        setErrors(prevErrors => ({
            ...prevErrors,
            password: !validatePassword(value),
            confirm_ps: confirm_ps && confirm_ps !== value,
        }));
    };

    // Validação de senha
    const validatePassword = (value) => {
        return value.length >= 8;
    };

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPs(value);
        setErrors(prevErrors => ({
            ...prevErrors,
            confirm_ps: password !== value,
        }));
    };

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleClickShowConfirmPs = () => {
        setShowConfirmPs((prev) => !prev);
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
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
                    id="user-password"
                    name="senha"
                    label="Senha"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    variant="outlined"
                    error={errors.password}
                    helperText={errors.password && "Use 8 caracteres ou mais para sua senha"}
                    onChange={handlePasswordChange}
                    value={password || ""}
                    inputProps={{ maxLength: 15 }} // Limite de 15 caracteres para a senha
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <TextField
                    required
                    margin="dense"
                    id="user-confirm-password"
                    name="confirmacaoSenha"
                    label="Confirmar senha"
                    type={showConfirmPs ? "text" : "password"}
                    fullWidth
                    variant="outlined"
                    error={errors.confirm_ps}
                    helperText={errors.confirm_ps && "As senhas não são iguais. Tente novamente."}
                    onChange={handleConfirmPasswordChange}
                    value={confirm_ps || ""}
                    inputProps={{ maxLength: 15 }} // Limite de 15 caracteres para a senha
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowConfirmPs}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showConfirmPs ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
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
                        backgroundColor: "#F90808",
                        "&:hover": {
                            backgroundColor: "#115293",
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
