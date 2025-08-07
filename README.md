## 🚀 Fitur

- ✅ Multi-wallet (banyak wallet dalam satu run)
- ⚡ Mint dilakukan **secara paralel (tanpa delay)**
- 🔐 Menggunakan private key langsung (jangan dibagikan!)
- 📦 Ringan, hanya menggunakan `ethers` dan `dotenv`

---

## 📦 Instalasi

1. **Clone repo / salin script**:
   ```bash
   git clone https://github.com/erwindo98/nft.git
   cd nft
2. Install dependencies:
   ```bash
   npm install ethers dotenv
3. Buat file .env:
   ```bash
   RPC_URL=https://rpc-url-here  # Ganti sesuai chain
   CONTRACT_ADDRESS=0xYourContractAddress  # Ganti sesuai contract adrress nft
   MINT_PRICE=0.01  # Ganti sesuai harga mint (ETH/MATIC/BASE)
   MINT_AMOUNT=1  # Ganti sesuai limit wallet/claim

   # Ganti dengan private key evm dan pastikan dengan koma (suport multi wallet)
   PRIVATE_KEYS=0xabc...,0xdef...,0xghi...
4. Menjalankan Script:
   ```bash
   node mint.js

✅ Output Contoh:
   ```bash
[2025-08-08T17:41:02.123Z] ========== MINT SESSION: 08/08/2025, 17:41:02 ==========
[1] TX Sent - 0x1234...abcd - 0xabc123txhash...
[1] ✅ Mint Success - Block 1234567
[2] SKIPPED - Low balance: 0x5678...efgh
[3] ❌ ERROR - Attempt 1: replacement fee too low
[3] ❌ ERROR - Attempt 2: nonce too low
[3] ✅ Mint Success - Block 1234569


