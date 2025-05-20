require('dotenv').config();
const express = require('express');
const path = require('path');
const { ethers } = require('ethers');

const app = express();
const port = process.env.PORT || 3000;

// Phục vụ các file tĩnh từ thư mục public
app.use(express.static('public'));
app.use(express.json());

// ABI tối thiểu cho việc truy vấn NFT
const minimalNFTABI = [
    "function balanceOf(address owner) view returns (uint256)",
    "function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)",
    "function tokenURI(uint256 tokenId) view returns (string)"
];

// Địa chỉ hợp đồng NFT
const NFT_CONTRACT_ADDRESS = '0x0e381cd73faa421066dc5e2829a973405352168c';

// Endpoint để lấy danh sách NFT của một địa chỉ ví
app.post('/api/nfts', async (req, res) => {
    try {
        const { walletAddress } = req.body;

        // Kiểm tra địa chỉ ví hợp lệ
        if (!ethers.isAddress(walletAddress)) {
            return res.status(400).json({ error: 'Địa chỉ ví không hợp lệ' });
        }

        // Kết nối đến mạng BASE Mainnet thông qua Alchemy
        const provider = new ethers.JsonRpcProvider(`https://base-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`, {
            chainId: 8453,
            name: 'base',
            ensAddress: null
        });
        
        // Tạo instance của hợp đồng
        const nftContract = new ethers.Contract(NFT_CONTRACT_ADDRESS, minimalNFTABI, provider);

        // Lấy số lượng NFT của ví
        const balance = await nftContract.balanceOf(walletAddress);
        const tokenCount = Number(balance);

        if (tokenCount === 0) {
            return res.json({ nfts: [] });
        }

        // Lấy thông tin của từng NFT
        const nfts = [];
        for (let i = 0; i < tokenCount; i++) {
            try {
                const tokenId = await nftContract.tokenOfOwnerByIndex(walletAddress, i);
                const tokenURI = await nftContract.tokenURI(tokenId);

                // Lấy metadata từ tokenURI
                let metadata = {};
                try {
                    const response = await fetch(tokenURI);
                    metadata = await response.json();
                } catch (error) {
                    console.error(`Lỗi khi lấy metadata cho token ${tokenId}:`, error);
                    metadata = {
                        name: `NFT #${tokenId}`,
                        image: ''
                    };
                }

                nfts.push({
                    tokenId: tokenId.toString(),
                    name: metadata.name || `NFT #${tokenId}`,
                    image: metadata.image || ''
                });
            } catch (error) {
                console.error(`Lỗi khi lấy thông tin cho token index ${i}:`, error);
            }
        }

        res.json({ nfts });
    } catch (error) {
        console.error('Lỗi server:', error);
        res.status(500).json({ error: 'Lỗi khi truy vấn NFT' });
    }
});

// Route mặc định trả về trang chủ
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});