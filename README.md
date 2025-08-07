## 🚀 Fitur

- ✅ Multi-wallet (banyak wallet dalam satu run)
- ⚡ Mint dilakukan **secara paralel (tanpa delay)**
- 🔐 Menggunakan private key langsung (jangan dibagikan!)
- 📦 Ringan, hanya menggunakan `ethers` dan `dotenv`

---

## 📦 Instalasi

1. **Clone repo / salin script**:
   ```bash
   git clone https://github.com/kamu/nft.git
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
⚙️ Konfigurasi Variabel	Deskripsi: 
RPC_URL	URL RPC node (infura, alchemy, dll)
CONTRACT_ADDRESS	Alamat kontrak NFT/token yang memiliki fungsi mint(uint256)
MINT_PRICE	Harga mint per NFT dalam ETH (desimal, bukan wei)
MINT_AMOUNT	Jumlah NFT yang akan dimint per wallet
PRIVATE_KEYS	Daftar private key wallet yang dipisahkan dengan koma

✅ Output Contoh:
   ```bash
   [1] Wallet: 0x123...abcd
[1] Tx sent! Hash: 0xabc123...
[1] ✅ Mint success! Block: 1234567

[2] Wallet: 0x456...efgh
[2] Tx sent! Hash: 0xdef456...
[2] ✅ Mint success! Block: 1234568

