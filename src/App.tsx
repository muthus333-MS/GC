/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductFilter } from './components/ProductFilter';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { InventoryPortal } from './components/InventoryPortal';
import { PurityStory } from './components/PurityStory';
import { LabCertificatesModal } from './components/LabCertificatesModal';
import { Footer } from './components/Footer';
import { ProductCategory } from './types';
import { Star, CheckCircle, Bell, Sparkles } from 'lucide-react';

const MainContent: React.FC = () => {
  const { products, activeModalProduct, setActiveModalProduct, notification } = useStore();

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [inStockOnly, setInStockOnly] = useState(false);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchTamil = p.tamilName?.toLowerCase().includes(q) || false;
          const matchDesc = p.shortDesc.toLowerCase().includes(q);
          const matchCategory = p.categoryLabel.toLowerCase().includes(q);
          if (!matchName && !matchTamil && !matchDesc && !matchCategory) {
            return false;
          }
        }

        // In stock only
        if (inStockOnly) {
          const hasStock = p.variants.some((v) => v.stock > 0);
          if (!hasStock) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') {
          return a.variants[0].price - b.variants[0].price;
        }
        if (sortBy === 'price-desc') {
          return b.variants[0].price - a.variants[0].price;
        }
        if (sortBy === 'rating') {
          return b.rating - a.rating;
        }
        if (sortBy === 'best-seller') {
          return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
        }
        // Default: featured first
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, sortBy, inStockOnly]);

  const handleNavigateToSection = (sectionId: string) => {
    if (sectionId === 'edible-oils' || sectionId === 'pooja-oils' || sectionId === 'grains-millets' || sectionId === 'kitchen-essentials') {
      setSelectedCategory(sectionId as ProductCategory);
      const target = document.getElementById('catalog-section');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      const target = document.getElementById(sectionId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-stone-800">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 bg-stone-900 text-stone-100 px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-xs max-w-sm animate-fade-in border border-stone-700">
          <Bell className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Top Navigation */}
      <Header onNavigateToSection={handleNavigateToSection} />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreClick={() => {
            setSelectedCategory('edible-oils');
            document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onPoojaClick={() => {
            setSelectedCategory('pooja-oils');
            document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Product Catalog Section (inspired by Daya Oil Mill) */}
        <section id="catalog-section" className="py-12 md:py-18 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Kicker */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-900 mb-1">
              <span>Pure Essentials Catalog</span>
              <span aria-hidden="true">·</span>
              <span>Online Ordering</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
              Kitchen Essentials & Wellness Pantry
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
              Freshly pressed unrefined cooking oils, fragrant long-burning ritual deepam oils, and organically grown unpolished grains.
            </p>
          </div>

          {/* Filtering and Search Controls */}
          <div className="mb-8">
            <ProductFilter
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              sortBy={sortBy}
              onSortChange={setSortBy}
              inStockOnly={inStockOnly}
              onToggleInStock={() => setInStockOnly(!inStockOnly)}
              totalCount={filteredProducts.length}
            />
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white border border-stone-200 rounded-2xl p-12 text-center space-y-3">
              <p className="font-serif text-lg font-bold text-stone-800">No products match your criteria</p>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Try searching with a different term, or reset the category filters to view our full cold-pressed catalog.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                  setInStockOnly(false);
                }}
                className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

        </section>

        {/* Sathyam Food Products Heritage & Purity Section */}
        <PurityStory />

        {/* Customer Testimonials & Reviews */}
        <section className="py-14 bg-white border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-900">
                Customer Voices
              </span>
              <h2 className="font-serif text-3xl font-bold text-stone-900">
                Trusted in Over 40,000 Kitchens & Temples
              </h2>
              <p className="text-xs text-stone-500">
                Genuine feedback from families, temple priests, and culinary enthusiasts across Tamil Nadu and South India.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  quote:
                    "The aroma of Golden Crystal Sesame Oil takes me back to my grandmother’s kitchen in Madurai. You can taste the genuine palm jaggery undertone with zero bitterness. Our dosas have never been crispier.",
                  author: "Meenakshi Sundaresan",
                  role: "Home Chef & Mother",
                  location: "Coimbatore, Tamil Nadu",
                  rating: 5,
                  product: "Wood Pressed Sesame Oil"
                },
                {
                  quote:
                    "For our temple deepams, ordinary oils cause black soot and choke the sanctum. Golden Crystal’s Pancha Deepam oil burns clean for 6+ hours with a serene divine fragrance. We now order 15-litre cans directly every month.",
                  author: "Ramasamy Gurukkal",
                  role: "Chief Archakar, Sri Vinayagar Temple",
                  location: "Tirupur",
                  rating: 5,
                  product: "Pancha Deepam Ritual Pooja Oil"
                },
                {
                  quote:
                    "Being diabetic, switching from white rice to Golden Crystal’s organic Foxtail Millet and Karuppu Kavuni black rice made an immediate difference in my blood sugar readings. Clean grains, no stones, perfectly packed.",
                  author: "Dr. K. Venkataraman",
                  role: "Wellness Consultant",
                  location: "Chennai",
                  rating: 5,
                  product: "Organic Foxtail Millet & Kavuni Rice"
                }
              ].map((rev, i) => (
                <div key={i} className="bg-[#FAF9F5] border border-stone-200 rounded-xl p-6 flex flex-col justify-between shadow-2xs">
                  <div>
                    <div className="flex items-center gap-1 text-amber-500 mb-3">
                      {[...Array(rev.rating)].map((_, s) => (
                        <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                      "{rev.quote}"
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-stone-200/80">
                    <p className="text-xs font-bold text-stone-900">{rev.author}</p>
                    <p className="text-[11px] text-stone-500">{rev.role} · {rev.location}</p>
                    <p className="text-[11px] text-amber-900 font-semibold mt-1">Verified: {rev.product}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer onNavigateToSection={handleNavigateToSection} />

      {/* Slide-over Cart Drawer */}
      <CartDrawer />

      {/* Product Detail Modal */}
      {activeModalProduct && (
        <ProductModal
          product={activeModalProduct}
          onClose={() => setActiveModalProduct(null)}
        />
      )}

      {/* Checkout Modal */}
      <CheckoutModal />

      {/* Order Success Modal */}
      <OrderSuccessModal />

      {/* Comprehensive Inventory & Warehouse Management Portal */}
      <InventoryPortal />

      {/* Lab Verification & FSSAI Modal */}
      <LabCertificatesModal />

    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
}
