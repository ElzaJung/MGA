import { useState } from "react";
import { ChevronRight, ArrowRight } from "lucide-react";

import menuItems from "../menu.json";

interface FoodShowcaseProps {
  selectedMenuItems: string[];
  setSelectedMenuItems: (items: string[]) => void;
}

export function FoodShowcase({ selectedMenuItems = [], setSelectedMenuItems }: FoodShowcaseProps) {
  const [activeTab, setActiveTab] = useState(0);

  const toggleMenuItem = (itemName: string) => {
    if (selectedMenuItems.includes(itemName)) {
      setSelectedMenuItems(selectedMenuItems.filter(item => item !== itemName));
    } else {
      setSelectedMenuItems([...selectedMenuItems, itemName]);
    }
  };

  return (
    <section id="menu" className="py-24 md:py-32 bg-[#FAFAF5]">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="reveal">
            <span className="yellow-rule mb-4" />
            <h2 className="font-display text-4xl md:text-5xl font-black text-[#1A1A1A] leading-tight font-[Plus_Jakarta_Sans]">
              Our Menu
            </h2>
            <p className="font-body text-[#1A1A1A]/55 mt-3 max-w-md">
              Every dish is prepared fresh using authentic recipes and premium ingredients sourced from Korean specialty suppliers.
            </p>
          </div>

          {/* Category tabs */}
          <div className="reveal reveal-delay-1 flex gap-2 flex-wrap">
            {menuItems.map((cat, i) => (
              <button
                key={cat.category}
                onClick={() => setActiveTab(i)}
                className={`px-4 py-2 text-sm font-body font-medium tracking-wide transition-all duration-200 border ${activeTab === i
                  ? "bg-[#FFCB2F] border-[#FFCB2F] text-[#1A1A1A]"
                  : "bg-transparent border-[#1A1A1A]/20 text-[#1A1A1A]/60 hover:border-[#1A1A1A]/50"
                  }`}
              >
                {cat.category}
                <span className="ml-1.5 font-korean text-xs opacity-60">{cat.korean}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {menuItems[activeTab].items.map((item, i) => {
            const isSelected = selectedMenuItems.includes(item.name);
            return (
              <div
                key={item.name}
                onClick={() => toggleMenuItem(item.name)}
                className={`reveal reveal-delay-${i + 1} bg-white card-lift overflow-hidden flex flex-col md:flex-row cursor-pointer group`}
              >
                <div className="w-full md:w-48 h-48 md:h-auto flex-shrink-0 overflow-hidden">
                  <img
                    src={item.img}
                    alt={`${item.name} - ${item.desc} - MyungGa Korean catering menu item`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex flex-col justify-between gap-3 flex-1">
                  <div>
                    <h3 className="font-display text-xl font-bold text-[#1A1A1A] font-[Plus_Jakarta_Sans] group-hover:text-[#FFCB2F] transition-colors">{item.name}</h3>
                    <p className="font-body text-sm text-[#1A1A1A]/55 mt-2 leading-relaxed">{item.desc}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMenuItem(item.name);
                    }}
                    className={`mt-4 px-3 py-1.5 text-xs transition-all duration-300 md:opacity-0 md:group-hover:opacity-100 ${isSelected
                      ? "text-[#FFCB2F] underline"
                      : "text-[#1A1A1A]/50 hover:text-[#FFCB2F]"
                      }`}
                    title={isSelected ? "Click to remove from inquiry" : "Click to add to inquiry"}
                  >
                    {isSelected ? "Added" : "Add +"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center reveal">
          <p className="font-body text-[#1A1A1A]/70 mb-6 text-xl">
            ...and much more! Tell us what you'd like, and we'll make it happen.
          </p>
        </div>
      </div>
    </section>
  );
}

// ── Custom Creations Banner ──────────────────────────────────────────────────
export function CustomCreationsBanner() {
  return (
    <section className="py-16 md:py-20 relative overflow-hidden bg-[#ffce2e]">
      {/* Hangul watermark */}
      <span
        className="absolute left-0 top-1/2 -translate-y-1/2 font-korean font-black text-[18vw] text-[#1A1A1A]/[0.08] leading-none select-none pointer-events-none font-[Notable] hidden lg:block"
        aria-hidden
      >
        MGA
      </span>

      <div className="container relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1 flex flex-col items-center text-center md:items-start md:text-left gap-3">
          <h3 className="font-display text-3xl md:text-4xl font-black text-[#1A1A1A] leading-tight font-[Plus_Jakarta_Sans]">
            Can't Find What You Want?
          </h3>
          <p className="font-body text-[#1A1A1A]/70 text-base max-w-md">
            We make anything. Every menu is customizable to your exact preferences, dietary needs, and vision.
          </p>
        </div>
        <button
          onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          className="flex-shrink-0 btn-outline bg-[#1A1A1A] text-white border-[#1A1A1A] text-sm"
        >
          Inquiry <ArrowRight size={14} />
        </button>
      </div>
    </section>
  );
}