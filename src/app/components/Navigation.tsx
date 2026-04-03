import { Link, useLocation } from "react-router";
import { ChefHat, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-[#1A1A1A]/10 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3">
            
            <span className="font-display text-2xl text-[#1A1A1A] font-bold">MyungGA</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
              className="font-body text-base transition-colors text-[#1A1A1A]/60 hover:text-[#1A1A1A]"
            >
              Services
            </button>
            
            <button
              onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
              className="font-body text-base transition-colors text-[#1A1A1A]/60 hover:text-[#1A1A1A]"
            >
              Menu
            </button>
            
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-primary"
            >GET A QUOTE</button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-[#1A1A1A]/10">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => {
                  setIsOpen(false);
                  document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-lg text-[#1A1A1A]/60 text-left"
              >
                Menu
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  document.getElementById("service")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-lg text-[#1A1A1A]/60 text-left"
              >
                Service
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-primary justify-center"
              >
                Book Your Event
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}