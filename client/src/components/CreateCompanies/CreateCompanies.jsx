import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Sidenav from "../Sidenav";
import {
    Typography,
    Box,
    TextField,
    Button,
    MenuItem,
    InputAdornment,
    Paper,
    FormControl,
    FormLabel,
    IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Swal from "sweetalert2";


export default function CreateCompanies() {
    const navigate = useNavigate();
    const [CNPJ, setCnpj] = useState("");
    const [razao_social, setRazao_social] = useState("");
    const [nome_fantasia, setNome_fantasia] = useState("");
    const [inscricao_estadual, setInscricao_estadual] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [senha_acesso, setSenha_acesso] = useState("");
    const [data_abertura, setData_abertura] = useState("");
    const [tipo_pessoa, setTipo_pessoa] = useState("");
    const [tipo_plano, setTipo_plano] = useState("");
    const [status, setStatus] = useState("");
    const [CEP, setCep] = useState("");
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");
    const [complemento, setComplemento] = useState("");
    const [observacoes, setObservacoes] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    
    const createCompanies = async () => {
        if (!handleValidation()) {
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/createCompanies", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    CNPJ,
                    razao_social,
                    nome_fantasia,
                    inscricao_estadual,
                    email,
                    telefone,
                    senha_acesso,
                    data_abertura,
                    tipo_pessoa,
                    tipo_plano,
                    status,
                    CEP,
                    rua,
                    numero,
                    bairro,
                    cidade,
                    estado,
                    complemento,
                    observacoes,
                }),
            });

            if (response.ok) {
                Swal.fire("Cadastrada com sucesso!", "A empresa foi cadastrada com sucesso.", "success");
                navigate("/Companies");
            } else {
                Swal.fire("Erro!", "Erro ao se conectar com banco de dados" || "Não foi possível cadastrar a empresa.", "error");
            }
        } catch (error) {
            Swal.fire("Erro!", "Houve um problema ao tentar cadastrar a empresa. Tente novamente mais tarde.", "error");
            console.error("Erro ao cadastrar empresa:", error);
        }
    };

    const [errors, setErrors] = useState({
        CNPJ: false,
        razao_social: false,
        nome_fantasia: false,
        email: false,
        telefone: false,
        senha_acesso: false,
        data_abertura: false,
        tipo_pessoa: false,
        tipo_plano: false,
        status: false,
        CEP: false,
        rua: false,
        numero: false,
        bairro: false,
        cidade: false,
        estado: false,
    });

    const handleValidation = () => {
        let newErrors = {
            CNPJ: !CNPJ,
            razao_social: !razao_social,
            nome_fantasia: !nome_fantasia,
            email: !email,
            telefone: !telefone,
            senha_acesso: !senha_acesso,
            data_abertura: !data_abertura,
            tipo_pessoa: !tipo_pessoa,
            tipo_plano: !tipo_plano,
            status: !status,
            CEP: !CEP,
            rua: !rua,
            numero: !numero,
            bairro: !bairro,
            cidade: !cidade,
            estado: !estado,
        };
        setErrors(newErrors);

        // Verifica se há algum erro
        return !Object.values(newErrors).includes(true);
    };

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleCnpjChange = (e) => {
        const value = e.target.value.replace(/\D/g, ''); // Remove qualquer caractere não numérico
        if (value.length <= 11) { // Limita o tamanho máximo do CPF
            setCnpj(formatCPF(value));
            setErrors({ CNPJ: value.length === 0 }); // Verifica se o campo está vazio
        } else if (value.length <= 14) { // Limita o tamanho máximo do CNPJ
            setCnpj(formatCNPJ(value))
            setErrors({ CNPJ: value.length === 0 });
        }
    };

    const formatCNPJ = (value) => {
        // Formata o CNPJ no padrão: 00.000.000/0000-00
        return value
            .replace(/^(\d{2})(\d)/, '$1.$2')
            .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
            .replace(/\.(\d{3})(\d)/, '.$1/$2')
            .replace(/(\d{4})(\d)/, '$1-$2');
    };

    const formatCPF = (value) => {
        return value
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{2})$/, '$1-$2');
    }

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);

        // Valida o e-mail e atualiza os erros
        if (value === '' || validateEmail(value)) {
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

    const formatPhone = (value) => {
        // Aplica a formatação do telefone no padrão: +00 (00) 00000-0000
        return value
            .replace(/^(\d{2})(\d)/g, '+$1 $2') // Adiciona o código do país
            .replace(/(\d{2})(\d)/, '($1) $2') // Adiciona o DDD entre parênteses
            .replace(/(\d{5})(\d)/, '$1-$2'); // Adiciona o hífen no meio do número
    };

    const handleChangePhone = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        if (value.length <= 15) {
            setTelefone(formatPhone(value));
            setErrors({ telefone: value.length === 0 });
        }
        
    };

    const handleChangeIncricao = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        if (value.length <= 11) {
            setInscricao_estadual(value);
        }
    };

    const handleBuscarCep = async (cep) => {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            if (data.erro) {
                setErrors((prevErrors) => ({ ...prevErrors, CEP: true }));
            } else {
                setRua(data.logradouro || '');
                setBairro(data.bairro || '');
                setCidade(data.localidade || '');
                setEstado(data.uf || '');
                setComplemento(data.complemento || '');
                setErrors((prevErrors) => ({ ...prevErrors, CEP: false }));
            }
        } catch (error) {
            console.error('Erro ao consultar o CEP:', error);
            setErrors((prevErrors) => ({ ...prevErrors, CEP: true }));
        }
    };

    const handleCepChange = (e) => {
        let valor = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
        
        if (valor.length > 8) {
            valor = valor.slice(0, 8);
        }

        setCep(valor);

        // Verifica se o CEP tem 8 dígitos para buscar automaticamente
        if (valor.length === 8 ) {
            handleBuscarCep(valor);
        } else {
            // Limpa os campos se o CEP for apagado ou incompleto
            setRua('');
            setBairro('');
            setCidade('');
            setEstado('');
            setComplemento('');
        }
    };

    const tipo_pessoas = [
        { value: "Pessoa Juridica", label: "Pessoa Juridica" },
        { value: "Pessoa Fisica", label: "Pessoa Fisica" },
    ];

    const tipo_planos = [
        { value: "Plano Bronze", label: "Plano Bronze" },
        { value: "Plano Prata", label: "Plano Prata" },
        { value: "Plano Ouro", label: "Plano Ouro" },
    ];

    const tipo_status = [
        { value: "Ativo", label: "Ativo" },
        { value: "Desativado", label: "Desativado" },
    ];

    return (
        <>
            <Navbar />

            <Box height={70} />

            <Box sx={{ display: "flex" }}>
                <Sidenav />

                <Box component="main" sx={{ width: "100%", overflow: "hidden", padding: "16px" }}>
                    <Paper sx={{ width: "100%", overflow: "hidden", padding: "15px", boxShadow: "0px 0px 3px 0px rgba(0,0,0,0.50)" }}>
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            sx={{
                                paddingLeft: "16px",
                                paddingBottom: "10px",
                                fontWeight: "bold",
                            }}
                        >
                            Cadastrar nova empresa
                        </Typography>

                        <Box height={10} />

                        {/* Cadastro informações empresa */}
                        <Box
                            sx={{
                                display: "flex",
                                padding: "18px",
                                gap: "20px",
                                width: "100%",
                            }}
                        >
                            <div style={{ width: "100%" }}>
                                <TextField
                                    required
                                    label="CPF | CNPJ"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.CNPJ}
                                    helperText={errors.CNPJ && "Campo obrigatório"}
                                    onChange={handleCnpjChange}
                                    value={CNPJ}
                                />
                            </div>
                            <div style={{ width: "100%" }}>
                                <TextField
                                    required
                                    label="Nome Fantasia"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.nome_fantasia}
                                    helperText={errors.nome_fantasia && "Campo obrigatório"}
                                    onChange={(e) => setNome_fantasia(e.target.value)}
                                    value={nome_fantasia}
                                />
                            </div>
                            <div style={{ width: "100%" }}>
                                <TextField
                                    required
                                    label="Razão Social"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.razao_social}
                                    helperText={errors.razao_social && "Campo obrigatório"}
                                    onChange={(e) => setRazao_social(e.target.value)}
                                    value={razao_social}
                                />
                            </div>
                            <div style={{ width: "100%" }}>
                                <TextField
                                    label="Inscrição Estadual"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.inscricao_estadual}
                                    onChange={handleChangeIncricao}
                                    value={inscricao_estadual}
                                />
                            </div>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                padding: "18px",
                                marginTop: "10px",
                                gap: "105px",
                            }}
                        >
                            <div style={{ width: "100%" }}>
                                <TextField
                                    required
                                    label="E-mail"
                                    type="email"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.email}
                                    helperText={errors.email && "Campo obrigatório ou formato inválido"}
                                    onChange={handleEmailChange}
                                    value={email}
                                />
                            </div>
                            <div style={{ width: "100%" }}>
                                <TextField
                                    required
                                    label="Telefone"
                                    type="tel"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.telefone}
                                    helperText={errors.telefone && "Campo obrigatório"}
                                    onChange={handleChangePhone}
                                    value={telefone}
                                    placeholder="+55 (11) 99999-9999"
                                /> 
                            </div>
                            <div style={{ width: "100%" }}>
                                <TextField
                                    required
                                    label="Senha de acesso"
                                    type={showPassword ? "text" : "password"}
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.senha_acesso}
                                    helperText={errors.senha_acesso && "Campo obrigatório"}
                                    onChange={(e) => setSenha_acesso(e.target.value)}
                                    value={senha_acesso}
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
                            </div>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                padding: "18px",
                                paddingTop: "10px",
                                gap: "20px",
                            }}
                        >
                            <div style={{ width: "100%" }}>
                                <FormControl fullWidth variant="outlined" size="small">
                                    <FormLabel style={{ marginBottom: "3px" }}>Data de Abertura</FormLabel>
                                    <TextField
                                        id="data-abertura"
                                        type="date"
                                        required
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        error={errors.data_abertura}
                                        helperText={errors.data_abertura && "Campo obrigatório"}
                                        onChange={(e) => setData_abertura(e.target.value)}
                                        value={data_abertura}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </FormControl>
                            </div>
                            <div style={{ width: "100%", marginTop: "25px" }}>
                                <TextField
                                    required
                                    label="Tipo de Pessoa"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    select
                                    error={errors.tipo_pessoa}
                                    helperText={errors.tipo_pessoa && "Campo obrigatório"}
                                    onChange={(e) => setTipo_pessoa(e.target.value)}
                                    value={tipo_pessoa}
                                >
                                    {tipo_pessoas.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div style={{ width: "100%", marginTop: "25px" }}>
                                <TextField
                                    required
                                    label="Tipo do plano"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    select
                                    error={errors.tipo_plano}
                                    helperText={errors.tipo_plano && "Campo obrigatório"}
                                    onChange={(e) => setTipo_plano(e.target.value)}
                                    value={tipo_plano}
                                >
                                    {tipo_planos.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div style={{ width: "100%", marginTop: "25px" }}>
                                <TextField
                                    required
                                    label="Status"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    select
                                    error={errors.status}
                                    helperText={errors.status && "Campo obrigatório"}
                                    onChange={(e) => setStatus(e.target.value)}
                                    value={status}
                                >
                                    {tipo_status.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                        </Box>

                        {/* Cadastro endereço empresa */}
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            sx={{
                                paddingTop: "50px",
                                paddingLeft: "16px",
                                fontWeight: "bold",
                            }}
                        >
                            Endereço
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                padding: "18px",
                                gap: "100px",
                            }}
                        >
                            <div style={{ width: "100%" }}>
                                <TextField
                                    required
                                    label="CEP"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.CEP}
                                    helperText={errors.CEP && "Campo obrigatório ou CEP inexistente"}
                                    onChange={handleCepChange}
                                    value={CEP}
                                />
                            </div>
                            <div style={{ width: "100%" }}>
                                <TextField
                                    required
                                    label="Rua / Endereço"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.rua}
                                    helperText={errors.rua && "Campo obrigatório"}
                                    onChange={(e) => setRua(e.target.value)}
                                    value={rua}
                                />
                            </div>
                            <div style={{ width: "100%" }}>
                                <TextField
                                    required
                                    label="Numero"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.numero}
                                    helperText={errors.numero && "Campo obrigatório"}
                                    onChange={(e) => setNumero(e.target.value)}
                                    value={numero}
                                />
                            </div>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                padding: "18px",
                                gap: "105px",
                            }}
                        >
                            <div style={{ width: "100%" }}>
                                <TextField
                                    required
                                    label="Bairro"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.bairro}
                                    helperText={errors.bairro && "Campo obrigatório"}
                                    onChange={(e) => setBairro(e.target.value)}
                                    value={bairro}
                                />
                            </div>
                            <div style={{ width: "100%" }}>
                                <TextField
                                    required
                                    label="Cidade"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.cidade}
                                    helperText={errors.cidade && "Campo obrigatório"}
                                    onChange={(e) => setCidade(e.target.value)}
                                    value={cidade}
                                />
                            </div>
                            <div style={{ width: "100%" }}>
                                <TextField
                                    required
                                    label="Estado"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.estado}
                                    helperText={errors.estado && "Campo obrigatório"}
                                    onChange={(e) => setEstado(e.target.value)}
                                    value={estado}
                                />
                            </div>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                padding: "18px",
                                gap: "105px",
                            }}
                        >
                            <div style={{ width: "100%" }}>
                                <TextField
                                    label="Complemento"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.complemento}
                                    helperText={errors.complemento && "Campo obrigatório"}
                                    onChange={(e) => setComplemento(e.target.value)}
                                    value={complemento}
                                />
                            </div>
                        </Box>

                        <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            sx={{
                                paddingTop: "20px",
                                paddingLeft: "16px",
                                fontWeight: "bold",
                            }}
                        >
                            Informações Gerais
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                padding: "18px",
                                gap: "105px",
                            }}
                        >
                            <div style={{ width: "100%" }} >
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Observação"
                                    multiline
                                    rows={4}
                                    sx={{ width: "100%" }}
                                    fullWidth
                                    error={errors.observacoes}
                                    onChange={(e) => setObservacoes(e.target.value)}
                                    value={observacoes}
                                />
                            </div>
                        </Box>

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                marginTop: "24px",
                                gap: "50px",
                            }}
                        >
                            <Button
                                variant="contained"
                                onClick={createCompanies}
                                sx={{
                                    backgroundColor: "#1976d2",
                                    "&:hover": {
                                        backgroundColor: "#115293",
                                    },
                                }}
                            >
                                Cadastrar
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    navigate("/companies");
                                }}
                                sx={{
                                    backgroundColor: "#1976d2",
                                    "&:hover": {
                                        backgroundColor: "#115293",
                                    },
                                }}
                            >
                                Cancelar
                            </Button>
                        </div>
                    </Paper>
                </Box>
            </Box>
        </>
    )
}