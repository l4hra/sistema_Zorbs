# Sistema Zorbs

![ZORBS](https://github.com/user-attachments/assets/88cf699e-26b0-49b1-bf11-7250d8b4b4dd)

## Sobre o Projeto

**Sistema Zorbs** é uma aplicação online criada para ajudar sorveterias a gerenciar suas comandas de forma eficiente e prática. O sistema oferece funcionalidades como:

- Organização simplificada das comandas.
- Relatórios detalhados e acessíveis.
- Interface moderna e amigável.

Este sistema foi desenvolvido por **Igor Stein**, **Lahara de Souza** e **Luiz Felipe Xavier Bizio**.

---

## Tecnologias Utilizadas

- **Frontend**: [React.js](https://reactjs.org/) com o framework [MUI](https://mui.com/)
- **Backend**: [Node.js](https://nodejs.org/)
- **Linguagem**: JavaScript
- **Banco de Dados**: [MySQL](https://www.mysql.com/)

---

## Funcionalidades

1. Cadastro de produtos e comandas.
2. Gerenciamento de comandas ativas e finalizadas.
3. Relatórios de vendas diários, semanais e mensais.
4. Painel de controle intuitivo com gráficos.
5. Integração em tempo real para atualização de dados.

---

## Como Executar o Projeto

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas no seu computador:
- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)
- Gerenciador de pacotes: [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/).

### Passos para Instalação

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/seuusuario/sistema-zorbs.git
   cd sistema-zorbs
2. **Inste as dependências**:
   ```bash
   npm install
3. **Inicie o Frontend**:
   ```bash
   npm run dev
4. **Configure e Inicie o Backend**:
   - Acesse o diretório do servidor:
     ```bash
     cd servidor/
   - Instale as dependências do servidor:
     ```bash
     npm install
   - Inicie as APIs:
     ```bash
     npm run servidor
5. **Configure o Banco de Dados**:
   - No MySQL, crie um banco de dados com o nome **zorbs**:
     ```sql
     CREATE DATABASE db_zorbs;
   - Certifique-se de que o arquivo **conexão.js** contém as credenciais do banco:
     ```makefile
     import mysql from "mysql2/promise";
     const conexao = mysql.createPool({
          host: 'localhost',
          user: 'seu_usuario',
          password: 'sua_senha',
          database: 'db_zorbs',
          waitForConnections: true,
          connectionLimit: 10,
          queueLimit: 0
     });
     export default conexao;
6. **Execute o Caso de Uso**:
   - Siga o caso de uso disponibilizado no repositório para configurar o banco de dados e carregar as tabelas iniciais.
7. **Acesse o Sistema**:
   - Abra o navegador em http://localhost:5000.
  
---

### Contribuição
Contribuições são bem-vindas! Para contribuir:

1. **Faça um fork do repositório.**
2. **Crie uma nova branch para a funcionalidade**:
   ```bash
   git checkout -b feature/nova-funcionalidade
3. **Envie suas alterações**:
   ```bash
   git push origin feature/nova-funcionalidade
4. **Abra um Pull Request.**

---

### Licença
Este projeto é licenciado sob a MIT License.

---

**Desenvolvido com 💻 e 🍦 por Igor Stein, Lahara de Souza e Luiz Felipe Xavier Bizio.**
