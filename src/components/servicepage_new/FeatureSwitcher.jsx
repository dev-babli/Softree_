'use client';

import React, { useState } from 'react';

const featuresData = [
  {
    id: 'speed',
    tabLabel: 'Speed',
    title: 'Blazing-Fast Load Times, Built In',
    description1: 'We don’t just promise speed, we engineer it. Our sites are optimized from the ground up with minified code, compressed assets, lazy loading, and deferred scripts that keep things snappy.',
    description2: 'The result? Faster page loads, better user experience, and improved performance scores where it counts.',
    testimonial: '"We’re already seeing higher traffic and fewer navigation questions—customers instantly immerse themselves and focus on what matters."',
    author: 'Tracy Lisowe, Former Marketing Director at Buechel Stone',
    rightGraphic: (
      <div className="relative flex items-center justify-center w-full h-full">
        {/* Speedometer Graphics Mockup */}
        <div className="w-72 h-56 border border-purple-500/20 rounded-xl bg-[#130E26]/40 p-6 flex flex-col justify-between shadow-2xl backdrop-blur-sm animate-fadeIn">
          <div className="flex space-x-1.5 opacity-40">
            <div className="w-2 h-2 rounded-full bg-purple-400"></div>
            <div className="w-2 h-2 rounded-full bg-purple-400"></div>
            <div className="w-2 h-2 rounded-full bg-purple-400"></div>
          </div>
          <div className="relative w-44 h-24 mx-auto border-t-8 border-x-8 border-purple-500/30 rounded-t-full flex items-end justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent rounded-t-full"></div>
            {/* Speed Needle */}
            <div className="w-1 h-20 bg-purple-400 origin-bottom transform rotate-[45deg] translate-y-2 rounded-full shadow-lg shadow-purple-500"></div>
          </div>
          <div className="space-y-2 opacity-30">
            <div className="h-2 w-3/4 bg-purple-400/50 rounded"></div>
            <div className="h-2 w-1/2 bg-purple-400/50 rounded"></div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'accessibility',
    tabLabel: 'Accessibility',
    title: 'Built To Be Found And Accessible To All',
    description1: 'Every site we deliver follows SEO and WCAG accessibility best practices. From proper semantic structure and meta tagging to ARIA labels and color contrast standards, we ensure your site is discoverable, compliant, and inclusive.',
    description2: 'Because good design should work for everyone, not just search engines.',
    testimonial: '"I had an exceptional experience working with HUEMOR on a project aimed at improving our website and adding much needed functionality. Their team\'s communicative and responsive approach made the partnership incredibly smooth."',
    author: 'Matthew Bradford, Marketing Executive at EncompassS',
    rightGraphic: (
      <div className="flex flex-row items-center justify-center gap-8 w-full h-full animate-fadeIn">
        {/* Search Optimized Disc */}
        <div className="flex flex-col items-center space-y-4">
          <div className="w-28 h-28 rounded-full bg-gradient-to-b from-[#1E1135] to-[#0B0518] border border-purple-500/30 flex items-center justify-center shadow-xl">
            <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
            </svg>
          </div>
          <span className="text-sm font-semibold tracking-wide text-gray-300 text-center max-w-[100px]">Search Optimized</span>
        </div>
        {/* Accessible Disc */}
        <div className="flex flex-col items-center space-y-4">
          <div className="w-28 h-28 rounded-full bg-gradient-to-b from-[#1E1135] to-[#0B0518] border border-purple-500/30 flex items-center justify-center shadow-xl">
            <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <span className="text-sm font-semibold tracking-wide text-gray-300 text-center max-w-[100px]">Accessible by Design</span>
        </div>
      </div>
    )
  },
  {
    id: 'editable',
    tabLabel: 'Editable',
    title: 'Your Team, In Full Control',
    description1: 'No more waiting on developers for basic edits. We design admin interfaces your marketing team can actually use, with intuitive content blocks, drag-and-drop layouts, and full documentation.',
    description2: 'We also include WordFence security, CDN integration, and personalized training, so your team stays empowered, secure, and ready to move fast.',
    testimonial: '"They successfully completed our biggest major project without issue. This has completely changed how we\'re able to make website updates and have completely eliminated page breaking issues, improved overall website performance..."',
    author: 'Molly Rodin, Digital Marketing Manager at Boston Dynamics',
    rightGraphic: (
      <div className="relative w-72 h-56 flex flex-col justify-center items-center gap-3 bg-[#120B24]/50 border border-purple-500/10 rounded-2xl p-6 shadow-2xl animate-fadeIn transform -rotate-2">
        {/* Security Padlock Indicator */}
        <div className="absolute top-4 right-12 text-purple-400 opacity-60">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 012 2H3a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/></svg>
        </div>
        {/* Mock Interface Buttons */}
        <div className="w-full bg-purple-600/30 border border-purple-500/40 text-purple-200 py-2 px-4 rounded-lg text-xs font-mono text-center">
          [ Content Block Content ]
        </div>
        <div className="flex gap-2 w-full">
          <div className="w-1/2 bg-purple-900/40 border border-purple-700/40 text-purple-300 py-2.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5">
            Edit
          </div>
          <div className="w-1/2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 shadow-lg shadow-purple-900/50">
            Publish
          </div>
        </div>
      </div>
    )
  }
];

export default function FeatureSwitcher() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="bg-[#FAFBFD] text-[#1E1B29] py-20 px-6 md:px-12 w-full min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto w-full flex flex-col space-y-12">
        
        {/* Pill Tabs Selector */}
        <div className="flex items-center space-x-3">
          {featuresData.map((item, index) => {
            const isSelected = activeTab === index;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(index)}
                className={`px-5 py-2 text-xs font-semibold tracking-wide rounded-full border transition-all duration-300 ${
                  isSelected
                    ? 'bg-white text-[#1E1B29] border-gray-300 shadow-sm font-bold'
                    : 'bg-transparent text-gray-400 border-transparent hover:text-gray-600'
                }`}
              >
                {item.tabLabel}
              </button>
            );
          })}
        </div>

        {/* Component Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          
          {/* Left Text Column Content */}
          <div className="lg:col-span-6 flex flex-col space-y-8 text-left">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#1E1B29] tracking-tight leading-tight">
                {featuresData[activeTab].title}
              </h2>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed font-normal">
                {featuresData[activeTab].description1}
              </p>
              {featuresData[activeTab].description2 && (
                <p className="text-gray-500 text-sm md:text-base leading-relaxed font-normal">
                  {featuresData[activeTab].description2}
                </p>
              )}
            </div>

            <hr className="border-gray-200" />

            {/* Testimonial Block */}
            <div className="space-y-3">
              <p className="text-gray-600 italic text-xs md:text-sm leading-relaxed font-normal">
                {featuresData[activeTab].testimonial}
              </p>
              <p className="text-[11px] font-semibold tracking-wide text-gray-400 uppercase">
                {featuresData[activeTab].author}
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <button className="inline-flex items-center justify-center px-6 py-3.5 bg-[#E11D48] text-white font-bold text-xs tracking-wider uppercase rounded-full shadow-lg shadow-rose-600/20 hover:bg-[#BE123C] transition-colors duration-200 group">
                Book A Strategy Session
                <svg className="w-3.5 h-3.5 ml-2 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Dark Graphic Illustration Column */}
          <div className="lg:col-span-6 w-full aspect-square max-w-[540px] bg-[#05020C] rounded-2xl flex items-center justify-center p-8 overflow-hidden shadow-xl border border-black relative">
            {/* Ambient Background Glow */}
            <div className="absolute w-72 h-72 rounded-full bg-purple-600/10 blur-[80px] pointer-events-none"></div>
            
            {featuresData[activeTab].rightGraphic}
          </div>

        </div>

        {/* Micro Step-Progress Track Bottom-Left Line Indicators */}
        <div className="flex items-center space-x-2 pt-6 w-32">
          {featuresData.map((_, index) => (
            <div
              key={index}
              className={`h-0.5 transition-all duration-500 rounded-full ${
                index === activeTab ? 'w-12 bg-gray-800' : 'w-6 bg-gray-200'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}