# BookStore Project - Nhom 12

Dự án quản lý cửa hàng sách sử dụng Spring Boot cho Backend, React cho Frontend và MySQL cho Database. Hệ thống đã được cấu hình đầy đủ để chạy bằng Docker.

## 🛠 Công nghệ sử dụng
- **Backend:** Spring Boot (Java 17), Spring Security (JWT), Hibernate/JPA.
- **Frontend:** React, Vite, Bootstrap.
- **Database:** MySQL 8.0.
- **Containerization:** Docker & Docker Compose.

---

## 🚀 Hướng dẫn chạy dự án bằng Docker

### 1. Khởi động các Container
Bạn chỉ cần chạy một lệnh duy nhất để build và khởi động toàn bộ hệ thống (Backend, Frontend, Database):

```bash
docker compose up -d --build
```

Sau khi chạy lệnh trên:
- **Frontend** sẽ chạy tại: [http://localhost:3000](http://localhost:3000)
- **Backend API** sẽ chạy tại: [http://localhost:8084](http://localhost:8084) 
- **Database (MySQL)** sẽ chạy tại: `localhost:3307`



  docker compose down
  
  docker compose up -d --build backend

