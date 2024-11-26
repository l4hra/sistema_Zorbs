import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Sidenav from "../Sidenav";
import {
    Typography,
    Box,
    TextField,
    Button,
    Paper,
    InputAdornment,
    IconButton,
    Divider,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Swal from "sweetalert2";

export default function EditPerfil() {
    const [userData, setUserData] = useState({
        nome: "Nome do Usuário",
        email: "email@exemplo.com",
        senha: "",
        telefone: "11999999999",
        cargo: "Administrador",
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        // Lógica para salvar as alterações (chamada para API, por exemplo)
        Swal.fire("Sucesso", "Perfil atualizado com sucesso!", "success");
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <Navbar />
            <Box height={70} />
            <Box sx={{ display: "flex" }}>
                <Sidenav />
                <Box
                    component="main"
                    sx={{
                        width: "100%",
                        padding: "32px",
                        backgroundColor: "#f4f6f8",
                    }}
                >
                    <Paper
                        sx={{
                            width: "100%",
                            padding: "32px",
                            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
                            borderRadius: "8px",
                            backgroundColor: "white",
                        }}
                    >
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            sx={{
                                fontWeight: "bold",
                                color: "#fffff",
                                paddingBottom: "16px",
                            }}
                        >
                            Editar Perfil
                        </Typography>
                        <Divider sx={{ marginBottom: "20px" }} />

                        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                            <div style={{ flex: "1 1 calc(50% - 20px)" }}>
                                <TextField
                                    label="Nome"
                                    name="nome"
                                    value={userData.nome}
                                    onChange={handleInputChange}
                                    fullWidth
                                    required
                                    variant="outlined"
                                    sx={{
                                        backgroundColor: "#fafafa",
                                        borderRadius: "4px",
                                    }}
                                />
                            </div>
                            <div style={{ flex: "1 1 calc(50% - 20px)" }}>
                                <TextField
                                    label="E-mail"
                                    name="email"
                                    type="email"
                                    value={userData.email}
                                    onChange={handleInputChange}
                                    fullWidth
                                    required
                                    variant="outlined"
                                    sx={{
                                        backgroundColor: "#fafafa",
                                        borderRadius: "4px",
                                    }}
                                />
                            </div>
                            <div style={{ flex: "1 1 calc(50% - 20px)" }}>
                                <TextField
                                    label="Telefone"
                                    name="telefone"
                                    type="tel"
                                    value={userData.telefone}
                                    onChange={handleInputChange}
                                    fullWidth
                                    required
                                    variant="outlined"
                                    sx={{
                                        backgroundColor: "#fafafa",
                                        borderRadius: "4px",
                                    }}
                                />
                            </div>
                            <div style={{ flex: "1 1 calc(50% - 20px)" }}>
                                <TextField
                                    label="Cargo"
                                    name="cargo"
                                    value={userData.cargo}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    fullWidth
                                    variant="outlined"
                                    sx={{
                                        backgroundColor: "#fafafa",
                                        borderRadius: "4px",
                                    }}
                                />
                            </div>
                            <div style={{ width: "100%" }}>
                                <TextField
                                    label="Senha"
                                    name="senha"
                                    type={showPassword ? "text" : "password"}
                                    value={userData.senha}
                                    onChange={handleInputChange}
                                    fullWidth
                                    required
                                    variant="outlined"
                                    sx={{
                                        backgroundColor: "#fafafa",
                                        borderRadius: "4px",
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={togglePasswordVisibility}
                                                    edge="end"
                                                >
                                                    {showPassword ? (
                                                        <VisibilityOff />
                                                    ) : (
                                                        <Visibility />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>
                            <div style={{ width: "100%" }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSubmit}
                                    sx={{
                                        width: "100%",
                                        padding: "12px",
                                        fontSize: "16px",
                                        backgroundColor: "#3f51b5",
                                        '&:hover': {
                                            backgroundColor: "#303f9f",
                                        },
                                    }}
                                >
                                    Salvar Alterações
                                </Button>
                            </div>
                        </div>
                    </Paper>
                </Box>
            </Box>
        </>
    );
}
