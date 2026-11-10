import { ActionButton, ButtonLink, Chip, DisabledButton, Eyebrow } from '../ui.jsx'
import { CheckField, SelectField, TextField } from '../Field.jsx'
import { Check } from '../Icons.jsx'
import { booking, customer } from '../../data/hoiThoai.js'

/**
 * Form Booking mới. Ngày và giờ điền theo giờ gợi ý đang chọn (key đổi thì form điền lại).
 * "Tạo booking" chỉ thành <Link> sang Màn 3 khi Linh đã chốt giờ — nút brand đặc duy nhất của Màn 2.
 * 360/768: 1 cột; 1280: 2 cột.
 */
export default function BookingForm({ slot, ready, onQuote, className = '' }) {
  const date = slot?.date ?? booking.date
  const time = slot?.time ?? '09:00'
  const times = booking.times.includes(time) ? booking.times : [...booking.times, time]
  const hint = slot
    ? { text: <><Check />Đủ thợ chụp, thợ makeup và phòng</>, cls: 'text-success' }
    : { text: 'Trùng: thợ makeup Mai bận 08:00–12:00', cls: 'text-danger' }

  return (
    <section aria-labelledby="bk-title" className={`flex flex-col gap-4 rounded-2xl border border-line bg-sand-soft p-4 md:p-6 ${className}`}>
      <div className="flex flex-col gap-2">
        <Eyebrow>Booking mới</Eyebrow>
        <h2 id="bk-title" className="text-2xl xl:text-3xl">Chụp ảnh tốt nghiệp</h2>
        <p className="text-muted">
          Gắn với cuộc chat của {customer.name}. Booking sẽ hiện trong Lịch chụp của tôi của khách.
        </p>
      </div>

      <form key={slot?.id ?? 'none'} onSubmit={(e) => e.preventDefault()} className="grid gap-4 xl:grid-cols-2 xl:gap-x-6">
        <TextField id="khach" label="Khách hàng" defaultValue={customer.name} readOnly />
        <SelectField id="loai" label="Loại buổi chụp" options={booking.type} />
        <SelectField id="goi" label="Gói" options={booking.package} className="xl:col-span-2" />
        <TextField id="ngay" label="Ngày chụp" defaultValue={date} />
        <SelectField
          id="gio"
          label="Giờ bắt đầu chụp"
          options={times}
          defaultValue={time}
          hint={hint.text}
          hintClass={hint.cls}
        />
        <fieldset className="flex flex-col gap-1 xl:col-span-2">
          <legend className="mb-1 font-semibold">Dịch vụ thêm</legend>
          <div className="flex flex-wrap gap-x-6">
            <CheckField id="makeup" label="Makeup (60 phút trước giờ chụp)" defaultChecked />
            <CheckField id="ao" label="Thuê áo cử nhân" />
          </div>
        </fieldset>
        <TextField id="gia" label="Giá chốt" defaultValue={booking.price} hint="Giá tham khảo: từ 1.800.000đ" />
        <div className="flex flex-col gap-2">
          <p className="font-semibold">Phân công dự kiến</p>
          <ul className="flex flex-wrap gap-2">
            {booking.staff.map((s) => <li key={s}><Chip tone="plain">{s}</Chip></li>)}
          </ul>
        </div>
        <div className="flex flex-col gap-3 border-t border-line pt-4 md:flex-row md:flex-wrap md:justify-end xl:col-span-2">
          <ActionButton onClick={onQuote}>Gửi báo giá vào chat</ActionButton>
          {ready ? (
            <ButtonLink to="/lich-chup">Tạo booking</ButtonLink>
          ) : (
            <DisabledButton aria-describedby="bk-cho">Tạo booking</DisabledButton>
          )}
        </div>
        {!ready && (
          <p id="bk-cho" className="text-muted md:text-right xl:col-span-2">
            Chờ khách chốt giờ để tạo booking.
          </p>
        )}
      </form>
    </section>
  )
}
