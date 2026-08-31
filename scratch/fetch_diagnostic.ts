import { createClient } from '@sanity/client';

const projectId = '1zmh4sfw';
const dataset = 'production';

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-02-01',
  useCdn: false,
});

const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    _updatedAt,
    title,
    slug,
    excerpt,
    displayMode,
    layoutRecipe,
    heroEyebrow,
    heroHighlights[] { value, label },
    publishedAt,
    status,
    author->{ name, bio },
    categories[]->{ title, slug },
    mainImage { asset->{ url }, alt },
    body[]{
      ...,
      _type == "image" => {
        ...,
        asset->
      },
      markDefs[]{
        ...,
        _type == "link" => {
          ...,
          href
        }
      }
    },
    metaTitle,
    metaDescription,
    focusKeyword,
    secondaryKeywords,
    faqSchema,
    composerSections
  }
`;

function toPlainText(value: any): string {
  if (!value) return '';
  if (typeof value === 'string') return value.trim();
  if (Array.isArray(value)) {
    return value
      .map((block) => {
        if (block._type !== 'block' || !block.children) return '';
        return block.children.map((child: any) => child.text).join('');
      })
      .join('\n');
  }
  return '';
}

async function main() {
  const slug = 'microsoft-copilot-studio-development-guide-for-enterprises';
  const post: any = await client.fetch(postBySlugQuery, { slug });
  
  if (!post) {
    console.log('Post not found');
    return;
  }
  
  console.log('Post loaded successfully!');
  
  // Let's run the exact string formatting checks from BlogPost page:
  try {
    const publishedDate = post.publishedAt
      ? new Date(post.publishedAt).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })
      : 'Recent';

    // estimateReadTime
    const composerText = JSON.stringify(post.composerSections || '');
    const bodyText = JSON.stringify(post.body || '');
    const words = (composerText + bodyText).split(/\s+/).filter(Boolean).length;
    const readTime = `${Math.max(3, Math.ceil(Math.max(words, 700) / 220))} min read`;

    console.log('Read time estimated:', readTime);

    const excerpt =
      toPlainText(post.excerpt) ||
      toPlainText(post.body?.[0])?.substring(0, 160) ||
      '';
    const pageUrl = `https://www.softreetechnology.com/blog/${slug}`;
    const encodedUrl = encodeURIComponent(pageUrl);
    const encodedTitle = encodeURIComponent(post.title || 'Softree Technology Blog');
    
    // Check categories
    const categoryName = post.categories?.[0]?.title || 'Blog';
    console.log('Category name:', categoryName);

    const updatedDate = post._updatedAt
      ? new Date(post._updatedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
      : publishedDate;
      
    const faqSchema = post.faqSchema && post.faqSchema.length > 0 ? {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: post.faqSchema.map((faq: { question: string; answer: string }) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    } : null;

    console.log('FAQ Schema parsed:', JSON.stringify(faqSchema, null, 2));
    console.log('Diagnostic finished successfully! No runtime issues found in calculations.');
  } catch (error: any) {
    console.error('CRASH DETECTED during formatting:', error.message);
    console.error(error.stack);
  }
}

main().catch(console.error);
