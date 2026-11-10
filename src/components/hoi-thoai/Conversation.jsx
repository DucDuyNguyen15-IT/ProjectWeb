import { useState } from 'react'
import { ActionButton, Avatar, Chip, CARD, INPUT } from '../ui.jsx'
import { Check } from '../Icons.jsx'
import { clash, customer, suggestions } from '../../data/hoiThoai.js'

/** Tiêu đề màn (h1) + thẻ khách đang chọn, trạng thái hội thoại và "Đặt lại demo". */
export function ConversationHeader({ status, onReset, className = '' }) {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl xl:text-5xl">Hội thoại với khách</h1>
        <ActionButton onClick={onReset}>Đặt lại demo</ActionButton>
      </div>
      <div className={`${CARD} flex flex-col gap-3 p-4 md:p-6`}>
        <div className="flex min-w-0 items-center gap-3">
          <Avatar size="lg">{customer.initials}</Avatar>
          <div className="flex min-w-0 flex-col">
            <strong>{customer.name}</strong>
            <span className="break-words text-muted">{customer.email} · {customer.phone}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2" aria-live="polite">
          <Chip tone="brand">Đang hỏi về: {customer.topic}</Chip>
          <Chip tone={status.tone} dot>{status.label}</Chip>
        </div>
      </div>
    </div>
  )
}

/**
 * Cuộc chat với Linh. Admin gõ tin và bấm Gửi để thêm lời tư vấn.
 * Khi studio vừa đề xuất giờ, khối "Mô phỏng phản hồi của Linh" cho người xem đóng vai Linh.
 */
export function ChatThread({ messages, phase, onReply, onSend, className = '' }) {
  const [draft, setDraft] = useState('')

  function submit(e) {
    e.preventDefault()
    const text = draft.trim()
    if (!text) return
    onSend(text)
    setDraft('')
  }

  return (
    <section aria-labelledby="chat-linh" className={`${CARD} flex flex-col gap-4 p-4 md:p-6 ${className}`}>
      <h2 id="chat-linh" className="text-2xl text-balance xl:text-3xl">Chat với {customer.name}</h2>
      <ol className="flex flex-col gap-4" aria-live="polite">
        {messages.map((m) => {
          const studio = m.from === 'studio'
          return (
            <li key={m.id} className={`flex flex-col gap-1 ${studio ? 'items-end' : 'items-start'}`}>
              <p
                className={`max-w-4/5 rounded-2xl px-4 py-3 text-ink-soft ${
                  studio ? 'rounded-br-sm bg-brand-soft' : 'rounded-bl-sm bg-sand'
                }`}
              >
                {m.text}
              </p>
              <p className="text-sm text-muted">{m.who} · {m.time}</p>
            </li>
          )
        })}
      </ol>

      {phase === 'proposed' && (
        <div role="group" aria-labelledby="mo-phong" className="flex flex-col gap-3 rounded-2xl border border-dashed border-line-strong p-4">
          <p id="mo-phong" className="font-semibold">Mô phỏng phản hồi của Linh</p>
          <p className="text-muted">Đóng vai Linh trả lời đề xuất của studio.</p>
          <div className="flex flex-wrap gap-3">
            <ActionButton onClick={() => onReply(true)}>Chốt giờ này</ActionButton>
            <ActionButton onClick={() => onReply(false)}>Từ chối</ActionButton>
          </div>
        </div>
      )}

      <form onSubmit={submit} className="flex flex-col gap-2 border-t border-line pt-4">
        <label htmlFor="tin-admin" className="font-semibold">Tin nhắn gửi Linh</label>
        <div className="flex gap-2">
          <input
            id="tin-admin"
            name="tin-admin"
            type="text"
            placeholder="Nhập tin nhắn…"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className={`${INPUT} min-w-0 flex-1`}
          />
          <button type="submit" className="inline-flex min-h-11 items-center rounded-full border border-brand px-6 font-semibold text-brand hover:bg-brand-soft">
            Gửi
          </button>
        </div>
      </form>
    </section>
  )
}

/** Cảnh báo trùng lịch 09:00 và các giờ trống hệ thống gợi ý. */
export function SlotSuggestions({ slot, phase, canChoose, onChoose, className = '' }) {
  const hint = {
    clash: 'Chọn một giờ để gửi đề xuất cho Linh trong chat.',
    proposed: 'Đang chờ Linh trả lời đề xuất.',
    declined: 'Linh chưa đồng ý. Chọn một giờ khác để đề xuất lại.',
    agreed: 'Linh đã chốt giờ. Form Booking mới đã sẵn sàng.',
  }[phase]

  return (
    <section aria-labelledby="goi-y" className={`flex flex-col gap-4 ${className}`}>
      <div className="flex flex-col gap-1 rounded-2xl bg-danger-soft p-4 text-danger">
        <p className="font-semibold">{clash.title}</p>
        <p>{clash.text}</p>
      </div>
      <h2 id="goi-y" className="text-2xl xl:text-3xl">Gợi ý giờ trống</h2>
      <p className="text-muted" aria-live="polite">{hint}</p>
      <ul className="flex flex-col gap-3">
        {suggestions.map((s) => {
          const chosen = slot?.id === s.id
          return (
            <li
              key={s.id}
              // Cột hẹp (1280: 4/12) nên xếp dọc: giờ + nhãn, chi tiết, rồi nút ở dưới.
              className={`flex flex-col items-start gap-2 rounded-2xl bg-paper p-4 ${
                chosen ? 'border-2 border-brand' : 'border border-line'
              }`}
            >
              <div className="flex w-full flex-wrap items-center justify-between gap-2">
                <p className="font-serif text-xl">{s.label}</p>
                {chosen && <Chip tone="success" dot>Đã chọn</Chip>}
              </div>
              <p className="text-muted">{s.detail}</p>
              {!chosen && (
                <ActionButton onClick={() => onChoose(s.id)} disabled={!canChoose} className="disabled:cursor-not-allowed disabled:border-dashed disabled:border-line-strong disabled:text-muted">
                  Chọn {s.label}
                </ActionButton>
              )}
            </li>
          )
        })}
      </ul>
      {slot && (
        <p className="flex items-start gap-2 rounded-2xl bg-success-soft px-4 py-3 text-success">
          <Check />
          {slot.ok}
        </p>
      )}
    </section>
  )
}
