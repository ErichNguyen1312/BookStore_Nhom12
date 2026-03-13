-- Đảm bảo bạn đã chạy ứng dụng ít nhất 1 lần để Hibernate tự động tạo các bảng trước khi chạy script này.

-- 1. Thêm dữ liệu mẫu cho bảng categories
INSERT INTO categories (active, created_date, updated_date, category_name, slug) VALUES 
(1, NOW(), NOW(), 'Sách Văn Học', 'sach-van-hoc'),
(1, NOW(), NOW(), 'Sách Kỹ Năng', 'sach-ky-nang'),
(1, NOW(), NOW(), 'Sách Khoa Học Công Nghệ', 'khoa-hoc-cong-nghe'),
(1, NOW(), NOW(), 'Sách Kinh Tế', 'sach-kinh-te');

-- 2. Thêm dữ liệu mẫu cho bảng books
-- Giả sử ID của category trên là 1, 2, 3, 4 theo thứ tự thêm vào
INSERT INTO books (active, created_date, updated_date, book_title, author, description, slug, image, quantity, price, category_id) VALUES 
(1, NOW(), NOW(), 'Nhà Giả Kim', 'Paulo Coelho', 'Một trong những cuốn sách bán chạy nhất mọi thời đại.', 'nha-gia-kim', 'https://example.com/nhagiakim.jpg', 100, 75000, 1),
(1, NOW(), NOW(), 'Tuổi Trẻ Đáng Giá Bao Nhiêu', 'Rosie Nguyễn', 'Sách kỹ năng dành cho giới trẻ.', 'tuoi-tre-dang-gia-bao-nhieu', 'https://example.com/tuoitre.jpg', 80, 80000, 2),
(1, NOW(), NOW(), 'Clean Code', 'Robert C. Martin', 'Kỹ năng viết code sạch và dễ bảo trì.', 'clean-code', 'https://example.com/cleancode.jpg', 30, 250000, 3),
(1, NOW(), NOW(), 'Design Patterns', 'Gang of Four', 'Các mẫu thiết kế phần mềm cốt lõi.', 'design-patterns', 'https://example.com/designpatterns.jpg', 20, 300000, 3),
(1, NOW(), NOW(), 'Cha Giàu Cha Nghèo', 'Robert Kiyosaki', 'Bí quyết tài chính cá nhân và đầu tư.', 'cha-giau-cha-ngheo', 'https://example.com/chagiau.jpg', 150, 110000, 4);

-- 3. Thêm roles
INSERT INTO roles (active, created_date, updated_date, role_name, slug) VALUES
(1, NOW(), NOW(), 'ADMIN', 'admin'),
(1, NOW(), NOW(), 'USER', 'user');

-- 4. Thêm user (password là: 123456, đã được mã hóa bằng bcrypt)
INSERT INTO users (active, created_date, updated_date, username, password, email, avatar) VALUES
(1, NOW(), NOW(), 'admin', '$2a$10$bmiIEfupxwgZwkuqm/dXv.IeIWNJQW1Lnuhul.SIcQ/JUjlhPyxZy', 'admin@example.com', null),
(1, NOW(), NOW(), 'user', '$2a$10$bmiIEfupxwgZwkuqm/dXv.IeIWNJQW1Lnuhul.SIcQ/JUjlhPyxZy', 'user@example.com', null);

-- 5. Map user và role
INSERT INTO users_roles (user_id, role_id) VALUES
(1, 1), -- Admin có role ADMIN
(1, 2), -- Admin có role USER
(2, 2); -- User có role USER
