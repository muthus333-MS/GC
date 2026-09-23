import React, { useState } from 'react';
import { ShoppingBag, SlidersHorizontal, Menu, X, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Header: React.FC<{ onNavigateToSection: (id: string) => void }> = ({ onNavigateToSection }) => {
  const { cartCount, setIsCartOpen, setIsInventoryOpen, setIsCertificatesOpen } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    onNavigateToSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Zone 1: Single text element wordmark in display face */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 hover:text-amber-800 transition-colors whitespace-nowrap"
          >
            Golden Crystal
          </a>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-700">
            <button
              onClick={() => handleNavClick('edible-oils')}
              className="hover:text-amber-800 transition-colors cursor-pointer"
            >
              Cold-Pressed Oils
            </button>
            <button
              onClick={() => handleNavClick('pooja-oils')}
              className="hover:text-amber-800 transition-colors cursor-pointer"
            >
              Ritual Pooja Oils
            </button>
            <button
              onClick={() => handleNavClick('grains-millets')}
              className="hover:text-amber-800 transition-colors cursor-pointer"
            >
              Organic Millets
            </button>
            <button
              onClick={() => handleNavClick('purity-heritage')}
              className="hover:text-amber-800 transition-colors cursor-pointer"
            >
              Purity & Heritage
            </button>
            <button
              onClick={() => setIsCertificatesOpen(true)}
              className="hover:text-amber-800 transition-colors flex items-center gap-1.5 cursor-pointer text-stone-600"
            >
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              <span>Lab Verification</span>
            </button>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            {/* Inventory Management Portal Toggle */}
            <button
              onClick={() => setIsInventoryOpen(true)}
              title="Open Warehouse & Stock Inventory Portal"
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-200/90 rounded-md transition-colors cursor-pointer whitespace-nowrap"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-stone-600" />
              <span className="hidden sm:inline">Inventory Management</span>
              <span className="sm:hidden">Stock</span>
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="View shopping bag"
              className="relative flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-white bg-amber-800 hover:bg-amber-900 rounded-md transition-all shadow-xs cursor-pointer whitespace-nowrap"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Bag</span>
              <span className="font-semibold tabular-nums bg-amber-950/60 px-1.5 py-0.5 rounded text-[11px]">
                {cartCount}
              </span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-700 hover:text-stone-900 rounded-md hover:bg-stone-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 bg-[#FAF9F5] px-4 py-4 space-y-3">
            <button
              onClick={() => handleNavClick('edible-oils')}
              className="block w-full text-left py-2 text-sm font-medium text-stone-800 hover:text-amber-800"
            >
              Cold-Pressed Edible Oils
            </button>
            <button
              onClick={() => handleNavClick('pooja-oils')}
              className="block w-full text-left py-2 text-sm font-medium text-stone-800 hover:text-amber-800"
            >
              Sacred Ritual Pooja Oils
            </button>
            <button
              onClick={() => handleNavClick('grains-millets')}
              className="block w-full text-left py-2 text-sm font-medium text-stone-800 hover:text-amber-800"
            >
              Organic Grains & Millets
            </button>
            <button
              onClick={() => handleNavClick('kitchen-essentials')}
              className="block w-full text-left py-2 text-sm font-medium text-stone-800 hover:text-amber-800"
            >
              Kitchen Essentials
            </button>
            <button
              onClick={() => handleNavClick('purity-heritage')}
              className="block w-full text-left py-2 text-sm font-medium text-stone-800 hover:text-amber-800"
            >
              Sathyam Food Products Story
            </button>
            <button
              onClick={() => {
                setIsCertificatesOpen(true);
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-sm font-medium text-amber-900 hover:text-amber-700"
            >
              View Lab Purity Certificates & FSSAI
            </button>
          </div>
        )}
      </header>
    </>
  );
};
