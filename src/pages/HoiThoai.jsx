import { Link } from 'react-router'

// Màn 2: Admin Thảo xử lý trùng lịch, tạo booking. Khung tạm, sẽ dựng theo mockup.
export default function HoiThoai() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 md:px-8">
      <h1 className="font-serif text-3xl">Hội thoại với khách</h1>
      <Link to="/lich-chup" className="mt-6 inline-flex min-h-11 items-center rounded-full bg-brand px-6 font-semibold text-on-brand">
        Tạo booking
      </Link>
    </main>
  )
}
