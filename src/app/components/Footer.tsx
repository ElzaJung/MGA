import { ChefHat } from "lucide-react";
import { Link } from "react-router";

export function Footer() {
  return (
    <footer className="bg-[#1A1A1A] py-12">
      <div className="container flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-xl font-bold text-white">MyungGA</span>
          </div>
          <p className="font-body text-xs text-white/30 mt-3 max-w-xs leading-relaxed">
            Authentic food crafted for your most memorable moments.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 text-sm">
          {["Services", "Menu", "Contact"].map((link) => (
            <button
              key={link}
              onClick={() => document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}
              className="font-body text-white/40 hover:text-white transition-colors text-left"
            >
              {link}
            </button>
          ))}
        </div>
      </div>
      <div className="container mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
        <p className="font-body text-xs text-white/25">
          © 2026 MyungGA Catering. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
