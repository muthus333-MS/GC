import React from 'react';
import { MapPin, Phone, Mail, ShieldCheck, Clock, SlidersHorizontal } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC<{ onNavigateToSection: (id: string) => void }> = ({ onNavigateToSection }) => {
  const { setIsInventoryOpen, setIsCertificatesOpen } = useStore();

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <span className="font-serif text-2xl font-bold text-white tracking-tight">
              Golden Crystal
            </span>
            <p className="text-xs text-stone-400 leading-relaxed">
              A flagship brand from <strong>Sathyam Food Products</strong> — trusted manufacturer, packager, and distributor of premium cold-pressed edible oils, ritual pooja oils, and organic wellness grains.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>FSSAI Lic. No. 12421008000412</span>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Product Categories
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onNavigateToSection('edible-oils')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Cold-Pressed Sesame & Groundnut Oils
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('pooja-oils')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Pancha Deepam Ritual Pooja Oils
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('grains-millets')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Organic Foxtail & Barnyard Millets
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('kitchen-essentials')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Palm Jaggery & Himalayan Rock Salt
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsCertificatesOpen(true)}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-amber-400"
                >
                  Lab Testing & FSSAI Certificates
                </button>
              </li>
            </ul>
          </div>

          {/* Warehouse & B2B Operations */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Mill & Warehouse Operations
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => setIsInventoryOpen(true)}
                  className="inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-200 transition-colors font-medium cursor-pointer"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Inventory Management Portal</span>
                </button>
              </li>
              <li className="flex items-start gap-2 text-stone-400 pt-1">
                <Clock className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                <span>Milling Hours: Mon - Sat: 8:00 AM - 7:00 PM</span>
              </li>
              <li>Bulk 15-Litre Tin and Temple supply available with dispatch tracking.</li>
            </ul>
          </div>

          {/* Mill Location & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Facility Location & Orders
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                <span>
                  Sathyam Food Products Oil Mill &amp; Processing Plant, No 30, TG Layout, BSK 3rd stage, Bangalore, Karnataka- 560085.
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-stone-500 shrink-0" />
                <a href="tel:+919241114333" className="hover:text-white transition-colors">
                  +91 9241114333 / +91 9243334333
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-stone-500 shrink-0" />
                <a href="mailto:orders@sathyamfoodproducts.com" className="hover:text-white transition-colors">
                  orders@sathyamfoodproducts.com
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Golden Crystal · Sathyam Food Products. Grounded in tradition, driven by purity.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-stone-400 transition-colors">FSSAI Certified</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-stone-400 transition-colors">AGMARK Special Grade</span>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setIsInventoryOpen(true)}
              className="text-amber-400 hover:underline cursor-pointer"
            >
              Warehouse Staff Login
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
