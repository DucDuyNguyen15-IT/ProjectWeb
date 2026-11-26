# PA#3 — Phân chia công việc

**Nhóm:** Nguyễn Đức Duy (24120294) · Nguyễn Thành Dự (24120184)
**Repo:** https://github.com/DucDuyNguyen15-IT/ProjectWeb
**Hạn nộp:** 22:00 thứ Tư 2/12/2026. Nhóm nộp trước 20:00. Tên file `24120184-24120294_<tổng điểm>.zip`
**Đề:** rubric PA#3 + GradStudio final project brief (giữ ở máy trong `classroom-file/`, không commit). Bảng phân công PA#2 vẫn còn trong lịch sử git.

---

## 1. Đã chốt

| Mục | Quyết định |
|---|---|
| Cấu trúc | `client/` (React + Vite + Tailwind v4 + react-router `HashRouter`), `mock/server.mjs` + `mock/data/`, `docs/api/`, `tools/contract-check.mjs` |
| Thứ tự bắt buộc | **contract → mock → front-end**. Endpoint phải có trong `docs/api/` (đã commit) trước commit front-end đầu tiên gọi tới nó |
| Tên file contract | Đánh số theo thứ tự luồng, vì checker chạy ví dụ theo bảng chữ cái trên **một** mock: `01-auth.md`, `02-catalog.md`, `03-conversations.md`, `04-schedule.md`, `05-bookings.md`, `06-payments.md`, `07-reminders.md`, `08-jobs.md`, `09-gallery.md`, `10-admin.md` |
| Token mock | `token-<user id>`, vẫn dùng được sau khi restart mock |
| Tài khoản demo | `linh`, `thao`, `mai`, `tuan`, `superadmin` · e-mail `<tên>@gradstudio.test` · mật khẩu `<tên>-demo` |
| Trạng thái | Hội thoại: Chưa trả lời, Đang tư vấn, Đã chốt lịch, Hoàn thành · Booking: Chờ cọc 30%, Đã đặt lịch, Hoàn thành (thêm Đã hủy cho G10) |
| Dữ liệu mẫu | Linh, Admin Thảo, Mai (makeup, bận 08:00–12:00), Tuấn (chụp), Phòng B, GS-1024, Gói Tốt nghiệp Premium, 1.800.000đ / 540.000đ / 1.260.000đ. Thêm GS-1023 có sẵn ảnh preview để G9 mở thẳng được |
| Commit | Ai làm thì người đó commit trên máy mình. **Commit trước mỗi lần giao việc cho AI**. Đọc `git diff -- docs/api mock` sau mỗi lần AI làm xong |

## 2. Lộ trình và người làm

| Bước | Ngày | Người làm | Việc | Commit |
|---|---|---|---|---|
| 0 | 26/11 | Duy | Push PA#2 (xong). Chuyển app vào `client/` | `refactor: move PA#2 app into client/` (riêng một commit) |
| 0b | 26/11 | Duy | Cập nhật `CLAUDE.md` cho React + contract. Thêm `tools/contract-check.mjs` | 1–2 commit |
| 1 | 27/11 sáng | Duy | `docs/api/README.md`: base `/api`, `Authorization: Bearer`, dạng lỗi chung, mã lỗi, **bảng đủ mọi endpoint** (khung) | `docs(api): README ...` |
| 2 | 27/11 | Duy | `01-auth`, `02-catalog` (G1), `03-conversations` (G3, G4, G6 đồng ý/từ chối), `04-schedule` (G5 kiểm tra trùng) | mỗi file một commit |
| 2b | 27/11 | **Dự** | `05-bookings` (G6 tạo, G7 xem, G10 đổi/hủy/link file), `06-payments` (cọc 30%, phần còn lại 70%, kết quả thanh toán thử), `07-reminders`, `08-jobs` (G8 + upload preview), `09-gallery` (G9 chọn ảnh, Nhận ảnh), `10-admin` (G11 tài khoản admin, cài đặt) | mỗi file một commit |
| 3 | 28/11 | Duy | Lõi `mock/server.mjs`: 4 chế độ `MOCK_MODE`, đọc token, log `METHOD path status`, dạng lỗi, `PORT` mặc định 3001. `mock/data/` theo câu chuyện của Linh | `feat(mock): ...` |
| 3b | 28/11 | **Dự** | Handler mock cho các file 05–10. Chạy `contract-check` trên mock vừa khởi động cho tới khi PASS hết | `feat(mock): ...` |
| 4 | 29/11 | Duy | Phần dùng chung: `api` client (đường dẫn tương đối, tự gắn token), `AuthContext` + `useAuth`, `ProtectedRoute` (nhớ trang đang mở), trang đăng nhập, hook tải dữ liệu (loading / lỗi + Thử lại / rỗng), trang 404, header theo vai trò. Proxy `/api` trong `vite.config.js` (cả `server` và `preview`) | `feat(client): auth, api client, ...` |
| 5 | 29–30/11 | Duy | G1 trang chủ + catalog · G2 đăng nhập/đăng xuất · G3 khách chat + gửi yêu cầu đặt lịch · G4 admin danh sách hội thoại + trả lời · G5 kiểm tra trùng + đề xuất giờ · G6 khách đồng ý/từ chối, admin tạo booking | ≥ 1 commit mỗi bước |
| 5b | 30/11–1/12 | **Dự** | (bắt đầu sau khi bước 4 được push) G7 Lịch chụp của tôi + trang thanh toán thử + nhắc lịch · G8 việc của nhân viên + upload preview · G9 gallery, thanh toán 70%, Nhận ảnh · G10 admin quản lý booking · G11 superadmin | ≥ 1 commit mỗi bước |
| 6 | 1/12 tối | Cả hai | Kiểm tra chéo: Duy soát G7–G11, Dự soát G1–G6 | commit sửa lỗi |
| 7 | 2/12 | **Dự** | Chạy đủ 4 chế độ mock, mở thẳng mọi route ở 360 / 768 / 1280, W3C → `checks/`, `contract-check` trên mock vừa khởi động | commit `checks` |
| 7b | 2/12 | Duy | `FRONTEND.md` (Dự viết phần Routes của G7–G11), `SELF_ASSESSMENT_REPORT.md`, `npm run build` lần cuối, zip, nộp trước 20:00 | bài nộp |
| Suốt quá trình | | Mỗi người | Dán **nguyên văn** prompt của mình vào `brief.md`. Ghi mục của mình dưới `## PA#3` trong `AI-LOG.md`, nhất là lần AI làm sai và check nào phát hiện ra | |

**Phụ thuộc:** Dự viết contract song song với Duy sau khi `README.md` (bước 1) được push, để dùng chung dạng lỗi và tên field. Dự làm màn hình sau khi phần dùng chung (bước 4) được push.

**Khi thiếu endpoint lúc code:** không để AI tự thêm vào mock. Người phụ trách file đó thêm vào `docs/api/` trước, ghi một dòng `## Changes`, commit, rồi mới cho AI dùng. Ghi lần đó vào AI-LOG.

## 3. Dự cần làm khi bắt đầu

```bash
git clone https://github.com/DucDuyNguyen15-IT/ProjectWeb.git
cd ProjectWeb
git config user.name "Nguyễn Thành Dự"
git config user.email "<email của Dự>"
# sau khi Duy push bước 0:
node mock/server.mjs          # terminal 1
cd client && npm ci && npm run dev   # terminal 2
```

Đọc `CLAUDE.md` và rubric PA#3 trước. Assistant của Dự cũng đọc `CLAUDE.md`.

## 4. Bảng điểm và người lo chính

| # | Tiêu chí | Điểm | Người lo chính |
|---|---|---|---|
| 1 | Luồng chính G1–G11 | 25 | Duy G1–G6, Dự G7–G11 |
| 2 | Routing, đăng nhập, state dùng chung | 10 | Duy |
| 3 | Dữ liệu từ API: loading / lỗi / rỗng | 10 | Duy (hook), cả hai (màn hình) |
| 4 | Form | 10 | Cả hai, theo bước mình làm |
| 5 | Contract + mock | 15 | Duy (README, lõi mock), Dự (05–10, `contract-check`) |
| 6 | Responsive, semantic, W3C | 5 | Dự (kiểm tra) |
| 7 | `brief.md` + `CLAUDE.md` | 10 | Duy |
| 8 | `AI-LOG.md` | 10 | Cả hai |
| 9 | Lịch sử commit | 5 | Cả hai |

## 5. Trước khi nén zip

- [ ] `npm run build` trong `client/` sau thay đổi cuối cùng, có `client/dist/`
- [ ] `node tools/contract-check.mjs` trên mock vừa khởi động → không FAIL
- [ ] Mock chạy được không cần `npm install`. Đã thử cả 4 chế độ
- [ ] Zip **nguyên thư mục repo**, có `.git` và `client/dist/`, không có `node_modules/`, không có `classroom-file/`
- [ ] Có `FRONTEND.md`, `AI-LOG.md` (mục `## PA#3`), `SELF_ASSESSMENT_REPORT.md`, `brief.md` mới, `CLAUDE.md` đã cập nhật
- [ ] Tổng điểm trong `SELF_ASSESSMENT_REPORT.md` trùng với số trong tên file zip
- [ ] Nộp từ tài khoản `<MSSV>@student.hcmus.edu.vn`
