import { useState } from 'react'
import { Avatar, Chip, Eyebrow } from '../ui.jsx'
import { TextField } from '../Field.jsx'
import { FILTERS, waiting as waitingBase } from '../../data/hoiThoai.js'

// So khớp không phân biệt hoa thường và dấu: "linh" tìm được "Nguyễn Thùy Linh".
const fold = (s) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/đ/gi, 'd').toLowerCase()

/**
 * Danh sách khách đang chờ, có bộ lọc trạng thái và ô tìm theo tên (React state).
 * `linh` ghi đè dòng của Linh theo cuộc tư vấn đang diễn ra (trạng thái, tin cuối).
 */
export default function WaitingList({ linh, className = '' }) {
  const waiting = waitingBase.map((c) => (c.id === 'linh' && linh ? { ...c, ...linh } : c))

  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')

  const match = FILTERS.find((f) => f.id === filter).match
  const shown = waiting.filter((c) => match(c) && fold(c.name).includes(fold(query.trim())))

  return (
    <section aria-labelledby="cho" className={`flex flex-col gap-4 ${className}`}>
      <div className="flex flex-col gap-1">
        <Eyebrow>Hội thoại</Eyebrow>
        <h2 id="cho" className="text-2xl xl:text-3xl">Khách đang chờ</h2>
      </div>

      <TextField
        id="tim"
        label="Tìm khách hàng"
        type="search"
        placeholder="Tên khách…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div role="group" aria-label="Lọc hội thoại" className="flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const active = f.id === filter
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f.id)}
              className={`inline-flex min-h-11 items-center gap-1 rounded-full border px-4 font-semibold ${
                active ? 'border-ink bg-ink text-cream' : 'border-line-strong text-ink hover:bg-sand'
              }`}
            >
              {f.label} <span className={active ? 'text-sand' : 'text-muted'}>{waiting.filter(f.match).length}</span>
            </button>
          )
        })}
      </div>

      <p className="sr-only" aria-live="polite">{shown.length} khách</p>
      {shown.length === 0 ? (
        <p className="rounded-2xl border border-line p-4 text-muted">Không có khách phù hợp.</p>
      ) : (
        <ul className="flex flex-col gap-1">
          {shown.map((c) => (
            <li key={c.id} aria-current={c.current ? 'true' : undefined} className={`flex gap-3 rounded-2xl p-3 ${c.current ? 'bg-sand' : ''}`}>
              <Avatar tone={c.group ? 'ink' : 'sand'}>{c.initials}</Avatar>
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <div className="flex items-baseline justify-between gap-2">
                  <strong className="min-w-0 break-words">{c.name}</strong>
                  <span className="flex-none text-sm text-muted">{c.time}</span>
                </div>
                <p className="text-muted">{c.preview}</p>
                <span><Chip tone={c.tone} dot>{c.status}</Chip></span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
