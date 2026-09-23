import React, { useState } from 'react';
import { Eye, ShoppingBag, Check } from 'lucide-react';
import { Product, ProductVariant } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setActiveModalProduct } = useStore();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [justAdded, setJustAdded] = useState(false);

  // Sync selected variant if variants change
  const currentVariant = product.variants.find(v => v.sku === selectedVariant.sku) || product.variants[0];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const success = addToCart(product, currentVariant, 1);
    if (success) {
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1800);
    }
  };

  const isOutOfStock = currentVariant.stock <= 0;
  const isLowStock = currentVariant.stock > 0 && currentVariant.stock <= 8;

  return (
    <div
      onClick={() => setActiveModalProduct(product)}
      className="group relative bg-[#FAF9F5] border border-stone-200/90 rounded-xl overflow-hidden hover:shadow-lg hover:border-amber-700/40 transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Product Image Frame */}
      <div className="relative aspect-4/3 sm:aspect-square bg-stone-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />

        {/* Quiet Kicker Tag on top-left if Best Seller */}
        {product.isBestSeller && (
          <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-xs text-amber-200 text-[11px] font-medium px-2.5 py-1 rounded">
            Best Seller
          </div>
        )}

        {/* Quick View Floating Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setActiveModalProduct(product);
          }}
          className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white text-stone-700 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
          title="Quick view details"
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* Stock indicator overlay if out of stock */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-100 bg-stone-950/80 px-3 py-1.5 rounded">
              Temporarily Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Product Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        
        <div>
          {/* Metadata line with typographic dot separator - NO PILLS */}
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
            <span className="uppercase tracking-wider font-medium text-stone-600 text-[11px]">
              {product.categoryLabel}
            </span>
            {product.tamilName && (
              <span className="text-stone-400 font-sans text-[11px]">{product.tamilName}</span>
            )}
          </div>

          {/* Product Title */}
          <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-amber-900 transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Short description */}
          <p className="text-xs text-stone-600 line-clamp-2 mt-1 leading-relaxed">
            {product.shortDesc}
          </p>
        </div>

        {/* Variant Size Selector Tabs */}
        <div>
          <label className="block text-[11px] font-medium uppercase tracking-wider text-stone-500 mb-1.5">
            Select Size:
          </label>
          <div className="flex flex-wrap gap-1.5" onClick={(e) => e.stopPropagation()}>
            {product.variants.map((variant) => {
              const active = currentVariant.sku === variant.sku;
              return (
                <button
                  key={variant.sku}
                  type="button"
                  onClick={() => setSelectedVariant(variant)}
                  className={`px-2 py-1 text-xs font-medium rounded transition-all cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200'
                  }`}
                >
                  {variant.size}
                </button>
              );
            })}
          </div>
        </div>

        {/* Price, Stock status, & Add-to-Bag Action */}
        <div className="pt-2 border-t border-stone-200/80 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-xl font-bold text-stone-900 tabular-nums">
                ₹{currentVariant.price}
              </span>
              {currentVariant.originalPrice && currentVariant.originalPrice > currentVariant.price && (
                <span className="text-xs text-stone-400 line-through tabular-nums">
                  ₹{currentVariant.originalPrice}
                </span>
              )}
            </div>

            {/* Stock status indicator */}
            <div className="text-[11px] mt-0.5">
              {isOutOfStock ? (
                <span className="text-red-600 font-medium">Out of stock</span>
              ) : isLowStock ? (
                <span className="text-amber-700 font-medium">Only {currentVariant.stock} left in stock</span>
              ) : (
                <span className="text-emerald-700 font-medium">In stock ({currentVariant.stock} units)</span>
              )}
            </div>
          </div>

          {/* Action button */}
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
              isOutOfStock
                ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                : justAdded
                ? 'bg-emerald-700 text-white'
                : 'bg-amber-900 hover:bg-amber-950 text-white shadow-xs'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
