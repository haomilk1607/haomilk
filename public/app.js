// Các phần tử DOM
const walletInput = document.getElementById('walletAddress');
const searchButton = document.getElementById('searchButton');
const loadingIndicator = document.getElementById('loadingIndicator');
const errorMessage = document.getElementById('errorMessage');
const nftGrid = document.getElementById('nftGrid');
const noNFTMessage = document.getElementById('noNFTMessage');

// Hàm hiển thị loading
function showLoading() {
    loadingIndicator.classList.remove('hidden');
    errorMessage.classList.add('hidden');
    nftGrid.innerHTML = '';
    noNFTMessage.classList.add('hidden');
}

// Hàm ẩn loading
function hideLoading() {
    loadingIndicator.classList.add('hidden');
}

// Hàm hiển thị lỗi
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
    noNFTMessage.classList.add('hidden');
}

// Hàm tạo thẻ NFT
function createNFTCard(nft) {
    const card = document.createElement('div');
    card.className = 'nft-card';

    // Tạo phần tử hình ảnh
    const image = document.createElement('img');
    image.className = 'nft-image';
    image.src = nft.image || '/placeholder.png'; // Sử dụng ảnh placeholder nếu không có ảnh
    image.alt = nft.name;
    image.onerror = function() {
        // Nếu ảnh lỗi, hiển thị ảnh placeholder
        this.src = 'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23f0f0f0"/><text x="50%" y="50%" font-family="Arial" font-size="16" fill="%23999" text-anchor="middle">Không có ảnh</text></svg>';
    };

    // Tạo phần thông tin NFT
    const info = document.createElement('div');
    info.className = 'nft-info';

    const name = document.createElement('div');
    name.className = 'nft-name';
    name.textContent = nft.name;

    const id = document.createElement('div');
    id.className = 'nft-id';
    id.textContent = `Token ID: ${nft.tokenId}`;

    // Ghép các phần tử lại với nhau
    info.appendChild(name);
    info.appendChild(id);
    card.appendChild(image);
    card.appendChild(info);

    return card;
}

// Hàm tìm kiếm NFT
async function searchNFTs() {
    const address = walletInput.value.trim();

    // Kiểm tra địa chỉ ví có được nhập hay không
    if (!address) {
        showError('Vui lòng nhập địa chỉ ví');
        return;
    }

    // Kiểm tra địa chỉ ví có đúng định dạng không
    if (!address.match(/^0x[a-fA-F0-9]{40}$/)) {
        showError('Địa chỉ ví không hợp lệ');
        return;
    }

    showLoading();

    try {
        // Gọi API để lấy danh sách NFT
        const response = await fetch('/api/nfts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ walletAddress: address })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Có lỗi xảy ra khi tìm kiếm NFT');
        }

        // Xóa nội dung cũ
        nftGrid.innerHTML = '';

        // Kiểm tra có NFT không
        if (data.nfts.length === 0) {
            noNFTMessage.classList.remove('hidden');
            return;
        }

        // Hiển thị các NFT
        data.nfts.forEach(nft => {
            const card = createNFTCard(nft);
            nftGrid.appendChild(card);
        });

    } catch (error) {
        showError(error.message);
    } finally {
        hideLoading();
    }
}

// Thêm sự kiện cho nút tìm kiếm
searchButton.addEventListener('click', searchNFTs);

// Thêm sự kiện cho phím Enter trong input
walletInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        searchNFTs();
    }
});