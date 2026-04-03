import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

const HERO_IMG = "https://images.unsplash.com/photo-1661366394743-fe30fe478ef7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxLb3JlYW4lMjBmb29kJTIwY2F0ZXJpbmclMjBzcHJlYWR8ZW58MXx8fHwxNzc1MDIyNTM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const cuisines = [
  "Korean Chicken",
  "Vietnamese",
  "Chinese Fusion",
  "Thai",
  "Korean"
];

export function Hero() {
  const [currentCuisine, setCurrentCuisine] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentCuisine((prev) => (prev + 1) % cuisines.length);
        setIsTransitioning(false);
      }, 300);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
      {/* Hangul watermark */}
      <span
        className="hangul-watermark hidden lg:block absolute -left-8 top-1/2 -translate-y-1/2 text-[22vw] select-none pointer-events-none text-[#fffcf3]"
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
            <em
              className={`not-italic text-[#FFCB2F] inline-block transition-all duration-500 origin-center ${isTransitioning ? 'opacity-0 scale-y-0' : 'opacity-100 scale-y-100'
                }`}
              style={{
                transform: isTransitioning ? 'perspective(1000px) rotateX(90deg)' : 'perspective(1000px) rotateX(0deg)',
                transition: 'all 0.5s ease-in-out'
              }}
            >
              {cuisines[currentCuisine]}
            </em>
            <br />
            Flavours
          </h1>

          <p className="font-body text-base md:text-lg text-[#1A1A1A]/60 max-w-sm leading-relaxed animate-fade-up animate-fade-up-delay-2">
            Customized catering for school events, corporate events, sports day, picnic and special bento box.
          </p>

          <div className="flex flex-wrap gap-3 animate-fade-up animate-fade-up-delay-3">
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-primary"
            >
              Inquiry <ArrowRight size={16} />
            </button>
            <button
              onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-outline"
            >
              View Menu
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-8 pt-4 border-t border-[#1A1A1A]/10 animate-fade-up animate-fade-up-delay-4">
            {[
              { num: "20+", label: "Years Experience" },
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