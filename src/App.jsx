import { Routes, Route } from 'react-router'
import DichVu from './pages/DichVu.jsx'
import HoiThoai from './pages/HoiThoai.jsx'
import LichChup from './pages/LichChup.jsx'

// Màn 1 → Màn 2 → Màn 3 của luồng chính PA#1.
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<DichVu />} />
      <Route path="/hoi-thoai" element={<HoiThoai />} />
      <Route path="/lich-chup" element={<LichChup />} />
    </Routes>
  )
}
