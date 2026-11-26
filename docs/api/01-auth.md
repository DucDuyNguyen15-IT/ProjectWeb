# Auth — đăng nhập và người dùng hiện tại

Bước G2. Dạng lỗi chung và mã trạng thái: xem [README.md](README.md).

Tài khoản demo (e-mail, mật khẩu, tên dùng trong ví dụ) nằm trong bảng *Demo accounts* của `FRONTEND.md`.

| Tên trong ví dụ | Id | Vai trò |
|---|---|---|
| `linh` | `u-linh` | `customer` |
| `thao` | `u-thao` | `admin` |
| `mai` | `u-mai` | `staff` |
| `tuan` | `u-tuan` | `staff` |
| `superadmin` | `u-superadmin` | `superadmin` |

## Đối tượng `user`

| Field | Kiểu | Ghi chú |
|---|---|---|
| `id` | string | `u-linh`… |
| `name` | string | Tên hiển thị |
| `role` | string | `customer` · `admin` · `staff` · `superadmin` |

---

## `POST /api/auth/login`

Đăng nhập bằng tài khoản demo, nhận token và user.

- **Vai trò:** public (không cần token).
- **Mock:** vẫn trả lời bình thường khi `MOCK_MODE=error`. Token có dạng `token-<user id>`.

**Body** (`application/json`)

| Field | Kiểu | Bắt buộc | Giới hạn |
|---|---|---|---|
| `email` | string | có | 3–254 ký tự, có `@` |
| `password` | string | có | 1–128 ký tự |

**200 OK**: `{"token": string, "user": user}`

**Lỗi**
- `400 VALIDATION`: thiếu hoặc sai dạng `email` / `password`, mỗi field một thông báo trong `fields`.
- `401 UNAUTHENTICATED`: e-mail không có trong hệ thống, hoặc sai mật khẩu. Không nói rõ sai cái nào.

### Ví dụ: Linh đăng nhập

```http
POST /api/auth/login
Content-Type: application/json

{"email": "linh@gradstudio.test", "password": "linh-demo"}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"token": "…", "user": {"id": "u-linh", "name": "Linh", "role": "customer"}}
```

### Ví dụ: Admin Thảo đăng nhập

```http
POST /api/auth/login
Content-Type: application/json

{"email": "thao@gradstudio.test", "password": "thao-demo"}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"token": "…", "user": {"id": "u-thao", "name": "Thảo", "role": "admin"}}
```

### Ví dụ: thiếu field

```http
POST /api/auth/login
Content-Type: application/json

{"email": "linh", "password": ""}
```

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{"error": {"code": "VALIDATION", "message": "Dữ liệu chưa hợp lệ.", "fields": {"email": "E-mail chưa đúng dạng.", "password": "Nhập mật khẩu."}}}
```

### Ví dụ: sai mật khẩu

```http
POST /api/auth/login
Content-Type: application/json

{"email": "linh@gradstudio.test", "password": "sai-mat-khau"}
```

```http
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{"error": {"code": "UNAUTHENTICATED", "message": "E-mail hoặc mật khẩu không đúng."}}
```

---

## `GET /api/auth/me`

Trả về user của token đang gửi. Front-end gọi khi mở app có sẵn token, để kiểm tra token còn dùng được.

- **Vai trò:** customer, admin, staff, superadmin.
- **Query, body:** không có.

**200 OK**: `{"user": user}`

**Lỗi**
- `401 UNAUTHENTICATED`: thiếu token, hoặc token không ứng với user nào.

### Ví dụ: Linh

```http
GET /api/auth/me
Authorization: Bearer {{token:linh}}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"user": {"id": "u-linh", "name": "Linh", "role": "customer"}}
```

### Ví dụ: nhân viên Mai

```http
GET /api/auth/me
Authorization: Bearer {{token:mai}}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"user": {"id": "u-mai", "name": "Mai", "role": "staff"}}
```

### Ví dụ: không có token

```http
GET /api/auth/me
```

```http
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{"error": {"code": "UNAUTHENTICATED", "message": "Bạn cần đăng nhập."}}
```

### Ví dụ: token không hợp lệ

```http
GET /api/auth/me
Authorization: Bearer token-khong-ton-tai
```

```http
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{"error": {"code": "UNAUTHENTICATED", "message": "Bạn cần đăng nhập."}}
```

## Changes

- 26/11/2026 — Tạo file. Chưa có front-end nào gọi tới.
