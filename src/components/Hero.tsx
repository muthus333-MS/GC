import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, Shield } from 'lucide-react';

export const Hero: React.FC<{
  onExploreClick: () => void;
  onPoojaClick: () => void;
}> = ({ onExploreClick, onPoojaClick }) => {
  return (
    <section className="relative overflow-hidden bg-[#F5F2EA] border-b border-stone-200">
      {/* Subtle top notification strip */}
      <div className="bg-stone-900 text-stone-300 text-xs py-2 px-4 text-center tracking-wide font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span>Freshly Milled Batch: Direct from Sathyam Food Products Facility · Free Door Delivery Above ₹999</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Typography & Intent */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Editorial brand kicker - NO PILLS */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-900">
              <span>Sathyam Food Products</span>
              <span aria-hidden="true">·</span>
              <span>Est. 1994</span>
              <span aria-hidden="true">·</span>
              <span>Vagai Marachekku Purity</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 leading-[1.1] text-balance">
              Grounded in Tradition. <br />
              <span className="italic font-normal text-amber-900">Driven by Crystal Purity.</span>
            </h1>

            <p className="text-base sm:text-lg text-stone-600 max-w-2xl leading-relaxed">
              Golden Crystal brings you unrefined cold-pressed oils crushed in authentic Vaagai wood chekkus below 38°C, sacred soot-free long-burning ritual deepam oils, and unpolished heritage millets harvested for holistic family wellness.
            </p>

            {/* Quick Proof Metrics - Quiet inline metadata */}
            <div className="pt-2 grid grid-cols-3 gap-4 border-t border-b border-stone-300/60 py-4 max-w-xl text-stone-800">
              <div>
                <p className="text-2xl font-serif font-bold text-stone-900 tabular-nums">&lt; 38°C</p>
                <p className="text-xs text-stone-500 mt-0.5">Cold Rotary Press</p>
              </div>
              <div>
                <p className="text-2xl font-serif font-bold text-stone-900 tabular-nums">100%</p>
                <p className="text-xs text-stone-500 mt-0.5">Zero Solvents & Hexane</p>
              </div>
              <div>
                <p className="text-2xl font-serif font-bold text-stone-900 tabular-nums">5+ Hrs</p>
                <p className="text-xs text-stone-500 mt-0.5">Pooja Diya Flame</p>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-amber-900 hover:bg-amber-950 rounded-lg transition-all shadow-sm cursor-pointer whitespace-nowrap"
              >
                <span>Shop Cold-Pressed Oils</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onPoojaClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-stone-800 bg-white hover:bg-stone-50 border border-stone-300 rounded-lg transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Ritual Pooja Oils</span>
              </button>
            </div>

            {/* Trust bullet line */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-stone-600 pt-1">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>FSSAI License Verified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Direct Mill Fresh Packaging</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-emerald-700" />
                <span>Zero Mineral Oil Adulteration</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-stone-200 bg-stone-100 group">
              <img
                src="/src/assets/images/hero_golden_oil_1790167750848.jpg"
                alt="Golden Crystal cold pressed oil stream pouring from traditional wooden chekku press"
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-96 lg:h-[430px] object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  // Fallback container in case of error
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-stone-900/80 backdrop-blur-md rounded-xl text-white border border-stone-700/50">
                <p className="text-xs uppercase tracking-wider text-amber-300 font-semibold">Live Extraction</p>
                <p className="text-sm font-medium mt-0.5">Wood-Pressed Vagai Chekku Process</p>
                <p className="text-xs text-stone-300 mt-1">Preserving natural aroma, plant sterols, and cellular nutrition without heating.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
