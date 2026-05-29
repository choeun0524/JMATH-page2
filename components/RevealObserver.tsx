'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function RevealObserver() {
  const pathname = usePathname()

  useEffect(() => {
    document.querySelectorAll('.contact-grid').forEach(parent => {
      ;[...parent.children].forEach((child, i) => {
        const el = child as HTMLElement
        if (!el.dataset.delay) el.dataset.delay = String(i * 90)
      })
    })

    const revealSelectors = '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-fade'

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const delay = parseInt((e.target as HTMLElement).dataset.delay || '0') || 0
            setTimeout(() => e.target.classList.add('visible'), delay)
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    document.querySelectorAll(revealSelectors).forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [pathname])

  return null
}
