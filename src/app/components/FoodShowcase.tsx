import { useState } from "react";
import { ChevronRight, ArrowRight } from "lucide-react";

const menuItems = [
  {
    category: "Chicken & Beer",
    korean: "치킨",
    items: [
      {
        name: "MGA Chicken Box",
        desc: "Double-fried crispy chicken with golden perfection",
        price: "From $14/person",
        img: "https://images.unsplash.com/photo-1644203542635-e34075350a79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBmcmllZCUyMGNoaWNrZW4lMjBjcmlzcHl8ZW58MXx8fHwxNzc0OTc1OTIzfDA&ixlib=rb-4.1.0&q=80&w=1080"
      },
      {
        name: "Yangnyeom Chicken",
        desc: "Sweet and spicy Korean-style chicken with gochujang glaze",
        price: "From $15/person",
        img: "https://images.unsplash.com/photo-1734987942068-a1a459d65d3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBjaGlja2VuJTIwd2luZ3MlMjBzYXVjZXxlbnwxfHx8fDE3NzQ5NzY3NDV8MA&ixlib=rb-4.1.0&q=80&w=1080"
      },
      {
        name: "Soy Garlic Chicken",
        desc: "Savory chicken glazed with soy sauce and garlic",
        price: "From $14/person",
        img: "https://images.unsplash.com/photo-1706288586330-9766c1956daa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3klMjBnYXJsaWMlMjBjaGlja2VuJTIwa29yZWFufGVufDF8fHx8MTc3NDk3Njc0MHww&ixlib=rb-4.1.0&q=80&w=1080"
      },
    ]
  },
  {
    category: "Korean Traditional",
    korean: "한식",
    items: [
      {
        name: "Bbyujim (Braised Pork Ribs)",
        desc: "Tender pork ribs slow-braised in traditional Korean spices",
        price: "From $22/person",
        img: "https://images.unsplash.com/photo-1687966699414-095ca9c35593?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFpc2VkJTIwcG9yayUyMHJpYnMlMjBrb3JlYW58ZW58MXx8fHwxNzc0OTc2NzQwfDA&ixlib=rb-4.1.0&q=80&w=1080"
      },
      {
        name: "Japchae",
        desc: "Stir-fried glass noodles with vegetables and your choice of protein",
        price: "From $12/person",
        img: "https://images.unsplash.com/photo-1583032015879-e5022cb87c3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBqYXBjaGFlJTIwZ2xhc3MlMjBub29kbGVzfGVufDF8fHx8MTc3NDk3NTkxOXww&ixlib=rb-4.1.0&q=80&w=1080"
      },
      {
        name: "Kimchi Pancake",
        desc: "Crispy savory pancake made with kimchi and green onions",
        price: "From $8/person",
        img: "https://images.unsplash.com/photo-1676874566453-06335e4ae97d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBraW1jaGklMjBwYW5jYWtlJTIwamVvbnxlbnwxfHx8fDE3NzQ5NzU5MjN8MA&ixlib=rb-4.1.0&q=80&w=1080"
      },
    ]
  },
  {
    category: "Vietnamese",
    korean: "베트남 음식",
    items: [
      {
        name: "Pho",
        desc: "Traditional Vietnamese beef noodle soup with aromatic herbs",
        price: "From $13/person",
        img: "https://images.unsplash.com/photo-1701480253822-1842236c9a97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV0bmFtZXNlJTIwcGhvJTIwYm93bHxlbnwxfHx8fDE3NzQ5MTczODd8MA&ixlib=rb-4.1.0&q=80&w=1080"
      },
    ]
  },
  {
    category: "Chinese Fusion",
    korean: "중식",
    items: [
      {
        name: "Jjajangmyeon",
        desc: "Korean-Chinese black bean noodles with vegetables and pork",
        price: "From $11/person",
        img: "https://images.unsplash.com/photo-1626803774007-f92c2c32cbe7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqamFqYW5nbXllb24lMjBibGFjayUyMGJlYW4lMjBub29kbGVzfGVufDF8fHx8MTc3NDk3Njc0MXww&ixlib=rb-4.1.0&q=80&w=1080"
      },
      {
        name: "Jjampong",
        desc: "Spicy seafood noodle soup with vegetables in a rich broth",
        price: "From $13/person",
        img: "https://images.unsplash.com/photo-1749293253083-e5f2a48de33b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqamFtcG9uZyUyMHNwaWN5JTIwc2VhZm9vZCUyMG5vb2RsZXN8ZW58MXx8fHwxNzc0OTc2NzQxfDA&ixlib=rb-4.1.0&q=80&w=1080"
      },
      {
        name: "Tangsuyuk",
        desc: "Crispy sweet and sour pork with vegetables in a tangy sauce",
        price: "From $16/person",
        img: "https://images.unsplash.com/photo-1623689043695-aec9746be500?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2VldCUyMHNvdXIlMjBwb3JrJTIwY2hpbmVzZXxlbnwxfHx8fDE3NzQ5NzY3NDV8MA&ixlib=rb-4.1.0&q=80&w=1080"
      },
    ]
  },
  {
    category: "Thai",
    korean: "태국",
    items: [
      {
        name: "Red Curry",
        desc: "Authentic Thai red curry with coconut milk and vegetables",
        price: "From $14/person",
        img: "https://images.unsplash.com/photo-1720949579208-70855e23dfc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGFpJTIwcmVkJTIwY3Vycnl8ZW58MXx8fHwxNzc0OTc2NzQyfDA&ixlib=rb-4.1.0&q=80&w=1080"
      },
      {
        name: "Green Curry",
        desc: "Fragrant Thai green curry with fresh herbs and spices",
        price: "From $14/person",
        img: "https://images.unsplash.com/photo-1668665772043-bdd32e348998?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGFpJTIwZ3JlZW4lMjBjdXJyeXxlbnwxfHx8fDE3NzQ5MTM4MTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
      },
    ]
  },
  {
    category: "Korean Street Food",
    korean: "분식",
    items: [
      {
        name: "Gimbap",
        desc: "Korean rice rolls filled with vegetables, egg, and protein",
        price: "From $9/person",
        img: "https://images.unsplash.com/photo-1656428254987-45d97432714b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBnaW1iYXAlMjBraW1iYXAlMjByb2xsfGVufDF8fHx8MTc3NDk3NTkyM3ww&ixlib=rb-4.1.0&q=80&w=1080"
      },
      {
        name: "Tteokbokki",
        desc: "Spicy rice cakes in gochugaru sauce with fish cake and vegetables",
        price: "From $10/person",
        img: "https://images.unsplash.com/photo-1679581083578-94eae6e8d7a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0dGVva2Jva2tpJTIwcmljZSUyMGNha2VzfGVufDF8fHx8MTc3NDk0Mjc0MXww&ixlib=rb-4.1.0&q=80&w=1080"
      },
    ]
  }
];

export function FoodShowcase() {
  const [activeTab, setActiveTab] = useState(0);

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
          {menuItems[activeTab].items.map((item, i) => (
            <div
              key={item.name}
              className={`reveal reveal-delay-${i + 1} bg-white card-lift overflow-hidden flex flex-col md:flex-row`}
            >
              <div className="w-full md:w-48 h-48 md:h-auto flex-shrink-0 overflow-hidden">
                <img
                  src={item.img}
                  alt={`${item.name} - ${item.desc} - MyungGa Korean catering menu item`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6 flex flex-col justify-between gap-3">
                <div>
                  <h3 className="font-display text-xl font-bold text-[#1A1A1A] font-[Plus_Jakarta_Sans]">{item.name}</h3>
                  <p className="font-body text-sm text-[#1A1A1A]/55 mt-2 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center reveal">
          <p className="font-body text-[#1A1A1A]/70 mb-6 text-lg">
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
        <div className="flex-1 flex flex-col gap-3">
          <h3 className="font-display text-3xl md:text-4xl font-black text-[#1A1A1A] leading-tight font-[Plus_Jakarta_Sans]">
            Can't Find What You Want?
          </h3>
          <p className="font-body text-[#1A1A1A]/70 text-base max-w-md">
            We make anything. Every menu is customizable to your exact preferences, dietary needs, and vision.
          </p>
        </div>
        <button
          onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          className="flex-shrink-0 btn-outline bg-[#1A1A1A] text-white border-[#1A1A1A] hover:bg-[#1A1A1A]/90 hover:text-white text-sm"
        >
          Inquiry <ArrowRight size={14} />
        </button>
      </div>
    </section>
  );
}