import { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidenav from "../../components/Sidenav";
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
} from "@mui/material";
import Swal from "sweetalert2";

function AddUserZorbs({ closeEvent, refreshEmpresas }) {
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
    const [RUA, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");
    const [complemento, setComplemento] = useState("");
    const [observacoes, setObservacoes] = useState("");

    const [errors, setErrors] = useState({
        CNPJ: false,
        razao_social: false,
        nome_fantasia: false,
        inscricao_estadual: false,
        email: false,
        telefone: false,
        senha_acesso: false,
        data_abertura: false,
        tipo_pessoa: false,
        tipo_plano: false,
        status: false,
        CEP: false,
        RUA: false,
        numero: false,
        bairro: false,
        cidade: false,
        estado: false,
    });
    
    const createEmpresa = async () => {
        if (!handleValidation()) {
            return;
        }

        const response = await fetch("http://localhost:5002/empresas", {
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
                RUA,
                numero,
                bairro,
                cidade,
                estado,
                complemento,
                observacoes,
            }),
        });

        if (response.ok) {
            Swal.fire("Cadastrada com sucesso!", "Empresa foi adicionado.", "success");
            refreshEmpresas(); // Atualiza a lista de produtos
            closeEvent();
        } else {
            Swal.fire("Erro!", "Não foi possível cadastra empresa.", "error");
        }
    };

    const handleValidation = () => {
        let newErrors = {
            CNPJ: !CNPJ,
            razao_social: !razao_social,
            nome_fantasia: !nome_fantasia,
            inscricao_estadual: !inscricao_estadual,
            email: !email,
            telefone: !telefone,
            senha_acesso: !senha_acesso,
            data_abertura: !data_abertura,
            tipo_pessoa: !tipo_pessoa,
            tipo_plano: !tipo_plano,
            status: !status,
            CEP: !CEP,
            RUA: !RUA,
            numero: !numero,
            bairro: !bairro,
            cidade: !cidade,
            estado: !estado,
        };
        setErrors(newErrors);
    
        // Verifica se há algum erro
        return !Object.values(newErrors).includes(true);
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
            <div className='content' style={{ overflow: "hidden", width: "100%" }}>
                <Navbar />

                <Box height={70} />

                <Box sx={{ display: "flex" }}>
                    <Sidenav />

                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <Paper sx={{ width: "100%", overflow: "hidden", padding: "15px" }}>
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
                                }}
                            >
                                <div style={{ width: "300px" }}>
                                    <TextField
                                        required
                                        label="CNPJ"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        error={errors.CNPJ}
                                        helperText={errors.CNPJ && "Campo obrigatório"}
                                        onChange={(e) => setCnpj(e.target.value)}
                                        value={CNPJ}
                                    />
                                </div>
                                <div style={{ width: "350px" }}>
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
                                <div style={{ width: "350px" }}>
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
                                <div style={{ width: "350px" }}>
                                    <TextField
                                        required
                                        label="Inscrição Estadual"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        error={errors.inscricao_estadual}
                                        helperText={errors.inscricao_estadual && "Campo obrigatório"}
                                        onChange={(e) => setInscricao_estadual(e.target.value)}
                                        value={inscricao_estadual}
                                    />
                                </div>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    // justifyContent: "",
                                    // alignItems: "center",
                                    // marginBottom: 2,
                                    // paddingLeft: "16px",
                                    // paddingRight: "16px",
                                    padding: "18px",
                                    marginTop: "10px",
                                    gap: "105px",
                                }}
                            >
                                <div style={{ width: "400px" }}>
                                    <TextField
                                        required
                                        label="E-mail"
                                        type="email"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        error={errors.email}
                                        helperText={errors.email && "Campo obrigatório"}
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                    />
                                </div>
                                <div style={{ width: "400px" }}>
                                    <TextField
                                        required
                                        label="Telefone"
                                        type="tel"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        error={errors.telefone}
                                        helperText={errors.telefone && "Campo obrigatório"}
                                        onChange={(e) => setTelefone(e.target.value)}
                                        value={telefone}
                                    />
                                </div>
                                <div style={{ width: "400px" }}>
                                    <TextField
                                        required
                                        label="Senha de acesso"
                                        type="password"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        error={errors.senha_acesso}
                                        helperText={errors.senha_acesso && "Campo obrigatório"}
                                        onChange={(e) => setSenha_acesso(e.target.value)}
                                        value={senha_acesso}
                                    />
                                </div>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    // justifyContent: "",
                                    // alignItems: "center",
                                    // marginBottom: 2,
                                    // paddingLeft: "16px",
                                    // paddingRight: "16px",
                                    padding: "18px",
                                    paddingTop: "10px",
                                    gap: "20px",
                                }}
                            >
                                <div style={{ width: "300px" }}>
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
                                <div style={{ width: "350px", marginTop: "25px" }}>
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
                                <div style={{ width: "350px", marginTop: "25px" }}>
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
                                <div style={{ width: "350px", marginTop: "25px" }}>
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
                                <div style={{ width: "300px" }}>
                                    <TextField
                                        required
                                        label="CEP"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        error={errors.CEP}
                                        helperText={errors.CEP && "Campo obrigatório"}
                                        onChange={(e) => setCep(e.target.value)}
                                        value={CEP}
                                    />
                                </div>
                                <div style={{ width: "605px" }}>
                                    <TextField
                                        required
                                        label="Rua / Endereço"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        error={errors.RUA}
                                        helperText={errors.RUA && "Campo obrigatório"}
                                        onChange={(e) => setRua(e.target.value)}
                                        value={RUA}
                                    />
                                </div>
                                <div style={{ width: "300px" }}>
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
                                <div style={{ width: "400px" }}>
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
                                <div style={{ width: "400px" }}>
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
                                <div style={{ width: "400px" }}>
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
                                        required
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
                                    onClick={createEmpresa}
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
                                    onClick={closeEvent}
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
            </div>
        </>
    )
}

export default AddUserZorbs