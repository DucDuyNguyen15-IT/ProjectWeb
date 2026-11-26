# Conversations — hội thoại, yêu cầu đặt lịch, đề xuất lịch

Bước G3–G6. Dạng lỗi chung và mã trạng thái: xem [README.md](README.md). Tên token trong ví dụ (`linh`, `thao`…): xem [01-auth.md](01-auth.md).

Mỗi khách có **đúng một** hội thoại với studio. Yêu cầu đặt lịch (G3) là một tin nhắn đặc biệt (`type: "request"`) trong hội thoại đó. Đề xuất lịch của admin (G5) cũng hiện thành một tin nhắn (`type: "proposal"`). Booking được tạo sau, ở [05-bookings.md](05-bookings.md), từ đề xuất khách đã đồng ý.

## Quy tắc chung

- **Thứ tự kiểm tra:** `401` (token) → `403` (vai trò) → `404` (id hội thoại / đề xuất) → `403` (hội thoại không phải của khách đang gọi) → `400` (body, query) → `409` (trạng thái, trùng lịch). Request bị lỗi không thay đổi gì và không tốn id.
- **Id mới** cấp tuần tự từ lúc mock khởi động: tin nhắn `m-3`, `m-4`…, đề xuất `p-1`, `p-2`…
- **"Hôm nay" của mock** cố định là `2026-10-21` (ngày trong câu chuyện), để ví dụ ngày `2026-10-24` vẫn hợp lệ dù chạy vào ngày thật nào. `sentAt` / `createdAt` của tin nhắn, đề xuất mới cũng là thời điểm trong ngày đó. PA#4 dùng ngày thật.
- **Giờ mở cửa:** 08:00–20:00. Mọi giờ (`HH:mm`) trong yêu cầu và đề xuất phải nằm trong khoảng này.
- **Trạng thái hội thoại** chỉ đổi ở các chỗ sau trong file này:
  - Admin gửi tin nhắn vào hội thoại `"Chưa trả lời"` → `"Đang tư vấn"`.
  - Khách đồng ý đề xuất → `"Đã chốt lịch"`.
  - `"Hoàn thành"` do luồng booking đặt (không thuộc file này).
- **Đề xuất không giữ lịch.** Chỉ booking (05) mới chiếm lịch của nhân viên và phòng. Vì vậy đề xuất đã được đồng ý vẫn chưa làm `POST /api/schedule/check` (04) báo trùng.

## Dữ liệu khởi đầu của mock

| Id | Khách (`customer`) | `status` | `topic` | Tin nhắn |
|---|---|---|---|---|
| `c-linh` | `u-linh` · `"Linh"` | `"Đang tư vấn"` | `"Gói Tốt nghiệp Premium"` | `m-1` (Linh, `2026-10-20T17:20:00+07:00`): *"Gói tốt nghiệp có makeup còn lịch 24/10 lúc 09:00 không?"* · `m-2` (Thảo, `2026-10-20T17:25:00+07:00`): *"Để mình kiểm tra lịch cho bạn nhé"*. Chưa có đề xuất |
| `c-khoa` | `u-khoa` · `"Trần Minh Khoa"` | `"Chưa trả lời"` | `"Gói Kỷ yếu"` | 1 tin của khách, `2026-10-21T08:05:00+07:00` |
| `c-giabao` | `u-giabao` · `"Hồ Gia Bảo · Lớp 12A3 — đại diện lớp"` | `"Đã chốt lịch"` | `"Gói Kỷ yếu"` | vài tin, tin cuối `2026-10-19T20:10:00+07:00` |
| `c-anh` | `u-anh` · `"Phạm Hoàng Anh"` | `"Hoàn thành"` | `"Gói Chân dung"` | vài tin, tin cuối `2026-10-15T10:30:00+07:00` |

Lịch bận dùng để kiểm tra trùng là lịch của [04-schedule.md](04-schedule.md): Mai (makeup) bận 08:00–12:00 ngày `2026-10-24`.

Nhân viên và phòng dùng trong đề xuất:

| Id | Tên | Dùng cho |
|---|---|---|
| `u-mai` | Mai | `makeup.staffId` |
| `u-tuan` | Tuấn | `shoot.staffId` |
| `u-ha` | Hà | `shoot.staffId` |
| `room-a` | Phòng A | `shoot.roomId` |
| `room-b` | Phòng B | `shoot.roomId` |

## Đối tượng `summary` (một dòng trong danh sách)

| Field | Kiểu | Ghi chú |
|---|---|---|
| `id` | string | `c-linh`… |
| `customer` | object | `{id, name}` của khách |
| `status` | string | `"Chưa trả lời"` · `"Đang tư vấn"` · `"Đã chốt lịch"` · `"Hoàn thành"` |
| `lastMessage` | object | `{text, sentAt}` của tin nhắn mới nhất |
| `unread` | integer | Số tin của phía bên kia gửi sau tin cuối cùng của người gọi (khách: tin của studio; admin: tin của khách) |
| `updatedAt` | string | Thời điểm, bằng `lastMessage.sentAt` |

## Đối tượng `message`

Mọi tin nhắn có cùng các field. Field không dùng tới thì là `null`.

| Field | Kiểu | Ghi chú |
|---|---|---|
| `id` | string | `m-1`… |
| `type` | string | `"text"` · `"request"` · `"proposal"` |
| `sender` | object | `{id, name, role}`. Tin `proposal` do admin gửi |
| `text` | string | Nội dung. Với `request` và `proposal`, server tự viết một câu tóm tắt để hiện trong chat |
| `sentAt` | string | Thời điểm |
| `requestDetails` | object \| null | Chỉ có ở `request`: `{serviceId, packageId, preferredDate, preferredTime, extraIds, note}` (`packageId`, `note` có thể `null`; `extraIds` có thể `[]`) |
| `proposalId` | string \| null | Chỉ có ở `proposal`: id của đề xuất, xem `proposals` |

## Đối tượng `proposal`

| Field | Kiểu | Ghi chú |
|---|---|---|
| `id` | string | `p-1`… |
| `date` | string | Ngày chụp, `YYYY-MM-DD` |
| `makeup` | object \| null | `{start, end, staffId, staffName}`, `null` nếu không có makeup |
| `shoot` | object | `{start, end, staffId, staffName, roomId, roomName}` |
| `status` | string | `"Chờ khách trả lời"` · `"Đã đồng ý"` · `"Đã từ chối"` |
| `createdAt` | string | Thời điểm |

---

## `GET /api/conversations`

Danh sách hội thoại, mới nhất trước (theo `updatedAt`). Khách chỉ thấy hội thoại của mình (danh sách 1 phần tử). Admin thấy tất cả.

- **Vai trò:** customer, admin.

**Query**

| Field | Kiểu | Bắt buộc | Giới hạn |
|---|---|---|---|
| `status` | string | không | Một trong 4 trạng thái hội thoại (nhớ URL-encode) |

**200 OK**: `{"conversations": [summary, …]}`

**Lỗi**
- `400 VALIDATION`: `status` không phải một trong 4 trạng thái, thông báo ở `fields.status`.
- `401 UNAUTHENTICATED`: thiếu token hoặc token không hợp lệ.
- `403 FORBIDDEN`: vai trò `staff`, `superadmin`.

### Ví dụ: Linh xem hội thoại của mình

```http
GET /api/conversations
Authorization: Bearer {{token:linh}}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"conversations": [
  {"id": "c-linh", "customer": {"id": "u-linh", "name": "Linh"}, "status": "Đang tư vấn", "lastMessage": {"text": "Để mình kiểm tra lịch cho bạn nhé", "sentAt": "2026-10-20T17:25:00+07:00"}, "unread": 1, "updatedAt": "2026-10-20T17:25:00+07:00"}
]}
```

---

## `GET /api/conversations/:id`

Một hội thoại, đủ tin nhắn (cũ trước, mới sau) và các đề xuất (cũ trước).

- **Vai trò:** customer (chỉ hội thoại của mình), admin.

**200 OK**: `{"conversation": {id, customer, status, topic, messages: [message, …], proposals: [proposal, …]}}`

`topic` là tên gói / dịch vụ đang tư vấn, vd. `"Gói Tốt nghiệp Premium"`.

**Lỗi**
- `401 UNAUTHENTICATED`: thiếu token hoặc token không hợp lệ.
- `403 FORBIDDEN`: vai trò khác customer/admin, hoặc khách xem hội thoại của khách khác.
- `404 NOT_FOUND`: không có hội thoại với id đó.

### Ví dụ: Linh mở hội thoại của mình

```http
GET /api/conversations/c-linh
Authorization: Bearer {{token:linh}}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"conversation": {
  "id": "c-linh",
  "customer": {"id": "u-linh", "name": "Linh"},
  "status": "Đang tư vấn",
  "topic": "Gói Tốt nghiệp Premium",
  "messages": [
    {"id": "m-1", "type": "text", "sender": {"id": "u-linh", "name": "Linh", "role": "customer"}, "text": "Gói tốt nghiệp có makeup còn lịch 24/10 lúc 09:00 không?", "sentAt": "2026-10-20T17:20:00+07:00", "requestDetails": null, "proposalId": null},
    {"id": "m-2", "type": "text", "sender": {"id": "u-thao", "name": "Thảo", "role": "admin"}, "text": "Để mình kiểm tra lịch cho bạn nhé", "sentAt": "2026-10-20T17:25:00+07:00", "requestDetails": null, "proposalId": null}
  ],
  "proposals": []
}}
```

### Ví dụ: Linh mở hội thoại của khách khác

```http
GET /api/conversations/c-khoa
Authorization: Bearer {{token:linh}}
```

```http
HTTP/1.1 403 Forbidden
Content-Type: application/json

{"error": {"code": "FORBIDDEN", "message": "Bạn không có quyền xem hội thoại này."}}
```

### Ví dụ: Admin Thảo xem tất cả hội thoại

```http
GET /api/conversations
Authorization: Bearer {{token:thao}}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"conversations": [
  {"id": "c-khoa", "customer": {"id": "u-khoa", "name": "Trần Minh Khoa"}, "status": "Chưa trả lời", "lastMessage": {"text": "Cho mình hỏi giá gói kỷ yếu cho lớp 40 bạn ạ.", "sentAt": "2026-10-21T08:05:00+07:00"}, "unread": 1, "updatedAt": "2026-10-21T08:05:00+07:00"},
  {"id": "c-linh", "customer": {"id": "u-linh", "name": "Linh"}, "status": "Đang tư vấn", "lastMessage": {"text": "Để mình kiểm tra lịch cho bạn nhé", "sentAt": "2026-10-20T17:25:00+07:00"}, "unread": 0, "updatedAt": "2026-10-20T17:25:00+07:00"},
  {"id": "c-giabao", "customer": {"id": "u-giabao", "name": "Hồ Gia Bảo · Lớp 12A3 — đại diện lớp"}, "status": "Đã chốt lịch", "lastMessage": {"text": "Cảm ơn studio, hẹn gặp ngày chụp!", "sentAt": "2026-10-19T20:10:00+07:00"}, "unread": 1, "updatedAt": "2026-10-19T20:10:00+07:00"},
  {"id": "c-anh", "customer": {"id": "u-anh", "name": "Phạm Hoàng Anh"}, "status": "Hoàn thành", "lastMessage": {"text": "Ảnh đẹp lắm, cảm ơn studio!", "sentAt": "2026-10-15T10:30:00+07:00"}, "unread": 1, "updatedAt": "2026-10-15T10:30:00+07:00"}
]}
```

### Ví dụ: Thảo lọc hội thoại "Chưa trả lời"

```http
GET /api/conversations?status=Ch%C6%B0a%20tr%E1%BA%A3%20l%E1%BB%9Di
Authorization: Bearer {{token:thao}}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"conversations": [
  {"id": "c-khoa", "customer": {"id": "u-khoa", "name": "Trần Minh Khoa"}, "status": "Chưa trả lời", "lastMessage": {"text": "Cho mình hỏi giá gói kỷ yếu cho lớp 40 bạn ạ.", "sentAt": "2026-10-21T08:05:00+07:00"}, "unread": 1, "updatedAt": "2026-10-21T08:05:00+07:00"}
]}
```

### Ví dụ: lọc theo trạng thái không có

```http
GET /api/conversations?status=abc
Authorization: Bearer {{token:thao}}
```

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{"error": {"code": "VALIDATION", "message": "Dữ liệu chưa hợp lệ.", "fields": {"status": "Trạng thái phải là Chưa trả lời, Đang tư vấn, Đã chốt lịch hoặc Hoàn thành."}}}
```

### Ví dụ: không có token

```http
GET /api/conversations
```

```http
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{"error": {"code": "UNAUTHENTICATED", "message": "Bạn cần đăng nhập."}}
```

### Ví dụ: hội thoại không tồn tại

```http
GET /api/conversations/c-khong-co
Authorization: Bearer {{token:thao}}
```

```http
HTTP/1.1 404 Not Found
Content-Type: application/json

{"error": {"code": "NOT_FOUND", "message": "Không tìm thấy hội thoại."}}
```

---

## `POST /api/conversations/:id/messages`

Gửi một tin nhắn chữ (`type: "text"`). Khi admin gửi vào hội thoại `"Chưa trả lời"`, hội thoại chuyển sang `"Đang tư vấn"`. Gửi được ở mọi trạng thái hội thoại.

- **Vai trò:** customer (chỉ hội thoại của mình), admin.

**Body** (`application/json`)

| Field | Kiểu | Bắt buộc | Giới hạn |
|---|---|---|---|
| `text` | string | có | 1–1000 ký tự, sau khi bỏ khoảng trắng hai đầu |

**201 Created**: `{"message": message}`

**Lỗi**
- `400 VALIDATION`: thiếu, rỗng hoặc quá dài `text`, thông báo ở `fields.text`.
- `401 UNAUTHENTICATED`: thiếu token hoặc token không hợp lệ.
- `403 FORBIDDEN`: vai trò khác customer/admin, hoặc khách gửi vào hội thoại của khách khác.
- `404 NOT_FOUND`: không có hội thoại với id đó.

### Ví dụ: Linh gửi tin nhắn

```http
POST /api/conversations/c-linh/messages
Authorization: Bearer {{token:linh}}
Content-Type: application/json

{"text": "Dạ, mình gửi yêu cầu đặt lịch luôn nhé."}
```

```http
HTTP/1.1 201 Created
Content-Type: application/json

{"message": {"id": "m-3", "type": "text", "sender": {"id": "u-linh", "name": "Linh", "role": "customer"}, "text": "Dạ, mình gửi yêu cầu đặt lịch luôn nhé.", "sentAt": "2026-10-21T09:00:00+07:00", "requestDetails": null, "proposalId": null}}
```

### Ví dụ: tin nhắn rỗng

```http
POST /api/conversations/c-linh/messages
Authorization: Bearer {{token:linh}}
Content-Type: application/json

{"text": "   "}
```

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{"error": {"code": "VALIDATION", "message": "Dữ liệu chưa hợp lệ.", "fields": {"text": "Nhập nội dung tin nhắn."}}}
```

---

## `POST /api/conversations/:id/requests`

Khách gửi yêu cầu đặt lịch (G3). Yêu cầu hiện trong chat thành một tin nhắn `type: "request"`, có `requestDetails`. Không đổi trạng thái hội thoại.

- **Vai trò:** customer (chỉ hội thoại của mình).

**Body** (`application/json`)

| Field | Kiểu | Bắt buộc | Giới hạn |
|---|---|---|---|
| `serviceId` | string | có | `svc-ky-yeu` · `svc-tot-nghiep` · `svc-chan-dung` |
| `packageId` | string | không | Một gói của `serviceId` đó (xem `GET /api/services`), vd. `pkg-tn-premium`. Chỉ kiểm tra khi `serviceId` hợp lệ |
| `preferredDate` | string | có | `YYYY-MM-DD`, từ hôm nay trở đi |
| `preferredTime` | string | có | `HH:mm`, trong giờ mở cửa 08:00–20:00 |
| `extraIds` | string[] | không | Mỗi phần tử là `ex-makeup` hoặc `ex-costume`, không trùng nhau. Mặc định `[]` |
| `note` | string | không | Tối đa 500 ký tự. Mặc định `null` |

**201 Created**: `{"message": message}` với `message.type = "request"`.

**Lỗi**
- `400 VALIDATION`: mỗi field sai một thông báo trong `fields`, khóa đúng tên field ở bảng trên.
- `401 UNAUTHENTICATED`: thiếu token hoặc token không hợp lệ.
- `403 FORBIDDEN`: vai trò không phải customer (kể cả admin), hoặc hội thoại của khách khác.
- `404 NOT_FOUND`: không có hội thoại với id đó.

### Ví dụ: Linh gửi yêu cầu đặt lịch

```http
POST /api/conversations/c-linh/requests
Authorization: Bearer {{token:linh}}
Content-Type: application/json

{"serviceId": "svc-tot-nghiep", "packageId": "pkg-tn-premium", "preferredDate": "2026-10-24", "preferredTime": "09:00", "extraIds": ["ex-makeup"], "note": "Chụp cùng bố mẹ."}
```

```http
HTTP/1.1 201 Created
Content-Type: application/json

{"message": {"id": "m-4", "type": "request", "sender": {"id": "u-linh", "name": "Linh", "role": "customer"}, "text": "Yêu cầu đặt lịch: Gói Tốt nghiệp Premium, 24/10/2026 lúc 09:00, thêm Makeup.", "sentAt": "2026-10-21T09:02:00+07:00", "requestDetails": {"serviceId": "svc-tot-nghiep", "packageId": "pkg-tn-premium", "preferredDate": "2026-10-24", "preferredTime": "09:00", "extraIds": ["ex-makeup"], "note": "Chụp cùng bố mẹ."}, "proposalId": null}}
```

### Ví dụ: yêu cầu thiếu dịch vụ, giờ ngoài giờ mở cửa

```http
POST /api/conversations/c-linh/requests
Authorization: Bearer {{token:linh}}
Content-Type: application/json

{"packageId": "pkg-tn-premium", "preferredDate": "2026-10-24", "preferredTime": "23:00"}
```

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{"error": {"code": "VALIDATION", "message": "Dữ liệu chưa hợp lệ.", "fields": {"serviceId": "Chọn dịch vụ.", "preferredTime": "Giờ phải trong giờ mở cửa 08:00–20:00."}}}
```

### Ví dụ: admin gửi yêu cầu đặt lịch

```http
POST /api/conversations/c-linh/requests
Authorization: Bearer {{token:thao}}
Content-Type: application/json

{"serviceId": "svc-tot-nghiep", "preferredDate": "2026-10-24", "preferredTime": "09:00"}
```

```http
HTTP/1.1 403 Forbidden
Content-Type: application/json

{"error": {"code": "FORBIDDEN", "message": "Chỉ khách hàng mới gửi được yêu cầu đặt lịch."}}
```

### Ví dụ: Thảo trả lời Linh

```http
POST /api/conversations/c-linh/messages
Authorization: Bearer {{token:thao}}
Content-Type: application/json

{"text": "Sáng 24/10 bạn Mai makeup đã kín lịch, mình gửi bạn lịch buổi chiều nhé."}
```

```http
HTTP/1.1 201 Created
Content-Type: application/json

{"message": {"id": "m-5", "type": "text", "sender": {"id": "u-thao", "name": "Thảo", "role": "admin"}, "text": "Sáng 24/10 bạn Mai makeup đã kín lịch, mình gửi bạn lịch buổi chiều nhé.", "sentAt": "2026-10-21T09:10:00+07:00", "requestDetails": null, "proposalId": null}}
```

---

## `POST /api/conversations/:id/proposals`

Admin gửi đề xuất lịch (G5). Server kiểm tra trùng lịch như `POST /api/schedule/check`. Nếu trống, tạo `proposal` (`"Chờ khách trả lời"`) và một tin nhắn `type: "proposal"` trỏ tới nó.

- **Vai trò:** admin.

**Body** (`application/json`)

| Field | Kiểu | Bắt buộc | Giới hạn |
|---|---|---|---|
| `date` | string | có | `YYYY-MM-DD`, từ hôm nay trở đi |
| `makeup` | object \| null | không | `null` hoặc bỏ trống nếu không makeup |
| `makeup.start` | string | có (nếu có `makeup`) | `HH:mm`, trong 08:00–20:00 |
| `makeup.end` | string | có (nếu có `makeup`) | `HH:mm`, sau `makeup.start`, không muộn hơn `shoot.start` |
| `makeup.staffId` | string | có (nếu có `makeup`) | `u-mai` |
| `shoot` | object | có | |
| `shoot.start` | string | có | `HH:mm`, trong 08:00–20:00 |
| `shoot.end` | string | có | `HH:mm`, sau `shoot.start`, không muộn hơn 20:00 |
| `shoot.staffId` | string | có | `u-tuan` · `u-ha` |
| `shoot.roomId` | string | có | `room-a` · `room-b` |

**201 Created**: `{"proposal": proposal, "message": message}` với `message.type = "proposal"`, `message.proposalId = proposal.id`.

**Lỗi**
- `400 VALIDATION`: mỗi field sai một thông báo trong `fields`, khóa viết theo đường dẫn: `date`, `makeup`, `makeup.start`, `makeup.end`, `makeup.staffId`, `shoot`, `shoot.start`, `shoot.end`, `shoot.staffId`, `shoot.roomId`.
- `401 UNAUTHENTICATED`: thiếu token hoặc token không hợp lệ.
- `403 FORBIDDEN`: vai trò không phải admin.
- `404 NOT_FOUND`: không có hội thoại với id đó.
- `409 CONFLICT`: giờ đề xuất trùng lịch của nhân viên makeup, thợ chụp hoặc phòng (`message` nói rõ ai bận lúc nào); hoặc hội thoại đã `"Đã chốt lịch"` / `"Hoàn thành"`.

### Ví dụ: đề xuất trùng lịch của Mai

```http
POST /api/conversations/c-linh/proposals
Authorization: Bearer {{token:thao}}
Content-Type: application/json

{"date": "2026-10-24", "makeup": {"start": "09:00", "end": "10:00", "staffId": "u-mai"}, "shoot": {"start": "10:00", "end": "12:00", "staffId": "u-tuan", "roomId": "room-b"}}
```

```http
HTTP/1.1 409 Conflict
Content-Type: application/json

{"error": {"code": "CONFLICT", "message": "Trùng lịch: Mai đã có lịch 08:00–12:00 ngày 24/10/2026."}}
```

### Ví dụ: đề xuất sai dữ liệu

```http
POST /api/conversations/c-linh/proposals
Authorization: Bearer {{token:thao}}
Content-Type: application/json

{"date": "24/10/2026", "makeup": null, "shoot": {"start": "14:00", "staffId": "u-tuan", "roomId": "room-z"}}
```

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{"error": {"code": "VALIDATION", "message": "Dữ liệu chưa hợp lệ.", "fields": {"date": "Ngày phải có dạng YYYY-MM-DD.", "shoot.end": "Nhập giờ kết thúc buổi chụp.", "shoot.roomId": "Phòng không tồn tại."}}}
```

### Ví dụ: khách gửi đề xuất

```http
POST /api/conversations/c-linh/proposals
Authorization: Bearer {{token:linh}}
Content-Type: application/json

{"date": "2026-10-24", "makeup": null, "shoot": {"start": "14:00", "end": "16:00", "staffId": "u-tuan", "roomId": "room-b"}}
```

```http
HTTP/1.1 403 Forbidden
Content-Type: application/json

{"error": {"code": "FORBIDDEN", "message": "Chỉ admin mới gửi được đề xuất lịch."}}
```

### Ví dụ: Thảo đề xuất lịch chiều muộn (p-1)

```http
POST /api/conversations/c-linh/proposals
Authorization: Bearer {{token:thao}}
Content-Type: application/json

{"date": "2026-10-24", "makeup": {"start": "15:00", "end": "16:00", "staffId": "u-mai"}, "shoot": {"start": "16:00", "end": "18:00", "staffId": "u-tuan", "roomId": "room-b"}}
```

```http
HTTP/1.1 201 Created
Content-Type: application/json

{"proposal": {"id": "p-1", "date": "2026-10-24", "makeup": {"start": "15:00", "end": "16:00", "staffId": "u-mai", "staffName": "Mai"}, "shoot": {"start": "16:00", "end": "18:00", "staffId": "u-tuan", "staffName": "Tuấn", "roomId": "room-b", "roomName": "Phòng B"}, "status": "Chờ khách trả lời", "createdAt": "2026-10-21T09:15:00+07:00"},
 "message": {"id": "m-6", "type": "proposal", "sender": {"id": "u-thao", "name": "Thảo", "role": "admin"}, "text": "Đề xuất lịch 24/10/2026: makeup 15:00–16:00 với Mai, chụp 16:00–18:00 với Tuấn ở Phòng B.", "sentAt": "2026-10-21T09:15:00+07:00", "requestDetails": null, "proposalId": "p-1"}}
```

---

## `POST /api/conversations/:id/proposals/:proposalId/answer`

Khách trả lời đề xuất (G6). Không tạo tin nhắn mới: front-end hiện trạng thái mới trên thẻ đề xuất trong chat.

- `accept` → đề xuất `"Đã đồng ý"`, hội thoại `"Đã chốt lịch"`. Admin tạo booking từ đề xuất này ở `POST /api/bookings` (05).
- `decline` → đề xuất `"Đã từ chối"`, hội thoại giữ `"Đang tư vấn"`.

- **Vai trò:** customer (chỉ hội thoại của mình).

**Body** (`application/json`)

| Field | Kiểu | Bắt buộc | Giới hạn |
|---|---|---|---|
| `answer` | string | có | `accept` · `decline` |

**200 OK**: `{"proposal": proposal, "conversation": {id, status}}`

**Lỗi**
- `400 VALIDATION`: thiếu hoặc sai `answer`, thông báo ở `fields.answer`.
- `401 UNAUTHENTICATED`: thiếu token hoặc token không hợp lệ.
- `403 FORBIDDEN`: vai trò không phải customer (kể cả admin), hoặc hội thoại của khách khác.
- `404 NOT_FOUND`: không có hội thoại, hoặc hội thoại không có đề xuất với `proposalId` đó.
- `409 CONFLICT`: đề xuất đã được trả lời rồi (không còn `"Chờ khách trả lời"`).

### Ví dụ: Linh từ chối p-1

```http
POST /api/conversations/c-linh/proposals/p-1/answer
Authorization: Bearer {{token:linh}}
Content-Type: application/json

{"answer": "decline"}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"proposal": {"id": "p-1", "date": "2026-10-24", "makeup": {"start": "15:00", "end": "16:00", "staffId": "u-mai", "staffName": "Mai"}, "shoot": {"start": "16:00", "end": "18:00", "staffId": "u-tuan", "staffName": "Tuấn", "roomId": "room-b", "roomName": "Phòng B"}, "status": "Đã từ chối", "createdAt": "2026-10-21T09:15:00+07:00"},
 "conversation": {"id": "c-linh", "status": "Đang tư vấn"}}
```

### Ví dụ: Thảo đề xuất lịch 13:00 (p-2)

```http
POST /api/conversations/c-linh/proposals
Authorization: Bearer {{token:thao}}
Content-Type: application/json

{"date": "2026-10-24", "makeup": {"start": "13:00", "end": "14:00", "staffId": "u-mai"}, "shoot": {"start": "14:00", "end": "16:00", "staffId": "u-tuan", "roomId": "room-b"}}
```

```http
HTTP/1.1 201 Created
Content-Type: application/json

{"proposal": {"id": "p-2", "date": "2026-10-24", "makeup": {"start": "13:00", "end": "14:00", "staffId": "u-mai", "staffName": "Mai"}, "shoot": {"start": "14:00", "end": "16:00", "staffId": "u-tuan", "staffName": "Tuấn", "roomId": "room-b", "roomName": "Phòng B"}, "status": "Chờ khách trả lời", "createdAt": "2026-10-21T09:30:00+07:00"},
 "message": {"id": "m-7", "type": "proposal", "sender": {"id": "u-thao", "name": "Thảo", "role": "admin"}, "text": "Đề xuất lịch 24/10/2026: makeup 13:00–14:00 với Mai, chụp 14:00–16:00 với Tuấn ở Phòng B.", "sentAt": "2026-10-21T09:30:00+07:00", "requestDetails": null, "proposalId": "p-2"}}
```

### Ví dụ: Linh đồng ý p-2

```http
POST /api/conversations/c-linh/proposals/p-2/answer
Authorization: Bearer {{token:linh}}
Content-Type: application/json

{"answer": "accept"}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"proposal": {"id": "p-2", "date": "2026-10-24", "makeup": {"start": "13:00", "end": "14:00", "staffId": "u-mai", "staffName": "Mai"}, "shoot": {"start": "14:00", "end": "16:00", "staffId": "u-tuan", "staffName": "Tuấn", "roomId": "room-b", "roomName": "Phòng B"}, "status": "Đã đồng ý", "createdAt": "2026-10-21T09:30:00+07:00"},
 "conversation": {"id": "c-linh", "status": "Đã chốt lịch"}}
```

### Ví dụ: trả lời p-2 lần nữa

```http
POST /api/conversations/c-linh/proposals/p-2/answer
Authorization: Bearer {{token:linh}}
Content-Type: application/json

{"answer": "decline"}
```

```http
HTTP/1.1 409 Conflict
Content-Type: application/json

{"error": {"code": "CONFLICT", "message": "Đề xuất này đã được trả lời."}}
```

### Ví dụ: câu trả lời không hợp lệ

```http
POST /api/conversations/c-linh/proposals/p-2/answer
Authorization: Bearer {{token:linh}}
Content-Type: application/json

{"answer": "maybe"}
```

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{"error": {"code": "VALIDATION", "message": "Dữ liệu chưa hợp lệ.", "fields": {"answer": "Câu trả lời phải là accept hoặc decline."}}}
```

### Ví dụ: đề xuất không tồn tại

```http
POST /api/conversations/c-linh/proposals/p-99/answer
Authorization: Bearer {{token:linh}}
Content-Type: application/json

{"answer": "accept"}
```

```http
HTTP/1.1 404 Not Found
Content-Type: application/json

{"error": {"code": "NOT_FOUND", "message": "Không tìm thấy đề xuất."}}
```

### Ví dụ: hội thoại của Linh sau khi chốt lịch

Đây là trạng thái mà [05-bookings.md](05-bookings.md) dựa vào: `c-linh` `"Đã chốt lịch"`, đề xuất `p-2` `"Đã đồng ý"`.

```http
GET /api/conversations/c-linh
Authorization: Bearer {{token:linh}}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"conversation": {
  "id": "c-linh",
  "customer": {"id": "u-linh", "name": "Linh"},
  "status": "Đã chốt lịch",
  "topic": "Gói Tốt nghiệp Premium",
  "messages": [
    {"id": "m-1", "type": "text", "sender": {"id": "u-linh", "name": "Linh", "role": "customer"}, "text": "Gói tốt nghiệp có makeup còn lịch 24/10 lúc 09:00 không?", "sentAt": "2026-10-20T17:20:00+07:00", "requestDetails": null, "proposalId": null},
    {"id": "m-2", "type": "text", "sender": {"id": "u-thao", "name": "Thảo", "role": "admin"}, "text": "Để mình kiểm tra lịch cho bạn nhé", "sentAt": "2026-10-20T17:25:00+07:00", "requestDetails": null, "proposalId": null},
    {"id": "m-3", "type": "text", "sender": {"id": "u-linh", "name": "Linh", "role": "customer"}, "text": "Dạ, mình gửi yêu cầu đặt lịch luôn nhé.", "sentAt": "2026-10-21T09:00:00+07:00", "requestDetails": null, "proposalId": null},
    {"id": "m-4", "type": "request", "sender": {"id": "u-linh", "name": "Linh", "role": "customer"}, "text": "Yêu cầu đặt lịch: Gói Tốt nghiệp Premium, 24/10/2026 lúc 09:00, thêm Makeup.", "sentAt": "2026-10-21T09:02:00+07:00", "requestDetails": {"serviceId": "svc-tot-nghiep", "packageId": "pkg-tn-premium", "preferredDate": "2026-10-24", "preferredTime": "09:00", "extraIds": ["ex-makeup"], "note": "Chụp cùng bố mẹ."}, "proposalId": null},
    {"id": "m-5", "type": "text", "sender": {"id": "u-thao", "name": "Thảo", "role": "admin"}, "text": "Sáng 24/10 bạn Mai makeup đã kín lịch, mình gửi bạn lịch buổi chiều nhé.", "sentAt": "2026-10-21T09:10:00+07:00", "requestDetails": null, "proposalId": null},
    {"id": "m-6", "type": "proposal", "sender": {"id": "u-thao", "name": "Thảo", "role": "admin"}, "text": "Đề xuất lịch 24/10/2026: makeup 15:00–16:00 với Mai, chụp 16:00–18:00 với Tuấn ở Phòng B.", "sentAt": "2026-10-21T09:15:00+07:00", "requestDetails": null, "proposalId": "p-1"},
    {"id": "m-7", "type": "proposal", "sender": {"id": "u-thao", "name": "Thảo", "role": "admin"}, "text": "Đề xuất lịch 24/10/2026: makeup 13:00–14:00 với Mai, chụp 14:00–16:00 với Tuấn ở Phòng B.", "sentAt": "2026-10-21T09:30:00+07:00", "requestDetails": null, "proposalId": "p-2"}
  ],
  "proposals": [
    {"id": "p-1", "date": "2026-10-24", "makeup": {"start": "15:00", "end": "16:00", "staffId": "u-mai", "staffName": "Mai"}, "shoot": {"start": "16:00", "end": "18:00", "staffId": "u-tuan", "staffName": "Tuấn", "roomId": "room-b", "roomName": "Phòng B"}, "status": "Đã từ chối", "createdAt": "2026-10-21T09:15:00+07:00"},
    {"id": "p-2", "date": "2026-10-24", "makeup": {"start": "13:00", "end": "14:00", "staffId": "u-mai", "staffName": "Mai"}, "shoot": {"start": "14:00", "end": "16:00", "staffId": "u-tuan", "staffName": "Tuấn", "roomId": "room-b", "roomName": "Phòng B"}, "status": "Đã đồng ý", "createdAt": "2026-10-21T09:30:00+07:00"}
  ]
}}
```

## Changes

- 26/11/2026 — Tạo file. Chưa có front-end nào gọi tới.
