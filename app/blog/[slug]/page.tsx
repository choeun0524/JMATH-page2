import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '@/lib/posts'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug).catch(() => null)
  if (!post) return { title: 'Blog — J-MATH' }
  return { title: `${post.title} — J-MATH` }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug).catch(() => null)
  if (!post) notFound()

  return (
    <div className="page-wrap">
      <div className="post-article-wrap">
        <article className="post-article">
          <Link href="/blog" className="post-back">
            <i className="fas fa-arrow-left"></i> Blog 목록
          </Link>
          <h1>{post.title}</h1>
          <div className="post-meta">{post.date}</div>
          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </article>
      </div>
      <footer className="footer-simple">
        <div className="footer-copy">© 2026 J-MATH. All rights reserved.</div>
      </footer>
    </div>
  )
}
