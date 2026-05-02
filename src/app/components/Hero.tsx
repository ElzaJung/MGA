import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

const HERO_IMAGES = [
  "/image/menu/BB124E37-247A-4E9E-8C8A-6DDF51D610C8_1_105_c.jpeg",
  "/image/menu/23DFA511-2707-4ADA-948F-76D090BC6F9B_1_201_a.jpeg",
  "/image/menu/DF801FE4-8BD7-4544-ADBC-BE82AEA215BF_1_201_a.jpeg",
];

const cuisines = [
  "Korean",
];

export function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
  const [roofKey, setRoofKey] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const GIF_DURATION = 200; // Estimated duration of the roof.gif animation
    const PAUSE_DURATION = 20000; // 20 seconds pause

    const runCycle = () => {
      // Refresh the GIF by updating the key
      setRoofKey(Date.now());
    };

    const interval = setInterval(runCycle, GIF_DURATION + PAUSE_DURATION);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center bg-[#FAFAF5] overflow-hidden pt-0 md:pt-8 lg:pt-0 pb-0 md:pb-10 lg:pb-10">
      {/* Decorative Background - Half Circles (Staggered Pattern) */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.25]"
        style={{
          backgroundImage: `url('/image/half circle.png'), url('/image/half circle.png')`,
          backgroundPosition: '0 0, 200px 200px',
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Dynamic Background Element 
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#FFCB2F]/7 -skew-x-12 translate-x-1/4" />
      */}

      {/* Hangul watermark */}
      {/*style={{
          //background: 'linear-gradient(135deg, #6c7e9b 0%, #FFCB2F 100%)',
          background: 'linear-gradient(135deg, #FFCB2F 0%, #6c7e9b 100%)',

          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          opacity: 0.13
        }}
        
        [#DADAC8]/[0.35]
        */}

      <span
        className="hangul-watermark hidden lg:block absolute -left-8 top-1/2 -translate-y-1/2 text-[22vw] select-none pointer-events-none text-[#DADAC8]/[0.65]"

        aria-hidden
      >
        명가
      </span>


      <div className="container relative z-10 grid md:grid-cols-2 gap-16 lg:gap-24 items-center py-20 md:py-0">
        {/* Left: Text */}
        <div className="flex flex-col gap-5 items-center text-center md:items-start md:text-left md:pl-12 lg:pl-20">
          <div className="animate-fade-up relative z-0 md:-ml-13 lg:-ml-20 scale-[1] md:scale-[1.1] lg:scale-100 origin-center md:origin-left">
            <img
              key={roofKey}
              src={`/image/roof.gif?v=${roofKey}`}
              alt="Traditional Roof Design"
              className="w-full max-w-none object-fill object-center md:object-left mx-auto md:mx-0 -mb-10 md:-mb-3 lg:-mb-10"
            />
          </div>

          <h1 className="relative z-10 font-display text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-[#1A1A1A] animate-fade-up animate-fade-up-delay-1 font-[Plus_Jakarta_Sans]">
            Authentic
            <br />
            <span className="korean-color-transition">
              Korean
            </span>
            <br />
            Flavours
          </h1>

          {/* Mobile Slideshow: Only visible on mobile, between title and description */}
          <div className="md:hidden relative w-full max-w-[350px] animate-fade-up animate-fade-up-delay-2">
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

            {/* 인장 stamp - bottom right overlap 
            <img
              src="/image/injang.png"
              alt="MyungGA seal"
              className="absolute -bottom-6 -right-4 w-20 h-20 object-contain opacity-90 z-30 pointer-events-none"
            />
            */}


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
              className="px-8 py-4 border-2 border-[#1A1A1A] text-[#1A1A1A] font-body font-bold text-sm tracking-widest hover:bg-[#6c7e9b] hover:border-[#6c7e9b] hover:text-white transition-all transform hover:translate-y-[-2px] active:translate-y-0"
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
          {/*To move the frame further away from the top (down), increase the translate-y-[50px] value. 
              To move it up, use a negative value like -translate-y-[50px] */}
          {/* <div className="hidden sm:block lg:block absolute -inset-12 md:-inset-11 lg:-inset-10 z-0 pointer-events-none translate-y-[15px] lg:translate-y-[40px]">
            <img src="/image/frame1.png" alt="" className="w-full object-fill opacity-90" />
          </div> */}

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

          {/* 인장 stamp - bottom right overlap 
          <img
            src="/image/injang.png"
            alt="MyungGA seal"
            className="absolute -bottom-10 -right-10 w-28 h-28 object-contain opacity-90 z-30 pointer-events-none"
          />
          */}

        </div>
      </div>

      {/* Yellow bottom accent line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-[#FFCB2F]/30" />
    </section>
  );
}