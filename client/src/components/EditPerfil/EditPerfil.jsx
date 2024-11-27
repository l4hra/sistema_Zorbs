import { useState, useEffect } from "react";
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
    CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Swal from "sweetalert2";

export default function EditPerfil() {
    const [user, setUser] = useState(null); // Estado para armazenar o usuário
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [type_of_acess, setTypeOfAccess] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(true); // Estado para o carregamento

    useEffect(() => {
        // Simula a busca do usuário logado
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
            setName(storedUser.name || "");
            setPassword(storedUser.password || "");
            setEmail(storedUser.email || "");
            setTelefone(storedUser.telefone || "");
            setTypeOfAccess(storedUser.type_of_acess || "");
        }
        setLoading(false); // Finaliza o carregamento
    }, []);

    const handleSubmit = async () => {
        if (!name || !email || !telefone || !password) {
            Swal.fire("Erro", "Por favor, preencha todos os campos obrigatórios!", "error");
            return;
        }

        try {
            setLoading(true); // Exibe o loader durante a requisição
            const response = await fetch(`http://localhost:5000/updateUsers/${user?.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    password,
                    email,
                    telefone,
                    type_of_acess,
                    status: "Ativo",
                }),
            });

            if (response.ok) {
                Swal.fire("Sucesso", "Perfil atualizado com sucesso!", "success");
                const updatedUser = { ...user, name, email, telefone, password, status: "Ativo", };
                setUser(updatedUser);
                localStorage.setItem("user", JSON.stringify(updatedUser));
            } else {
                const errorData = await response.json();
                Swal.fire("Erro!", errorData.message || "Erro ao atualizar o usuário.", "error");
            }
        } catch (error) {
            Swal.fire("Erro", "Houve um problema ao se conectar com o servidor.", "error");
        } finally {
            setLoading(false); // Oculta o loader
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (!user) return <Typography>Usuário não encontrado.</Typography>;

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
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    fullWidth
                                    required
                                    variant="outlined"
                                    sx={{ backgroundColor: "#fafafa" }}
                                />
                            </div>
                            <div style={{ flex: "1 1 calc(50% - 20px)" }}>
                                <TextField
                                    label="E-mail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    fullWidth
                                    required
                                    variant="outlined"
                                    sx={{ backgroundColor: "#fafafa" }}
                                />
                            </div>
                            <div style={{ flex: "1 1 calc(50% - 20px)" }}>
                                <TextField
                                    label="Telefone"
                                    value={telefone}
                                    onChange={(e) => setTelefone(e.target.value)}
                                    fullWidth
                                    required
                                    variant="outlined"
                                    sx={{ backgroundColor: "#fafafa" }}
                                />
                            </div>
                            <div style={{ flex: "1 1 calc(50% - 20px)" }}>
                                <TextField
                                    label="Cargo"
                                    value={type_of_acess}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    fullWidth
                                    variant="outlined"
                                    sx={{ backgroundColor: "#fafafa" }}
                                />
                            </div>
                            <div style={{ width: "100%" }}>
                                <TextField
                                    label="Senha"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    fullWidth
                                    required
                                    variant="outlined"
                                    sx={{ backgroundColor: "#fafafa" }}
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
                                    }}
                                    disabled={loading}
                                >
                                    {loading ? "Salvando..." : "Salvar Alterações"}
                                </Button>
                            </div>
                        </div>
                    </Paper>
                </Box>
            </Box>
        </>
    );
}
