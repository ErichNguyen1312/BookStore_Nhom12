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
- **Backend API** sẽ chạy tại: [http://localhost:8084](http://localhost:8084) (Port nội bộ 8080)
- **Database (MySQL)** sẽ chạy tại: `localhost:3307`

---

## 🗄 Hướng dẫn Import Database

Hệ thống đã chuẩn bị sẵn file `backend/sample-data.sql` chứa cấu trúc và dữ liệu mẫu. Có 2 cách để import:

### Cách 1: Sử dụng lệnh Docker (Khuyên dùng)
Chạy lệnh sau để import dữ liệu trực tiếp vào container MySQL đang chạy:

```bash
docker exec -i bookstore-db mysql -u root -p123456789 library_project < backend/sample-data.sql
```

### Cách 2: Sử dụng công cụ bên ngoài (MySQL Workbench, Navicat, DBeaver)
Kết nối với Database theo thông số sau:
- **Host:** `localhost`
- **Port:** `3307`
- **Username:** `root`
- **Password:** `123456789`
- **Database Name:** `library_project`

Sau khi kết nối, hãy thực thi (execute) nội dung file `backend/sample-data.sql`.

---

## 🔑 Tài khoản đăng nhập mẫu
Sau khi import database, bạn có thể đăng nhập với các tài khoản:

| Quyền | Username | Password |
|-------|----------|----------|
| **Admin** | admin | 123456 |
| **Librarian** | librarian | 123456 |
| **User** | user | 123456 |

---

## 📝 Các lệnh Docker hữu ích

- **Xem log của hệ thống:**
  ```bash
  docker compose logs -f
  ```

- **Dừng hệ thống:**
  ```bash
  docker compose down
  ```

- **Khởi động lại một service cụ thể (ví dụ backend):**
  ```bash
  docker compose up -d --build backend
  ```
