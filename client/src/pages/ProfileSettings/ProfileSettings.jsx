import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import Sidenav from "../../components/Sidenav";
import Navbar from "../../components/Navbar";
import Swal from "sweetalert2";

function ProfileSettings() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSaveChanges = () => {
        if (password !== confirmPassword) {
            Swal.fire({
                icon: "error",
                title: "Erro!",
                text: "As senhas não coincidem.",
                confirmButtonText: "OK",
            });
            return;
        }

        Swal.fire({
            icon: "success",
            title: "Sucesso!",
            text: "Alterações salvas com sucesso.",
            confirmButtonText: "OK",
        });
        
        console.log("Alterações salvas:", { name, email, phone, password });
    };

    return (
        <>
            <Box component="main" sx={{p: 5 }}>
                <Navbar />
                <Box height={30} />
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "calc(100vh - 120px)" }}>
                    <Sidenav />
                    <Box
                        component="main"
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 2,
                            maxWidth: 400,
                            width: "100%",
                            p: 2,
                            boxShadow: 2,
                            borderRadius: 2,
                        }}
                    >
                        <Typography variant="h4" gutterBottom>
                            Alterar Senha
                        </Typography>
                        <Box
                            component="form"
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                                width: "100%",
                            }}
                        >
                            {/* <TextField
                                label="Nome"
                                variant="outlined"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                fullWidth
                            />
                            <TextField
                                label="E-mail"
                                variant="outlined"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                fullWidth
                            />
                            <TextField
                                label="Telefone"
                                variant="outlined"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                fullWidth
                            /> */}
                            <TextField
                                label="Nova Senha"
                                variant="outlined"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                fullWidth
                            />
                            <TextField
                                label="Confirmar Nova Senha"
                                variant="outlined"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                fullWidth
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSaveChanges}
                            >
                                Salvar Alterações
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default ProfileSettings;
