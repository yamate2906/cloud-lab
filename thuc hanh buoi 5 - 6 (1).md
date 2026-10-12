# BUỔI 5. TRIỂN KHAI ỨNG DỤNG MERN MULTI-CONTAINER LÊN CLOUD PAAS (RENDER.COM)

**Thời lượng:** 300 phút (5 giờ)  
**Môi trường:** Máy tính cá nhân, VS Code, Trình duyệt Web, Render.com Dashboard  
**Ứng dụng:** Tiếp tục ứng dụng Quản lý sinh viên của Buổi 4  
**Database:** MongoDB Atlas Free Tier  
**Công nghệ:** Docker, Docker Hub, Cloud PaaS (Render.com), Environment Variables, CORS, Node.js/Express, React, Git/GitHub  

---

### Mục tiêu
Sau khi hoàn thành buổi thực hành, sinh viên có khả năng:
1. Hiểu khái niệm và ưu điểm của mô hình Cloud PaaS (Platform as a Service) so với IaaS (AWS EC2).
2. Tạo và quản lý tài khoản Cloud PaaS miễn phí trên Render.com không cần thẻ tín dụng.
3. Liên kết Render.com với Docker Hub Registry để triển khai Web Service từ Docker Image.
4. Triển khai Express Backend Container từ Docker Hub lên Render.
5. Cấu hình các Biến môi trường (Environment Variables) an toàn trên Cloud cho Backend.
6. Kết nối thành công Backend Container trên Render với Cloud Database MongoDB Atlas.
7. Triển khai React Frontend Container từ Docker Hub lên Render.
8. Cấu hình biến môi trường Frontend để kết nối tới URL Backend API trên Cloud.
9. Chẩn đoán và xử lý triệt để lỗi CORS (Cross-Origin Resource Sharing) giữa Frontend và Backend trên môi trường Production.
10. Thực hiện đầy đủ các thao tác CRUD sinh viên trên ứng dụng MERN triển khai thực tế trên Cloud.
11. Hiểu cơ chế "Cold Start" và cách đọc System/Runtime Logs trên Cloud PaaS.
12. Quản lý source code và lưu trữ cấu hình triển khai an toàn trên GitHub.

---

### Kết quả cần đạt
Cuối buổi, sinh viên xây dựng và triển khai thành công ứng dụng MERN trên Cloud PaaS theo mô hình:

```text
Trình duyệt Người dùng (Client Browser)
           │
           ├───► Render Frontend Service (React Container)
           │          │
           │          │ (HTTPS REST API Call)
           │          ▼
           └───► Render Backend Service (Node.js/Express Container)
                      │
                      │ (MongoDB Wire Protocol)
                      ▼
               MongoDB Atlas (Cloud Database)
```

Đồng thời, quản lý thành công các liên kết triển khai:
- **GitHub Repository:** `https://github.com/<github-username>/cloud-lab`
- **Docker Hub Repositories:** `<dockerhub-username>/mern-backend:1.0` và `<dockerhub-username>/mern-frontend:2.0`
- **Render Backend Web Service:** `https://mern-backend-<student-id>.onrender.com`
- **Render Frontend Web Service:** `https://mern-frontend-<student-id>.onrender.com`

---

### PHẦN 1. KHỞI TẠO TÀI KHOẢN CLOUD PAAS RENDER.COM VÀ KẾT NỐI DOCKER HUB
**Thời gian dự kiến: 30 phút**

**Câu 1.** Mở trình duyệt web và truy cập vào trang chủ của dịch vụ Cloud PaaS Render. *(Gợi ý: Truy cập `https://render.com`)*  
**Câu 2.** Đăng ký tài khoản Render mới bằng cách liên kết trực tiếp với tài khoản GitHub cá nhân đã dùng từ Buổi 1. *(Gợi ý: Chọn **GET STARTED FOR FREE** → **Sign in with GitHub**)*  
**Câu 3.** Xác nhận ủy quyền quyền truy cập (Authorize Render) cho tài khoản GitHub và hoàn tất thông tin đăng ký. *(Gợi ý: Kiểm tra hộp thư Email để xác nhận tài khoản nếu có yêu cầu)*  
**Câu 4.** Mở Bảng điều khiển quản trị (Render Dashboard) và quan sát giao diện làm việc chính. *(Gợi ý: Quan sát mục **Web Services**, **Static Sites**, **PostgreSQL**, **Redis**)*  
**Câu 5.** Mở tab mới trên trình duyệt và đăng nhập vào tài khoản Docker Hub đã tạo ở Buổi 4. *(Gợi ý: Truy cập `https://hub.docker.com`)*  
**Câu 6.** Kiểm tra 2 Repository Docker Image đã lưu trên Docker Hub từ Buổi 4. *(Gợi ý: Xác nhận có `<dockerhub-username>/mern-backend` và `<dockerhub-username>/mern-frontend`)*  
**Câu 7.** Kiểm tra trạng thái của các Repository trên Docker Hub để đảm bảo đang ở chế độ **Public**. *(Gợi ý: Kiểm tra nhãn Public kế bên tên Repository)*  
**Câu 8.** Kiểm tra các Thẻ phiên bản (Tags) hiện có của Image `mern-backend`. *(Gợi ý: Mở tab **Tags** trong Repository `mern-backend`, xác nhận có tag `1.0`)*  
**Câu 9.** Kiểm tra các Thẻ phiên bản (Tags) hiện có của Image `mern-frontend`. *(Gợi ý: Mở tab **Tags** trong Repository `mern-frontend`, xác nhận có tag `1.0` và `2.0`)*  
**Câu 10.** Lấy đường link công khai của 2 Docker Hub Repository để chuẩn bị cấu hình trên Render. *(Gợi ý: Đường link dạng `https://hub.docker.com/r/<username>/mern-backend`)*  

**Mục tiêu phần này:** Sinh viên thiết lập thành công tài khoản Cloud PaaS Render.com hoàn toàn miễn phí và sẵn sàng kết nối với các Docker Image lưu trên Docker Hub Registry.

---

### PHẦN 2. TRIỂN KHAI BACKEND CONTAINER TỪ DOCKER HUB LÊN RENDER
**Thời gian dự kiến: 60 phút**

**Câu 11.** Tại Render Dashboard, tiến hành tạo một dịch vụ web mới. *(Gợi ý: Chọn button **New +** ở góc trên phải → Chọn **Web Service**)*  
**Câu 12.** Chọn phương thức triển khai bằng Docker Image có sẵn thay vì build từ GitHub Source Code. *(Gợi ý: Chọn tùy chọn **Deploy an existing image from a registry**)*  
**Câu 13.** Nhập đường dẫn Docker Image Backend từ Docker Hub vào ô **Image URL**. *(Gợi ý: Nhập `docker.io/<dockerhub-username>/mern-backend:1.0` hoặc `<dockerhub-username>/mern-backend:1.0`)*  
**Câu 14.** Nhấn **Next** để chuyển sang trang cấu hình chi tiết cho Web Service Backend. *(Gợi ý: Render sẽ kiểm tra tính tồn tại của Docker Image trên Docker Hub)*  
**Câu 15.** Đặt tên cho Web Service Backend. *(Gợi ý: Đặt tên theo cú pháp `mern-backend-<mssv>` để tránh trùng lặp tên miền)*  
**Câu 16.** Chọn Vùng địa lý (Region) cho máy chủ triển khai. *(Gợi ý: Chọn **Singapore (Southeast Asia)** hoặc **Oregon (US West)** để tối ưu tốc độ)*  
**Câu 17.** Chọn Nhánh/Môi trường thực thi (Instance Type). *(Gợi ý: Chọn gói **Free** - \$0/month với 0.1 CPU, 512 MB RAM)*  
**Câu 18.** Cấu hình Port nội bộ mà Container Backend đang lắng nghe. *(Gợi ý: Tại mục **Advanced** → Tìm **Internal Port**, nhập `5000`)*  
**Câu 19.** Bỏ qua các bước build lệnh rườm rà vì Image đã được đóng gói hoàn chỉnh từ Dockerfile ở Buổi 3 & 4. *(Gợi ý: Render tự động nhận diện chỉ thị `CMD` trong Docker Image)*  
**Câu 20.** Nhấn **Create Web Service** để bắt đầu quá trình khởi tạo và kéo (pull) Docker Image từ Docker Hub về Cloud PaaS. *(Gợi ý: Quan sát màn hình Log tiến trình triển khai)*  
**Câu 21.** Mở tab **Logs** trên Render Dashboard để theo dõi toàn bộ nhật ký khởi chạy của Backend Container. *(Gợi ý: Tìm các dòng log `Pulling image...`, `Extracting...`, `Server running on port 5000`)*  
**Câu 22.** Xác định đường link công khai (Public URL) do Render tự động cấp cho Backend Service. *(Gợi ý: Quan sát đường link ngay bên dưới tên Service, dạng `https://mern-backend-<mssv>.onrender.com`)*  
**Câu 23.** Sao chép Public URL của Backend và mở trên tab mới của trình duyệt. *(Gợi ý: Truy cập `https://mern-backend-<mssv>.onrender.com/api/hello`)*  
**Câu 24.** Kiểm tra phản hồi từ API `/api/hello`. *(Gợi ý: Xác nhận trình duyệt trả về JSON xác nhận Backend đang chạy)*  
**Câu 25.** Truy cập endpoint `/api/students` trên trình duyệt để kiểm tra thử. *(Gợi ý: Truy cập `https://mern-backend-<mssv>.onrender.com/api/students`, quan sát log xem kết nối Database đã hoạt động chưa)*  

**Mục tiêu phần này:** Sinh viên triển khai thành công Web Service Backend chạy từ Docker Hub Image lên hạ tầng Cloud PaaS và lấy được Public URL HTTPS.

---

### PHẦN 3. CẤU HÌNH BIẾN MÔI TRƯỜNG VÀ KẾT NỐI MONGODB ATLAS TRÊN CLOUD
**Thời gian dự kiến: 45 phút**

**Câu 26.** Mở lại trang quản trị MongoDB Atlas đã tạo ở Buổi 2 trên trình duyệt. *(Gợi ý: Truy cập `https://cloud.mongodb.com`)*  
**Câu 27.** Kiểm tra danh sách IP được phép truy cập (Network Access) trong MongoDB Atlas. *(Gợi ý: Chọn **Security** → **Network Access**)*  
**Câu 28.** Đảm bảo MongoDB Atlas đã mở quyền truy cập từ mọi địa chỉ IP (`0.0.0.0/0`) để cho phép máy chủ Cloud PaaS kết nối vào. *(Gợi ý: Chọn **Add IP Address** → **Allow Access from Anywhere**)*  
**Câu 29.** Lấy lại chuỗi kết nối MongoDB Connection String dành cho Node.js driver. *(Gợi ý: Chọn **Database** → **Connect** → **Drivers** → Sao chép chuỗi `mongodb+srv://...`)*  
**Câu 30.** Quay lại Render Dashboard, truy cập vào Web Service Backend `mern-backend-<mssv>`. *(Gợi ý: Chọn mục **Environment** ở menu bên trái)*  
**Câu 31.** Tạo biến môi trường mới tên `MONGODB_URI`. *(Gợi ý: Chọn **Add Environment Variable** → Key: `MONGODB_URI`)*  
**Câu 32.** Dán chuỗi MongoDB Connection String đã thay thế mật khẩu thật vào ô Value của `MONGODB_URI`. *(Gợi ý: Đảm bảo điền đúng username, password và tên database `cloud_lab`)*  
**Câu 33.** Tạo thêm biến môi trường `PORT` với giá trị `5000`. *(Gợi ý: Key: `PORT`, Value: `5000`)*  
**Câu 34.** Tạo biến môi trường `NODE_ENV` với giá trị `production`. *(Gợi ý: Key: `NODE_ENV`, Value: `production`)*  
**Câu 35.** Nhấn **Save Changes** để Render lưu các biến môi trường và tự động khởi động lại (Redeploy) Backend Container. *(Gợi ý: Quan sát dòng thông báo `Environment updated. Redeploying...`)*  
**Câu 36.** Mở tab **Logs** của Backend Service trên Render và theo dõi tiến trình khởi động lại. *(Gợi ý: Tìm dòng log xác nhận thành công `Connected to MongoDB Atlas successfully`)*  
**Câu 37.** Mở lại đường link `https://mern-backend-<mssv>.onrender.com/api/students` trên trình duyệt. *(Gợi ý: Kiểm tra xem API đã trả về mảng danh sách sinh viên JSON từ MongoDB Atlas chưa)*  
**Câu 38.** Sử dụng công cụ cURL hoặc Postman kiểm tra gửi một Request GET tới API Backend trên Cloud. *(Gợi ý lệnh: `curl https://mern-backend-<mssv>.onrender.com/api/students`)*  

**Mục tiêu phần này:** Sinh viên bảo mật thông tin kết nối bằng cách truyền biến môi trường trên Cloud PaaS Dashboard và kết nối thành công Backend Container với MongoDB Atlas.

---

### PHẦN 4. TRIỂN KHAI FRONTEND CONTAINER VÀ CẤU HÌNH API ENDPOINT
**Thời gian dự kiến: 60 phút**

**Câu 39.** Tại Render Dashboard, nhấn **New +** → Chọn **Web Service** để tiến hành triển khai Frontend Service. *(Gợi ý: Chọn **Deploy an existing image from a registry**)*  
**Câu 40.** Nhập URL Docker Image Frontend phiên bản 2.0 đã đóng gói ở Buổi 4 vào ô **Image URL**. *(Gợi ý: Nhập `<dockerhub-username>/mern-frontend:2.0`)*  
**Câu 41.** Nhấn **Next** để đi đến trang cấu hình cho Frontend Service. *(Gợi ý: Render sẽ kiểm tra và xác nhận Image tồn tại trên Docker Hub)*  
**Câu 42.** Đặt tên cho Web Service Frontend. *(Gợi ý: Đặt tên `mern-frontend-<mssv>`)*  
**Câu 43.** Chọn Region cùng vùng với Backend Service (Singapore hoặc Oregon). *(Gợi ý: Chọn cùng Region để tối ưu độ trễ)*  
**Câu 44.** Chọn gói tài nguyên **Free** (\$0/month). *(Gợi ý: Chọn gói Free Tier tương tự Backend)*  
**Câu 45.** Cấu hình Internal Port cho Frontend Container. *(Gợi ý: Tại mục **Advanced** → **Internal Port**, nhập `4173` hoặc `80` tùy theo port Nginx/Vite preview trong Dockerfile Frontend)*  
**Câu 46.** Nhấn **Create Web Service** và mở tab **Logs** để theo dõi quá trình kéo Image và khởi chạy Frontend Container. *(Gợi ý: Đợi đến khi log hiển thị `Your service is live`)*  
**Câu 47.** Lấy Public URL của Frontend Service do Render cấp. *(Gợi ý: Đường link dạng `https://mern-frontend-<mssv>.onrender.com`)*  
**Câu 48.** Mở Public URL Frontend trên trình duyệt để kiểm tra giao diện ứng dụng Quản lý sinh viên. *(Gợi ý: Quan sát xem giao diện React có tải thành công không)*  
**Câu 49.** Nhấn phím **F12** trên trình duyệt để mở Developer Tools → Chọn tab **Console** và **Network**. *(Gợi ý: Quan sát xem có các dòng thông báo lỗi màu đỏ hay không)*  
**Câu 50.** Nhận diện nguyên nhân màn hình chưa hiển thị dữ liệu sinh viên. *(Gợi ý: Do Frontend ở local đang gọi tới `localhost:5000` hoặc chưa biết URL Backend trên Render)*  
**Câu 51.** Truy cập vào mục **Environment** của Frontend Service `mern-frontend-<mssv>` trên Render Dashboard. *(Gợi ý: Chọn **Add Environment Variable**)*  
**Câu 52.** Khai báo biến môi trường `VITE_API_URL` với giá trị là Public URL của Backend Service đã lấy ở Phần 2. *(Gợi ý: Key: `VITE_API_URL`, Value: `https://mern-backend-<mssv>.onrender.com` - lưu ý không có dấu `/` ở cuối)*  
**Câu 53.** Nhấn **Save Changes** để Render lưu cấu hình và redeploy lại Frontend Container. *(Gợi ý: Theo dõi log để đảm bảo Frontend khởi chạy lại thành công)*  

**Mục tiêu phần này:** Sinh viên triển khai thành công React Frontend lên Cloud PaaS và cấu hình biến môi trường kết nối đến Backend API trên Cloud.

---

### PHẦN 5. THỰC HÀNH XỬ LÝ LỖI CORS VÀ QUẢN LÝ BẢO MẬT PRODUCTION
**Thời gian dự kiến: 45 phút**

**Câu 54.** Mở lại ứng dụng Frontend trên trình duyệt (`https://mern-frontend-<mssv>.onrender.com`) và mở Developer Tools (F12) → Tab **Console**. *(Gợi ý: Quan sát dòng lỗi: `Access to fetch at 'https://mern-backend...' from origin 'https://mern-frontend...' has been blocked by CORS policy`)*  
**Câu 55.** Phân tích bản chất kỹ thuật của lỗi CORS (Cross-Origin Resource Sharing). *(Gợi ý: Do trình duyệt chặn các request AJAX/Fetch giữa 2 domain khác nhau khi Backend chưa khai báo cho phép Domain Frontend)*  
**Câu 56.** Mở VS Code trên máy tính cá nhân và truy cập vào source code dự án `cloud-lab` (đã clone từ Buổi 3). *(Gợi ý: Mở file `server/server.js`)*  
**Câu 57.** Kiểm tra đoạn mã cấu hình Middleware `cors()` trong file `server/server.js`. *(Gợi ý: Quan sát cách khai báo package `cors`)*  
**Câu 58.** Cập nhật file `server/server.js` để đọc linh hoạt Domain Frontend được phép từ biến môi trường `CLIENT_URL` hoặc cho phép cấu hình động. *(Gợi ý chỉnh sửa code trong `server/server.js`:)*  
```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Cấu hình CORS linh hoạt cho Production
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(null, true); // Hoặc truyền origin cụ thể
    }
  },
  credentials: true
}));

app.use(express.json());
```  
**Câu 59.** Lưu thay đổi file `server/server.js` và di chuyển vào thư mục `server` trên Terminal local để build lại Docker Image Backend phiên bản `1.1`. *(Gợi ý lệnh: `docker build -t <dockerhub-username>/mern-backend:1.1 ./server`)*  
**Câu 60.** Đăng nhập Docker Hub từ Terminal local nếu cần. *(Gợi ý lệnh: `docker login`)*  
**Câu 61.** Push Docker Image Backend phiên bản `1.1` mới nâng cấp lên Docker Hub. *(Gợi ý lệnh: `docker push <dockerhub-username>/mern-backend:1.1`)*  
**Câu 62.** Quay lại Render Dashboard → Truy cập Web Service Backend `mern-backend-<mssv>`. *(Gợi ý: Chọn **Settings** → **Image URL** → Đổi tag sang `<dockerhub-username>/mern-backend:1.1` → Chọn **Save Changes**)*  
**Câu 63.** Truy cập mục **Environment** của Backend Service và thêm biến môi trường `CLIENT_URL`. *(Gợi ý: Key: `CLIENT_URL`, Value: `https://mern-frontend-<mssv>.onrender.com`)*  
**Câu 64.** Nhấn **Manual Deploy** → Chọn **Deploy latest image** để Render cập nhật Backend Container phiên bản `1.1`. *(Gợi ý: Theo dõi log để đảm bảo container mới chạy ổn định)*  
**Câu 65.** Tải lại trang web Frontend (`https://mern-frontend-<mssv>.onrender.com`) trên trình duyệt và kiểm tra tab Console. *(Gợi ý: Xác nhận dòng lỗi CORS màu đỏ đã hoàn toàn biến mất)*  
**Câu 66.** Kiểm tra danh sách sinh viên đã được React Frontend gọi API và hiển thị thành công lên màn hình. *(Gợi ý: Xác nhận luồng dữ liệu React Frontend → Express Backend → MongoDB Atlas)*  

**Mục tiêu phần này:** Sinh viên hiểu rõ nguyên nhân, cơ chế bảo mật và khắc phục triệt để lỗi CORS giữa các dịch vụ trên môi trường Production Cloud PaaS.

---

### PHẦN 6. KIỂM THỬ TỔNG HỢP VÀ THAO TÁC CRUD TRÊN CLOUD PRODUCTION
**Thời gian dự kiến: 40 phút**

**Câu 67.** Mở ứng dụng Web chính thức trên Cloud tại đường link `https://mern-frontend-<mssv>.onrender.com`. *(Gợi ý: Đảm bảo giao diện tải mượt mà)*  
**Câu 68.** Kiểm tra chức năng **Xem danh sách sinh viên (Read)**. *(Gợi ý: Xác nhận danh sách hiển thị đúng các cột MSSV, Họ tên, Email)*  
**Câu 69.** Thực hiện chức năng **Thêm sinh viên mới (Create)** từ Form trên giao diện React. *(Gợi ý: Nhập MSSV: `SV001`, Họ tên: `Nguyen Van A`, Email: `anguyen@gmail.com` → Nhấn **Thêm sinh viên**)*  
**Câu 70.** Kiểm tra phản hồi trên giao diện ngay sau khi thêm. *(Gợi ý: Danh sách sinh viên tự động cập nhật thêm dòng mới mà không cần F5)*  
**Câu 71.** Mở MongoDB Atlas Dashboard trên tab khác → Vào **Database** → **Browse Collections** → Chọn collection `students`. *(Gợi ý: Xác nhận Document của sinh viên `SV001` đã xuất hiện trong CSDL Cloud)*  
**Câu 72.** Thực hiện thêm tiếp 2 sinh viên mới từ giao diện Web. *(Gợi ý: Thêm `SV002` và `SV003`)*  
**Câu 73.** Thực hiện chức năng **Cập nhật thông tin sinh viên (Update)** đối với sinh viên `SV001`. *(Gợi ý: Đổi tên thành `Nguyen Van A - Updated` → Nhấn **Lưu/Cập nhật**)*  
**Câu 74.** Kiểm tra dữ liệu biến động tương ứng trong MongoDB Atlas. *(Gợi ý: Nhấn Refresh trong MongoDB Atlas để xác nhận trường name đã đổi)*  
**Câu 75.** Thực hiện chức năng **Xóa sinh viên (Delete)** đối với sinh viên `SV003`. *(Gợi ý: Nhấn nút **Xóa** kế bên dòng sinh viên `SV003`)*  
**Câu 76.** Kiểm tra danh sách sinh viên trên Web sau khi xóa. *(Gợi ý: Xác nhận sinh viên `SV003` đã biến mất)*  
**Câu 77.** Mở tab **Logs** của Backend Service trên Render Dashboard đồng thời khi thao tác trên Web. *(Gợi ý: Quan sát các dòng log ghi lại Request HTTP `GET /api/students`, `POST /api/students`, `PUT /api/students/...`, `DELETE /api/students/...`)*  
**Câu 78.** Thực hành kiểm tra hiện tượng **Cold Start** của Render Free Tier bằng cách để ứng dụng không hoạt động trong 15 phút hoặc xem mô tả log. *(Gợi ý: Quan sát trạng thái container chuyển sang Sleep và thời gian khởi động lại khi có request mới)*  
**Câu 79.** Kiểm tra dung lượng RAM và CPU Usage của Backend và Frontend Container trên Render Dashboard. *(Gợi ý: Mở tab **Metrics** trên Render)*  
**Câu 80.** Chụp màn hình giao diện ứng dụng Web chạy trên Render kèm theo bảng điều khiển Render Dashboard để làm bằng chứng thực hành. *(Gợi ý: Chụp rõ thanh địa chỉ URL HTTPS)*  

**Mục tiêu phần này:** Sinh viên kiểm thử toàn bộ các chức năng CRUD của ứng dụng MERN trên hạ tầng Cloud PaaS thực tế và biết cách theo dõi logs/metrics hệ thống.

---

### PHẦN 7. GIT VÀ TỔNG HỢP BÀI THỰC HÀNH BUỔI 5
**Thời gian dự kiến: 20 phút**

**Câu 81.** Mở Terminal tại thư mục dự án `cloud-lab` trên máy local. *(Gợi ý lệnh: `cd cloud-lab`)*  
**Câu 82.** Kiểm tra trạng thái các file đã chỉnh sửa sau Buổi 5. *(Gợi ý lệnh: `git status`)*  
**Câu 83.** Đảm bảo file `.env` chứa mật khẩu MongoDB Atlas **không nằm trong Staging Area**. *(Gợi ý: Kiểm tra file `.gitignore` đã có dòng `.env`)*  
**Câu 84.** Kiểm tra file `.env.example` đã lưu mẫu khai báo biến môi trường không chứa mật khẩu thật. *(Gợi ý: Kiểm tra `.env.example` chứa `MONGODB_URI=`, `PORT=`, `CLIENT_URL=`)*  
**Câu 85.** Đưa toàn bộ mã nguồn cập nhật vào Staging Area. *(Gợi ý lệnh: `git add .`)*  
**Câu 86.** Tạo commit cho kết quả thực hành Buổi 5. *(Gợi ý lệnh: `git commit -m "Complete Lab 05 MERN Cloud PaaS Render Deployment"`) *  
**Câu 87.** Push mã nguồn cập nhật lên GitHub Repository. *(Gợi ý lệnh: `git push origin main`)*  
**Câu 88.** Kiểm tra GitHub Repository trên trình duyệt để xác nhận commit mới đã tải lên thành công. *(Gợi ý: Kiểm tra thư mục `server`, `client` và các file cấu hình)*  
**Câu 89.** Tổng hợp danh sách 4 đường link nộp bài Buổi 5 vào file ghi chú:  
1. **GitHub Repo:** `https://github.com/<username>/cloud-lab`  
2. **Docker Hub Backend:** `https://hub.docker.com/r/<username>/mern-backend`  
3. **Render Backend URL:** `https://mern-backend-<mssv>.onrender.com`  
4. **Render Frontend App URL:** `https://mern-frontend-<mssv>.onrender.com`  
**Câu 90.** Xác nhận hoàn thành toàn bộ bài thực hành Buổi 5 với môi trường Cloud PaaS hoàn toàn miễn phí, an toàn và ổn định. *(Gợi ý: Kiểm tra ứng dụng vẫn truy cập bình thường)*  

**Mục tiêu phần này:** Sinh viên hoàn tất việc đồng bộ mã nguồn lên GitHub và tổng hợp đầy đủ các sản phẩm thực hành Buổi 5.

---
---

# BUỔI 6. QUẢN LÝ PRODUCTION: AUTOMATED DEPLOY (CI/CD), CUSTOM ROUTING, ROLLING UPDATES VÀ MONITORING

**Thời lượng:** 300 phút (5 giờ)  
**Môi trường:** Máy tính cá nhân, VS Code, Trình duyệt Web, Render Dashboard, Docker Hub  
**Ứng dụng:** Tiếp tục ứng dụng Quản lý sinh viên của Buổi 5  
**Database:** MongoDB Atlas Free Tier  
**Công nghệ:** Docker, Docker Hub, Render.com, Deploy Webhooks (CI/CD), API Rewrites / Reverse Proxy, Rolling Updates, SSL/HTTPS, Health Check & Monitoring, Git/GitHub  

---

### Mục tiêu
Sau khi hoàn thành buổi thực hành, sinh viên có khả năng:
1. Hiểu khái niệm và tầm quan trọng của quy trình Tự động hóa Triển khai (Continuous Deployment - CD) trong phát triển phần mềm hiện đại.
2. Cấu hình **Deploy Webhooks** giữa Docker Hub Registry và Render.com Cloud PaaS.
3. Thực hành kịch bản Tự động Deploy (Auto-Deploy): Khi `docker push` Image mới lên Docker Hub, Cloud PaaS tự động cập nhật ứng dụng không cần thao tác tay.
4. Hiểu nguyên lý hoạt động của Reverse Proxy / API Rewrites trên Cloud PaaS để thống nhất Cổng truy cập (Unified Origin).
5. Cấu hình Redirect/Rewrite Rules để định tuyến các request `/api/*` từ Frontend sang Backend tự động.
6. Loại bỏ hoàn toàn việc hardcode URL Backend ở mã nguồn Frontend, tăng tính linh hoạt và bảo mật.
7. Thực hành quy trình cập nhật phiên bản ứng dụng không gián đoạn (Zero-Downtime Rolling Update).
8. Cấu hình bài kiểm tra sức khỏe ứng dụng (Health Check Endpoint) cho các Container trên Cloud.
9. Quản trị chứng chỉ SSL/TLS tự động và hiểu cơ chế bảo mật HTTPS trên Cloud PaaS.
10. Phân tích System Logs, theo dõi chỉ số hiệu năng (Metrics: CPU, RAM, Bandwidth) và chẩn đoán sự cố trên Production.
11. Đánh giá và tổng hợp toàn bộ chuỗi thực hành Điện toán đám mây từ Buổi 1 đến Buổi 6.

---

### Kết quả cần đạt
Cuối buổi, sinh viên nâng cấp hệ thống MERN trên Cloud PaaS đạt chuẩn Production theo mô hình:

```text
                                Quy trình CI/CD Tự động:
Developer (Local) ────► docker push ────► Docker Hub Registry ────► Deploy Webhook ────► Auto-Redeploy Render

                                Mô hình Vận hành Production:
               Trình duyệt Người dùng (Client Browser)
                                  │
                                  │ (HTTPS Port 443 - Standard SSL)
                                  ▼
                     Render Unified Domain Service
                   (https://mern-app-<mssv>.onrender.com)
                                  │
             ┌────────────────────┴────────────────────┐
             │ Rewrites / Internal Reverse Proxy       │
             │                                         │
             ▼                                         ▼
   Frontend Service (React)                  Backend Service (Node.js)
   (Static Assets / Client Routes)           (/api/* -> Express Routes)
                                                       │
                                                       ▼
                                              MongoDB Atlas Database
```

---

### PHẦN 1. ÔN TẬP VÀ KIỂM TRA HỆ THỐNG MERN TRÊN CLOUD PAAS TỪ BUỔI 5
**Thời gian dự kiến: 25 phút**

**Câu 1.** Mở trình duyệt web và truy cập Render Dashboard tại `https://dashboard.render.com`. *(Gợi ý: Đăng nhập bằng tài khoản GitHub)*  
**Câu 2.** Kiểm tra trạng thái hoạt động của 2 Web Service đã tạo ở Buổi 5: `mern-backend-<mssv>` và `mern-frontend-<mssv>`. *(Gợi ý: Xác nhận cả 2 Service đều ở trạng thái **Live**)*  
**Câu 3.** Truy cập ứng dụng Frontend qua Public URL (`https://mern-frontend-<mssv>.onrender.com`). *(Gợi ý: Kiểm tra giao diện hiển thị danh sách sinh viên từ MongoDB Atlas)*  
**Câu 4.** Mở tab **Logs** của Backend Service trên Render để kiểm tra nhật ký kết nối. *(Gợi ý: Xác nhận kết nối MongoDB Atlas vẫn duy trì ổn định)*  
**Câu 5.** Mở Terminal trên máy local, di chuyển vào thư mục dự án `cloud-lab`. *(Gợi ý lệnh: `cd cloud-lab`)*  
**Câu 6.** Kiểm tra branch Git hiện tại và cập nhật code mới nhất từ GitHub nếu có. *(Gợi ý lệnh: `git pull origin main`)*  
**Câu 7.** Kiểm tra phiên bản Docker và đăng nhập lại Docker Hub trên máy local. *(Gợi ý lệnh: `docker login`)*  
**Câu 8.** Kiểm tra các Docker Image hiện có trên máy local. *(Gợi ý lệnh: `docker images`)*  
**Câu 9.** Kiểm tra 2 Repository `mern-backend` và `mern-frontend` trên Docker Hub Dashboard. *(Gợi ý: Xác nhận các Tag `1.0`, `1.1`, `2.0` đã lưu đầy đủ)*  
**Câu 10.** Xác định mục tiêu nâng cấp của Buổi 6: Tự động hóa triển khai (CD), thống nhất Domain qua API Rewrites, Rolling Update và Monitoring. *(Gợi ý: Nắm rõ lộ trình thực hành 300 phút)*  

**Mục tiêu phần này:** Sinh viên kiểm tra và đảm bảo toàn bộ hạ tầng Cloud PaaS và Docker Registry từ Buổi 5 sẵn sàng cho các bài thực hành nâng cao ở Buổi 6.

---

### PHẦN 2. CẤU HÌNH TỰ ĐỘNG HÓA TRIỂN KHAI (CI/CD) QUA DOCKER HUB WEBHOOKS
**Thời gian dự kiến: 60 phút**

**Câu 11.** Hiểu khái niệm Webhook và cơ chế Tự động Deploy (Continuous Deployment). *(Gợi ý: Webhook là cơ chế HTTP callback giúp Docker Hub tự động bắn thông báo sang Render mỗi khi có Image mới được push)*  
**Câu 12.** Truy cập Render Dashboard → Chọn Web Service Backend `mern-backend-<mssv>`. *(Gợi ý: Chọn mục **Settings** ở menu bên trái)*  
**Câu 13.** Cuộn xuống tìm mục **Deploy Hook**. *(Gợi ý: Render cung cấp sẵn một đường link URL đặc biệt dành riêng cho việc trigger deploy)*  
**Câu 14.** Sao chép đường link **Deploy Hook URL** của Backend Service. *(Gợi ý: Đường link dạng `https://api.render.com/deploy/srv-xxxxx?key=yyyyy`)*  
**Câu 15.** Mở tab mới trên trình duyệt, truy cập Docker Hub (`https://hub.docker.com`) → Mở Repository `mern-backend`. *(Gợi ý: Chọn tab **Webhooks**)*  
**Câu 16.** Tạo một Webhook mới trên Docker Hub cho Backend. *(Gợi ý: Nhập **Webhook name**: `Render Auto Deploy Backend`)*  
**Câu 17.** Dán đường link **Deploy Hook URL** đã sao chép từ Render vào ô **Webhook URL** trên Docker Hub → Nhấn **Save**. *(Gợi ý: Docker Hub sẽ lưu Webhook cấu hình)*  
**Câu 18.** Quay lại Render Dashboard → Chọn Web Service Frontend `mern-frontend-<mssv>` → Vào **Settings** → Sao chép **Deploy Hook URL** của Frontend. *(Gợi ý: Lấy Deploy Hook URL riêng của Frontend)*  
**Câu 19.** Truy cập Docker Hub Repository `mern-frontend` → Chọn tab **Webhooks** → Tạo Webhook tên `Render Auto Deploy Frontend` và dán Deploy Hook URL tương ứng. *(Gợi ý: Nhấn **Save**)*  
**Câu 20.** Tiến hành thực nghiệm tính năng Auto-Deploy: Mở VS Code trên máy local, chỉnh sửa nhẹ thông báo log trong file `server/server.js`. *(Gợi ý: Thay đổi dòng console.log chào mừng khi khởi động server)*  
**Câu 21.** Mở Terminal local, di chuyển vào thư mục `server` và build Docker Image Backend phiên bản `1.2`. *(Gợi ý lệnh: `docker build -t <dockerhub-username>/mern-backend:1.2 ./server`)*  
**Câu 22.** Gắn thêm tag `:latest` cho Image Backend vừa build. *(Gợi ý lệnh: `docker tag <dockerhub-username>/mern-backend:1.2 <dockerhub-username>/mern-backend:latest`)*  
**Câu 23.** Thực hiện `docker push` phiên bản `:latest` lên Docker Hub. *(Gợi ý lệnh: `docker push <dockerhub-username>/mern-backend:latest`)*  
**Câu 24.** Ngay sau khi lệnh push hoàn tất, chuyển sang tab **Webhooks** trên Docker Hub để kiểm tra lịch sử gọi Webhook. *(Gợi ý: Quan sát mục **View History**, xác nhận trạng thái gửi HTTP POST thành công `200 OK`)*  
**Câu 25.** Chuyển sang Render Dashboard → Mở Web Service Backend `mern-backend-<mssv>` → Mở tab **Events** hoặc **Logs**. *(Gợi ý: Quan sát Render tự động kích hoạt tiến trình `Deploying image...` mà không cần người dùng nhấn nút tay)*  
**Câu 26.** Kiểm tra kết quả tự động triển khai thành công trên Render. *(Gợi ý: Xác nhận log hiển thị dòng chào mừng mới đã được cập nhật trên Cloud)*  

**Mục tiêu phần này:** Sinh viên thiết lập thành công quy trình Tự động hóa Triển khai (CD) giữa Docker Hub Registry và Cloud PaaS Render thông qua Webhook.

---

### PHẦN 3. CẤU HÌNH REVERSE PROXY / API REWRITES VÀ THỐNG NHẤT DOMAIN
**Thời gian dự kiến: 60 phút**

**Câu 27.** Phân tích hạn chế của mô hình Buổi 5: Frontend và Backend dùng 2 Domain riêng biệt làm phát sinh lỗi CORS và phức tạp khi quản lý môi trường. *(Gợi ý: Cần cấu hình thống nhất về 1 Domain duy nhất)*  
**Câu 28.** Hiểu giải pháp API Rewrites / Reverse Proxy trên Cloud PaaS: Mọi request gửi tới Domain Frontend dạng `https://mern-frontend-<mssv>.onrender.com/api/*` sẽ được Cloud PaaS tự động chuyển tiếp ngầm tới Backend Service. *(Gợi ý: Người dùng chỉ cần nhớ 1 URL duy nhất)*  
**Câu 29.** Truy cập Render Dashboard → Chọn Web Service Frontend `mern-frontend-<mssv>`. *(Gợi ý: Chọn mục **Redirects/Rewrites** ở menu bên trái)*  
**Câu 30.** Tạo một Quy tắc Chuyển tiếp (Rewrite Rule) mới. *(Gợi ý: Nhấn **Add Rule** hoặc **Add Rewrite**)*  
**Câu 31.** Cấu hình thông số cho Rewrite Rule:  
- **Type:** Chọn `Rewrite` (Chuyển tiếp ngầm, không đổi URL trên thanh địa chỉ trình duyệt)  
- **Source Path:** Nhập `/api/*`  
- **Destination Path:** Nhập `https://mern-backend-<mssv>.onrender.com/api/*` (URL của Backend Service)  
**Câu 32.** Nhấn **Save Changes** để lưu quy tắc Rewrite trên Frontend Service. *(Gợi ý: Render sẽ cập nhật cấu hình Router cho Frontend)*  
**Câu 33.** Mở VS Code trên máy local, chỉnh sửa file `client/src/App.jsx` (hoặc nơi gọi API trong React). *(Gợi ý: Thay đổi URL gọi API từ `https://mern-backend...` thành đường dẫn tương đối `/api/students`)*  
**Câu 34.** Phân tích ưu điểm của đường dẫn tương đối `/api/students`: Code Frontend hoạt động hoàn hảo trên mọi môi trường (Local, Staging, Cloud Production) mà không cần đổi URL hardcode. *(Gợi ý: Hiểu rõ tư duy thiết kế phần mềm linh hoạt)*  
**Câu 35.** Mở Terminal local, di chuyển vào thư mục `client` và build Docker Image Frontend phiên bản `3.0`. *(Gợi ý lệnh: `docker build -t <dockerhub-username>/mern-frontend:3.0 ./client`)*  
**Câu 36.** Gắn tag `:latest` cho Frontend Image phiên bản `3.0`. *(Gợi ý lệnh: `docker tag <dockerhub-username>/mern-frontend:3.0 <dockerhub-username>/mern-frontend:latest`)*  
**Câu 37.** Push Frontend Image `:latest` lên Docker Hub. *(Gợi ý lệnh: `docker push <dockerhub-username>/mern-frontend:latest`)*  
**Câu 38.** Quan sát Docker Hub tự động kích hoạt Webhook và Render tự động redeploy Frontend Container. *(Gợi ý: Kiểm tra tab **Logs** trên Render Frontend Service)*  
**Câu 39.** Mở trình duyệt web, truy cập duy nhất URL của Frontend: `https://mern-frontend-<mssv>.onrender.com`. *(Gợi ý: Mở F12 -> Tab **Network**)*  
**Câu 40.** Thử tải lại danh sách sinh viên và kiểm tra các Request API trong tab Network. *(Gợi ý: Quan sát Request URL hiển thị dạng `https://mern-frontend-<mssv>.onrender.com/api/students` trả về Status `200 OK`)*  
**Câu 41.** Xác nhận trình duyệt không còn phải gọi trực tiếp sang Domain Backend và không còn bất kỳ lỗi CORS nào. *(Gợi ý: Mô hình Unified Origin đã hoạt động hoàn hảo)*  
**Câu 42.** Chụp màn hình tab Network hiển thị các request `/api/students` chạy thành công qua Domain Frontend làm bằng chứng thực hành. *(Gợi ý: Lưu ảnh làm báo cáo)*  

**Mục tiêu phần này:** Sinh viên triển khai thành công mô hình API Rewrites/Reverse Proxy trên Cloud PaaS, thống nhất điểm truy cập ứng dụng về một Domain duy nhất.

---

### PHẦN 4. THỰC HÀNH NÂNG CẤP PHIÊN BẢN 2.0 VÀ ROLLING UPDATES KHÔNG GIÁN ĐOẠN
**Thời gian dự kiến: 50 phút**

**Câu 43.** Hiểu khái niệm **Rolling Update (Cập nhật cuốn chiếu / Không gián đoạn)** trên Cloud PaaS. *(Gợi ý: PaaS sẽ khởi tạo Container mới, kiểm tra sức khỏe thành công rồi mới điều hướng traffic và tắt Container cũ)*  
**Câu 44.** Tạo một API Endpoint kiểm tra sức khỏe (Health Check) trong Backend. Mở file `server/server.js` trên VS Code và thêm đoạn code: *(Gợi ý thêm code:)*  
```javascript
// Health Check Endpoint cho Cloud PaaS Monitoring
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    timestamp: new Date(),
    uptime: process.uptime()
  });
});
```  
**Câu 45.** Tạo giao diện hiển thị phiên bản ứng dụng v2.0 trên React Frontend. Mở `client/src/App.jsx` và thêm Header/Footer hiển thị: `Phiên bản 2.0 - Production Cloud PaaS (Auto-Deployed)`. *(Gợi ý: Chỉnh sửa UI giao diện)*  
**Câu 46.** Mở Terminal local, build Image Backend `2.0` và Image Frontend `2.0`. *(Gợi ý lệnh: `docker build -t <username>/mern-backend:2.0 ./server` và `docker build -t <username>/mern-frontend:2.0 ./client`)*  
**Câu 47.** Gắn tag `:latest` cho cả 2 Image phiên bản `2.0`. *(Gợi ý lệnh: `docker tag ...:2.0 ...:latest`)*  
**Câu 48.** Push đồng thời cả 2 Image `:latest` lên Docker Hub. *(Gợi ý lệnh: `docker push <username>/mern-backend:latest` và `docker push <username>/mern-frontend:latest`)*  
**Câu 49.** Mở Render Dashboard → Mở Web Service Backend `mern-backend-<mssv>` → Vào **Settings** → Cấu hình **Health Check Path**. *(Gợi ý: Nhập `/health` vào ô **Health Check Path**)*  
**Câu 50.** Quan sát Render nhận được Webhook và bắt đầu quy trình **Rolling Update**. *(Gợi ý: Mở tab **Logs** của Backend Service)*  
**Câu 51.** Theo dõi tiến trình Rolling Update trong logs: Render tải Container mới, gửi HTTP GET tới `/health`, khi nhận phản hồi `200 OK` mới chuyển traffic sang Container mới. *(Gợi ý: Quan sát dòng log `Health check passed. Swapping instances...`)*  
**Câu 52.** Mở liên tục đường link ứng dụng `https://mern-frontend-<mssv>.onrender.com` trên trình duyệt trong lúc hệ thống đang redeploy. *(Gợi ý: Xác nhận ứng dụng không bị gián đoạn hay báo lỗi ngắt kết nối)*  
**Câu 53.** Kiểm tra giao diện ứng dụng sau khi quá trình Rolling Update hoàn tất. *(Gợi ý: Bảng tiêu đề đã cập nhật thông báo `Phiên bản 2.0 - Production Cloud PaaS`)*  
**Câu 54.** Kiểm tra endpoint `/health` trực tiếp trên trình duyệt. *(Gợi ý: Truy cập `https://mern-frontend-<mssv>.onrender.com/api/health` hoặc qua Backend URL, xác nhận JSON trả về status `UP`)*  
**Câu 55.** Thực hiện thử một thao tác Thêm sinh viên trên giao diện v2.0 mới. *(Gợi ý: Nhập dữ liệu sinh viên mới để xác nhận kết nối Database Atlas vẫn nguyên vẹn)*  
**Câu 56.** Kiểm tra dữ liệu vừa thêm trong MongoDB Atlas Dashboard. *(Gợi ý: Xác nhận Document mới đã lưu thành công)*  
**Câu 57.** Phân tích ưu điểm của Health Check kết hợp Rolling Update trong quản trị hệ thống Cloud. *(Gợi ý: Giúp phát hiện container lỗi trước khi public cho người dùng, đảm bảo High Availability)*  
**Câu 58.** Chụp màn hình thông tin Health Check thành công và phiên bản v2.0 trên Cloud làm bằng chứng bài tập. *(Gợi ý: Lưu ảnh vào thư mục báo cáo)*  

**Mục tiêu phần này:** Sinh viên làm chủ kỹ thuật Rolling Update không gián đoạn dịch vụ và cấu hình Health Check Path trên Cloud PaaS.

---

### PHẦN 5. BẢO MẬT CLOUD, CHỨNG CHỈ SSL/HTTPS VÀ CUSTOM SUBDOMAIN
**Thời gian dự kiến: 40 phút**

**Câu 59.** Tìm hiểu về chứng chỉ **SSL/TLS miễn phí (Let's Encrypt)** tự động tích hợp trên Cloud PaaS Render. *(Gợi ý: Mọi dịch vụ tạo trên Render mặc định đều được cấp chứng chỉ SSL và tự động gia hạn)*  
**Câu 60.** Kiểm tra thông tin chứng chỉ SSL của trang web trên trình duyệt. *(Gợi ý: Nhấp vào biểu tượng **Ổ khóa (Padlock)** bên trái thanh địa chỉ URL → Chọn **Connection is secure** → **Certificate is valid**)*  
**Câu 61.** Kiểm tra các thông số của Chứng chỉ SSL. *(Gợi ý: Quan sát tổ chức cấp phát **Let's Encrypt**, thời hạn hiệu lực và thuật toán mã hóa TLS 1.3)*  
**Câu 62.** Thử truy cập ứng dụng bằng giao thức HTTP không bảo mật: `http://mern-frontend-<mssv>.onrender.com`. *(Gợi ý: Quan sát Render tự động chuyến hướng (HTTP 301 Redirect) sang giao thức HTTPS an toàn)*  
**Câu 63.** Tìm hiểu về cơ chế **HSTS (HTTP Strict Transport Security)** được bật mặc định trên Cloud PaaS. *(Gợi ý: HSTS bắt buộc trình duyệt luôn giao tiếp bằng HTTPS để chống tấn công Man-in-the-Middle)*  
**Câu 64.** Mở Render Dashboard → Vào Web Service Frontend → Chọn mục **Custom Domains**. *(Gợi ý: Quan sát nơi cho phép gắn Tên miền riêng nếu có)*  
**Câu 65.** Tìm hiểu quy trình cấu hình Custom Domain trên Cloud PaaS (nếu sinh viên có tên miền cá nhân). *(Gợi ý: Cấu hình bản ghi CNAME trỏ về `onrender.com` và Render tự động sinh SSL cho Custom Domain)*  
**Câu 66.** Kiểm tra tính năng **Environment Secrets / Environment Groups** trên Render Dashboard. *(Gợi ý: Chọn **Environment** ở menu chính Dashboard)*  
**Câu 67.** Tạo một **Environment Group** chung tên `MERN-Production-Secrets` để quản lý tập trung các biến môi trường dùng chung cho cả Frontend và Backend. *(Gợi ý: Nhấn **Create Environment Group**)*  
**Câu 68.** Đưa các biến môi trường nhạy cảm như `MONGODB_URI` vào Environment Group vừa tạo. *(Gợi ý: Giúp quản lý tập trung mã mật khẩu mà không cần gõ lại ở từng Service riêng lẻ)*  
**Câu 69.** Liên kết Web Service Backend với Environment Group `MERN-Production-Secrets`. *(Gợi ý: Chọn **Link Environment Group** trong cài đặt Backend)*  
**Câu 70.** Kiểm tra sự hoạt động ổn định của ứng dụng sau khi nhóm các biến môi trường bảo mật. *(Gợi ý: Tải lại trang web và kiểm tra các tính năng CRUD)*  

**Mục tiêu phần này:** Sinh viên nắm vững các cơ chế bảo mật Cloud mặc định (SSL/HTTPS, Automatic Redirect, HSTS) và quản lý bí mật môi trường tập trung bằng Environment Groups.

---

### PHẦN 6. PHÂN TÍCH LOG, GIÁM SÁT METRICS VÀ TROUBLESHOOTING TRÊN CLOUD
**Thời gian dự kiến: 45 phút**

**Câu 71.** Hiểu tầm quan trọng của việc Giám sát (Monitoring) và Phân tích nhật ký (Log Analysis) trong quản trị Cloud Production. *(Gợi ý: Giúp phát hiện sớm nghẽn bộ nhớ, lỗi 500 API hoặc tấn công vô hiệu hóa dịch vụ)*  
**Câu 72.** Truy cập Render Dashboard → Mở Web Service Backend `mern-backend-<mssv>` → Chọn mục **Logs**. *(Gợi ý: Quan sát dòng log chảy theo thời gian thực - Real-time Logs)*  
**Câu 73.** Sử dụng ô tìm kiếm/lọc (Search Logs) để lọc ra các log lỗi. *(Gợi ý: Nhập từ khóa `error`, `failed`, `500` hoặc `mongoose` vào ô search)*  
**Câu 74.** Thực hiện tạo một lỗi giả định để thực hành chẩn đoán: Nhập sai tham số trên URL API hoặc gửi dữ liệu thiếu trong Form Thêm sinh viên. *(Gợi ý: Quan sát log Backend ghi nhận lỗi validation hoặc lỗi 400/500)*  
**Câu 75.** Mở mục **Metrics** trên Web Service Backend của Render Dashboard. *(Gợi ý: Quan sát các biểu đồ giám sát tài nguyên)*  
**Câu 76.** Phân tích biểu đồ **CPU Usage**. *(Gợi ý: Theo dõi tỷ lệ phần trăm CPU mà Backend Container đang tiêu thụ)*  
**Câu 77.** Phân tích biểu đồ **Memory Usage (RAM)**. *(Gợi ý: Kiểm tra mức sử dụng RAM so với hạn mức 512MB của gói Free Tier)*  
**Câu 78.** Phân tích biểu đồ **Bandwidth / Network Traffic**. *(Gợi ý: Quan sát lưu lượng dữ liệu truyền nhận qua giao diện mạng)*  
**Câu 79.** Mở mục **Metrics** trên Web Service Frontend và so sánh mức tiêu thụ tài nguyên giữa Frontend và Backend Container. *(Gợi ý: Rút ra nhận xét về đặc thụ tải của Node.js Backend vs Static React Frontend)*  
**Câu 80.** Thực hành quy trình Khôi phục sự cố (Troubleshooting Step-by-Step):  
1. **Kiểm tra trạng thái Container:** Xác nhận Service báo Live hay Suspended.  
2. **Kiểm tra System Logs:** Tìm các lỗi unhandled exception hoặc crash log.  
3. **Kiểm tra Kết nối Database:** Kiểm tra IP Access List trên MongoDB Atlas.  
4. **Kiểm tra Biến môi trường:** Mở tab Environment xác minh `MONGODB_URI` và `CLIENT_URL`.  
5. **Thực hiện Manual Rollback/Redeploy:** Nhấn **Clear build cache & deploy** nếu bị lỗi cache Docker Image.  
**Câu 81.** Thực hành thao tác **Manual Redeploy với Clear Build Cache**. *(Gợi ý: Chọn **Manual Deploy** → **Clear build cache & deploy** trên Render Dashboard)*  
**Câu 82.** Quan sát tiến trình Render xóa sạch cache cũ, kéo Image mới nhất từ Docker Hub và khởi chạy lại Container hoàn toàn sạch. *(Gợi ý: Theo dõi log tiến trình)*  
**Câu 83.** Kiểm tra ứng dụng sau khi Redeploy với Clear Cache. *(Gợi ý: Đảm bảo mọi tính năng CRUD sinh viên hoạt động mượt mà)*  
**Câu 84.** Xuất hoặc chụp màn hình biểu đồ Metrics (CPU/RAM Usage) và nhật ký Logs sạch của hệ thống. *(Gợi ý: Lưu làm tài liệu báo cáo)*  
**Câu 85.** Tổng kết các bài học kinh nghiệm về vận hành và xử lý sự cố ứng dụng Container trên Cloud PaaS. *(Gợi ý: Ghi chép các lỗi thường gặp và cách khắc phục)*  

**Mục tiêu phần này:** Sinh viên thạo kỹ năng quan sát log thời gian thực, đọc chỉ số tài nguyên hệ thống và xử lý các sự cố vận hành ứng dụng MERN trên Cloud.

---

### PHẦN 7. BÀI TẬP TỔNG HỢP TOÀN KHÓA VÀ NỘP BÀI THỰC HÀNH
**Thời gian dự kiến: 20 phút**

**Câu 86.** Kiểm tra lại toàn bộ quy trình vận hành ứng dụng MERN Multi-Container trên Cloud PaaS từ đầu đến cuối (End-to-End Test). *(Gợi ý: Kiểm tra từ GitHub → Docker Hub → Render PaaS → MongoDB Atlas)*  
**Câu 87.** Mở ứng dụng trên trình duyệt qua URL duy nhất: `https://mern-frontend-<mssv>.onrender.com`. *(Gợi ý: Đảm bảo giao diện v2.0 tải nhanh, đẹp và có HTTPS an toàn)*  
**Câu 88.** Thực hiện kiểm thử toàn bộ chuỗi chức năng CRUD sinh viên trên môi trường Production:  
- **Thêm sinh viên mới:** `SV999` - `Sinh Vien Tong Hop` - `tonghop@cloud.edu.vn`.  
- **Xem danh sách:** Xác nhận sinh viên `SV999` xuất hiện tức thì.  
- **Cập nhật:** Đổi email thành `tonghop.updated@cloud.edu.vn`.  
- **Xóa:** Xóa sinh viên thử nghiệm `SV999`.  
**Câu 89.** Kiểm tra MongoDB Atlas Dashboard để xác nhận dữ liệu trong collection `students` đã được đồng bộ chính xác. *(Gợi ý: Mở **Browse Collections** trên MongoDB Atlas)*  
**Câu 90.** Mở Terminal local, kiểm tra trạng thái Git và thực hiện commit tổng kết toàn bộ chuỗi thực hành 6 buổi. *(Gợi ý lệnh: `git add .` và `git commit -m "Final Complete Cloud Computing Lab 01-06 MERN Stack Production"`) *  
**Câu 91.** Push commit cuối cùng lên GitHub Repository. *(Gợi ý lệnh: `git push origin main`)*  
**Câu 92.** Điền đầy đủ thông tin vào **Biểu mẫu Báo cáo Thực hành Tổng hợp** theo mẫu chuẩn sau:  

```text
====================================================================
BÁO CÁO KẾT QUẢ THỰC HÀNH MÔN ĐIỆN TOÁN ĐÁM MÂY (LAB 01 - LAB 06)
====================================================================
1. Họ và tên Sinh viên: ............................................
2. Mã số Sinh viên (MSSV): .........................................
3. Lớp / Nhóm thực hành: ...........................................
--------------------------------------------------------------------
DANH SÁCH ĐƯỜNG LINK BẰNG CHỨNG SẢN PHẨM:
- Link GitHub Repository (Buổi 1 - 6):
  https://github.com/<github-username>/cloud-lab

- Link Docker Hub Backend Repository (Buổi 4 - 6):
  https://hub.docker.com/r/<dockerhub-username>/mern-backend

- Link Docker Hub Frontend Repository (Buổi 4 - 6):
  https://hub.docker.com/r/<dockerhub-username>/mern-frontend

- Link Cloud PaaS Production App (Buổi 5 - 6):
  https://mern-frontend-<mssv>.onrender.com

- Link Cloud PaaS Backend API Endpoint (Buổi 5 - 6):
  https://mern-frontend-<mssv>.onrender.com/api/students
--------------------------------------------------------------------
XÁC NHẬN KẾT QUẢ HỆ THỐNG:
[X] Ứng dụng triển khai thành công 100% trên Cloud PaaS Render.com.
[X] Đã cấu hình SSL/HTTPS và Reverse Proxy API Rewrites.
[X] Đã cấu hình Auto-Deploy CI/CD qua Docker Hub Webhooks.
[X] Đã kết nối Cloud Database MongoDB Atlas an toàn bằng Environment Variables.
[X] Không phát sinh bất kỳ chi phí hay yêu cầu thẻ tín dụng nào.
====================================================================
```  

**Câu 93.** Kiểm tra lại tính truy cập công khai (Public Access) của tất cả các đường link trong báo cáo. *(Gợi ý: Mở tab Ẩn danh (Incognito Window) trên trình duyệt để kiểm tra xem giảng viên có thể mở được tất cả các link mà không cần đăng nhập không)*  
**Câu 94.** Lưu file Báo cáo tổng hợp vào thư mục dự án và nộp lên hệ thống quản lý học tập (LMS/Google Classroom) theo quy định của giảng viên. *(Gợi ý: Lưu file dạng `BAOCAO_CLOUD_LAB_<MSSV>.txt` hoặc `.md`)*  
**Câu 95.** Tuyên bố hoàn thành xuất sắc chuỗi bài tập thực hành môn Điện toán đám mây với đầy đủ kiến thức về Linux, MERN Stack, Docker, Container Orchestration, Cloud Registry, Cloud PaaS, CI/CD và Cloud Security! *(Gợi ý: Chúc mừng sinh viên đã hoàn thành khóa học!)*  

**Mục tiêu phần này:** Sinh viên tổng hợp đầy đủ hồ sơ sản phẩm, kiểm thử lần cuối và nộp bài báo cáo tổng hợp toàn khóa thực hành Điện toán đám mây.
