# PA#2 — Phân chia công việc

**Nhóm:** Nguyễn Đức Duy (24120294) · Nguyễn Thành Dự (24120184)
**Repo:** https://github.com/DucDuyNguyen15-IT/ProjectWeb
**Hạn nộp:** 22:00 Chủ nhật 8/11/2026. Tên file `24120184-24120294_<tổng điểm>.zip`
**Thiết kế PA#1:** bản dùng chung cả lớp GradStudio (gốc `NhatVy177/gradstudio`, fork `DucDuyNguyen15-IT/gradstudio`). Ảnh trong `docs/pa1/`.
**Luật kỹ thuật:** xem [`CLAUDE.md`](../CLAUDE.md). Prompt đã gửi: xem [`brief.md`](../brief.md).

---

## 1. Đã chốt

| Mục | Quyết định |
|---|---|
| CSS | **Tailwind CSS v4**, build bằng CLI, commit `css/tailwind.css` (dùng cả học kỳ) |
| Spacing scale | Bậc Tailwind 1, 2, 3, 4, 6, 8, 12, 16 = 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 px. Không dùng arbitrary value |
| Breakpoint | Mobile first: không tiền tố = 360px, `md:` ≥ 768px, `xl:` ≥ 1280px |
| 3 trang | `index.html` (Màn 1) → `hoi-thoai.html` (Màn 2) → `lich-chup.html` (Màn 3) |
| Font | System font (serif cho tiêu đề), không tải font ngoài, mở được khi không có mạng |
| Quy trình | Lên ý tưởng → Design System + `ui-ux-pro-max` xét màu → mockup 9 artboard → code |

## 2. Lộ trình và người làm

| Bước | Người làm | Việc | Kết quả / commit |
|---|---|---|---|
| 1 | Duy | `CLAUDE.md`, `docs/pa1/`, cài đặt Tailwind | Đã xong (3 commit đầu) |
| 2 | Duy | Lên ý tưởng bố cục 3 màn ở 360 / 768 / 1280 | Bản mô tả bố cục |
| 3 | Duy | Design System (token) + `ui-ux-pro-max` kiểm tra tương phản | `src/input.css` với `@theme` chính thức |
| 4 | Duy | Mockup 3 màn × 3 độ rộng | `docs/design/` |
| 4b | **Dự** | Duyệt token và mockup, nhất là Màn 2 | Góp ý hoặc đồng ý |
| 5 | Duy | `index.html` (Màn 1), rồi `lich-chup.html` (Màn 3) | Mỗi trang một commit |
| 5b | **Dự** | Clone, `npm install`, code `hoi-thoai.html` (Màn 2) | Một commit |
| 6 | **Dự** | Đợt responsive cả 3 trang, W3C → `checks/`, chụp 9 ảnh → `screenshots/` | Commit `responsive: ...`, commit `checks`, commit `screenshots` |
| 7 | Cả hai | Kiểm tra chéo: Duy soát Màn 2, Dự soát Màn 1 và Màn 3 | Commit sửa lỗi |
| 8 | Duy | `PROTOTYPE.md` (Dự bổ sung phần Màn 2), `SELF_ASSESSMENT_REPORT.md`, nén zip, nộp | Bài nộp |
| Suốt quá trình | Mỗi người | Dán **nguyên văn** prompt của mình vào `brief.md`; ghi mục của mình trong `AI-LOG.md` | |

> **Ai làm thì người đó commit trên máy mình.** Dự đặt trước trong repo:
> `git config user.name "Nguyễn Thành Dự"` và `git config user.email "<email của Dự>"`.
> Rubric đọc tên người commit (tiêu chí 7) và dùng lịch sử commit khi chia điểm.

## 3. Lịch làm

| Ngày | Duy | Dự |
|---|---|---|
| Thứ Tư 4/11 | Bước 1 (xong), bắt đầu bước 2 | Clone repo, `npm install`, đặt git config, đọc `CLAUDE.md` và rubric |
| Thứ Năm 5/11 | Bước 2–4: ý tưởng, token, mockup | Duyệt token và mockup (bước 4b) |
| Thứ Sáu 6/11 | `index.html` | `hoi-thoai.html` |
| Thứ Bảy 7/11 | `lich-chup.html` | Đợt responsive, W3C, ảnh chụp màn hình |
| Chủ nhật 8/11 | Kiểm tra chéo, `PROTOTYPE.md`, tự chấm, zip | Kiểm tra chéo, sửa lỗi |
| **Chủ nhật 8/11, trước 20:00** | **Nộp bài** (còn 2 giờ dự phòng trước hạn 22:00) | |

Thứ tự bắt buộc: token (bước 3) phải được push trước, Dự mới code `hoi-thoai.html` để dùng chung màu và spacing.

## 4. Dự cần làm khi bắt đầu

```bash
git clone https://github.com/DucDuyNguyen15-IT/ProjectWeb.git
cd ProjectWeb
git config user.name "Nguyễn Thành Dự"
git config user.email "<email của Dự>"
npm install
npm run watch        # để CSS tự build lại khi sửa HTML
```

Đọc `CLAUDE.md` trước. Assistant của Dự cũng sẽ đọc file này.

## 5. Bảng điểm và người lo chính

| # | Tiêu chí | Điểm | Người lo chính |
|---|---|---|---|
| 1 | 3 trang liên kết, khớp PA#1, có mục *Changed since PA#1* | 20 | Duy |
| 2 | Responsive 360 / 768 / 1280 | 25 | Dự |
| 3 | HTML semantic, W3C 0 lỗi | 20 | Dự (kiểm tra), cả hai (viết) |
| 4 | Design kiểm chứng được: spacing scale, contrast, không `!important` | 10 | Duy |
| 5 | `brief.md` + rules file | 10 | Duy |
| 6 | `AI-LOG.md`: có ít nhất một lần AI sai và check nào phát hiện ra | 10 | Cả hai |
| 7 | Lịch sử commit | 5 | Cả hai |

## 6. Trước khi nén zip

- [ ] Zip **nguyên thư mục**, có `.git`, không có `node_modules/`
- [ ] Đủ file: 3 trang, `css/`, `CLAUDE.md`, `PROTOTYPE.md`, `docs/pa1/`, `screenshots/` (9 ảnh), `checks/` (3 kết quả), `brief.md`, `AI-LOG.md`, `SELF_ASSESSMENT_REPORT.md`
- [ ] Không còn file rubric PDF trong thư mục
- [ ] Tổng điểm trong `SELF_ASSESSMENT_REPORT.md` trùng với số trong tên file zip
- [ ] Nộp từ tài khoản `<MSSV>@student.hcmus.edu.vn`
