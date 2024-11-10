import React from "react";
import { useState } from "react";
import {
  IconButton,
  Typography,
  Box,
  TextField,
  Button,
  MenuItem,
  InputAdornment,
  Modal,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Swal from "sweetalert2";

export default function NewUsersModal({ closeEvent, refreshUser }) {
  const [type_of_acess, setTypeOfAccess] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_ps, setConfirmPs] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

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

  const handleValidation = () => {
    let newErrors = {
      name: !name,
      password: !password || !validatePassword(password),
      confirm_ps: !confirm_ps || confirm_ps !== password,
      email: !email || !validateEmail(email),
      telefone: !telefone || telefone.length < 19, // Valida se telefone possui 19 caracteres
      type_of_acess: !type_of_acess,
      status: !status,
    };
    setErrors(newErrors);
  
    // Verifica se há algum erro
    return !Object.values(newErrors).includes(true);
  };

  const createUser = async () => {
    if (!handleValidation()) {
      Swal.fire("Erro!", "Verifique os campos obrigatórios.", "error");
      return;
    }

    const response = await fetch("http://localhost:5000/cadastroUser", {
      method: "POST",
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
      Swal.fire("Criado com sucesso!", "Seu usuário foi adicionado.", "success");
      refreshUser(); // Atualiza a lista de produtos
      closeEvent();
    } else {
      Swal.fire("Erro!", "Não foi possível adicionar o usuário.", "error");
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

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    // Valida o e-mail e atualiza os erros
    if (value === "" || validateEmail(value)) {
      setErrors({ email: false });
    } else {
      setErrors({ email: true });
    }
  };

  const validateEmail = (value) => {
    // Expressão regular para validar o formato de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    // Valida a senha e atualiza os erros
    if (value === "" || validatePassword(value)) {
      setErrors({ password: false });
    } else {
      setErrors({ password: true });
    }
  };
  const validatePassword = (value) => {
    return (
      value.length >= 8 
    );
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

  // const formatPhone = (value) => {
  //   // Remove tudo que não é número
  //   value = value.replace(/\D/g, "");

  //   // Aplica a formatação do telefone no padrão: +00 (00) 00000-0000
  //   return value
  //     .replace(/^(\d{2})(\d)/g, "+$1 $2") // Adiciona o código do país
  //     .replace(/(\d{2})(\d)/, "($1) $2") // Adiciona o DDD entre parênteses
  //     .replace(/(\d{5})(\d)/, "$1-$2"); // Adiciona o hífen no meio do número
  // };

  // const handleChangePhone = (e) => {
  //   const formattedPhone = formatPhone(e.target.value);
  //   setTelefone(formattedPhone);
  //   const { value } = event.target;
  //   const numericValue = value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
  //   if (numericValue.length <= 12) {
  //     setTelefone(numericValue); // Atualiza apenas se tiver até 13 números
  //   }
  // };
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
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 1100,
          bgcolor: "background.paper",
          overflowY: "auto",
          outline: "none",
          boxShadow: 20,
          borderRadius: "5px",
          p: 3,
          "&::-webkit-scrollbar": {
            width: "0px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "transparent",
          },
        }}
      >
        <Typography id="modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
          Novo Usuário
          <IconButton
            style={{ position: "absolute", right: 8, top: 8 }}
            onClick={closeEvent}
          >
            <CloseIcon />
          </IconButton>
        </Typography>
        
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: "0.9em",
          }}
        >
          <div style={{ gridColumn: "1 / span 2" }}>
            <TextField
              required
              label="Nome do Usuário"
              variant="outlined"
              size="small"
              fullWidth
              error={errors.name}
              helperText={errors.name && "Campo obrigatório"}
              onChange={(e) => setName(e.target.value)}
              value={name}
              inputProps={{ maxLength: 50 }} // Limite de 50 caracteres para o nome
            />
          </div>
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
            value={password}
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
            onChange={(e) => setConfirmPs(e.target.value)}
            value={confirm_ps}
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
            placeholder="email@email.com"
            variant="outlined"
            error={errors.email}
            helperText={errors.email && "Campo Obrigatório"}
            onChange={handleEmailChange}
            value={email}
            inputProps={{ maxLength: 40 }} // Limite de 50 caracteres para o email

          />
          <TextField
            required
            margin="dense"
            id="user-phone"
            name="telefone"
            label="Telefone"
            type="tel"
            placeholder="+xx (xx) xxxxx-xxxx"
            fullWidth
            variant="outlined"
            error={errors.telefone}
            helperText={errors.telefone && "Campo Obrigatório"}
            onChange={handleChangePhone}
            value={telefone}
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
