import { createClient } from '@sanity/client'
import crypto from 'crypto'
import * as dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env.local') })

const token = process.env.SANITY_API_WRITE_TOKEN
if (!token) throw new Error('SANITY_API_WRITE_TOKEN is not set in .env.local')

const client = createClient({
  projectId: '1zmh4sfw',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const generateKey = () => crypto.randomBytes(8).toString('hex')

async function fixMissingKeys() {
  console.log('Fetching posts with missing keys...')

  // Fetch posts that might have arrays missing keys
  const query = `*[_type == "post"] { _id, _rev, categories, body, secondaryKeywords, faqSchema }`
  const posts = await client.fetch(query)

  let updatedCount = 0

  for (const post of posts) {
    let needsUpdate = false
    const patch = client.patch(post._id).ifRevisionId(post._rev)

    // 1. Fix Categories array
    if (Array.isArray(post.categories)) {
      const fixedCategories = post.categories.map((c: any) => {
        if (!c._key) {
          needsUpdate = true
          return { ...c, _key: generateKey() }
        }
        return c
      })
      if (needsUpdate) patch.set({ categories: fixedCategories })
    }

    // 2. Fix Body blocks
    if (Array.isArray(post.body)) {
      let bodyNeedsUpdate = false
      const fixedBody = post.body.map((b: any) => {
        const newBlock = { ...b }
        if (!newBlock._key) {
          bodyNeedsUpdate = true
          newBlock._key = generateKey()
        }

        // Fix children spans inside blocks
        if (Array.isArray(newBlock.children)) {
          newBlock.children = newBlock.children.map((child: any) => {
            if (!child._key) {
              bodyNeedsUpdate = true
              return { ...child, _key: generateKey() }
            }
            return child
          })
        }

        // Fix markDefs
        if (Array.isArray(newBlock.markDefs)) {
          newBlock.markDefs = newBlock.markDefs.map((def: any) => {
            if (!def._key) {
              bodyNeedsUpdate = true
              return { ...def, _key: generateKey() }
            }
            return def
          })
        }

        return newBlock
      })

      if (bodyNeedsUpdate) {
        needsUpdate = true
        patch.set({ body: fixedBody })
      }
    }

    // 3. Fix SecondaryKeywords array (tags layout)
    if (Array.isArray(post.secondaryKeywords)) {
      // NOTE: Arrays of primitive strings do NOT strictly need _key in Sanity,
      // but if they are typed as objects, they do. Our schema says `of: [{type: 'string'}]`.
      // Sanity handles primitive strings in arrays differently, but if errors persist, 
      // it's usually `categories`, `body`, or `faqSchema` objects.
    }

    // 4. Fix faqSchema array
    if (Array.isArray(post.faqSchema)) {
      let faqNeedsUpdate = false
      const fixedFaq = post.faqSchema.map((faq: any) => {
        if (!faq._key) {
          faqNeedsUpdate = true
          return { ...faq, _key: generateKey() }
        }
        return faq
      })
      if (faqNeedsUpdate) {
        needsUpdate = true
        patch.set({ faqSchema: fixedFaq })
      }
    }

    if (needsUpdate) {
      try {
        await patch.commit()
        console.log(`✓ Fixed missing keys for post: ${post._id}`)
        updatedCount++
      } catch (err: any) {
        console.error(`✗ Failed to update post ${post._id}:`, err.message)
      }
    }
  }

  console.log(`\nOperation complete. Fixed ${updatedCount} posts.`)
}

fixMissingKeys().catch(console.error)
