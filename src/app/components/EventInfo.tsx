import { Users, MapPin, Truck } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const services = [
  {
    title: "School Events & Trips",
    image: "./image/school.jpg",
    description: "Perfect catering for school fundraisers, fairs, and special events"
  },
  {
    title: "Picnics",
    image: "./image/picnic.jpg",
    description: "Fresh and portable meals for outdoor gatherings and picnics"
  },
  {
    title: "Corporate Events",
    image: "./image/corporate.jpg",
    description: "Professional catering for meetings, conferences, and corporate gatherings"
  },
  {
    title: "Sports Day",
    image: './image/sports.jpg',
    description: "Energizing meals to fuel athletes and spectators at sports events"
  },
  {
    title: "Bento / Boxed Meals",
    image: "./image/kimbap.jpg",
    description: "Convenient and beautifully packed individual meals for any occasion"
  }
];

export function EventInfo() {
  return (
    <section id="services" className="py-24 md:py-32 px-6 bg-[#FAFAF5] relative overflow-hidden">
      {/* Background Decor - Early Right & Late Left 
      <img src="/image/design.png" alt="" aria-hidden="true" className="absolute top-30 -right-10 w-64 md:w-[500px] object-contain opacity-8 pointer-events-none  transform rotate-180" />
      <img src="/image/design.png" alt="" aria-hidden="true" className="absolute bottom-10 -left-10 w-64 md:w-[500px] object-contain opacity-8 pointer-events-none" />
*/}
      <div className="max-w-6xl mx-auto relative z-10">

        {/* Title Section - Moved to Top */}
        <div className="text-center mb-20 relative">

          <span className="yellow-rule mb-6 mx-auto relative z-10" />
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#1A1A1A] font-black font-[Plus_Jakarta_Sans] relative z-10">
            Events We Cater
          </h2>
        </div>

        {/* Services Grid */}
        <div className="flex flex-wrap justify-center items-start gap-6 md:gap-10 mb-20">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col items-center text-center max-w-[180px]">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4 bg-gray-100 border-2 border-[#FFCB2F]/30">
                <ImageWithFallback
                  src={service.image}
                  alt={`${service.title} - ${service.description}`}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="font-display text-xl text-[#1A1A1A] font-[Plus_Jakarta_Sans]">{service.title}</h3>

            </div>
          ))}
        </div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 border-2 border-[#FFCB2F]/30 text-center hover:border-[#FFCB2F] transition-colors">
            <Users className="w-12 h-12 mx-auto mb-4 text-[#FFCB2F]" />
            <h3 className="font-display text-xl mb-3 text-[#1A1A1A] font-bold font-[Plus_Jakarta_Sans]">Minimum Order</h3>
            <p className="font-body text-[#1A1A1A]/60">
              CA $300+
            </p>
          </div>

          <div className="bg-white p-8 border-2 border-[#FFCB2F]/30 text-center hover:border-[#FFCB2F] transition-colors">
            <MapPin className="w-12 h-12 mx-auto mb-4 text-[#FFCB2F]" />
            <h3 className="font-display text-xl mb-3 text-[#1A1A1A] font-bold font-[Plus_Jakarta_Sans]">Service Area</h3>
            <p className="font-body text-[#1A1A1A]/60">
              Waterloo, Hamilton, Toronto and GTA<br />
            </p>
          </div>

          <div className="bg-white p-8 border-2 border-[#FFCB2F]/30 text-center hover:border-[#FFCB2F] transition-colors">
            <Truck className="w-12 h-12 mx-auto mb-4 text-[#FFCB2F]" />
            <h3 className="font-display text-xl mb-3 text-[#1A1A1A] font-bold font-[Plus_Jakarta_Sans]">Delivery</h3>
            <p className="font-body text-[#1A1A1A]/60">
              Delivery and pickup available<br />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}