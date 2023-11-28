// pages/sitemap.xml.tsx
import { getServerSideSitemap } from 'next-sitemap' //(1)

//(2)
export const getServerSideProps = async (ctx) => {
  const posts = await fetcher('/posts')
  const categories = await fetcher('/categories')
  const lastmod = new Date().toISOString()

  //(3), (4)
  const defaultFields = [
    {
      loc: process.env.URL,
      changefreq: 'daily',
      priority: '0.8',
      lastmod,
    },
    {
      loc: `${process.env.URL}/example`,
      changefreq: 'daily',
      priority: '0.8',
      lastmod,
    },
  ]

  //(5)
  const categoryFields = categories.map((category) => ({
    loc: `${process.env.URL}/${category}`,
    changefreq: 'daily',
    priority: '0.9',
    lastmod,
  }))

  const boardFields = boards.map((board) => ({
    loc: `${process.env.URL}/${board.category}/${board.id}`,
    changefreq: 'daily',
    priority: '1.0',
    lastmod,
  }))

  //(6)
  const fields = [...defaultFields, ...categoryFields, ...boardFields]

  //(7)
  return getServerSideSitemap(ctx, fields)
}
//(8)
export default () => {
  return
}
