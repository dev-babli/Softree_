import React from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

/**
 * BlogResults Section Component
 * 
 * Clones the "Discover How We Deliver Results" section with a large featured post
 * and a vertical stack of three smaller blog posts.
 * Consistent with CRM, AI, & IT Services branding.
 */

const posts = [
  {
    type: 'featured',
    category: 'blog-post',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f9231059-3647-4f7a-ab8a-965fcb6abfb0-cynoteck-com/assets/images/1764661828137-Cyno_20Blog_20Card_20Image-16.jpg',
    author: 'Nitin Dangwal',
    title: 'Fix Your Customer Relations in 30 Days — The No-Fluff Plan',
    excerpt: 'Improve customer relations in 30 days with a simple, proven system. Learn why businesses lose customers, how to fix response times, build a single source of truth, and use CRM to drive loyalty and growth. Work with Cynoteck, a leading CRM consulting partner.',
    link: '/blog/fix-customer-relations'
  },
  {
    type: 'small',
    category: 'blog-post',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f9231059-3647-4f7a-ab8a-965fcb6abfb0-cynoteck-com/assets/images/1763372125827-Dynamics_20365_20Integration_20Strea-17.webp',
    author: 'Abhishek Singh',
    title: 'Dynamics 365 Integration: Streamlining Business Processes with Seamless...',
    excerpt: 'Microsoft Dynamics 365 integration made easy. Explore tools, APIs, best practices, and real use cases to connect systems...',
    link: '/blog/dynamics-365-integration'
  },
  {
    type: 'small',
    category: 'blog-post',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f9231059-3647-4f7a-ab8a-965fcb6abfb0-cynoteck-com/assets/images/1763112878004-Importance_20of_20Customer_20Service-18.webp',
    author: 'Abhishek Singh',
    title: 'Importance of Customer Service in Healthcare: Why It Matters',
    excerpt: 'Customer service in healthcare matters. Discover tools, software, and strategies to improve patient experience, reduce wait times...',
    link: '/blog/healthcare-customer-service'
  },
  {
    type: 'small',
    category: 'blog-post',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f9231059-3647-4f7a-ab8a-965fcb6abfb0-cynoteck-com/assets/images/1763034508316-What_20is_20Salesforce_20and_20what_-19.webp',
    author: 'Nitin Dangwal',
    title: 'What Is Salesforce and What Does It Really Do? A Complete Guide for Professionals',
    excerpt: 'Learn what Salesforce is, how it works, and why it’s the world’s #1 CRM. This guide explains features, benefits, and growth strategies...',
    link: '/blog/what-is-salesforce'
  }
];

export default function BlogResults() {
  const featured = posts.find(p => p.type === 'featured');
  const smallPosts = posts.filter(p => p.type === 'small');

  return (
    <section className="bg-[var(--legacy-eff9ff)] py-20 px-4 md:px-0">
      <div className="max-w-7xl mx-auto w-[87%]">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-[var(--legacy-1d4ed8)]/80 text-sm font-medium mb-3 uppercase tracking-wider">
            Real-World Results
          </p>
          <h2 className="text-[var(--legacy-00091a)] text-[40px] font-normal leading-tight">
            Discover How We Deliver Results
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
          
          {/* Featured Post Card */}
          {featured && (
            <div className="group cursor-pointer">
              <div className="relative rounded-xl overflow-hidden mb-5 aspect-[16/10]">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-md">
                  <span className="text-white text-xs font-medium">{featured.category}</span>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-[var(--legacy-18285c)] text-[14px] font-medium opacity-80">
                  {featured.author}
                </p>
                <div className="flex justify-between items-start gap-4">
                  <h3 className="text-[var(--legacy-00091a)] text-2xl font-bold leading-snug group-hover:text-[var(--legacy-1d4ed8)] transition-colors">
                    {featured.title}
                  </h3>
                  <ArrowUpRight className="w-6 h-6 text-[var(--legacy-00091a)] shrink-0 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
                <p className="text-[var(--legacy-00091a)]/72 text-[16px] leading-relaxed">
                  {featured.excerpt}
                </p>
              </div>
            </div>
          )}

          {/* Sidebar Posts Stack */}
          <div className="flex flex-col gap-8">
            {smallPosts.map((post, index) => (
              <div key={index} className="group flex flex-col sm:flex-row gap-5 cursor-pointer items-start">
                <div className="relative w-full sm:w-[220px] aspect-[16/10] shrink-0 rounded-lg overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-sm">
                    <span className="text-white text-[10px] font-medium uppercase">{post.category}</span>
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  <p className="text-[var(--legacy-18285c)] text-[13px] font-medium opacity-80">
                    {post.author}
                  </p>
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="text-[var(--legacy-00091a)] text-[17px] font-bold leading-snug group-hover:text-[var(--legacy-1d4ed8)] transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <ArrowUpRight className="w-4 h-4 text-[var(--legacy-00091a)] shrink-0 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <p className="text-[var(--legacy-00091a)]/72 text-[14px] leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}