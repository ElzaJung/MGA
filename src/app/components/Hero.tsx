import { ArrowRight, X, Maximize2, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import menuData from "../menu.json";


const cuisines = [
  "Korean",
];

// Dynamically load all images from the public/image/menu/slideshow directory
const menuImageModules = import.meta.glob('/public/image/menu/slideshow/*.{jpg,jpeg,png,JPG,JPEG}', { eager: true });
const HERO_IMAGES = Object.keys(menuImageModules).map(path => path.replace('/public', ''));

// Only use images from the slideshow directory for the gallery
const ALL_GALLERY_IMAGES = HERO_IMAGES;

export function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
  const [roofKey, setRoofKey] = useState(Date.now());
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % ALL_GALLERY_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const GIF_DURATION = 3000; // 3 seconds duration of the roof.gif animation
    const PAUSE_DURATION = 20000; // 20 seconds pause at the last frame

    const interval = setInterval(() => {
      setRoofKey(prev => prev + 1);
    }, GIF_DURATION + PAUSE_DURATION);

    return () => clearInterval(interval);
  }, []);

  // Handle body scroll lock and escape key
  useEffect(() => {
    if (isGalleryOpen || selectedImageIndex !== null) {
      document.body.classList.add("no-scroll");
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          if (selectedImageIndex !== null) setSelectedImageIndex(null);
          else setIsGalleryOpen(false);
        } else if (e.key === "ArrowRight" && selectedImageIndex !== null) {
          setSelectedImageIndex((prev) => (prev! + 1) % ALL_GALLERY_IMAGES.length);
        } else if (e.key === "ArrowLeft" && selectedImageIndex !== null) {
          setSelectedImageIndex((prev) => (prev! - 1 + ALL_GALLERY_IMAGES.length) % ALL_GALLERY_IMAGES.length);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.classList.remove("no-scroll");
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isGalleryOpen, selectedImageIndex]);

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
          <div className="animate-fade-up relative z-0 md:-ml-13 lg:-ml-20 scale-[1] md:scale-[1.1] lg:scale-100 origin-center md:origin-left -mb-10 md:-mb-3 lg:-mb-10">
            {/* Base image provides layout and acts as a placeholder while the new GIF loads */}
            <img
              src={`/image/roof.gif?v=base`}
              alt="Traditional Roof Design Base"
              className="w-full max-w-none object-fill object-center md:object-left mx-auto md:mx-0"
            />
            {/* New animated GIF overlay */}
            <img
              key={roofKey}
              src={`/image/roof.gif?v=${roofKey}`}
              alt="Traditional Roof Design"
              className="absolute top-0 left-0 w-full h-full object-fill object-center md:object-left mx-auto md:mx-0"
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
          <div
            className="md:hidden relative w-full max-w-[350px] animate-fade-up animate-fade-up-delay-2 group/mobile"
            onClick={() => setIsGalleryOpen(true)}
          >
            {/* Gallery Hint */}
            <div className="absolute top-4 right-4 z-30 bg-black/40 backdrop-blur-md p-2 rounded-full opacity-0 group-hover/mobile:opacity-100 transition-opacity pointer-events-none">
              <Maximize2 size={16} className="text-white" />
            </div>

            <div className="relative rounded-none overflow-hidden aspect-[4/3] shadow-2xl z-10 cursor-pointer">
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
        <div
          className="hidden md:block relative animate-fade-up animate-fade-up-delay-2 mt-8 md:mt-0 group/desktop"
          onClick={() => setIsGalleryOpen(true)}
        >
          {/* Gallery Hint */}
          <div className="absolute top-6 right-6 z-30 bg-black/40 backdrop-blur-md p-3 rounded-full opacity-0 group-hover/desktop:opacity-100 transition-opacity transform group-hover/desktop:scale-110 duration-300 pointer-events-none">
            <Maximize2 size={24} className="text-white" />
          </div>

          <div className="relative rounded-none overflow-hidden aspect-[4/3] md:aspect-[3/4] lg:aspect-[4/3] shadow-2xl z-10 cursor-pointer">
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
      <div className="absolute bottom-0 left-0 w-full h-px bg-[#FFCB2F]/0.2" />

      {/* Gallery Overlay */}
      <AnimatePresence>
        {isGalleryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex flex-col p-6 md:p-12 overflow-y-auto custom-scrollbar"
          >
            {/* Header - Only X Button */}
            <div className="flex justify-end items-center mb-6">
              <button
                onClick={() => setIsGalleryOpen(false)}
                className="p-4 hover:bg-white/10 rounded-full transition-colors group"
              >
                <X size={32} className="text-white group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto w-full">
              {ALL_GALLERY_IMAGES.map((img, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-white/5 border border-white/10 cursor-pointer"
                  onClick={() => setSelectedImageIndex(idx)}
                >
                  <img
                    src={img}
                    alt={`Gallery image ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                </motion.div>
              ))}
            </div>

            {/* Footer decoration removed */}
            <div className="mt-20 pb-12" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black/98 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedImageIndex(null)}
          >
            {/* Close Button */}
            <button
              onClick={(e) => { e.stopPropagation(); setSelectedImageIndex(null); }}
              className="absolute top-4 right-4 md:top-8 md:right-8 p-3 text-white/80 hover:text-white bg-white/5 hover:bg-white/20 backdrop-blur-md rounded-full transition-all z-50 group border border-white/10"
            >
              <X size={28} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* Left Navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImageIndex((prev) => (prev! - 1 + ALL_GALLERY_IMAGES.length) % ALL_GALLERY_IMAGES.length);
              }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 md:p-4 text-white/80 hover:text-white bg-white/5 hover:bg-white/20 backdrop-blur-md rounded-full transition-all z-50 group border border-white/10"
            >
              <ChevronLeft size={36} className="group-hover:-translate-x-1 transition-transform" />
            </button>

            {/* Right Navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImageIndex((prev) => (prev! + 1) % ALL_GALLERY_IMAGES.length);
              }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 md:p-4 text-white/80 hover:text-white bg-white/5 hover:bg-white/20 backdrop-blur-md rounded-full transition-all z-50 group border border-white/10"
            >
              <ChevronRight size={36} className="group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Large Image with AnimatePresence for smooth transitions */}
            <div
              className="relative w-full h-full max-w-6xl max-h-[85vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImageIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  src={ALL_GALLERY_IMAGES[selectedImageIndex]}
                  alt="Selected gallery image"
                  className="max-w-full max-h-full object-contain shadow-2xl rounded-sm"
                />
              </AnimatePresence>

              {/* Counter */}
              <div className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 text-white/50 font-body tracking-[0.2em] text-sm uppercase bg-black/40 px-4 py-2 rounded-full backdrop-blur-md border border-white/5">
                {selectedImageIndex + 1} / {ALL_GALLERY_IMAGES.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}