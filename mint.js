require("dotenv").config();
const fs = require("fs");
const { ethers } = require("ethers");

const RPC_URL = process.env.RPC_URL;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const MINT_PRICE = parseFloat(process.env.MINT_PRICE);
const MINT_AMOUNT = parseInt(process.env.MINT_AMOUNT);
const PRIVATE_KEYS = process.env.PRIVATE_KEYS.split(",").map(k => k.trim());

const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

const abi = [
  "function mint(uint256 _count) public payable"
];

const MAX_RETRIES = 3; // jumlah percobaan ulang saat transaksi mint gagal
const ENABLE_BATCH_DELAY = false; // ubah ke true jika perlu delay antar batch
const BATCH_DELAY_MS = 3000;

// Fungsi delay
const delay = ms => new Promise(res => setTimeout(res, ms));

// Log ke file
function logToFile(message) {
  fs.appendFileSync("mint.log", `[${new Date().toISOString()}] ${message}\n`);
}

// Fungsi mint untuk 1 wallet
async function mintWithWallet(pk, index, attempt = 1) {
  const wallet = new ethers.Wallet(pk, provider);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, wallet);
  const walletIndex = index + 1;

  const mintValue = ethers.utils.parseEther((MINT_PRICE * MINT_AMOUNT).toString());

  console.log(`\n[${walletIndex}] 🔑 Wallet: ${wallet.address}`);

  try {
    const balance = await wallet.getBalance();

    if (balance.lt(mintValue)) {
      console.log(`[${walletIndex}] ❌ Saldo kurang (${ethers.utils.formatEther(balance)} ETH)`);
      logToFile(`[${walletIndex}] SKIPPED - Low balance: ${wallet.address}`);
      return;
    }

    const tx = await contract.mint(MINT_AMOUNT, {
      value: mintValue,
      gasLimit: 300000
    });

    console.log(`[${walletIndex}] ⛏️  Tx sent: ${tx.hash}`);
    logToFile(`[${walletIndex}] TX Sent - ${wallet.address} - ${tx.hash}`);

    const receipt = await tx.wait();
    console.log(`[${walletIndex}] ✅ Mint sukses! Block: ${receipt.blockNumber}`);
    logToFile(`[${walletIndex}] ✅ Mint Success - Block ${receipt.blockNumber}`);
  } catch (err) {
    const message = err?.message || err.toString();
    console.error(`[${walletIndex}] ❌ Gagal: ${message}`);
    logToFile(`[${walletIndex}] ❌ ERROR - Attempt ${attempt}: ${message}`);

    // Retry jika masih bisa
    if (attempt < MAX_RETRIES) {
      console.log(`[${walletIndex}] 🔁 Retry attempt ${attempt + 1}...`);
      await delay(2000);
      return mintWithWallet(pk, index, attempt + 1);
    }
  }
}

// Fungsi utama
async function runParallelMint() {
  console.log(`🚀 Memulai mint ${MINT_AMOUNT} NFT dari ${PRIVATE_KEYS.length} wallet...`);
  logToFile(`\n========== MINT SESSION: ${new Date().toLocaleString()} ==========`);

  const promises = PRIVATE_KEYS.map((pk, i) => {
    return ENABLE_BATCH_DELAY
      ? delay(i * BATCH_DELAY_MS).then(() => mintWithWallet(pk, i))
      : mintWithWallet(pk, i);
  });

  await Promise.all(promises);

  console.log("\n🎉 Semua proses selesai!");
  logToFile(`✅ Mint selesai untuk semua wallet.\n`);
}

runParallelMint();
