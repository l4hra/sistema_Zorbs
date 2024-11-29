import React from "react";
import styles from "../Login/Login.module.css";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import zorbs from "../../assets/ZORBS.png";

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const navigate = useNavigate(); // Para redirecionar após login bem-sucedido

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(""); // Limpa o erro ao tentar novamente

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao fazer login.");
      }

      // Sucesso: Armazene o token JWT no localStorage
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      navigate("/home"); // Redireciona para o dashboard
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className={styles.bc}>
        <img src={zorbs} alt="esquilo" width={400} />
        <div className={styles.texts}>
          <h1 style={{ marginBottom: "2rem", marginTop: "2rem" }}>Login</h1>
          <div className={styles.secondBox}>
            <div>
              <form onSubmit={handleLogin}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email">E-mail:</InputLabel>
                  <TextField
                    required
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <InputLabel htmlFor="password">Senha:</InputLabel>
                  <OutlinedInput
                    id="password"
                    required
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />

                  {error && (
                    <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
                  )}

                  <Button type="submit" style={{ marginTop: "2rem" }}>
                    Login
                  </Button>
                </Stack>
              </form>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  marginTop: "20px",
                }}
              >
                <Link style={{ color: "black" }}>Esqueceu sua senha?</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
