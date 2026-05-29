'use client'

export default function ScrollTop() {
  return (
    <button
      className="scroll-top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="맨 위로"
    >
      <i className="fas fa-chevron-up"></i>
    </button>
  )
}
