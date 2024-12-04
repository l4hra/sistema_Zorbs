import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import toast from "react-hot-toast";
import zorbs from "../../assets/ZORBS.png";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errorForgot, setErrorForgot] = useState("");
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const navigate = useNavigate();

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
      localStorage.setItem("id", data.user.id);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      navigate("/home"); // Redireciona para o dashboard
    } catch (error) {
      setError(error.message);
    }
  };

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    setErrorForgot("");

    try {
      const response = await fetch("http://localhost:5000/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: forgotPasswordEmail }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao recuperar a senha.");
      }

      toast.success("A senha foi enviada para o seu e-mail.", {
        position: "bottom-left",
        duration: 5000,
      });
      setForgotPasswordEmail("");
      setIsForgotPassword(false);
    } catch (errorForgot) {
      setErrorForgot(errorForgot.message);
    }
  };

  return (
    <>
      <div className={styles.bc}>
        <img src={zorbs} alt="esquilo" width={400} />
        <div className={styles.texts}>
          <h1 style={{ marginBottom: "2rem", marginTop: "2rem" }}>
            {isForgotPassword ? "Recuperar Senha" : "Login"}
          </h1>
          <div className={styles.secondBox}>
            <div>
              <form onSubmit={isForgotPassword ? handleForgotPassword : handleLogin}>
                <Stack spacing={1}>
                  {isForgotPassword ? (
                    <>
                      <InputLabel htmlFor="email">E-mail:</InputLabel>
                      <TextField
                        required
                        id="email"
                        type="email"
                        value={forgotPasswordEmail}
                        sx={{ width: "400px"}}
                        onChange={(e) => setForgotPasswordEmail(e.target.value)}
                      />
                      {errorForgot && <p style={{ color: "red" }}>{errorForgot}</p>}
                      <Button type="submit" style={{ marginTop: "2rem" }}>
                        Enviar Senha
                      </Button>
                    </>
                  ) : (
                    <>
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
                      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
                      <Button type="submit" style={{ marginTop: "2rem" }}>
                        Login
                      </Button>
                    </>
                  )}
                </Stack>
              </form>
              {!isForgotPassword && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    marginTop: "20px",
                  }}
                >
                  <Link
                    style={{ color: "black", cursor: "pointer" }}
                    onClick={() => setIsForgotPassword(true)}
                  >
                    Esqueceu sua senha?
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
