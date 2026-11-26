# GradStudio — FRONTEND (PA#3)

## 1. Team

| Họ tên | MSSV |
|---|---|
| Nguyễn Đức Duy | 24120294 |
| Nguyễn Thành Dự | 24120184 |

## 2. How to run it

```bash
node mock/server.mjs              # mock API, cổng 3001 (PORT để đổi; MOCK_MODE=normal|slow|error|empty)
cd client
npm ci
npm run dev                       # http://localhost:5173
npm run build && npx vite preview # xem bản build, /api vẫn chuyển tới mock
```

## 3. Demo accounts

| Name in examples | Role | E-mail | Password |
|---|---|---|---|
| linh | customer | linh@gradstudio.test | linh-demo |
| thao | admin | thao@gradstudio.test | thao-demo |
| mai | staff | mai@gradstudio.test | mai-demo |
| tuan | staff | tuan@gradstudio.test | tuan-demo |
| superadmin | superadmin | superadmin@gradstudio.test | superadmin-demo |

## 4. Routes

_(điền khi làm front-end)_

## 5. Product owner decisions

_(điền khi dùng tới)_

## 6. Libraries

- `react-router`: định tuyến bằng `HashRouter`, để mở thẳng được mọi đường dẫn trên static server.
- Tailwind CSS v4 (`@tailwindcss/vite`): framework CSS duy nhất, đóng gói vào bản build.
- Không dùng thư viện form. Form viết bằng React state.

## 7. Not done

_(điền trước khi nộp)_
