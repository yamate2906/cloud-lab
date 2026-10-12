====================================================================
BÁO CÁO KẾT QUẢ THỰC HÀNH MÔN ĐIỆN TOÁN ĐÁM MÂY (LAB 01 - LAB 06)
====================================================================
1. Họ và tên Sinh viên: [Điền tên sinh viên]
2. Mã số Sinh viên (MSSV): [Điền MSSV]
3. Lớp / Nhóm thực hành: [Điền lớp]
--------------------------------------------------------------------
DANH SÁCH ĐƯỜNG LINK BẰNG CHỨNG SẢN PHẨM:

- Link GitHub Repository (Buổi 1 - 6):
  https://github.com/yamate2906/cloud-lab

- Link Docker Hub Backend Repository (Buổi 4 - 6):
  https://hub.docker.com/r/admin2906/mern-backend

- Link Docker Hub Frontend Repository (Buổi 4 - 6):
  https://hub.docker.com/r/admin2906/mern-frontend

- Link Cloud PaaS Production App (Buổi 5 - 6):
  https://mern-frontend-[MSSV].onrender.com

- Link Cloud PaaS Backend API Endpoint (Buổi 5 - 6):
  https://mern-frontend-[MSSV].onrender.com/api/students
--------------------------------------------------------------------
XÁC NHẬN KẾT QUẢ HỆ THỐNG:
[X] Ứng dụng triển khai thành công 100% trên Cloud PaaS Render.com.
[X] Đã cấu hình SSL/HTTPS và Reverse Proxy API Rewrites.
[X] Đã cấu hình Auto-Deploy CI/CD qua Docker Hub Webhooks.
[X] Đã kết nối Cloud Database MongoDB Atlas an toàn bằng Environment Variables.
[X] Không phát sinh bất kỳ chi phí hay yêu cầu thẻ tín dụng nào.
====================================================================

THÔNG TIN DOCKER IMAGES ĐÃ BUILD VÀ PUSH:
--------------------------------------------------------------------
Backend Images:
  - admin2906/mern-backend:1.0  (Buổi 4 - bản gốc)
  - admin2906/mern-backend:1.1  (Buổi 5 - CORS fix)
  - admin2906/mern-backend:1.2  (Buổi 6 - CI/CD test, Health Check)
  - admin2906/mern-backend:2.0  (Buổi 6 - Rolling Update)
  - admin2906/mern-backend:latest (Buổi 6 - luôn trỏ vào bản mới nhất)

Frontend Images:
  - admin2906/mern-frontend:1.0  (Buổi 4 - bản gốc)
  - admin2906/mern-frontend:2.0  (Buổi 5 - VITE_API_URL)
  - admin2906/mern-frontend:2.5  (Buổi 6 - mới nhất hiện tại)
  - admin2906/mern-frontend:3.0  (Buổi 6 - Relative API, Unified Domain)
  - admin2906/mern-frontend:latest (Buổi 6 - auto-deploy)
====================================================================
