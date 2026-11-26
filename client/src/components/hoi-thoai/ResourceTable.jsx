import { Chip, DisabledButton, Eyebrow } from '../ui.jsx'
import { STATUS, scheduleColumns, scheduleRows } from '../../data/hoiThoai.js'

/**
 * Lịch tài nguyên ngày 24/10. Bảng rộng hơn cột nên nằm trong wrapper overflow-x-auto
 * (wrapper duy nhất được cuộn ngang). Ô nào cũng có chữ, không chỉ dựa vào màu.
 */
export default function ResourceTable({ showLinh = false, className = '' }) {
  return (
    <section aria-labelledby="lich-tn" className={`flex flex-col gap-3 ${className}`}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-col gap-1">
          <Eyebrow>Lịch tài nguyên</Eyebrow>
          <h2 id="lich-tn" className="text-2xl xl:text-3xl">Thứ Bảy, 24/10</h2>
        </div>
        <div className="flex gap-2">
          <DisabledButton aria-label="Ngày trước">‹</DisabledButton>
          <DisabledButton aria-label="Ngày sau">›</DisabledButton>
        </div>
      </div>

      <ul className="flex flex-wrap gap-2" aria-label="Chú giải">
        {Object.values(STATUS).map((s) => (
          <li key={s.label}><Chip tone={s.chip}>{s.legend ?? s.label}</Chip></li>
        ))}
      </ul>

      <div className="overflow-x-auto rounded-2xl border border-line bg-paper">
        <table className="w-full min-w-3xl border-separate border-spacing-1">
          <caption className="px-3 pt-3 pb-1 text-left text-muted">
            Khung 2 giờ, 08:00–18:00. Ô có chữ “Trùng” là chỗ lịch bị chồng.
          </caption>
          <thead>
            <tr>
              <th scope="col" className="p-2 text-left whitespace-nowrap">Tài nguyên</th>
              {scheduleColumns.map((c) => (
                <th key={c} scope="col" className="p-2 text-left whitespace-nowrap">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {scheduleRows.map((row) => (
              <tr key={row.resource}>
                <th scope="row" className="p-2 text-left whitespace-nowrap">{row.resource}</th>
                {row.cells.map((c, i) => {
                  // Ô "Linh · 14:00" chỉ hiện khi Admin đã chọn đề xuất 14:00.
                  const cell = c?.linh && !showLinh ? null : c
                  return cell ? (
                    <td key={i} className={`rounded-lg p-2 align-top ${STATUS[cell.status].cell}`}>
                      <strong className="block">{STATUS[cell.status].label}</strong>
                      {cell.text}
                    </td>
                  ) : (
                    <td key={i} className="rounded-lg bg-cream p-2 align-top text-muted">Trống</td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-sm text-muted">Vuốt ngang trong khung để xem đủ các giờ.</p>
    </section>
  )
}
