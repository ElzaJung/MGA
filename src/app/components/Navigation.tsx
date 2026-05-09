import { Link, useLocation } from "react-router";
import { ChefHat, Menu, X, ShoppingCart } from "lucide-react";
import { useState } from "react";

interface NavigationProps {
  selectedMenuItems?: string[];
}

export function Navigation({ selectedMenuItems = [] }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-[#1A1A1A]/10 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex flex-col leading-tight pt-2">
            <span className="font-display lg:text-2xl text-lg text-[#1A1A1A] font-bold">MyungGA Catering</span>
            <div className="flex items-center gap-1.5">
              <span className="font-body text-xs text-[#1A1A1A]/50 tracking-wide">Korean Restaurant</span>
              <img
                src="/image/injang.png"
                alt="MyungGA seal"
                className="w-[15px] h-[15px] object-contain"
              />
            </div>
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

            {selectedMenuItems.length > 0 ? (
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-primary flex items-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="font-bold">{selectedMenuItems.length}</span>
              </button>
            ) : (
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-primary"
              >GET A QUOTE</button>
            )}
          </div>

          {/* Mobile Menu Button & Cart */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="relative p-2"
              aria-label="View cart"
            >
              <ShoppingCart className="w-6 h-6 text-[#1A1A1A]" />
              {selectedMenuItems.length > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-[#FFCB2F] text-[#1A1A1A] text-xs font-bold rounded-full flex items-center justify-center translate-x-1 -translate-y-1 border-2 border-white">
                  {selectedMenuItems.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2"
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
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-[#1A1A1A]/10">
            <div className="flex flex-col gap-4">

              <button
                onClick={() => {
                  setIsOpen(false);
                  document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-lg text-[#1A1A1A]/60 text-left"
              >
                Services
              </button>
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
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-primary justify-center"
              >
                Get A Quote
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}