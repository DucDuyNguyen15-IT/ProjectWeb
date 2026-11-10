import { useState } from 'react'
import { DECLINE_TEXT, LINH_STATUS, QUOTE_TEXT, initialMessages, suggestions } from '../../data/hoiThoai.js'

/*
  Trạng thái cuộc tư vấn Màn 2 (theo prototype/LINK.md của PA#1):

  clash ──Chọn giờ──▶ proposed ──Chốt giờ này──▶ agreed  (Tạo booking bật)
                         │
                         └──Từ chối──▶ declined ──Chọn giờ khác──▶ proposed

  "Đặt lại demo" đưa về clash. Mở thẳng /#/hoi-thoai luôn bắt đầu ở clash.
*/
const START = { phase: 'clash', slotId: null, messages: initialMessages, minute: 21 }

export default function useConsultation() {
  const [state, setState] = useState(START)

  // Thêm tin nhắn, giờ gửi tăng 2 phút mỗi tin (17:23, 17:25…).
  function push(s, from, text) {
    const minute = s.minute + 2
    const message = {
      id: s.messages.length + 1,
      from,
      who: from === 'linh' ? 'Linh' : 'Thảo',
      time: `17:${String(minute).padStart(2, '0')}`,
      text,
    }
    return { ...s, minute, messages: [...s.messages, message] }
  }

  const slot = suggestions.find((x) => x.id === state.slotId) ?? null

  return {
    phase: state.phase,
    slot,
    messages: state.messages,
    linhStatus: state.phase === 'agreed' ? LINH_STATUS.agreed : LINH_STATUS.open,
    canChoose: state.phase !== 'agreed' && state.phase !== 'proposed',

    choose(id) {
      const next = suggestions.find((x) => x.id === id)
      setState((s) => ({ ...push(s, 'studio', next.proposal), phase: 'proposed', slotId: id }))
    },
    reply(agree) {
      setState((s) => {
        const chosen = suggestions.find((x) => x.id === s.slotId)
        return { ...push(s, 'linh', agree ? chosen.agree : DECLINE_TEXT), phase: agree ? 'agreed' : 'declined' }
      })
    },
    sendQuote() {
      setState((s) => push(s, 'studio', QUOTE_TEXT))
    },
    send(text) {
      setState((s) => push(s, 'studio', text))
    },
    reset() {
      setState(START)
    },
  }
}
