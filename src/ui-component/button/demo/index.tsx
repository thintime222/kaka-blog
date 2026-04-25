export default function ButtonDemo() {
  return (
    <button
      type="button"
      style={{
        padding: '8px 12px',
        borderRadius: 10,
        border: '1px solid rgba(255,255,255,0.18)',
        background: 'rgba(255,255,255,0.06)',
        color: 'inherit',
        cursor: 'pointer',
      }}
      onClick={() => alert('Button demo')}
    >
      Demo Button
    </button>
  )
}

