import { INPUT } from './ui.jsx'

// Ô nhập luôn có <label> hiển thị phía trên, gắn bằng htmlFor/id.

export function TextField({ id, label, hint, hintClass = 'text-muted', className = '', ...input }) {
  return (
    <div className={`flex min-w-0 flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="font-semibold">{label}</label>
      <input id={id} name={id} type="text" className={INPUT} {...input} />
      {hint && <p className={`flex items-center gap-2 ${hintClass}`}>{hint}</p>}
    </div>
  )
}

export function SelectField({ id, label, options, hint, hintClass = 'text-muted', className = '', ...select }) {
  return (
    <div className={`flex min-w-0 flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="font-semibold">{label}</label>
      <select id={id} name={id} className={INPUT} {...select}>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
      {hint && <p className={`flex items-center gap-2 ${hintClass}`}>{hint}</p>}
    </div>
  )
}

export function CheckField({ id, label, ...input }) {
  return (
    <label htmlFor={id} className="flex min-h-11 items-center gap-2">
      <input id={id} name={id} type="checkbox" className="size-5 accent-brand" {...input} />
      {label}
    </label>
  )
}
