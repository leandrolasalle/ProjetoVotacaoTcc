# Blockchain Para Voto: Sistema de Votação Descentralizada

[![Solidity](https://img.shields.io/badge/Solidity-^0.8.28-blue)](https://soliditylang.org/)
[![Hardhat](https://img.shields.io/badge/Hardhat-^2.26.3-yellow)](https://hardhat.org/)
[![Ethers](https://img.shields.io/badge/Ethers-^6.15.0-purple)](https://ethers.org/)

## 📋 Sobre o Projeto

Sistema de votação descentralizada baseado em blockchain, desenvolvido como Trabalho de Conclusão de Curso (TCC). O sistema permite a realização de votações seguras, transparentes e imutáveis, onde cada voto é registrado permanentemente na blockchain.

### 🎯 Características Principais

- ✅ **Votação descentralizada** - sem autoridade central controlando os votos
- ✅ **Imutabilidade** - votos não podem ser alterados ou removidos
- ✅ **Transparência** - qualquer pessoa pode verificar os resultados
- ✅ **Prevenção de voto duplicado** - cada e-mail pode votar apenas uma vez
- ✅ **Interface amigável** - frontend simples e intuitivo
- ✅ **30 candidatos** - suporte para até 30 candidatos simultâneos

## 🏗️ Arquitetura do Sistema
```text
┌─────────────────────────────────────────────────────────────┐
│                  Frontend (HTML/CSS/JS)                     │
│                  http://localhost:3000                      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   MetaMask (Wallet)                         │
│              Conecta usuário à blockchain                   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              Blockchain Local (Hardhat)                     │
│                 http://localhost:8545                       │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │           Smart Contract: Voting.sol                │    │
│  │  - Registrar votos                                  │    │
│  │  - Consultar candidatos                             │    │
│  │  - Apurar resultados                                │    │
│  │  - Impedir voto duplicado                           │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Tecnologias Utilizadas

| Tecnologia | Versão | Finalidade |
|:---|:---:|:---|
| **Solidity** | ^0.8.28 | Linguagem do smart contract |
| **Hardhat** | ^2.26.3 | Framework de desenvolvimento blockchain |
| **Ethers.js** | ^6.15.0 | Interação com a blockchain |
| **MetaMask** | - | Carteira digital e provedor Web3 |
| **JavaScript/HTML/CSS** | - | Frontend da aplicação |

## 📦 Pré-requisitos

Antes de começar, você vai precisar ter instalado:

- [Node.js](https://nodejs.org/) (versão 20.x LTS recomendada)
- [MetaMask](https://metamask.io/) (extensão do navegador)

## 🔧 Instalação e Configuração do Sistema de Votação


### 1. Entre no diretório do projeto
```bash
cd blockchainpravoto
```

### 2. Instale as dependências do Hardhat
```bash
npm install
```

### 3. Compile o smart contract
```bash
npx hardhat clean
npx hardhat compile
```
Deverá aparecer:
```bash
Compiled 1 Solidity file successfully
```

### 4. Inicie a blockchain local
```bash
# Terminal 1 - Mantenha este rodando
npx hardhat node
```

### 5. Faça o deploy do contrato
```bash
# Terminal 2 - Após o hardhat node estar rodando
npx hardhat run scripts/deploy.js --network localhost
```

Guarde o endereço do contrato que será exibido:
```bash
Voting deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

### 6. Configure o MetaMask
#### Adicionar rede local:
- Abra o MetaMask
- Clique na rede atual → "Add Network" → "Add a network manually"
```
Network Name: Hardhat Local

New RPC URL: http://localhost:8545

Chain ID: 1337

Currency Symbol: ETH
```

#### Importar conta (opcional, mas recomendado):
Copie a chave privada de uma conta do terminal npx hardhat node
No MetaMask: "Import Account" → cole a chave privada

### 7. Configure o frontend
Verifique se o endereço do contrato no frontend/app.js está correto:
```javascript
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
```

### 8. Execute o frontend
```bash
# Terminal 3
cd frontend
npm install
npm start
```

Acesse: http://localhost:3000

## 🗳️ Como Usar

Fluxo de uma votação:
### 1. Conecte sua carteira
- Clique em "Conectar Carteira"
- Autorize a conexão no MetaMask
### 2. Escolha um candidato
- Selecione entre os 30 candidatos disponíveis
- Registre seu e-mail
- Digite um e-mail que ainda não realizou voto (usado para evitar voto duplicado)

### 3. Confirme o voto

- Clique em "Enviar Voto"

- Confirme a transação no MetaMask

### 4. Acompanhe os resultados
A lista de votos é atualizada automaticamente

## 🧪 Testando o Sistema

### Voto bem-sucedido:
- Conectar carteira
- Digitar e-mail teste@exemplo.com
- Escolher candidato "00 - Candidato 01"
- Confirmar transação
- Verificar que o voto foi adicionado

### Impedimento de voto duplicado:
- Tentar votar novamente com o mesmo e-mail
- O contrato deve rejeitar com erro: "Este e-mail ja votou"

## 📁 Estrutura do Projeto
```text
blockchainpravoto/
├── contracts/
│   └── Voting.sol                 # Smart contract principal
├── frontend/
│   ├── app.js                     # Lógica do frontend
│   ├── index.html                 # Interface HTML
│   ├── package.json               # Dependências do frontend
│   └── style.css                  # Estilos CSS
├── scripts/
│   └── deploy.js                  # Script de deploy
├── test/                          # Testes automatizados
├── hardhat.config.js              # Configuração do Hardhat
└── package.json                   # Dependências
```

## 🔄 Comandos Úteis
| Comando | Descrição |
|:---|:---:|
| npx hardhat compile | Compila os smart contracts |
| npx hardhat node | Inicia blockchain local |
| npx hardhat test | Executa testes |
| npx hardhat clean | Limpa compilações anteriores |
| npx hardhat console --network localhost | Console interativo |
| npx hardhat run scripts/deploy.js --network localhost | Deploy do contrato |

## ⚠️ Solução de Problemas Comuns

### Erro: "Insufficient funds"
- Importe uma conta do Hardhat no MetaMask
- Ou transfira ETH de uma conta Hardhat para sua carteira

### Erro: "MetaMask not detected"
- Instale a extensão MetaMask no navegador

### Erro: "Network does not exist"
- Adicione a rede http://localhost:8545 no MetaMask com Chain ID 1337

### Erro na compilação
```bash
npx hardhat clean
npx hardhat compile
```

## 🎨 Versão de Apresentação

Além da implementação completa com blockchain, o repositório também conta com uma **apresentação** (`blockchain_apresentacao/`) que contém uma interface para visualizar uma explicação da tese do TCC de forma visual e interativa, além de uma simulação visual do fluxo do sistema real.

### Como rodar a versão de apresentação
```bash
# Entre na pasta
cd blockchain_apresentacao

# Instale as dependências
npm install

# Configure as variáveis de ambiente (arquivo .env)
# VITE_SUPABASE_URL=sua_url_do_supabase
# VITE_SUPABASE_ANON_KEY=sua_chave_anonima

# Rode o projeto
npm run dev
```
Acesse: http://localhost:5173

### Diferenças entre as versões
| Característica | Versão Blockchain (`blockchainpravoto`) | Versão Apresentação (`blockchain_apresentacao`) |
|:---|:---|:---|
| **Blockchain real** | ✅ Sim (Hardhat + MetaMask) | ❌ Não (simulação) |
| **Votos imutáveis** | ✅ Sim | ❌ Não |
| **Tecnologia principal** | Solidity / Hardhat | React / Supabase |
| **Carteira digital** | MetaMask obrigatório | Não necessário |
| **Framework frontend** | HTML/JS puro | React + TypeScript |
| **Banco de dados** | Blockchain (local) | Supabase (nuvem/local) |
| **Finalidade** | Implementação completa do TCC | Demonstração da interface |

### Tecnologias da versão de apresentação

| Tecnologia | Finalidade |
|:---|:---|
| **React + TypeScript** | Interface moderna e tipada |
| **Vite** | Build rápido e desenvolvimento ágil |
| **Supabase** | Banco de dados e autenticação em tempo real |
| **CSS3** | Estilização da interface |

### Estrutura da pasta de apresentação

```text
blockchain_apresentacao/
├── components/          # Componentes React reutilizáveis
├── controllers/         # Lógica de controle (useAppController)
├── hooks/               # Hooks personalizados (useLocalStorage)
├── models/              # Camada de dados (VotingService)
├── App.tsx              # Componente principal
├── index.html           # HTML base
├── supabaseClient.ts    # Configuração do Supabase
├── types.ts             # Tipos TypeScript
└── vite.config.ts       # Configuração do Vite
```

## 🎓 Conclusão
### Este projeto demonstra a viabilidade de sistemas de votação baseados em blockchain, combinando:
- Imutabilidade para garantir a integridade dos votos
- Transparência para permitir auditoria pública
- Descentralização para eliminar autoridade central

## 👨‍💻 Autores
Paulo Ricardo Tebet Lyrio / Leandro Santos Teixeira
