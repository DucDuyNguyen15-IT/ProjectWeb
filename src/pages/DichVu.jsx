import { Link } from 'react-router'

// Màn 1: khách xem dịch vụ và chat hỏi lịch 24/10 09:00. Khung tạm, sẽ dựng theo mockup.
export default function DichVu() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 md:px-8">
      <h1 className="font-serif text-4xl">Lưu lại ngày ra trường theo cách của bạn</h1>
      <Link to="/hoi-thoai" className="mt-6 inline-flex min-h-11 items-center rounded-full bg-brand px-6 font-semibold text-on-brand">
        Gửi
      </Link>
    </main>
  )
}
