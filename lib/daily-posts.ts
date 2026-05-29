import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'content/daily')

export function getAllDailyPosts() {
  if (!fs.existsSync(postsDirectory)) return []
  const fileNames = fs.readdirSync(postsDirectory).filter(f => f.endsWith('.md'))
  if (fileNames.length === 0) return []
  const posts = fileNames.map(fileName => {
    const slug = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)
    return {
      slug,
      title: (data.title as string) || slug,
      date: (data.date as string) || '',
      description: (data.description as string) || '',
    }
  })
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getDailyPostBySlug(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  const processedContent = await remark().use(html).process(content)
  const contentHtml = processedContent.toString()
  return {
    slug,
    title: (data.title as string) || slug,
    date: (data.date as string) || '',
    description: (data.description as string) || '',
    contentHtml,
  }
}
