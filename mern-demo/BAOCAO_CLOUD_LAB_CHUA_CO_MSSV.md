# Báo cáo thực hành Cloud Lab 01–06 (bản nháp)

> Chưa điền thông tin cá nhân hoặc xác nhận các thao tác trên Render/MongoDB Atlas. Chỉ đánh dấu hoàn tất khi đã kiểm tra trực tiếp và lưu bằng chứng.

## Thông tin sinh viên

- Họ và tên: ____________________
- MSSV: ____________________
- Lớp / Nhóm: ____________________

## Liên kết và bằng chứng

- GitHub: https://github.com/yamate2906/cloud-lab
- Docker Hub Backend: https://hub.docker.com/r/admin2906/mern-backend
- Docker Hub Frontend: https://hub.docker.com/r/admin2906/mern-frontend
- Render Frontend: Chưa xác minh
- Render API `/api/students`: Chưa xác minh
- Ảnh chụp dashboard, logs, metrics, CRUD: Chưa có

## Trạng thái kiểm tra

- [ ] Backend và Frontend đang chạy trên Render.
- [ ] MongoDB Atlas kết nối thành công qua biến môi trường.
- [ ] HTTPS, domain, health check và proxy `/api` đã xác minh trên cloud.
- [ ] Đã kiểm tra CRUD trực tiếp trên production và xác nhận dữ liệu trong Atlas.
- [ ] Đã lưu ảnh chụp logs/metrics và kết quả triển khai.
- [ ] Đã điền thông tin cá nhân và nộp báo cáo lên LMS.

## Việc đã chuẩn bị trong source code

- Backend hỗ trợ `/health`, giới hạn CORS theo `CLIENT_URL`, kiểm tra dữ liệu CRUD và trả lỗi HTTP phù hợp.
- Frontend hiển thị nhãn phiên bản 2.0 và dùng `/api` cùng origin.
- Docker Frontend phục vụ production build qua Nginx và reverse proxy tới Backend bằng `BACKEND_URL`.

