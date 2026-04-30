import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1661366394743-fe30fe478ef7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxLb3JlYW4lMjBmb29kJTIwY2F0ZXJpbmclMjBzcHJlYWR8ZW58MXx8fHwxNzc1MDIyNTM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1583032015879-e5022cb87c3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBqYXBjaGFlJTIwZ2xhc3MlMjBub29kbGVzfGVufDF8fHx8MTc3NDk3NTkxOXww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1644203542635-e34075350a79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBmcmllZCUyMGNoaWNrZW4lMjBjcmlzcHl8ZW58MXx8fHwxNzc0OTc1OTIzfDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1656428254987-45d97432714b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBnaW1iYXAlMjBraW1iYXAlMjByb2xsfGVufDF8fHx8MTc3NDk3NTkyM3ww&ixlib=rb-4.1.0&q=80&w=1080"
];

const cuisines = [
  "Korean",
];

export function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center bg-[#FAFAF5] overflow-hidden pt-20 md:pt-0">
      {/* Decorative Background - Half Circles (Staggered Pattern) */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.25]"
        style={{
          backgroundImage: `url('/image/half circle.png'), url('/image/half circle.png')`,
          backgroundPosition: '0 0, 200px 200px',
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Dynamic Background Element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#FFCB2F]/7 -skew-x-12 translate-x-1/4" />

      {/* Hangul watermark */}
      <span
        className="hangul-watermark hidden lg:block absolute -left-8 top-1/2 -translate-y-1/2 text-[22vw] select-none pointer-events-none text-[#DADAC8]/[0.35]"
        aria-hidden
      >
        명가
      </span>


      <div className="container relative z-10 grid md:grid-cols-2 gap-16 lg:gap-24 items-center py-20 md:py-0">
        {/* Left: Text */}
        <div className="flex flex-col gap-3 items-center text-center md:items-start md:text-left md:pl-12 lg:pl-20">
          <div className="animate-fade-up relative z-0 -mb-4 md:-mb-8 md:-ml-18 lg:-ml-32">
            <img src="/image/roof3.png" alt="Traditional Roof Design" className="w-full max-w-none object-fill object-center md:object-left mx-auto md:mx-0 mb-5" />
          </div>

          <h1 className="relative z-10 font-display text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-[#1A1A1A] animate-fade-up animate-fade-up-delay-1 font-[Plus_Jakarta_Sans]">
            Authentic
            <br />
            <em className="not-italic text-[#FFCB2F]">Korean</em>
            <br />
            Flavours
          </h1>

          {/* Mobile Slideshow: Only visible on mobile, between title and description */}
          <div className="md:hidden relative w-full max-w-[300px] mx-auto my-8 animate-fade-up animate-fade-up-delay-2">
            {/* Frame */}
            {/*<div className="block md:hidden absolute -inset-6 z-0 pointer-events-none translate-y-[15px]">
              <img src="/image/frame1.png" alt="" className="w-full object-fill opacity-90" />
            </div>*/}

            <div className="relative rounded-none overflow-hidden aspect-[4/3] shadow-2xl z-10">
              {HERO_IMAGES.map((img, idx) => (
                <img
                  key={`mobile-${img}`}
                  src={img}
                  alt="MyungGa authentic Korean catering menu item"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${currentImage === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                />
              ))}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#FFCB2F] z-20" />
            </div>

            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
              {HERO_IMAGES.map((_, idx) => (
                <img
                  key={`dot-mobile-${idx}`}
                  src="/image/half circle.png"
                  alt=""
                  className={`w-4 h-4 object-contain transition-all duration-300 ${currentImage === idx ? 'opacity-100 scale-125' : 'opacity-30 grayscale'
                    }`}
                />
              ))}
            </div>
          </div>

          <p className="font-body text-balance text-[#1A1A1A]/60 text-lg md:text-xl max-w-lg animate-fade-up animate-fade-up-delay-2 leading-relaxed mx-auto md:mx-0">
            Customized catering for school events, corporate events, sports day, picnic and special bento box.          </p>

          <div className="flex flex-wrap gap-4 animate-fade-up animate-fade-up-delay-3 justify-center md:justify-start">
            <button
              onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-primary"
            >
              EXPLORE MENU
            </button>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-4 border-2 border-[#1A1A1A] text-[#1A1A1A] font-body font-bold text-sm tracking-widest hover:bg-[#5a626e] hover:border-[#5a626e] hover:text-white transition-all transform hover:translate-y-[-2px] active:translate-y-0"
            >
              GET A QUOTE
            </button>
          </div>

          {/* Stats/Badges */}
          <div className="flex gap-8 pt-4 border-t border-[#1A1A1A]/10 animate-fade-up animate-fade-up-delay-4 justify-center md:justify-start w-full max-w-[80%] md:max-w-none mx-auto md:mx-0">
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

        {/* Right: Image Slideshow (Desktop Only) */}
        <div className="hidden md:block relative animate-fade-up animate-fade-up-delay-2 mt-8 md:mt-0">
          {/* Frame */}
          {/* To move the frame further away from the top (down), increase the translate-y-[50px] value. 
              To move it up, use a negative value like -translate-y-[50px] */}
          {/*<div className="hidden sm:block lg:block absolute -inset-12 md:-inset-11 lg:-inset-10 z-0 pointer-events-none translate-y-[15px] lg:translate-y-[40px]">
            <img src="/image/frame1.png" alt="" className="w-full object-fill opacity-90" />
          </div>*/}

          <div className="relative rounded-none overflow-hidden aspect-[4/3] md:aspect-[3/4] lg:aspect-[4/3] shadow-2xl z-10">
            {HERO_IMAGES.map((img, idx) => (
              <img
                key={`desktop-${img}`}
                src={img}
                alt="MyungGa authentic Korean catering menu item"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${currentImage === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
              />
            ))}
            {/* Yellow accent border */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#FFCB2F] z-20" />
          </div>
          {/* Decorative indicator dots */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
            {HERO_IMAGES.map((_, idx) => (
              <img
                key={`dot-desktop-${idx}`}
                src="/image/half circle.png"
                alt=""
                className={`w-4 h-4 object-contain transition-all duration-300 ${currentImage === idx ? 'opacity-100 scale-125' : 'opacity-30 grayscale'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Yellow bottom accent line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-[#FFCB2F]/30" />
    </section>
  );
}