# Schedule — nhân viên, phòng và kiểm tra trùng lịch

Bước G5 (admin kiểm tra giờ trước khi gửi đề xuất) và G10 (admin đổi giờ một booking). Dạng lỗi chung và mã trạng thái: xem [README.md](README.md).

Lịch bận gồm hai nguồn:
- Lịch có sẵn trong dữ liệu khởi đầu (vd. Mai makeup cho lớp 12A1 sáng 24/10/2026).
- Booking ở trạng thái `"Đã đặt lịch"` (đã cọc). Booking `"Chờ cọc 30%"`, `"Hoàn thành"`, `"Đã hủy"` và đề xuất trong hội thoại **không** giữ chỗ. Khi mock vừa khởi động, chỉ GS-1023 của Linh (ngày 10/10/2026) giữ chỗ; GS-1024 chưa tồn tại.

Giờ mở cửa: 08:00–20:00. Hai khoảng giờ bị coi là trùng khi `start < busyEnd` và `busyStart < end`; liền nhau (vd. bận tới 12:00, bắt đầu 12:00) thì không trùng.

## Đối tượng `staff`

| Field | Kiểu | Ghi chú |
|---|---|---|
| `id` | string | `u-mai`… (cùng id với tài khoản đăng nhập) |
| `name` | string | Tên hiển thị |
| `skill` | string | `makeup` · `photo` |

## Đối tượng `room`

| Field | Kiểu | Ghi chú |
|---|---|---|
| `id` | string | `room-a`… |
| `name` | string | Tên hiển thị |

Dữ liệu của mock:

| Id | Tên | Loại |
|---|---|---|
| `u-mai` | Mai | staff, `makeup` |
| `u-tuan` | Tuấn | staff, `photo` |
| `u-ha` | Hà | staff, `photo` |
| `room-a` | Phòng A | room |
| `room-b` | Phòng B | room |

## Đối tượng `busy`

| Field | Kiểu | Ghi chú |
|---|---|---|
| `start` | string | HH:mm |
| `end` | string | HH:mm |
| `label` | string | Chữ đọc được, đầy đủ, không cắt ngắn: vd. `"Makeup cho lớp 12A1"`, `"Gia đình Ngọc"`. Với booking: `"GS-1023 · Linh"` |

---

## `GET /api/resources`

Danh sách nhân viên và phòng, để admin chọn trong form đề xuất (G5) và form đổi giờ (G10).

- **Vai trò:** admin.
- **Query, body:** không có.
- **Mock:** khi `MOCK_MODE=empty`, `staff` và `rooms` là `[]`.

**200 OK**: `{"staff": [staff], "rooms": [room]}`, theo thứ tự trong bảng trên.

**Lỗi**
- `401 UNAUTHENTICATED`: thiếu token, hoặc token không hợp lệ.
- `403 FORBIDDEN`: token của customer, staff hoặc superadmin.

### Ví dụ: admin Thảo lấy nhân viên và phòng

```http
GET /api/resources
Authorization: Bearer {{token:thao}}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"staff": [{"id": "u-mai", "name": "Mai", "skill": "makeup"}, {"id": "u-tuan", "name": "Tuấn", "skill": "photo"}, {"id": "u-ha", "name": "Hà", "skill": "photo"}], "rooms": [{"id": "room-a", "name": "Phòng A"}, {"id": "room-b", "name": "Phòng B"}]}
```

### Ví dụ: khách Linh không được xem

```http
GET /api/resources
Authorization: Bearer {{token:linh}}
```

```http
HTTP/1.1 403 Forbidden
Content-Type: application/json

{"error": {"code": "FORBIDDEN", "message": "Bạn không có quyền xem mục này."}}
```

### Ví dụ: không có token

```http
GET /api/resources
```

```http
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{"error": {"code": "UNAUTHENTICATED", "message": "Bạn cần đăng nhập."}}
```

---

## `GET /api/schedule`

Lịch bận của từng nhân viên và từng phòng trong một ngày. Admin xem trước khi chọn giờ ở G5.

- **Vai trò:** admin.
- **Mock:** khi `MOCK_MODE=empty`, `rows` là `[]`.

**Query**

| Field | Kiểu | Bắt buộc | Giới hạn |
|---|---|---|---|
| `date` | string | có | YYYY-MM-DD, ngày có thật |

**200 OK**: `{"date": string, "rows": [row]}`

Mỗi `row` có cùng các field, kể cả khi trống:

| Field | Kiểu | Ghi chú |
|---|---|---|
| `resourceId` | string | id nhân viên hoặc phòng |
| `resourceName` | string | Tên hiển thị |
| `kind` | string | `staff` · `room` |
| `busy` | busy[] | Sắp theo `start`. Rảnh cả ngày thì `[]` |

`rows` có mọi nhân viên rồi mọi phòng, theo thứ tự của `GET /api/resources`.

Dữ liệu khởi đầu ngày 2026-10-24: Mai bận 08:00–12:00, Tuấn bận 09:00–11:00, Hà và Phòng A bận 14:00–16:00, Phòng B rảnh cả ngày.

**Lỗi**
- `400 VALIDATION`: thiếu `date` hoặc sai dạng, thông báo ở `fields.date`.
- `401 UNAUTHENTICATED`: thiếu token, hoặc token không hợp lệ.
- `403 FORBIDDEN`: token không phải admin.

### Ví dụ: lịch ngày 24/10/2026

```http
GET /api/schedule?date=2026-10-24
Authorization: Bearer {{token:thao}}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"date": "2026-10-24", "rows": [{"resourceId": "u-mai", "resourceName": "Mai", "kind": "staff", "busy": [{"start": "08:00", "end": "12:00", "label": "Makeup cho lớp 12A1"}]}, {"resourceId": "u-tuan", "resourceName": "Tuấn", "kind": "staff", "busy": [{"start": "09:00", "end": "11:00", "label": "Gia đình Ngọc"}]}, {"resourceId": "u-ha", "resourceName": "Hà", "kind": "staff", "busy": [{"start": "14:00", "end": "16:00", "label": "Kỷ yếu lớp 12A1"}]}, {"resourceId": "room-a", "resourceName": "Phòng A", "kind": "room", "busy": [{"start": "14:00", "end": "16:00", "label": "Kỷ yếu lớp 12A1"}]}, {"resourceId": "room-b", "resourceName": "Phòng B", "kind": "room", "busy": []}]}
```

### Ví dụ: thiếu ngày

```http
GET /api/schedule
Authorization: Bearer {{token:thao}}
```

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{"error": {"code": "VALIDATION", "message": "Dữ liệu chưa hợp lệ.", "fields": {"date": "Chọn ngày (YYYY-MM-DD)."}}}
```

---

## `POST /api/schedule/check`

Kiểm tra một giờ makeup + giờ chụp có trùng với lịch bận không. Câu trả lời nói **bằng chữ** có trùng không, trùng với ai, vì sao, và giờ nào trống thay thế, để front-end không phải chỉ dựa vào màu.

- **Vai trò:** admin.
- Dùng ở G5 (trước khi gửi đề xuất) và G10 (đổi giờ booking). Ở G10, gửi `excludeBookingId` để bỏ qua các khung giờ của chính booking đang đổi.
- Trùng lịch là câu trả lời bình thường (`200`, `available: false`), không phải lỗi.
- **Mock:** khi `MOCK_MODE=empty`, `clashes` và `suggestions` là `[]` kể cả khi trùng. Front-end vẫn phải đọc `available` và `summary` để biết kết quả, không suy ra từ list rỗng.

**Body** (`application/json`)

| Field | Kiểu | Bắt buộc | Giới hạn |
|---|---|---|---|
| `date` | string | có | YYYY-MM-DD, ngày có thật |
| `makeup` | object \| null | không | `null` hoặc không gửi = không makeup |
| `makeup.start` | string | có, nếu có `makeup` | HH:mm, từ 08:00 |
| `makeup.end` | string | có, nếu có `makeup` | HH:mm, sau `makeup.start`, tới 20:00, không sau `shoot.start` |
| `makeup.staffId` | string | có, nếu có `makeup` | id nhân viên có `skill` `makeup` |
| `shoot` | object | có | |
| `shoot.start` | string | có | HH:mm, từ 08:00 |
| `shoot.end` | string | có | HH:mm, sau `shoot.start`, tới 20:00 |
| `shoot.staffId` | string | có | id nhân viên có `skill` `photo` |
| `shoot.roomId` | string | có | id phòng có thật |
| `excludeBookingId` | string | không | id booking có thật |

**200 OK**

| Field | Kiểu | Ghi chú |
|---|---|---|
| `available` | boolean | `true` = makeup (nếu có), nhân viên chụp và phòng đều rảnh |
| `summary` | string | Một câu để hiện thẳng. Trùng: `"09:00 bị trùng: Mai đã có lịch 08:00–12:00."` Trống: `"13:00–16:00 còn trống: Mai, Tuấn và Phòng B đều rảnh."` |
| `clashes` | clash[] | Mỗi lịch bận bị trùng một dòng, theo thứ tự: thợ makeup, nhân viên chụp, phòng. Trống thì `[]` |
| `suggestions` | suggestion[] | Tối đa 2 giờ trống thay thế. Trống thì `[]`. Trùng mà không tìm được giờ nào thì cũng `[]`, và `summary` nói rõ ngày đó hết giờ trống |

`clash`

| Field | Kiểu | Ghi chú |
|---|---|---|
| `resourceId` | string | id nhân viên hoặc phòng bị trùng |
| `resourceName` | string | |
| `busyStart` | string | HH:mm, giờ bắt đầu lịch đã có |
| `busyEnd` | string | HH:mm |
| `reason` | string | Câu đọc được, vd. `"Mai đang makeup cho lớp 12A1 từ 08:00 đến 12:00, trùng giờ makeup 09:00–10:00."` |

`suggestion`

| Field | Kiểu | Ghi chú |
|---|---|---|
| `date` | string | YYYY-MM-DD, cùng ngày với `date` gửi lên |
| `makeup` | object \| null | `{start, end, staffId, staffName}`; `null` khi request không có makeup |
| `shoot` | object | `{start, end, staffId, staffName, roomId, roomName}` |
| `label` | string | Chữ ngắn để hiện trên nút, vd. `"Gần nhất"` |

Cách tìm gợi ý: cùng ngày, giữ độ dài makeup và độ dài chụp, makeup xong thì chụp ngay; ưu tiên cùng nhân viên và phòng đã chọn, nếu không được thì đổi sang nhân viên cùng `skill` hoặc phòng khác. Giờ bắt đầu tròn giờ, trong giờ mở cửa, cách lịch bận trước đó của cùng người/phòng ít nhất 60 phút (để nghỉ và chuẩn bị). Sắp theo độ gần với giờ admin đã chọn; cái đầu có `label` `"Gần nhất"`.

**Lỗi**
- `400 VALIDATION`: một thông báo cho mỗi field sai trong `fields`, khóa viết có dấu chấm (`"shoot.start"`, `"makeup.staffId"`). Giờ kết thúc không sau giờ bắt đầu thì báo ở `*.end`. Nhân viên sai `skill` thì báo ở `*.staffId`.
- `401 UNAUTHENTICATED`: thiếu token, hoặc token không hợp lệ.
- `403 FORBIDDEN`: token không phải admin.
- `404 NOT_FOUND`: `excludeBookingId` không ứng với booking nào. Chỉ kiểm tra sau khi body đã hợp lệ.

### Ví dụ: 09:00 bị trùng (G5)

```http
POST /api/schedule/check
Authorization: Bearer {{token:thao}}
Content-Type: application/json

{"date": "2026-10-24", "makeup": {"start": "09:00", "end": "10:00", "staffId": "u-mai"}, "shoot": {"start": "10:00", "end": "12:00", "staffId": "u-tuan", "roomId": "room-b"}}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"available": false, "summary": "09:00 bị trùng: Mai đã có lịch 08:00–12:00, Tuấn đã có lịch 09:00–11:00.", "clashes": [{"resourceId": "u-mai", "resourceName": "Mai", "busyStart": "08:00", "busyEnd": "12:00", "reason": "Mai đang makeup cho lớp 12A1 từ 08:00 đến 12:00, trùng giờ makeup 09:00–10:00."}, {"resourceId": "u-tuan", "resourceName": "Tuấn", "busyStart": "09:00", "busyEnd": "11:00", "reason": "Tuấn đang chụp cho Gia đình Ngọc từ 09:00 đến 11:00, trùng giờ chụp 10:00–11:00."}], "suggestions": [{"date": "2026-10-24", "makeup": {"start": "13:00", "end": "14:00", "staffId": "u-mai", "staffName": "Mai"}, "shoot": {"start": "14:00", "end": "16:00", "staffId": "u-tuan", "staffName": "Tuấn", "roomId": "room-b", "roomName": "Phòng B"}, "label": "Gần nhất"}, {"date": "2026-10-24", "makeup": {"start": "14:00", "end": "15:00", "staffId": "u-mai", "staffName": "Mai"}, "shoot": {"start": "15:00", "end": "17:00", "staffId": "u-tuan", "staffName": "Tuấn", "roomId": "room-b", "roomName": "Phòng B"}, "label": "Muộn hơn 1 giờ"}]}
```

### Ví dụ: 13:00 còn trống

```http
POST /api/schedule/check
Authorization: Bearer {{token:thao}}
Content-Type: application/json

{"date": "2026-10-24", "makeup": {"start": "13:00", "end": "14:00", "staffId": "u-mai"}, "shoot": {"start": "14:00", "end": "16:00", "staffId": "u-tuan", "roomId": "room-b"}}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"available": true, "summary": "13:00–16:00 còn trống: Mai, Tuấn và Phòng B đều rảnh.", "clashes": [], "suggestions": []}
```

### Ví dụ: giờ và nhân viên không hợp lệ

```http
POST /api/schedule/check
Authorization: Bearer {{token:thao}}
Content-Type: application/json

{"date": "2026-10-24", "makeup": {"start": "13:00", "end": "14:00", "staffId": "u-tuan"}, "shoot": {"start": "16:00", "end": "14:00", "staffId": "u-tuan", "roomId": "room-b"}}
```

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{"error": {"code": "VALIDATION", "message": "Dữ liệu chưa hợp lệ.", "fields": {"makeup.staffId": "Tuấn không làm makeup. Chọn thợ makeup.", "shoot.end": "Giờ kết thúc phải sau giờ bắt đầu."}}}
```

### Ví dụ: booking cần bỏ qua không tồn tại (G10)

```http
POST /api/schedule/check
Authorization: Bearer {{token:thao}}
Content-Type: application/json

{"date": "2026-10-24", "makeup": {"start": "13:00", "end": "14:00", "staffId": "u-mai"}, "shoot": {"start": "14:00", "end": "16:00", "staffId": "u-tuan", "roomId": "room-b"}, "excludeBookingId": "GS-9999"}
```

```http
HTTP/1.1 404 Not Found
Content-Type: application/json

{"error": {"code": "NOT_FOUND", "message": "Không tìm thấy booking GS-9999."}}
```

## Changes

- 26/11/2026 — Tạo file. Chưa có front-end nào gọi tới.
