import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import * as dotenv from 'dotenv'

dotenv.config({ path: path.join(process.cwd(), '.env.local') })

const token = process.env.SANITY_API_WRITE_TOKEN
if (!token) throw new Error('SANITY_API_WRITE_TOKEN is not set in .env.local')

const client = createClient({
  projectId: '1zmh4sfw',
  dataset: 'production',
  apiVersion: '2026-05-21',
  token,
  useCdn: false,
})

// Blog files to import
const blogFiles = [
  { file: 'best-ai-services-providers.md', title: '10 Best AI Services Providers', category: 'AI & Machine Learning' },
  { file: 'best-sharepoint-development-services.md', title: '10 Best SharePoint Development Services', category: 'Microsoft 365' },
  { file: 'best-power-platform-development-services.md', title: '10 Best Power Platform Development Services', category: 'Microsoft 365' },
  { file: 'best-web-app-development-services.md', title: '10 Best Web App Development Services', category: 'Web Development' },
  { file: 'best-mobile-app-development-services.md', title: '10 Best Mobile App Development Services', category: 'Mobile Development' },
  { file: 'best-data-analytics-services.md', title: '10 Best Data Analytics Services', category: 'Data Analytics' },
  { file: 'best-spfx-development-services.md', title: '10 Best SPFx Development Services', category: 'Microsoft 365' },
  { file: 'best-microsoft-fabric-services.md', title: '10 Best Microsoft Fabric Services', category: 'Microsoft 365' },
  { file: 'best-agentic-ai-services.md', title: '10 Best Agentic AI Services', category: 'AI & Machine Learning' },
  { file: 'best-react-development-services.md', title: '10 Best React Development Services', category: 'Web Development' },
]

// Convert markdown to Portable Text blocks
function markdownToBlocks(markdown: string) {
  const lines = markdown.split('\n')
  const blocks: Array<{ _type: string; style: string; children: Array<{ _type: string; text: string }>; list?: string }> = []
  
  let currentParagraph: string[] = []
  let inCodeBlock = false
  
  for (const line of lines) {
    // Skip title line
    if (line.startsWith('# ')) continue
    
    // Handle code blocks
    if (line.startsWith('```')) {
      if (currentParagraph.length > 0) {
        blocks.push({
          _type: 'block',
          style: 'normal',
          children: [{ _type: 'span', text: currentParagraph.join(' ') }],
        })
        currentParagraph = []
      }
      inCodeBlock = !inCodeBlock
      continue
    }
    
    if (inCodeBlock) {
      blocks.push({
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: line }],
      })
      continue
    }
    
    // Handle headers
    if (line.startsWith('## ')) {
      if (currentParagraph.length > 0) {
        blocks.push({
          _type: 'block',
          style: 'normal',
          children: [{ _type: 'span', text: currentParagraph.join(' ') }],
        })
        currentParagraph = []
      }
      blocks.push({
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: line.replace('## ', '') }],
      })
      continue
    }
    
    if (line.startsWith('### ')) {
      if (currentParagraph.length > 0) {
        blocks.push({
          _type: 'block',
          style: 'normal',
          children: [{ _type: 'span', text: currentParagraph.join(' ') }],
        })
        currentParagraph = []
      }
      blocks.push({
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: line.replace('### ', '') }],
      })
      continue
    }
    
    // Handle lists
    if (line.match(/^\d+\./)) {
      if (currentParagraph.length > 0) {
        blocks.push({
          _type: 'block',
          style: 'normal',
          children: [{ _type: 'span', text: currentParagraph.join(' ') }],
        })
        currentParagraph = []
      }
      blocks.push({
        _type: 'block',
        style: 'normal',
        list: 'number',
        children: [{ _type: 'span', text: line.replace(/^\d+\.\s*/, '') }],
      })
      continue
    }
    
    if (line.startsWith('- ')) {
      if (currentParagraph.length > 0) {
        blocks.push({
          _type: 'block',
          style: 'normal',
          children: [{ _type: 'span', text: currentParagraph.join(' ') }],
        })
        currentParagraph = []
      }
      blocks.push({
        _type: 'block',
        style: 'normal',
        list: 'bullet',
        children: [{ _type: 'span', text: line.replace('- ', '') }],
      })
      continue
    }
    
    // Regular text
    if (line.trim()) {
      currentParagraph.push(line.trim())
    } else if (currentParagraph.length > 0) {
      blocks.push({
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: currentParagraph.join(' ') }],
      })
      currentParagraph = []
    }
  }
  
  // Add remaining paragraph
  if (currentParagraph.length > 0) {
    blocks.push({
      _type: 'block',
      style: 'normal',
      children: [{ _type: 'span', text: currentParagraph.join(' ') }],
    })
  }
  
  return blocks
}

async function importBlogs() {
  console.log('Starting blog import...')
  
  try {
    // Create author
    const author = await client.createOrReplace({
      _id: 'softree-technology',
      _type: 'author',
      name: 'Softree Technology',
      slug: { current: 'softree-technology' },
      bio: [{ _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Leading provider of AI, Microsoft 365, and web development solutions.' }] }],
    })
    console.log('✓ Author created:', author.name)
    
    // Create categories
    const categories = new Set(blogFiles.map(b => b.category))
    const categoryMap = new Map()
    
    for (const categoryName of categories) {
      const slug = categoryName.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')
      const category = await client.createOrReplace({
        _id: `category-${slug}`,
        _type: 'category',
        title: categoryName,
        slug: { current: slug },
        description: `${categoryName} related content`,
      })
      categoryMap.set(categoryName, category._id)
      console.log('✓ Category created:', category.title)
    }
    
    // Import blog posts
    for (const blogFile of blogFiles) {
      const filePath = path.join(process.cwd(), 'src', 'app', 'blog', blogFile.file)
      const content = fs.readFileSync(filePath, 'utf-8')
      const lines = content.split('\n')

      // Extract first non-heading paragraph as excerpt
      let excerpt = ''
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim()
        if (line && !line.startsWith('#') && !line.startsWith('```')) {
          excerpt = line.substring(0, 160)
          break
        }
      }

      // Derive focus keyword from title (last 2-3 meaningful words)
      const focusKeyword = blogFile.title
        .toLowerCase()
        .replace(/^10 best /i, '')
        .replace(/ services?$/i, '')
        .trim()

      const blocks = markdownToBlocks(content)
      const categoryId = categoryMap.get(blogFile.category)
      
      const post = await client.createOrReplace({
        _id: `post-${blogFile.file.replace('.md', '')}`,
        _type: 'post',
        title: blogFile.title,
        slug: { current: blogFile.file.replace('.md', '') },
        excerpt,
        author: { _type: 'reference', _ref: 'softree-technology' },
        categories: categoryId ? [{ _type: 'reference', _ref: categoryId }] : [],
        publishedAt: new Date().toISOString(),
        body: blocks,
        focusKeyword,
        metaTitle: `${blogFile.title} in 2025 | Softree Technology`,
        metaDescription: excerpt.substring(0, 155),
        secondaryKeywords: [
          blogFile.category,
          'best providers',
          'top services',
          'enterprise solutions',
          'softree technology',
        ],
      })
      
      console.log('✓ Blog post created:', post.title)
    }
    
    console.log('Blog import completed successfully!')
  } catch (error) {
    console.error('Error importing blogs:', error)
    throw error
  }
}

importBlogs()
