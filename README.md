# NFT Viewer - BASE Mainnet

Ứng dụng web đơn giản để xem danh sách NFT của một ví trên mạng BASE Mainnet. Dự án này được thiết kế để giúp học sinh trung học tìm hiểu về blockchain và NFT.

## Tính năng

- Nhập địa chỉ ví để xem danh sách NFT
- Hiển thị NFT dưới dạng lưới với hình ảnh và thông tin
- Giao diện thân thiện, dễ sử dụng
- Xử lý lỗi và hiển thị thông báo phù hợp

## Yêu cầu hệ thống

- Node.js (phiên bản 14.0.0 trở lên)
- NPM (Node Package Manager)

## Cài đặt

1. Clone repository này về máy của bạn:
```bash
git clone <repository-url>
cd nft-viewer
```

2. Cài đặt các dependencies:
```bash
npm install
```

3. Tạo tài khoản Alchemy và lấy API key:
   - Truy cập [Alchemy](https://www.alchemy.com/)
   - Đăng ký tài khoản mới
   - Tạo một ứng dụng mới cho mạng BASE Mainnet
   - Sao chép API key

4. Cấu hình môi trường:
   - Tạo file `.env` từ file `.env.example`
   - Thêm API key Alchemy vào file `.env`:
```env
ALCHEMY_API_KEY=your_api_key_here
PORT=3000
```

## Chạy ứng dụng

1. Khởi động server:
```bash
npm start
```

2. Mở trình duyệt và truy cập:
```
http://localhost:3000
```

## Cách sử dụng

1. Nhập địa chỉ ví Ethereum vào ô tìm kiếm (bắt đầu bằng '0x')
2. Nhấn nút "Tìm kiếm NFT" hoặc nhấn Enter
3. Đợi kết quả hiển thị
4. Xem thông tin NFT trong lưới

## Giải thích code

### Frontend (public/index.html, public/styles.css, public/app.js)

- **index.html**: Cấu trúc trang web với các phần tử HTML cần thiết
- **styles.css**: Định dạng giao diện, làm cho ứng dụng đẹp mắt và dễ sử dụng
- **app.js**: Xử lý tương tác người dùng và hiển thị dữ liệu

### Backend (server.js)

- Sử dụng Express.js để tạo server
- Kết nối với blockchain thông qua Alchemy API
- Truy vấn smart contract để lấy thông tin NFT
- Xử lý lỗi và trả về kết quả cho frontend

## Lưu ý

- Đảm bảo bạn có đủ credit trong tài khoản Alchemy
- Không chia sẻ API key của bạn với người khác
- Địa chỉ ví phải là địa chỉ Ethereum hợp lệ

## Tài nguyên học tập

- [Tài liệu về Ethereum](https://ethereum.org/)
- [Tài liệu về NFT](https://ethereum.org/nft/)
- [Tài liệu Alchemy](https://docs.alchemy.com/)
- [Tài liệu ethers.js](https://docs.ethers.org/)

## Đóng góp

Mọi đóng góp đều được hoan nghênh! Hãy tạo issue hoặc pull request nếu bạn muốn cải thiện dự án.