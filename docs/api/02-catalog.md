# Catalog — dịch vụ, gói, dịch vụ thêm, ảnh mẫu, đánh giá

Bước G1 (trang chủ, trang dịch vụ) và G3 (khách chọn dịch vụ thêm khi gửi yêu cầu). Dạng lỗi chung và mã trạng thái: xem [README.md](README.md).

Mọi endpoint ở file này là **public**: không cần token, gửi token cũng không sao. Dữ liệu chỉ đọc, không đổi theo các ví dụ ở file khác.

**Mock:**
- Khi `MOCK_MODE=empty`, mọi list là `[]`: `services`, `extras`, `samples`, `reviews`. Nếu vẫn có service nào được trả về thì `packages` của nó cũng là `[]`. Front-end phải có trạng thái rỗng cho từng list.
- Khi `MOCK_MODE=error`, mọi endpoint ở đây trả `500 SERVER_ERROR` (xem README).

## Đối tượng `service`

| Field | Kiểu | Ghi chú |
|---|---|---|
| `id` | string | `svc-ky-yeu`… |
| `name` | string | Tên dịch vụ |
| `description` | string | 1–2 câu mô tả |
| `fromPrice` | integer | Giá thấp nhất trong các gói, đơn vị đồng |
| `priceUnit` | string | `"người"` hoặc `"gói"`. Front-end hiện `Từ 350.000đ/người` |
| `packages` | package[] | Các gói của dịch vụ, giá tăng dần |

## Đối tượng `package`

| Field | Kiểu | Ghi chú |
|---|---|---|
| `id` | string | `pkg-tn-premium`… |
| `name` | string | Tên gói. Có tên dài, front-end phải cho xuống dòng |
| `price` | integer | Đơn vị đồng, tính theo `priceUnit` của service chứa nó |
| `durationMinutes` | integer | Thời lượng chụp, phút |
| `editedPhotos` | integer | Số ảnh được chỉnh sửa |
| `includes` | string[] | Những gì có trong gói |

## Đối tượng `extra`

| Field | Kiểu | Ghi chú |
|---|---|---|
| `id` | string | `ex-makeup`… |
| `name` | string | Tên dịch vụ thêm |
| `price` | integer | Đơn vị đồng |
| `durationMinutes` | integer | Thời gian cộng thêm vào lịch, phút. `0` nếu không chiếm thời gian |
| `description` | string | Mô tả ngắn |

## Đối tượng `sample`

| Field | Kiểu | Ghi chú |
|---|---|---|
| `id` | string | `smp-1`… |
| `serviceId` | string | Id của service |
| `title` | string | Tiêu đề ảnh |
| `imageUrl` | string | `/api/files/samples/<id>.svg`. Hình minh họa, không phải ảnh người thật |
| `alt` | string | Mô tả ảnh cho trình đọc màn hình |

## Đối tượng `review`

| Field | Kiểu | Ghi chú |
|---|---|---|
| `id` | string | `rv-1`… |
| `authorName` | string | Chỉ tên gọi, không có họ đầy đủ |
| `serviceId` | string | Id của service khách đã dùng |
| `rating` | integer | 1–5 |
| `text` | string | Nội dung đánh giá |
| `createdAt` | string | Thời điểm ISO 8601, `+07:00` |

## Dữ liệu của mock

Các id và giá dưới đây được file khác dùng (vd. `pkg-tn-premium`, `ex-makeup` trong `03-conversations.md`). Không đổi.

| Service | Gói | Giá | Phút | Ảnh chỉnh |
|---|---|---|---|---|
| `svc-ky-yeu` "Kỷ yếu lớp", từ 350000/người | `pkg-ky-yeu-lop` "Gói Kỷ yếu lớp" | 350000 | 180 | 5 |
| | `pkg-ky-yeu-tron-ngay` "Gói Kỷ yếu lớp ngoại cảnh trọn ngày kèm quay phim flycam và album in bìa cứng" | 650000 | 480 | 10 |
| `svc-tot-nghiep` "Tốt nghiệp", từ 1800000/gói | `pkg-tn-premium` "Gói Tốt nghiệp Premium" | 1800000 | 120 | 30 |
| | `pkg-tn-gia-dinh` "Gói Tốt nghiệp cùng gia đình" | 2500000 | 180 | 45 |
| `svc-chan-dung` "Chân dung/CV", từ 690000/gói | `pkg-cv-co-ban` "Gói Chân dung CV cơ bản" | 690000 | 45 | 5 |
| | `pkg-cv-nang-cao` "Gói Chân dung cá nhân nâng cao" | 1200000 | 90 | 12 |

| Extra | Giá | Phút |
|---|---|---|
| `ex-makeup` "Makeup" | 300000 | 60 |
| `ex-costume` "Thuê trang phục" | 150000 | 0 |

Ảnh mẫu: `smp-1`, `smp-2` (`svc-ky-yeu`), `smp-3`, `smp-4` (`svc-tot-nghiep`), `smp-5` (`svc-chan-dung`). Đánh giá: `rv-1`, `rv-2`, `rv-3`.

---

## `GET /api/services`

Danh sách dịch vụ của studio, mỗi dịch vụ kèm các gói. Thứ tự: `svc-ky-yeu`, `svc-tot-nghiep`, `svc-chan-dung`.

- **Vai trò:** public (không cần token).
- **Query, body:** không có.

**200 OK**: `{"services": service[]}`

**Lỗi**
- Không có lỗi riêng. `500 SERVER_ERROR` chỉ khi `MOCK_MODE=error`.

### Ví dụ: xem danh sách dịch vụ

```http
GET /api/services
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"services": [{"id": "svc-ky-yeu", "name": "Kỷ yếu lớp", "description": "Chụp kỷ yếu cho cả lớp tại trường hoặc ngoại cảnh, giá tính theo từng người.", "fromPrice": 350000, "priceUnit": "người", "packages": [{"id": "pkg-ky-yeu-lop", "name": "Gói Kỷ yếu lớp", "price": 350000, "durationMinutes": 180, "editedPhotos": 5, "includes": ["Chụp tập thể và cá nhân", "1 nhiếp ảnh gia cho 30 người", "Ảnh gốc qua link tải"]}, {"id": "pkg-ky-yeu-tron-ngay", "name": "Gói Kỷ yếu lớp ngoại cảnh trọn ngày kèm quay phim flycam và album in bìa cứng", "price": 650000, "durationMinutes": 480, "editedPhotos": 10, "includes": ["Chụp ngoại cảnh trọn ngày", "Quay phim flycam", "Album in bìa cứng"]}]}, {"id": "svc-tot-nghiep", "name": "Tốt nghiệp", "description": "Chụp ảnh tốt nghiệp cá nhân hoặc cùng gia đình, có thể thêm makeup.", "fromPrice": 1800000, "priceUnit": "gói", "packages": [{"id": "pkg-tn-premium", "name": "Gói Tốt nghiệp Premium", "price": 1800000, "durationMinutes": 120, "editedPhotos": 30, "includes": ["Chụp tại studio và khuôn viên trường", "Áo cử nhân", "30 ảnh chỉnh sửa"]}, …]}, …]}
```

---

## `GET /api/extras`

Dịch vụ thêm khách có thể chọn khi gửi yêu cầu đặt lịch (G3). Thứ tự: `ex-makeup`, `ex-costume`.

- **Vai trò:** public (không cần token).
- **Query, body:** không có.

**200 OK**: `{"extras": extra[]}`

**Lỗi**
- Không có lỗi riêng. `500 SERVER_ERROR` chỉ khi `MOCK_MODE=error`.

### Ví dụ: xem dịch vụ thêm

```http
GET /api/extras
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"extras": [{"id": "ex-makeup", "name": "Makeup", "price": 300000, "durationMinutes": 60, "description": "Trang điểm trước buổi chụp, làm trước giờ chụp 60 phút."}, {"id": "ex-costume", "name": "Thuê trang phục", "price": 150000, "durationMinutes": 0, "description": "Thuê áo dài hoặc vest tại studio cho buổi chụp."}]}
```

---

## `GET /api/samples`

Ảnh mẫu (portfolio), có thể lọc theo dịch vụ. Thứ tự theo `id`.

- **Vai trò:** public (không cần token).
- **Body:** không có.

**Query**

| Tham số | Kiểu | Bắt buộc | Giới hạn |
|---|---|---|---|
| `serviceId` | string | không | Nếu có: phải là id của một service (`svc-ky-yeu`, `svc-tot-nghiep`, `svc-chan-dung`). Bỏ trống hoặc không gửi thì trả mọi ảnh mẫu |

**200 OK**: `{"samples": sample[]}`. Có `serviceId` thì chỉ gồm ảnh của service đó.

**Lỗi**
- `400 VALIDATION`: `serviceId` không ứng với service nào, thông báo trong `fields.serviceId`.

### Ví dụ: mọi ảnh mẫu

```http
GET /api/samples
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"samples": [{"id": "smp-1", "serviceId": "svc-ky-yeu", "title": "Kỷ yếu lớp dưới tán phượng", "imageUrl": "/api/files/samples/smp-1.svg", "alt": "Hình minh họa một lớp học đứng xếp hàng dưới cây phượng đỏ"}, …]}
```

### Ví dụ: lọc theo dịch vụ Tốt nghiệp

```http
GET /api/samples?serviceId=svc-tot-nghiep
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"samples": [{"id": "smp-3", "serviceId": "svc-tot-nghiep", "title": "Tung mũ cử nhân", "imageUrl": "/api/files/samples/smp-3.svg", "alt": "Hình minh họa tân cử nhân tung mũ trước giảng đường"}, {"id": "smp-4", "serviceId": "svc-tot-nghiep", "title": "Tốt nghiệp cùng gia đình", "imageUrl": "/api/files/samples/smp-4.svg", "alt": "Hình minh họa tân cử nhân chụp cùng bố mẹ, cầm bó hoa"}]}
```

### Ví dụ: `serviceId` không tồn tại

```http
GET /api/samples?serviceId=svc-khong-co
```

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{"error": {"code": "VALIDATION", "message": "Dữ liệu chưa hợp lệ.", "fields": {"serviceId": "Không có dịch vụ này."}}}
```

---

## `GET /api/reviews`

Đánh giá của khách hàng trước. Thứ tự: mới nhất trước (`createdAt` giảm dần).

- **Vai trò:** public (không cần token).
- **Query, body:** không có.

**200 OK**: `{"reviews": review[]}`

**Lỗi**
- Không có lỗi riêng. `500 SERVER_ERROR` chỉ khi `MOCK_MODE=error`.

### Ví dụ: xem đánh giá

```http
GET /api/reviews
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"reviews": [{"id": "rv-1", "authorName": "Minh Anh", "serviceId": "svc-tot-nghiep", "rating": 5, "text": "Ekip dễ thương, makeup nhẹ nhàng, ảnh trả đúng hẹn.", "createdAt": "2026-09-20T18:30:00+07:00"}, …]}
```

## Changes

- 26/11/2026 — Tạo file. Chưa có front-end nào gọi tới.
