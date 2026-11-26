import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router'
import DichVu from './pages/DichVu.jsx'
import HoiThoai from './pages/HoiThoai.jsx'
import LichChup from './pages/LichChup.jsx'

// Sang màn mới thì về đầu trang (HashRouter không tự làm việc này).
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

// Màn 1 → Màn 2 → Màn 3 của luồng chính PA#1.
export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<DichVu />} />
        <Route path="/hoi-thoai" element={<HoiThoai />} />
        <Route path="/lich-chup" element={<LichChup />} />
      </Routes>
    </>
  )
}
