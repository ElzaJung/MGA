import { Star, ExternalLink } from "lucide-react";

export function Location() {
  return (
    <section className="relative w-full h-[500px] md:h-[600px]" aria-label="MyungGa restaurant service area map">
      {/* Map Background - Mobile (z=11) */}
      <iframe
        src="https://maps.google.com/maps?ll=43.4737,-80.5372&z=11&output=embed"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="MyungGA"
        className="absolute inset-0 md:hidden"
      />
      
      {/* Map Background - Desktop (z=9) */}
      <iframe
        src="https://maps.google.com/maps?ll=43.4737,-80.5372&z=9&output=embed"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="MyungGA"
        className="absolute inset-0 hidden md:block"
      />
      
      {/* Overlapping Google Reviews Card */}
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none pb-8 md:pb-12">
        <div className="container pointer-events-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-4xl mx-auto border border-[#FFCB2F]/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="bg-[#FFCB2F] rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-[#1A1A1A]">MyungGa Korean Restaurant</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-[#FFCB2F] text-[#FFCB2F]" />
                      ))}
                    </div>
                    <span className="font-body text-sm text-[#1A1A1A]/60">
                      Google Reviews
                    </span>
                  </div>
                </div>
              </div>
              <a
                href="https://google.com/maps/place/MyungGA+Korean+Restaurant/@43.4634728,-80.510502,15z/data=!4m6!3m5!1s0x882bf538be65b6ef:0x3b845cb8ad175ef8!8m2!3d43.4737247!4d-80.5372501!16s%2Fg%2F11l33brggb!5m1!1e2?entry=ttu&g_ep=EgoyMDI2MDMyOS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary whitespace-nowrap"
              >
                View All Reviews <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}