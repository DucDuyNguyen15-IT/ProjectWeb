import { Link } from 'react-router'

// Màn 3: Linh xem booking GS-1024, chờ cọc 30%. Khung tạm, sẽ dựng theo mockup.
export default function LichChup() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 md:px-8">
      <h1 className="font-serif text-3xl">Lịch chụp của tôi</h1>
      <Link to="/" className="mt-6 inline-flex min-h-11 items-center text-brand underline underline-offset-4">
        Dịch vụ
      </Link>
    </main>
  )
}
