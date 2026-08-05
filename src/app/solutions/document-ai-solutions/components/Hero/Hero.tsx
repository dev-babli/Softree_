import React from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Check,
  Target,
  Zap,
  Shield,
  TrendingUp,
  FileText,
  File,
  FileSpreadsheet,
  Image as ImageIcon,
  MoreHorizontal,
  Brain,
  Bot
} from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-32 lg:pt-36 lg:pb-40 font-sans">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          src="/documentai-video/documentai-bgvideo.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/55"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        <div className="flex flex-col items-center justify-center">

          {/* Center Column - Content */}
          <div className="flex flex-col items-center text-center gap-8 z-20 w-full">
            <div className="flex flex-col items-center text-center gap-8 w-full max-w-5xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-orange-500/30 shadow-[0_2px_10px_rgba(249,115,22,0.15)]">
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span className="text-[11px] font-bold tracking-[0.15em] text-orange-500 uppercase">Document AI Solutions</span>
            </div>

            {/* Typography */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3rem] font-extrabold text-white leading-[1.15] sm:leading-[1.1] tracking-tight">
              AI-Powered Document Processing for <span className="text-orange-500">Smarter Business Operations</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-4xl leading-relaxed font-medium mx-auto px-2 sm:px-0">
              Transform business documents into actionable data with Softree's Document AI Solutions. Using Azure AI Document Intelligence, OCR, and Intelligent Document Processing (IDP), we automate document extraction and validation to improve efficiency, accuracy, and productivity.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full">
              <Link href="/contact" className="w-full sm:w-auto px-8 py-4 bg-[#F56A15] hover:bg-white text-white hover:text-[#F56A15] border-2 border-transparent hover:border-[#F56A15] rounded-xl font-bold transition-all shadow-[0_8px_25px_rgba(245,106,21,0.35)] hover:shadow-[0_12px_30px_rgba(245,106,21,0.45)] flex items-center justify-center gap-2 group cursor-pointer">
                Talk to Our AI Expert
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            </div>



            {/* Feature Wrapper */}
            <div className="w-full max-w-7xl mx-auto flex flex-col gap-8">
            {/* Feature List Bottom */}
            <div className="relative w-full mt-10 md:mt-14 bg-black/50 backdrop-blur-md rounded-[2rem] p-5 sm:p-8 lg:py-6 lg:px-8 overflow-hidden shadow-2xl border border-white/10">
              {/* Subtle dot pattern inside the dark box */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none"></div>

              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-0 lg:divide-x divide-white/10">
                {[
                  { icon: Shield, title: "Offshore AI Teams", desc: "Microsoft-certified talent." },
                  { icon: Brain, title: "White-Label Delivery", desc: "Powered by our experts." },
                  { icon: TrendingUp, title: "Enterprise AI Solutions", desc: "Secure, scalable AI for business" },
                  { icon: Bot, title: "Business ROI", desc: "Reduce costs. Accelerate delivery" }
                ].map((feat, i) => (
                  <div key={i} className={`flex items-center text-left gap-3.5 lg:px-6 ${i === 0 ? 'lg:pl-0' : ''} ${i === 3 ? 'lg:pr-0' : ''}`}>
                    <div className="w-12 h-12 shrink-0 rounded-[14px] bg-white/5 border border-white/10 flex items-center justify-center">
                      <feat.icon className="w-5 h-5 text-[#F56A15]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="text-[14px] lg:text-[15px] font-bold text-white mb-0.5 leading-tight">{feat.title}</h4>
                      <p className="text-[12px] lg:text-[13px] text-zinc-300 leading-snug max-w-[160px]">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
