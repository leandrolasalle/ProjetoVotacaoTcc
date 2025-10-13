// Substitua pelo endereco impresso no deploy
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";


// ABI minima usada pelo frontend
const CONTRACT_ABI = [
  {"inputs":[{"internalType":"string","name":"email","type":"string"},{"internalType":"uint8","name":"candidateIndex","type":"uint8"}],"name":"vote","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[{"internalType":"uint8","name":"index","type":"uint8"}],"name":"candidateName","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"getCandidates","outputs":[{"internalType":"string[]","name":"out","type":"string[]"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"getAllVotes","outputs":[{"internalType":"uint256[]","name":"out","type":"uint256[]"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"string","name":"email","type":"string"}],"name":"emailHasVoted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"CANDIDATES_COUNT","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"}
];

let provider, signer, contract;

async function connect() {
  if (!window.ethereum) {
    alert("MetaMask nao encontrada");
    return;
  }
  provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  signer = await provider.getSigner();
  contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  document.getElementById("account").textContent = `Conta: ${await signer.getAddress()}`;
}

async function loadCandidates() {
  const sel = document.getElementById("candidate");
  sel.innerHTML = "";
  const names = await contract.getCandidates();
  names.forEach((name, i) => {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = `${i.toString().padStart(2, "0")} - ${name}`;
    sel.appendChild(opt);
  });
}

async function loadResults() {
  const ul = document.getElementById("results");
  ul.innerHTML = "";
  const names = await contract.getCandidates();
  const counts = await contract.getAllVotes();
  names.forEach((name, i) => {
    const li = document.createElement("li");
    li.textContent = `${i.toString().padStart(2, "0")} - ${name}: ${counts[i]} voto(s)`;
    ul.appendChild(li);
  });
}

async function vote() {
  const email = document.getElementById("email").value.trim();
  const idx = parseInt(document.getElementById("candidate").value, 10);
  const status = document.getElementById("status");
  if (!email) {
    status.textContent = "Informe um e-mail valido.";
    return;
  }
  try {
    status.textContent = "Enviando transacao...";
    const tx = await contract.vote(email, idx);
    await tx.wait();
    status.textContent = "Voto confirmado!";
    await loadResults();
  } catch (err) {
    console.error(err);
    status.textContent = `Falha ao votar: ${err.message || err}`;
  }
}

document.getElementById("connectBtn").addEventListener("click", async () => {
  await connect();
  await loadCandidates();
  await loadResults();
});

document.getElementById("voteBtn").addEventListener("click", vote);
