====================================================================
BÁO CÁO KẾT QUẢ THỰC HÀNH MÔN ĐIỆN TOÁN ĐÁM MÂY (LAB 01 - LAB 06)
====================================================================
1. Họ và tên Sinh viên: Đinh Văn Lắm
2. Mã số Sinh viên (MSSV): 235292
3. Lớp / Nhóm thực hành: Điện toán đám mây
--------------------------------------------------------------------
DANH SÁCH ĐƯỜNG LINK BẰNG CHỨNG SẢN PHẨM:

- Link GitHub Repository (Buổi 1 - 6):
  https://github.com/yamate2906/cloud-lab

- Link Docker Hub Backend Repository (Buổi 4 - 6):
  https://hub.docker.com/r/admin2906/mern-backend

- Link Docker Hub Frontend Repository (Buổi 4 - 6):
  https://hub.docker.com/r/admin2906/mern-frontend

- Link Cloud PaaS Production App (Buổi 5 - 6):
  https://mern-frontend-235292.onrender.com

- Link Cloud PaaS Backend API Endpoint (Buổi 5 - 6):
  https://mern-frontend-235292.onrender.com/api/students
--------------------------------------------------------------------
XÁC NHẬN KẾT QUẢ HỆ THỐNG:
[X] Ứng dụng triển khai thành công 100% trên Cloud PaaS Render.com.
[X] Đã cấu hình SSL/HTTPS và Reverse Proxy API Rewrites.
[X] Đã cấu hình Auto-Deploy CI/CD qua Docker Hub Webhooks.
[X] Đã kết nối Cloud Database MongoDB Atlas an toàn bằng Environment Variables.
[X] Không phát sinh bất kỳ chi phí hay yêu cầu thẻ tín dụng nào.
====================================================================

CHI TIẾT CẤU HÌNH DỊCH VỤ TRÊN CLOUD PAAS (RENDER.COM):
--------------------------------------------------------------------
1. Backend Service:
   - Name: mern-backend-235292
   - Image: docker.io/admin2906/mern-backend:latest (hoặc 1.2 / 2.0)
   - Public URL: https://mern-backend-235292.onrender.com
   - Port: 5000
   - Health Check Path: /health
   - Environment Variables:
     + MONGODB_URI=mongodb://dinhlamtq2000_db_user:1234567890@ac-4ilbgqg-shard-00-00.2cwmdx9.mongodb.net:27017,ac-4ilbgqg-shard-00-01.2cwmdx9.mongodb.net:27017,ac-4ilbgqg-shard-00-02.2cwmdx9.mongodb.net:27017/?tls=true&authSource=admin&replicaSet=atlas-akc5fc-shard-0&retryWrites=true&w=majority
     + PORT=5000
     + NODE_ENV=production
     + CLIENT_URL=https://mern-frontend-235292.onrender.com

2. Frontend Service:
   - Name: mern-frontend-235292
   - Image: docker.io/admin2906/mern-frontend:latest (hoặc 3.0)
   - Public URL: https://mern-frontend-235292.onrender.com
   - Port: 4173
   - Environment Variables:
     + BACKEND_URL=https://mern-backend-235292.onrender.com
     + VITE_API_URL=https://mern-backend-235292.onrender.com
   - Redirects/Rewrites:
     + Type: Rewrite
     + Source Path: /api/*
     + Destination Path: https://mern-backend-235292.onrender.com/api/*

3. Kết quả kiểm thử CRUD (End-to-End Test):
   - GET /api/students: HTTP 200 OK - Đã lấy danh sách sinh viên thành công từ MongoDB Atlas.
   - POST /api/students: HTTP 201 Created - Thêm sinh viên SV999 thành công.
   - PUT /api/students/:id: HTTP 200 OK - Cập nhật email thành tonghop.updated@cloud.edu.vn thành công.
   - DELETE /api/students/:id: HTTP 200 OK - Xóa sinh viên SV999 thành công.
====================================================================
