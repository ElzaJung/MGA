import { Award } from "lucide-react";

export function About() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-white to-[#FAFAF5] relative overflow-hidden" aria-labelledby="about-heading">
      {/* Background Decor - Right Side */}
      <img src="/image/wind.png" alt="" aria-hidden="true" className="hidden md:block absolute top-1/2 -right-16 -translate-y-1/2 w-64 md:w-[600px] object-contain opacity-20 pointer-events-none z-0" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12">


          <p className="font-display text-xl md:text-2xl mb-8 text-[#FFCB2F] font-bold font-[Plus_Jakarta_Sans]">
            #1 Asian Catering Service
          </p>
          <h2 id="about-heading" className="font-display text-4xl md:text-5xl mb-8 text-[#1A1A1A] font-black font-[Plus_Jakarta_Sans]">

            Authentic Asian Catering, Made with Care.
          </h2>


          <div className="space-y-6 text-md text-[#1A1A1A]/70 font-body leading-relaxed max-w-4xl mx-auto">
            <p>
              MyungGA Catering is now serving across Waterloo, Hamilton, Toronto and GTA. We specialize in authentic Korean cuisine and a wide variety of Asian dishes. From Korean classics to Thai, Vietnamese, and other Asian favourites, we can prepare almost any menu to suit your event.
            </p>


            <p>
              At MyungGA, we focus on fresh ingredients, balanced flavours, and healthy preparation. Our goal is simple: to serve food that is not only delicious but also made with care and quality you can trust. We're not just caterers—we cook with <span className="font-medium text-[#1A1A1A] font-korean">정 (Jeong)</span>, a Korean value that represents genuine care, warmth, and sincerity toward others. It means preparing food thoughtfully, using quality ingredients, and treating every event as if we were cooking for our own family.
            </p>

            <p className="text-md font-medium text-[#1A1A1A]">
              MyungGA Catering offers fully customizable catering packages starting from 10+ guests, making it easy to host anything from a small school gathering to a large corporate function.
            </p>


          </div>
        </div>
      </div>
    </section>
  );
}