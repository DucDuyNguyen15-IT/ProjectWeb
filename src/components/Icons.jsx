// Icon nét (stroke) vẽ bằng SVG, chỉ để trang trí: luôn aria-hidden, chữ bên cạnh mang nghĩa.

function Icon({ children, size = 'size-5', className = '' }) {
  return (
    <svg
      aria-hidden="true"
      className={`flex-none ${size} ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  )
}

export function ChevronDown(props) {
  return <Icon {...props}><path d="m6 9 6 6 6-6" /></Icon>
}

export function ArrowRight(props) {
  return <Icon {...props}><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></Icon>
}

export function Bell(props) {
  return (
    <Icon {...props}>
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </Icon>
  )
}

export function Check(props) {
  return <Icon {...props}><path d="M20 6 9 17l-5-5" /></Icon>
}
