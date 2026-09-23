import React from 'react';
import { Droplet, Flame, Wheat, ShieldCheck, Award, HeartHandshake } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const PurityStory: React.FC = () => {
  const { setIsCertificatesOpen } = useStore();

  const PILLARS = [
    {
      icon: Droplet,
      title: 'Vagai Wood Marachekku (< 38°C)',
      description: 'Extracted using traditional Albizia Lebbeck (Vagai) wooden pestles. Zero heat friction ensures natural fatty acids, polyphenols, and vitamin E remain 100% active and un-denatured.'
    },
    {
      icon: Flame,
      title: 'Long-Burning Sacred Pooja Oils',
      description: 'Handcrafted according to scriptural proportions with Pancha Deepam oils (Illuppai, Gingelly, Castor, Neem, Cow Ghee). Delivers a calm, steady divine flame that burns 40% longer without black soot.'
    },
    {
      icon: Wheat,
      title: 'Minimally Processed Organic Millets',
      description: 'Carefully de-husked with low-impact rubber rolls to safeguard the aleurone and dietary bran layer. Wholesome low-glycemic nutrition for modern family health.'
    },
    {
      icon: ShieldCheck,
      title: 'Direct Mill Packaging & Lab Integrity',
      description: 'Every single batch from our Sathyam Food Products facility is tested for aflatoxins, argemone oil, and free fatty acid acidity before receiving our Golden Crystal seal.'
    }
  ];

  return (
    <section id="purity-heritage" className="py-16 md:py-24 bg-[#FAF9F5] border-t border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-900">
            <span>Sathyam Food Products</span>
            <span aria-hidden="true">·</span>
            <span>Est. 1994</span>
            <span aria-hidden="true">·</span>
            <span>Purity Constitution</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 text-balance">
            The Golden Crystal Standard: <br />
            <span className="italic font-normal text-amber-900">Tradition Preserved in Every Drop</span>
          </h2>

          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            In an era of industrial chemical extraction and artificial deodorization, Sathyam Food Products preserves the sacred integrity of Indian kitchen essentials. Our cold-pressed oils, ritual deepam fuels, and native grains honor the ancient soil of South India.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-stone-200 rounded-xl p-6 shadow-2xs hover:border-amber-700/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-900 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center gap-1.5 text-[11px] font-semibold text-amber-900">
                  <span>Guaranteed Authentic</span>
                  <Award className="w-3.5 h-3.5 text-amber-700" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Heritage Mill Banner */}
        <div className="mt-12 bg-stone-900 text-stone-200 rounded-2xl p-8 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              Trusted Manufacturer, Packager & Distributor
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Transparent Lab Testing & Certificates
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              We publish our complete fatty acid profiles, FSSAI compliance documents, and Agmark verification reports openly. Purity isn't just a promise; it's documented science.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setIsCertificatesOpen(true)}
              className="px-6 py-3 bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              Inspect Lab Reports & FSSAI
            </button>
            <a
              href="tel:+919443312345"
              className="px-6 py-3 bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold rounded-lg border border-stone-700 transition-colors"
            >
              Direct Mill Inquiry
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
