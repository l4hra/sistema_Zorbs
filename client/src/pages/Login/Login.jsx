import React from "react";
import styles from "../Login/Login.module.css";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import zorbs from "../../../public/assets/ZORBS.png";

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div className={styles.bc}>
        <img src={zorbs} alt="esquilo" width={400} />
        <div className={styles.texts}>
          <h1 style={{ marginBottom: "2rem", marginTop: "2rem" }}>Login</h1>
          <div className={styles.secondBox}>
            <div>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  const formData = new FormData(event.currentTarget);
                  const formJson = Object.fromEntries(formData.entries());
                  alert(JSON.stringify(formJson));
                }}
              >
                <Stack spacing={1}>
                  <InputLabel htmlFor="outlined-adornment-password">
                    E-mail:
                  </InputLabel>
                  <TextField required id="outlined-required" />
                  <InputLabel htmlFor="outlined-adornment-password">
                    Senha:
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    required
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          onMouseUp={handleMouseUpPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
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
