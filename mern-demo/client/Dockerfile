# Câu 51: Khai báo Node.js Image làm Base Image
FROM node:20-alpine

# Câu 52: Thiết lập thư mục làm việc
WORKDIR /app

# Câu 53: Sao chép package.json và package-lock.json
COPY package*.json ./

# Câu 54: Cài đặt các package
RUN npm install

# Câu 55: Sao chép source code React vào Container
COPY . .

# Câu 56: Build React Application
RUN npm run build

# Khai báo port mặc định của Vite (thường là 5173 hoặc 4173)
EXPOSE 4173

# Lệnh chạy ứng dụng sau khi build (expose ra ngoài mạng)
CMD ["npm", "run", "preview", "--", "--host"]