import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'Blog — J-MATH',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="page-wrap">
      <section className="page-hero">
        <div className="page-inner">
          <div className="page-kicker">J-MATH</div>
          <h1 className="page-title">Blog</h1>
          <div className="page-divider"></div>
          {posts.length === 0 ? (
            <p className="page-subtitle">
              수학 학습 전략과 입시 정보를 담을 공간입니다.<br />
              곧 업데이트될 예정입니다.
            </p>
          ) : (
            <div className="post-list">
              {posts.map(post => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="post-card">
                  <div className="post-date">{post.date}</div>
                  <div className="post-title-text">{post.title}</div>
                  {post.description && (
                    <div className="post-desc-text">{post.description}</div>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      <footer className="footer-simple">
        <div className="footer-copy">© 2026 J-MATH. All rights reserved.</div>
      </footer>
    </div>
  )
}
