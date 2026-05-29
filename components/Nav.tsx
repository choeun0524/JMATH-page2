'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    setIsOpen(false)
    document.body.style.overflow = ''
  }, [pathname])

  const openMenu = () => {
    setIsOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeMenu = () => {
    setIsOpen(false)
    document.body.style.overflow = ''
  }

  const isBlogActive = pathname === '/blog' || pathname.startsWith('/blog/')
  const isDailyActive = pathname === '/daily-post' || pathname.startsWith('/daily-post/')

  return (
    <>
      <nav className="nav">
        {isHome ? (
          <div className="nav-logo">
            <span className="nav-logo-main">J-MATH</span>
            <span className="nav-logo-sub">진단 · 맞춤 개념조합 · 피드백</span>
          </div>
        ) : (
          <div className="nav-left">
            <Link href="/" className="btn-back">
              <i className="fas fa-arrow-left"></i> 홈
            </Link>
            <div className="nav-logo">
              <span className="nav-logo-main">J-MATH</span>
              <span className="nav-logo-sub">진단 · 맞춤 개념조합 · 피드백</span>
            </div>
          </div>
        )}
        <ul className="nav-links">
          <li><Link href="/#essay">약술형 논술</Link></li>
          <li><Link href="/#strategy">합격 전략</Link></li>
          <li><Link href="/#contact">상담 신청</Link></li>
          <li><Link href="/blog" className={isBlogActive ? 'active' : ''}>Blog</Link></li>
          <li><Link href="/daily-post" className={isDailyActive ? 'active' : ''}>Daily Post</Link></li>
        </ul>
        <button
          className={`btn-hamburger${isOpen ? ' open' : ''}`}
          onClick={isOpen ? closeMenu : openMenu}
          aria-label="메뉴 열기"
        >
          <span className="hb-bar"></span>
          <span className="hb-bar"></span>
          <span className="hb-bar"></span>
        </button>
      </nav>

      <div className={`mobile-menu${isOpen ? ' open' : ''}`} id="mobileMenu">
        <button className="mm-close" onClick={closeMenu} aria-label="닫기">
          <i className="fas fa-times"></i>
        </button>
        <div className="mm-logo-wrap">
          <div className="mm-logo-main">J-MATH</div>
          <div className="mm-logo-sub">진단 · 맞춤 개념조합 · 피드백</div>
        </div>
        <div className="mm-inner">
          <div className="mm-kicker">MENU</div>
          <div className="mm-divider-gold"></div>
          <nav className="mm-nav">
            <Link href="/#essay" className="mm-link" onClick={closeMenu}>약술형 논술</Link>
            <Link href="/#strategy" className="mm-link" onClick={closeMenu}>합격 전략</Link>
            <Link href="/#contact" className="mm-link" onClick={closeMenu}>상담 신청</Link>
            <div className="mm-sep"></div>
            <Link href="/blog" className="mm-link mm-link-sub" onClick={closeMenu}>Blog</Link>
            <Link href="/daily-post" className="mm-link mm-link-sub" onClick={closeMenu}>Daily Post</Link>
          </nav>
        </div>
        <div className="mm-footer-txt">© 2026 J-MATH</div>
      </div>
    </>
  )
}
