import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

const HERO_IMG = "https://images.unsplash.com/photo-1661366394743-fe30fe478ef7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxLb3JlYW4lMjBmb29kJTIwY2F0ZXJpbmclMjBzcHJlYWR8ZW58MXx8fHwxNzc1MDIyNTM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const cuisines = [
  "Korean",
];

export function Hero() {

  return (
    <section className="relative min-h-[90vh] flex items-center bg-[#FAFAF5] overflow-hidden pt-20 md:pt-0">
      {/* Dynamic Background Element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#FFCB2F]/5 -skew-x-12 translate-x-1/4" />

      {/* Hangul watermark */}
      <span
        className="hangul-watermark hidden lg:block absolute -left-8 top-1/2 -translate-y-1/2 text-[22vw] select-none pointer-events-none text-[#DADAC8]/[0.55]"
        aria-hidden
      >
        명가
      </span>

      <div className="container relative z-10 grid md:grid-cols-2 gap-12 items-center py-20 md:py-0">
        {/* Left: Text */}
        <div className="flex flex-col gap-6">
          <div className="animate-fade-up relative z-0 -mb-8 md:-mb-12 -ml-3 md:-ml-15">
            <img src="/image/roof.png" alt="Traditional Roof Design" className="h-[70px] md:h-[90px] md:w-[90%] object-fill object-left" />
          </div>

          <h1 className="relative z-10 font-display text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-[#1A1A1A] animate-fade-up animate-fade-up-delay-1 font-[Plus_Jakarta_Sans]">
            Authentic
            <br />
            <em className="not-italic text-[#FFCB2F]">Korean</em>
            <br />
            Flavours
          </h1>

          <p className="font-body text-balance text-[#1A1A1A]/60 text-lg md:text-xl max-w-lg animate-fade-up animate-fade-up-delay-2 leading-relaxed">
            Elevating events with premium catering services. From traditional delicacies to modern Asian fusion, we bring the heart of Seoul to Ontario.
          </p>

          <div className="flex flex-wrap gap-4 animate-fade-up animate-fade-up-delay-3">
            <button
              onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-primary"
            >
              EXPLORE MENU
            </button>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-4 border-2 border-[#1A1A1A] text-[#1A1A1A] font-body font-bold text-sm tracking-widest hover:bg-[#1A1A1A] hover:text-white transition-all transform hover:translate-y-[-2px] active:translate-y-0"
            >
              GET A QUOTE
            </button>
          </div>

          {/* Stats/Badges */}
          <div className="flex gap-8 pt-4 border-t border-[#1A1A1A]/10 animate-fade-up animate-fade-up-delay-4">
            {[
              { num: "20+", label: "Years Experience" },
              { num: "✓", label: "Korean Food License" },
            ].map(({ num, label }) => (
              <div key={label} className="flex flex-col">
                <span className="font-display text-2xl font-bold text-[#1A1A1A] font-[Plus_Jakarta_Sans]">{num}</span>
                <span className="font-body text-xs text-[#1A1A1A]/50 tracking-wide">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Image */}
        <div className="relative animate-fade-up animate-fade-up-delay-2">
          <div className="relative rounded-none overflow-hidden aspect-[4/3] md:aspect-[3/4] lg:aspect-[4/3]">
            <img
              src={HERO_IMG}
              alt="MyungGa Korean catering spread featuring authentic Korean dishes including galbi-jjim, japchae, and traditional side dishes beautifully presented on a table"
              className="w-full h-full object-cover"
            />
            {/* Yellow accent border */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#FFCB2F]" />
          </div>
          {/* Floating badge */}

        </div>
      </div>

      {/* Yellow bottom accent line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-[#FFCB2F]/30" />
    </section>
  );
}