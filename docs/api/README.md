# GradStudio API — contract (PA#3)

Contract này là **nguồn sự thật** giữa front-end (`client/`) và server. Ở PA#3, `mock/server.mjs` trả lời đúng như các file ở đây. Ở PA#4, server Express thay chỗ mock trên cùng cổng **3001**, front-end giữ nguyên.

Mỗi resource có một file. Tên file đánh số theo thứ tự luồng G1–G11, vì `tools/contract-check.mjs` gửi ví dụ của file này trước, rồi các file khác theo bảng chữ cái, tất cả tới **một** mock vừa khởi động. Ví dụ ở file sau có thể dựa vào kết quả của file trước (vd. `05-bookings.md` tạo GS-1024 từ đề xuất đã được đồng ý trong `03-conversations.md`).

## Base path

Mọi endpoint bắt đầu bằng `/api`. Front-end chỉ gọi đường dẫn tương đối (`/api/bookings`). Vite chuyển `/api` tới `http://localhost:3001`.

## Ai đang gọi

- `POST /api/auth/login` trả về `token` và `user` (`id`, `name`, `role`).
- Các request sau đó gửi header:

  ```text
  Authorization: Bearer <token>
  ```

- Vai trò (`role`): `customer`, `admin`, `staff`, `superadmin`.
- Ở mock, token có dạng `token-<user id>` (vd. `token-u-linh`), nên vẫn dùng được sau khi restart mock. PA#4 thay bằng token thật, front-end không cần biết token có dạng gì.
- Đăng xuất chỉ diễn ra ở front-end: xóa token và user khỏi context. Không có endpoint đăng xuất.
- Tài khoản demo: xem bảng *Demo accounts* trong `FRONTEND.md`. Trong ví dụ, token được viết `{{token:linh}}`, `{{token:thao}}`, `{{token:mai}}`, `{{token:tuan}}`, `{{token:superadmin}}`.

Endpoint ghi vai trò `public` thì không cần token. Endpoint khác mà thiếu token, hoặc token không hợp lệ, trả `401`. Đúng token nhưng sai vai trò, hoặc tài nguyên không thuộc về người gọi (vd. Linh xem booking của khách khác), trả `403`.

## Dạng lỗi chung

Mọi lỗi của mọi endpoint có cùng một dạng:

```json
{
  "error": {
    "code": "VALIDATION",
    "message": "Dữ liệu chưa hợp lệ.",
    "fields": { "email": "Nhập e-mail.", "password": "Nhập mật khẩu." }
  }
}
```

- `code`: chuỗi cố định, front-end dùng để rẽ nhánh (xem bảng dưới).
- `message`: câu tiếng Việt để hiện cho người dùng.
- `fields`: **chỉ có ở `400 VALIDATION`**. Mỗi khóa là tên field trong body, giá trị là thông báo cho field đó. Front-end hiện thông báo ngay cạnh field cùng tên.

## Mã trạng thái

| Mã | `code` | Khi nào |
|---|---|---|
| `200 OK` | — | Đọc hoặc cập nhật thành công |
| `201 Created` | — | Tạo mới thành công (tin nhắn, booking, thanh toán, tài khoản…) |
| `400 Bad Request` | `VALIDATION` | Body hoặc query sai: thiếu field bắt buộc, sai kiểu, vượt giới hạn, file sai loại hoặc quá lớn. Có `fields` |
| `401 Unauthorized` | `UNAUTHENTICATED` | Thiếu token, token không hợp lệ, hoặc sai e-mail/mật khẩu khi đăng nhập |
| `403 Forbidden` | `FORBIDDEN` | Vai trò không được gọi endpoint này, hoặc tài nguyên không phải của người gọi |
| `404 Not Found` | `NOT_FOUND` | Không có tài nguyên với id đó, hoặc đường dẫn không tồn tại |
| `409 Conflict` | `CONFLICT` | Đúng dữ liệu nhưng sai trạng thái của luồng: trùng lịch, tạo booking khi khách chưa đồng ý, nhận ảnh khi chưa có link… |
| `500 Internal Server Error` | `SERVER_ERROR` | Lỗi server. Mock trả mã này cho mọi request trừ đăng nhập khi `MOCK_MODE=error` |

## Quy ước dữ liệu

- **Id:** chuỗi đọc được: `u-linh`, `c-linh`, `GS-1024`, `pkg-tn-premium`, `pay-1`.
- **Ngày:** `"2026-10-24"` (YYYY-MM-DD). **Giờ:** `"09:00"` (HH:mm, 24 giờ, giờ Việt Nam). **Thời điểm:** ISO 8601 có múi giờ, `"2026-10-23T13:00:00+07:00"`.
- **Tiền:** số nguyên, đơn vị đồng: `1800000`. Front-end tự định dạng thành `1.800.000đ`.
- **Trạng thái:** đúng chữ tiếng Việt, để front-end hiện thẳng:
  - Hội thoại: `"Chưa trả lời"`, `"Đang tư vấn"`, `"Đã chốt lịch"`, `"Hoàn thành"`
  - Booking: `"Chờ cọc 30%"`, `"Đã đặt lịch"`, `"Hoàn thành"`, `"Đã hủy"`
  - Thanh toán: `"Chờ thanh toán"`, `"Thành công"`, `"Thất bại"`
- **Danh sách:** trả về trong một object, có khóa đặt theo tên số nhiều: `{"bookings": [...]}`, không trả mảng trần. Khi `MOCK_MODE=empty`, mọi list (kể cả list nằm trong object) là `[]`, còn một object đơn lẻ vẫn được trả về.
- **Ảnh:** URL tương đối do server phục vụ (`/api/files/…`), không dùng ảnh người thật.

## Thanh toán thử (G7, G9)

1. Front-end gọi `POST /api/bookings/:id/payments`. API trả `payment` và `redirectUrl`.
2. Front-end chuyển trình duyệt tới `redirectUrl`. Ở mock, đó là route trong app `/#/thanh-toan-thu/<payment id>`, trang ghi rõ đây là **thanh toán thử** và có nút thành công, nút thất bại. Ở PA#4, đó là trang sandbox của cổng thật.
3. Trang thử gọi `POST /api/payments/:id/simulate`, sau đó quay lại `returnUrl` mà front-end đã gửi ở bước 1. Trang kết quả đọc `GET /api/payments/:id` và hiện kết quả.

PA#4 chỉ thay bước 2 và bước 3 bằng cổng thật. Bước 1 và trang kết quả giữ nguyên.

## Bảng endpoint

Các file 05–10 do người phụ trách (xem `docs/PHAN-CONG.md`) viết chi tiết. Trước khi front-end gọi một endpoint, bảng này còn được chỉnh. Sau khi front-end đã gọi, mọi thay đổi phải có một dòng trong `## Changes`.

| Method | Path | Vai trò | Bước | File |
|---|---|---|---|---|
| `POST` | `/api/auth/login` | public | G2 | [01-auth.md](01-auth.md) |
| `GET` | `/api/auth/me` | customer, admin, staff, superadmin | G2 | [01-auth.md](01-auth.md) |
| `GET` | `/api/services` | public | G1 | [02-catalog.md](02-catalog.md) |
| `GET` | `/api/extras` | public | G1, G3 | [02-catalog.md](02-catalog.md) |
| `GET` | `/api/samples` | public | G1 | [02-catalog.md](02-catalog.md) |
| `GET` | `/api/reviews` | public | G1 | [02-catalog.md](02-catalog.md) |
| `GET` | `/api/conversations` | customer, admin | G3, G4 | [03-conversations.md](03-conversations.md) |
| `GET` | `/api/conversations/:id` | customer, admin | G3–G6 | [03-conversations.md](03-conversations.md) |
| `POST` | `/api/conversations/:id/messages` | customer, admin | G3, G4 | [03-conversations.md](03-conversations.md) |
| `POST` | `/api/conversations/:id/requests` | customer | G3 | [03-conversations.md](03-conversations.md) |
| `POST` | `/api/conversations/:id/proposals` | admin | G5 | [03-conversations.md](03-conversations.md) |
| `POST` | `/api/conversations/:id/proposals/:proposalId/answer` | customer | G6 | [03-conversations.md](03-conversations.md) |
| `GET` | `/api/resources` | admin | G5, G10 | [04-schedule.md](04-schedule.md) |
| `GET` | `/api/schedule` | admin | G5 | [04-schedule.md](04-schedule.md) |
| `POST` | `/api/schedule/check` | admin | G5, G10 | [04-schedule.md](04-schedule.md) |
| `POST` | `/api/bookings` | admin | G6 | [05-bookings.md](05-bookings.md) |
| `GET` | `/api/bookings` | customer, admin | G7, G10 | [05-bookings.md](05-bookings.md) |
| `GET` | `/api/bookings/:id` | customer, admin, staff | G7, G9, G10 | [05-bookings.md](05-bookings.md) |
| `PATCH` | `/api/bookings/:id` | admin | G10 | [05-bookings.md](05-bookings.md) |
| `POST` | `/api/bookings/:id/cancel` | admin | G10 | [05-bookings.md](05-bookings.md) |
| `PUT` | `/api/bookings/:id/final-link` | admin | G10 | [05-bookings.md](05-bookings.md) |
| `POST` | `/api/bookings/:id/receive` | customer | G9 | [05-bookings.md](05-bookings.md) |
| `POST` | `/api/bookings/:id/payments` | customer | G7, G9 | [06-payments.md](06-payments.md) |
| `GET` | `/api/payments/:id` | customer | G7, G9 | [06-payments.md](06-payments.md) |
| `POST` | `/api/payments/:id/simulate` | customer | G7, G9 | [06-payments.md](06-payments.md) |
| `GET` | `/api/reminders` | customer | G7 | [07-reminders.md](07-reminders.md) |
| `GET` | `/api/jobs` | staff | G8 | [08-jobs.md](08-jobs.md) |
| `PATCH` | `/api/jobs/:id` | staff | G8 | [08-jobs.md](08-jobs.md) |
| `POST` | `/api/bookings/:id/previews` | staff | G8 | [08-jobs.md](08-jobs.md) |
| `GET` | `/api/bookings/:id/gallery` | customer, admin, staff | G8, G9 | [09-gallery.md](09-gallery.md) |
| `PUT` | `/api/bookings/:id/selection` | customer | G9 | [09-gallery.md](09-gallery.md) |
| `GET` | `/api/admins` | superadmin | G11 | [10-admin.md](10-admin.md) |
| `POST` | `/api/admins` | superadmin | G11 | [10-admin.md](10-admin.md) |
| `GET` | `/api/settings` | superadmin | G11 | [10-admin.md](10-admin.md) |
| `PUT` | `/api/settings` | superadmin | G11 | [10-admin.md](10-admin.md) |

Mọi endpoint trong bảng phải có ít nhất một ví dụ trong file của nó. `contract-check` báo FAIL nếu một dòng trong bảng không có ví dụ nào gọi tới, hoặc nếu một ví dụ gọi tới endpoint không có trong bảng.

## Dữ liệu khởi đầu của mock

Khi vừa khởi động, mock có đúng trạng thái đầu câu chuyện:

- Hội thoại `c-linh` (`"Đang tư vấn"`): Linh hỏi *"Gói tốt nghiệp có makeup còn lịch 24/10 lúc 09:00 không?"*, studio trả lời sẽ kiểm tra. Có thêm vài hội thoại của khách khác ở các trạng thái còn lại.
- Mai (makeup) bận 08:00–12:00 ngày 24/10/2026, nên kiểm tra 09:00 thì trùng. 13:00–14:00 makeup với Mai và 14:00–16:00 chụp với Tuấn ở Phòng B thì trống.
- **GS-1024 chưa tồn tại**. Admin tạo nó ở G6, trạng thái `"Chờ cọc 30%"`.
- Booking cũ **GS-1023** của Linh (`"Đã đặt lịch"`, đã chụp xong, đã có ảnh preview để chọn, còn nợ 70%). Dùng để mở thẳng gallery G9 và màn G10 khi mock vừa khởi động.
- Nhắc lịch của Linh, việc được giao của Mai và Tuấn, một tài khoản admin (Thảo), cài đặt hệ thống (giờ mở cửa, nhắc trước 24 giờ).

## Changes

- 26/11/2026 — Tạo file: base path, xác thực, dạng lỗi, mã trạng thái, quy ước, luồng thanh toán thử, bảng endpoint. Chưa có front-end nào gọi tới.
