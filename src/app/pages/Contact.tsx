import { MessageCircle, FileText, MapPin, Clock } from "lucide-react";
import { Button } from "../components/ui/button";
import { SEO } from "../components/SEO";

export function Contact() {
  return (
    <>
      <SEO
        title="Book Your Event - MyungGa Korean Catering | Contact Us"
        description="Contact MyungGa for premium Korean and Asian catering services. Book your wedding, party, or corporate event today. Serving Toronto, GTA, and Waterloo."
        keywords="book catering, Korean catering contact, event booking, wedding catering Toronto, corporate catering GTA, party catering Ontario"
        canonical={typeof window !== 'undefined' ? window.location.href : undefined}
      />
      <div className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="yellow-rule mb-4 mx-auto" />
            <h1 className="font-display text-5xl md:text-6xl mb-6 text-[#1A1A1A] font-black">
              Book Your Event
            </h1>
            <p className="font-body text-xl text-[#1A1A1A]/60">
              Contact us to create the perfect menu for your occasion
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <a
              href="https://pf.kakao.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="p-8 border-2 border-[#FFCB2F]/30 hover:border-[#FFCB2F] transition-colors h-full">
                <MessageCircle className="w-12 h-12 mb-4 text-[#FFCB2F]" />
                <h3 className="font-display text-2xl mb-3 text-[#1A1A1A] font-bold">KakaoTalk</h3>
                <p className="font-body text-[#1A1A1A]/60 mb-4">
                  Quick and easy communication. Send us a message with your event details and food preferences.
                </p>
                <Button className="w-full bg-[#FFCB2F] hover:bg-[#1A1A1A] text-[#1A1A1A] hover:text-white border-2 border-[#FFCB2F] hover:border-[#1A1A1A] transition-all font-medium">
                  Open KakaoTalk
                </Button>
              </div>
            </a>

            <a
              href="https://forms.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="p-8 border-2 border-[#FFCB2F]/30 hover:border-[#FFCB2F] transition-colors h-full">
                <FileText className="w-12 h-12 mb-4 text-[#FFCB2F]" />
                <h3 className="font-display text-2xl mb-3 text-[#1A1A1A] font-bold">Google Form</h3>
                <p className="font-body text-[#1A1A1A]/60 mb-4">
                  Fill out our detailed form with your event information, food choices, and special requests.
                </p>
                <Button className="w-full bg-[#FFCB2F] hover:bg-[#1A1A1A] text-[#1A1A1A] hover:text-white border-2 border-[#FFCB2F] hover:border-[#1A1A1A] transition-all font-medium">
                  Open Google Form
                </Button>
              </div>
            </a>
          </div>

          {/* What to Include */}
          <div className="bg-[#FAFAF5] p-8 mb-16 border-2 border-[#FFCB2F]/20">
            <h2 className="font-display text-3xl mb-6 text-[#1A1A1A] text-center font-black">
              What to Include in Your Inquiry
            </h2>
            <ul className="space-y-4 max-w-2xl mx-auto font-body">
              <li className="flex gap-3">
                <span className="text-[#FFCB2F]">•</span>
                <span className="text-[#1A1A1A]/70">Event type (wedding, birthday party, corporate event, etc.)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#FFCB2F]">•</span>
                <span className="text-[#1A1A1A]/70">Date and time of your event</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#FFCB2F]">•</span>
                <span className="text-[#1A1A1A]/70">Number of guests (minimum 10 people)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#FFCB2F]">•</span>
                <span className="text-[#1A1A1A]/70">Your food preferences (Korean, Vietnamese, Chinese fusion, Thai, or mix)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#FFCB2F]">•</span>
                <span className="text-[#1A1A1A]/70">Location (delivery available in Toronto, GTA including Waterloo)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#FFCB2F]">•</span>
                <span className="text-[#1A1A1A]/70">Pickup or delivery preference</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#FFCB2F]">•</span>
                <span className="text-[#1A1A1A]/70">Any dietary restrictions or special requests</span>
              </li>
            </ul>
          </div>

          {/* Service Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
            <div className="p-6">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-[#FFCB2F]" />
              <h3 className="font-display text-xl mb-2 text-[#1A1A1A] font-bold">Service Area</h3>
              <p className="font-body text-[#1A1A1A]/60">
                Toronto, GTA<br />
                Including Waterloo
              </p>
            </div>
            
            <div className="p-6">
              <Clock className="w-12 h-12 mx-auto mb-4 text-[#FFCB2F]" />
              <h3 className="font-display text-xl mb-2 text-[#1A1A1A] font-bold">Minimum Order</h3>
              <p className="font-body text-[#1A1A1A]/60">
                10+ guests<br />
                Perfect for any occasion
              </p>
            </div>
          </div>

          <p className="mt-12 text-center text-sm text-[#1A1A1A]/50 font-body">
            Note: Please update the booking links with your actual KakaoTalk and Google Form URLs
          </p>
        </div>
      </div>
    </>
  );
}