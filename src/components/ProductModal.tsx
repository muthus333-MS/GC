import React, { useState } from 'react';
import { X, Check, ShoppingBag, ShieldCheck, Heart, Share2, Flame, Droplet, Clock } from 'lucide-react';
import { Product, ProductVariant } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { addToCart, setIsCartOpen } = useStore();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const currentVariant = product.variants.find(v => v.sku === selectedVariant.sku) || product.variants[0];
  const isOutOfStock = currentVariant.stock <= 0;

  const handleAddToCart = () => {
    const success = addToCart(product, currentVariant, quantity);
    if (success) {
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  const handleBuyNow = () => {
    const success = addToCart(product, currentVariant, quantity);
    if (success) {
      onClose();
      setIsCartOpen(true);
    }
  };

  const handleWhatsAppInquiry = () => {
    const message = encodeURIComponent(
      `Hello Sathyam Food Products, I am interested in Golden Crystal ${product.name} (${currentVariant.size} - ₹${currentVariant.price}). Please share order & bulk dispatch details.`
    );
    window.open(`https://wa.me/919241114333?text=${message}`, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-[#FAF9F5] border border-stone-200 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl relative my-auto max-h-[92vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-stone-500 hover:text-stone-900 bg-white/80 hover:bg-white rounded-full transition-colors cursor-pointer shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image and Purity Certifications */}
        <div className="md:w-1/2 bg-stone-100 flex flex-col justify-between p-6 border-b md:border-b-0 md:border-r border-stone-200">
          <div className="relative aspect-4/3 sm:aspect-square rounded-xl overflow-hidden bg-white shadow-xs">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {product.isBestSeller && (
              <span className="absolute top-3 left-3 bg-stone-900 text-amber-200 text-xs font-semibold px-2.5 py-1 rounded">
                Verified Best Seller
              </span>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-stone-200/80 space-y-2">
            <div className="flex items-center gap-2 text-xs text-stone-600">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>FSSAI License: <strong>{product.fssaiNumber || '12421008000412'}</strong></span>
            </div>

            {/* Certifications line */}
            <div className="flex flex-wrap gap-2 pt-1">
              {product.certifications.map((cert, idx) => (
                <span
                  key={idx}
                  className="text-[11px] text-stone-600 bg-stone-200/70 px-2 py-0.5 rounded font-medium"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module & Deep Details */}
        <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto space-y-5">
          
          <div>
            <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
              <span className="uppercase tracking-wider font-semibold text-amber-900">
                {product.brand} · {product.categoryLabel}
              </span>
              {product.tamilName && (
                <span className="text-stone-500 font-sans text-xs">{product.tamilName}</span>
              )}
            </div>

            <h2 className="font-serif text-2xl font-bold text-stone-900 leading-snug">
              {product.name}
            </h2>

            <p className="text-xs text-stone-600 mt-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Size Variant Picker */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
              Available Packaging & Sizes:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {product.variants.map((v) => {
                const isSelected = selectedVariant.sku === v.sku;
                return (
                  <button
                    key={v.sku}
                    type="button"
                    onClick={() => {
                      setSelectedVariant(v);
                      setQuantity(1);
                    }}
                    className={`p-2.5 text-left rounded-lg border text-xs transition-all cursor-pointer ${
                      isSelected
                        ? 'border-amber-900 bg-amber-50/50 ring-1 ring-amber-900'
                        : 'border-stone-300 hover:border-stone-400 bg-white'
                    }`}
                  >
                    <div className="font-bold text-stone-900">{v.size}</div>
                    <div className="text-stone-700 font-serif font-bold text-sm mt-0.5 tabular-nums">
                      ₹{v.price}
                    </div>
                    <div className="text-[10px] text-stone-500 mt-0.5">
                      {v.stock > 0 ? `${v.stock} in stock` : 'Out of stock'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pricing & Quantity Stepper */}
          <div className="p-4 bg-stone-100 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-stone-500 uppercase tracking-wide">Unit Price</span>
                <div className="font-serif text-2xl font-bold text-stone-900 tabular-nums">
                  ₹{currentVariant.price * quantity}
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="flex items-center border border-stone-300 rounded-lg bg-white overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1 || isOutOfStock}
                  className="px-3 py-1.5 text-stone-600 hover:bg-stone-100 disabled:opacity-40"
                >
                  -
                </button>
                <span className="px-3 text-xs font-bold text-stone-800 tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(currentVariant.stock, quantity + 1))}
                  disabled={quantity >= currentVariant.stock || isOutOfStock}
                  className="px-3 py-1.5 text-stone-600 hover:bg-stone-100 disabled:opacity-40"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isOutOfStock
                    ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                    : added
                    ? 'bg-emerald-800 text-white'
                    : 'bg-stone-900 hover:bg-stone-950 text-white'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="py-3 px-5 rounded-lg font-semibold text-xs bg-amber-900 hover:bg-amber-950 text-white transition-all cursor-pointer whitespace-nowrap"
              >
                Buy Now
              </button>
            </div>

            <button
              type="button"
              onClick={handleWhatsAppInquiry}
              className="w-full text-center text-xs text-amber-900 hover:text-amber-950 hover:underline font-medium cursor-pointer pt-1"
            >
              Order via WhatsApp / Wholesale Bulk Inquiries →
            </button>
          </div>

          {/* Technical and Purity Specs */}
          <div className="border-t border-stone-200 pt-4 space-y-3 text-xs text-stone-700">
            {product.extractionMethod && (
              <div className="flex items-start gap-2">
                <Droplet className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900">Extraction Method: </strong>
                  <span>{product.extractionMethod}</span>
                </div>
              </div>
            )}

            {product.smokePointOrBurning && (
              <div className="flex items-start gap-2">
                <Flame className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900">Performance / Smoke Point: </strong>
                  <span>{product.smokePointOrBurning}</span>
                </div>
              </div>
            )}

            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900">Shelf Life & Freshness: </strong>
                <span>{product.shelfLife}</span>
              </div>
            </div>
          </div>

          {/* Key Benefits Checklist */}
          {product.keyBenefits.length > 0 && (
            <div className="border-t border-stone-200 pt-3">
              <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-2">
                Purity & Wellness Highlights
              </h4>
              <ul className="space-y-1.5 text-xs text-stone-600">
                {product.keyBenefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
