import { SOFTREE_STYLE_CONTEXT } from './constants'

/**
 * Registered in Studio via assist fieldActions (✨ menu → Softree instruction templates).
 * Each action copies a ready-to-run instruction including live aiContext when available.
 * Updated for 2026 AI content workflows.
 */
export const studioInstructionTemplates = [
  {
    title: '🎨 Softree brand voice (global)',
    instruction: SOFTREE_STYLE_CONTEXT,
  },
  {
    title: '📊 Case study — complete CAR-R framework',
    instruction: `Using the CAR-R framework (Challenge-Action-Result-Reflection), write a complete case study:

CHALLENGE (The Hook):
- Business problem and pain points
- Industry context and constraints
- Why existing solutions failed

ACTION (The Process):
- Softree's strategy and architecture decisions
- Technologies used (reference the category field)
- Implementation approach and timeline

RESULT (The Proof):
- Quantified metrics and business impact
- Before/after comparisons
- Client testimonial quote suggestion

REFLECTION (The Insight):
- Lessons learned
- Applicability to similar clients
- Forward-looking value

Use the client name, industry, and category already on the document. Keep each section 2-4 short paragraphs.`,
  },
  {
    title: '📝 Case study — generate from PPT notes',
    instruction: `Transform PowerPoint bullet points into narrative case study sections. Convert:
- Bullet lists → Flowing paragraphs
- Technical specs → Business benefits  
- Timeline slides → Process narrative
- Results slides → Impact statements with metrics

Maintain the client's voice while applying Softree brand guidelines.`,
  },
  {
    title: '📰 Blog — pillar content from outline',
    instruction: `Expand this blog post into comprehensive pillar content (2000-3000 words):

Structure:
- H2: Introduction (problem statement + promise)
- H2: The Landscape (current state + gaps)
- H2: Deep Dive (3-4 H3 subsections with practical examples)
- H2: Implementation Guide (actionable steps)
- H2: Common Pitfalls (what to avoid)
- H2: Next Steps (clear CTA)

Style: Use H2 for major sections only (no H1). Include real data points where possible. End with related content suggestions.`,
  },
  {
    title: '🔥 Blog — thought leadership hot take',
    instruction: `Write a provocative thought leadership piece that challenges conventional wisdom in this topic area:

- Bold opening statement that sparks curiosity
- Evidence-based argument with 2-3 supporting data points
- Counter-argument acknowledgment and rebuttal
- Practical implications for readers
- Memorable closing with shareable quote

Tone: Confident but not arrogant. Back claims with logic. Match Softree's innovative brand positioning.`,
  },
  {
    title: '🎯 SEO — complete metadata package',
    instruction: `Generate a comprehensive SEO metadata package:

1. META TITLE (30-60 characters):
   - Include primary keyword naturally
   - Add brand differentiation
   - No trailing punctuation

2. META DESCRIPTION (120-160 characters):
   - Active voice with clear value proposition
   - Include focus keyword
   - Compelling click-worthy CTA

3. EXCERPT (120-160 characters):
   - Listing summary for cards/previews
   - One concrete outcome or benefit
   - No hype words

4. FOCUS KEYWORD suggestions (3 options)

5. SECONDARY KEYWORDS (5-7 LSI terms)

Base everything on the main content body provided.`,
  },
  {
    title: '🏷️ Auto-tagging — suggest categories',
    instruction: `Analyze this content and suggest relevant taxonomy:

1. PRIMARY CATEGORY (1): Best fit from existing taxonomy
2. SECONDARY CATEGORIES (2-3): Related areas
3. INDUSTRY TAGS (2-4): Vertical markets this applies to
4. TECHNOLOGY TAGS (2-5): Specific technologies mentioned
5. CONTENT TYPE: [Tutorial | Case Study | Thought Leadership | News | Guide]

Only suggest tags that genuinely apply. Consider what users would search for.`,
  },
  {
    title: '🖼️ Image generation — case study hero',
    instruction: `Create an image generation prompt for a case study hero image:

CONTEXT: Tech company case study, professional but modern
STYLE: Clean, minimal, enterprise-grade
COLORS: Reference the case study's theme colors if available
SUBJECT: Abstract representation of [category] technology transformation

Output a detailed prompt suitable for AI image generation (100-150 words). Include:
- Art style (corporate illustration, 3D render, or abstract geometric)
- Mood (innovative, trustworthy, cutting-edge)
- Visual elements to include/exclude
- Color palette guidance`,
  },
  {
    title: '💬 FAQ schema — answer engine optimization',
    instruction: `Generate 3-5 FAQ pairs for Answer Engine Optimization (AEO):

Each FAQ should:
- Target a specific question users actually ask
- Provide a concise 2-4 sentence answer
- Be suitable for Google AI Overviews and featured snippets
- Use natural conversational language
- Include one concrete fact or statistic when relevant

Focus on questions that:
1. Address common objections
2. Clarify technical concepts
3. Compare alternatives
4. Explain implementation steps

Format as Question → Answer pairs.`,
  },
  {
    title: '🔄 Content refresh — update for 2026',
    instruction: `Refresh this existing content for current relevance:

CHECK AND UPDATE:
- Statistics and data points (verify and update to 2024-2026)
- Technology references (update deprecated tools, add new standards)
- Industry trends (refresh with current market conditions)
- Links and references (verify still valid)
- Examples (replace with fresher, more relevant ones)

ADD:
- New sections for emerging trends since original publish
- Updated "last updated" timestamp
- Note about what changed (builds trust)

MAINTAIN:
- Original URL and core keyword targeting
- Successful content structure that performed well`,
  },
  {
    title: '📧 Marketing — email newsletter version',
    instruction: `Convert this content into a compelling email newsletter:

SUBJECT LINE OPTIONS (3):
- Curiosity-driven (60 chars max)
- Benefit-driven (60 chars max)  
- Question-based (60 chars max)

PREVIEW TEXT (100 chars):
- Compelling snippet that complements subject

BODY:
- Hook paragraph (2-3 sentences)
- Key takeaways (3-5 bullet points)
- Read more CTA
- P.S. with secondary engagement

Tone: Conversational, scannable, mobile-friendly. Shorter paragraphs.`,
  },
  {
    title: '🎨 Marketing landing page — conversion copy',
    instruction: `Polish marketing page copy for enterprise buyer conversion:

HEADLINES:
- Hero: Clear value proposition (under 10 words)
- Subhead: Supporting benefit (under 15 words)
- Section headers: Benefit-focused H2s

BODY COPY:
- Lead with customer outcomes, not features
- Reduce jargon by 50%
- Add specificity (numbers, timeframes, percentages)
- CTAs: Action-oriented verbs (Get, Start, See, Book)

SOCIAL PROOF:
- Suggest client logos to feature
- Stats to highlight
- Testimonial placement

Maintain Softree brand voice throughout.`,
  },
  {
    title: '🌍 Translation — localize for global markets',
    instruction: `Translate this content while maintaining local market relevance:

TRANSLATION APPROACH:
- Preserve brand voice and tone
- Adapt idioms and cultural references
- Convert measurements/currency where appropriate
- Maintain SEO keyword intent (not literal translation)

LOCALIZATION CHECKS:
- Date formats
- Address formats  
- Cultural sensitivity review
- Local industry terminology

Preserve all formatting, H2/H3 structure, and field relationships.
Target language should be specified by editor before running.`,
  },
  {
    title: '🎙️ Voice Search & Conversational AI — optimize for assistants',
    instruction: `Rewrite this content for voice search and conversational AI (Siri, Alexa, Google Assistant, ChatGPT):

VOICE SEARCH OPTIMIZATION:
- Natural question-answer format
- 30-50 word concise answers
- Conversational tone (how people actually speak)
- Long-tail question phrases: "How do I...", "What is the best..."
- Featured snippet optimization (direct answer in first sentence)

STRUCTURE FOR VOICE:
- FAQ format with clear Q&A pairs
- Speakable schema markup suggestions
- Bullet points for list-based answers
- No complex tables or visual references

CONVERSATIONAL AI OPTIMIZATION:
- Context-aware responses
- Follow-up question suggestions
- Entity recognition (products, technologies, people)
- Intent-based content clusters

EXAMPLE TRANSFORMATION:
Before: "Power Platform governance requires establishing DLP policies."
After: "What do I need for Power Platform governance? You'll need three things: data loss prevention policies, environment strategies, and app lifecycle management."

Preserve core meaning while making it voice-friendly.`,
  },
  {
    title: '🤖 AI Overview Optimization — rank in Google AI Overviews',
    instruction: `Optimize this content for Google's AI Overviews (AIO) and AI-generated search results:

AI OVERVIEW OPTIMIZATION (2026):
- Clear, factual statements AI can easily extract
- Structured data with schema markup suggestions
- "What is", "How to", "Why does" direct answers
- Authoritative source citations
- Entity-rich content (people, organizations, technologies)

CONTENT STRUCTURE FOR AI EXTRACTION:
- Definition box format for key terms
- Step-by-step numbered procedures
- Comparison tables with clear differentiators
- Pros/cons structured lists
- TL;DR summaries at section start

AUTHORITATIVE SIGNALS:
- Expert quotes and credentials
- Research citations with links
- First-party data and original research
- Case study references with outcomes
- Industry standard compliance mentions

TRUST INDICATORS:
- "According to [authoritative source]"
- "Based on our analysis of X implementations"
- "Microsoft recommends..."
- "Gartner predicts..."

Make every section extractable as a standalone AI answer.`,
  },
  {
    title: '📱 Video Script — YouTube/TikTok from blog',
    instruction: `Transform this blog content into a video script for YouTube or TikTok:

VIDEO FORMAT CHOICES:
- Talking head (expert speaking to camera)
- Screen recording (tutorial/demonstration)
- Animated explainer (motion graphics)
- B-roll with voiceover (documentary style)

SCRIPT STRUCTURE:
HOOK (0:00-0:15):
- Pattern interrupt or bold claim
- Visual curiosity gap
- "Here's what nobody tells you about..."

PROBLEM SETUP (0:15-0:45):
- Relatable pain point
- Cost of inaction
- "If you're struggling with..."

SOLUTION REVEAL (0:45-2:00):
- Core insight or framework
- 3-5 key takeaways
- Visual aids on screen
- "The secret is..."

PROOF/EXAMPLE (2:00-3:00):
- Real case study or data
- Before/after comparison
- "We implemented this at [client] and saw..."

CTA (3:00-3:30):
- Clear next step
- Link in description mention
- Subscribe + notification bell
- "Comment below if..."

VISUAL DIRECTIONS:
- [B-ROLL: Office footage]
- [GRAPHIC: Architecture diagram]
- [TEXT ON SCREEN: "73% reduction"]
- [ZOOM IN: Screenshot highlight]

Length: 3-5 minutes for YouTube, 60-90 seconds for TikTok.`,
  },
  {
    title: '📊 Interactive Content — calculator/assessment from article',
    instruction: `Convert this content into an interactive tool (calculator, assessment, or quiz):

INTERACTIVE FORMAT OPTIONS:
- ROI Calculator (input → output with savings)
- Readiness Assessment (scorecard with recommendations)
- Solution Finder (wizard-style guided path)
- Complexity Grader (benchmark comparison)

CALCULATOR STRUCTURE:
INPUTS (5-7 questions):
- Current state metrics
- Team size/budget
- Timeline constraints
- Risk tolerance
- Integration requirements

LOGIC RULES:
- Conditional branching
- Weighted scoring
- Industry benchmarks
- Maturity level assessment

OUTPUTS:
- Numerical result (ROI, time savings, cost)
- Qualitative grade (maturity level, readiness)
- Personalized recommendations (3-5 actions)
- Resource suggestions (tools, templates, guides)

SHAREABLE RESULTS:
- "Your Power Platform Maturity: 73/100 - Optimizer Level"
- Social sharing copy
- PDF download with full report
- Email results option

EXAMPLE:
"Based on your 500-user deployment, 3-environment setup, and 6-month timeline, your estimated ROI is 340% in year one with $127K cost savings."

Make it actionable and shareable.`,
  },
  {
    title: '🔗 Content Cluster — pillar + supporting articles',
    instruction: `Design a complete content cluster around this pillar topic:

CONTENT CLUSTER ARCHITECTURE (2026 SEO):
PILLAR PAGE (this content):
- Broad topic coverage (2000-3000 words)
- Comprehensive overview
- Links to all cluster content
- "Ultimate Guide" format

CLUSTER CONTENT (suggest 5-8 articles):
For each supporting article:
- Specific subtopic (narrower angle)
- 800-1500 words
- Deep dive on one aspect
- Links back to pillar
- Targets long-tail keyword

INTERNAL LINKING STRATEGY:
- Pillar → Cluster (contextual links)
- Cluster → Pillar (every article)
- Cluster ↔ Cluster (related topics)
- Anchor text optimization

TOPIC SUGGESTIONS (based on pillar):
1. [Subtopic 1] - Definition/foundation
2. [Subtopic 2] - Implementation guide
3. [Subtopic 3] - Common mistakes
4. [Subtopic 4] - Tools comparison
5. [Subtopic 5] - Case study/example
6. [Subtopic 6] - Future trends
7. [Subtopic 7] - Expert interview
8. [Subtopic 8] - Template/checklist

KEYWORD MAPPING:
- Pillar: head term (high volume, competitive)
- Cluster: long-tail (lower volume, easier rank)

Create a hub-and-spoke content ecosystem.`,
  },
  {
    title: '🎨 Visual Content — infographic from data/stats',
    instruction: `Transform statistics and data points into visual content descriptions:

VISUAL FORMAT OPTIONS:
- Statistical infographic (chart-heavy)
- Process flow diagram (step-by-step)
- Comparison matrix (side-by-side)
- Timeline visualization (journey/progression)
- Icon-based explainer (concept simplification)

INFOGRAPHIC STRUCTURE:
HEADLINE:
- Data-driven hook: "73% of enterprises fail at X"
- Promise of insight: "Here's what the top 27% do differently"

DATA VISUALIZATIONS:
- Bar charts (comparisons)
- Pie charts (proportions)
- Line graphs (trends over time)
- Flow diagrams (processes)
- Heat maps (intensity/priority)

KEY STATS TO HIGHLIGHT:
- [Stat 1]: Context + implications
- [Stat 2]: Before/after comparison
- [Stat 3]: Industry benchmark
- [Stat 4]: ROI/time savings
- [Stat 5]: Risk/compliance factor

DESIGN NOTES FOR DESIGNER:
- Color palette (brand colors)
- Typography hierarchy
- White space balance
- Mobile-responsive layout
- Source citation placement

ALTTEXT & ACCESSIBILITY:
- Screen reader description
- Data table alternative
- High contrast version

OUTPUT SUGGESTIONS:
- Full infographic (1920x1080)
- Social media carousels (4-8 slides)
- Blog embeddable version
- PDF download
- Animated version (for video)

Make data visually compelling and shareable.`,
  },
  {
    title: '💬 LinkedIn Carousel — from single article',
    instruction: `Convert this content into a LinkedIn document carousel (PDF slides):

LINKEDIN CAROUSEL FORMAT (10-15 slides):

SLIDE 1 - COVER:
- Bold headline (problem or promise)
- Clean design, minimal text
- Brand logo/watermark
- "Swipe for the framework →"

SLIDE 2 - HOOK:
- Relatable pain point or bold claim
- "Most people get this wrong..."
- Build curiosity gap

SLIDES 3-10 - CORE CONTENT:
- One concept per slide
- 10-15 words max per slide
- Visual icons or simple graphics
- Numbered steps or bullet points

SLIDE 11 - PROOF/EXAMPLE:
- Mini case study
- "We helped [client] achieve [result]"
- Social proof element

SLIDE 12 - MISTAKES TO AVOID:
- Common pitfalls (3-4)
- "Don't make these mistakes..."

SLIDE 13 - KEY TAKEAWAY:
- Single memorable insight
- Bold text, high impact
- "Remember this:"

SLIDE 14 - CTA:
- "Save this for later"
- "Tag someone who needs this"
- "Follow for more"
- Comment starter question

SLIDE 15 - CREDITS/SOURCES:
- Your name/title
- Company info
- Link to full article
- Hashtags (3-5 relevant)

DESIGN PRINCIPLES:
- Consistent template
- High contrast
- Mobile-readable (large fonts)
- Visual hierarchy
- Brand colors

ENGAGEMENT TACTICS:
- First comment with link
- Reply to every comment
- Share in relevant groups
- Tag mentioned companies/people`,
  },
] as const
