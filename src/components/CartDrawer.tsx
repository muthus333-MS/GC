import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const FREE_SHIPPING_THRESHOLD = 999;

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    cartTotal,
    cartCount,
    setIsCheckoutOpen
  } = useStore();

  if (!isCartOpen) return null;

  const isFreeShipping = cartTotal >= FREE_SHIPPING_THRESHOLD;
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartTotal);
  const progressPercent = Math.min(100, Math.round((cartTotal / FREE_SHIPPING_THRESHOLD) * 100));

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF9F5] border-l border-stone-200 shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-900" />
              <h2 className="font-serif text-xl font-bold text-stone-900">Your Shopping Bag</h2>
              <span className="text-xs font-semibold bg-stone-100 text-stone-700 px-2 py-0.5 rounded-full tabular-nums">
                {cartCount}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-stone-500 hover:text-stone-900 rounded-md hover:bg-stone-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-amber-50/80 border-b border-amber-200/60 px-4 py-3">
            <div className="flex items-center justify-between text-xs font-medium text-amber-950 mb-1.5">
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-amber-800" />
                {isFreeShipping ? (
                  <span className="font-semibold text-emerald-800">You have qualified for Free Delivery!</span>
                ) : (
                  <span>
                    Add <strong className="tabular-nums">₹{amountNeededForFreeShipping}</strong> more for Free Shipping
                  </span>
                )}
              </div>
              <span className="text-[11px] font-bold text-amber-800 tabular-nums">{progressPercent}%</span>
            </div>
            <div className="w-full bg-amber-200/60 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-amber-700 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-stone-800">Your bag is empty</h3>
                  <p className="text-xs text-stone-500 mt-1 max-w-xs">
                    Explore our cold-pressed wood chekku oils, ritual pooja oils, and organic millets.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 bg-stone-900 hover:bg-stone-950 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.sku}
                  className="bg-white border border-stone-200 rounded-xl p-3 flex gap-3 shadow-2xs"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    referrerPolicy="no-referrer"
                    className="w-18 h-18 object-cover rounded-lg bg-stone-100 shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-bold text-stone-900 line-clamp-1">
                          {item.productName}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.sku)}
                          className="text-stone-400 hover:text-red-600 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        Packaging: <span className="font-medium text-stone-700">{item.variantSize}</span>
                      </p>
                    </div>

                    {/* Quantity Stepper and Item Total */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100">
                      <div className="flex items-center border border-stone-200 rounded bg-stone-50">
                        <button
                          onClick={() => updateCartQuantity(item.sku, item.quantity - 1)}
                          className="px-2 py-0.5 text-stone-600 hover:bg-stone-200 text-xs"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-semibold tabular-nums text-stone-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.sku, item.quantity + 1)}
                          disabled={item.quantity >= item.maxStock}
                          className="px-2 py-0.5 text-stone-600 hover:bg-stone-200 text-xs disabled:opacity-30"
                        >
                          +
                        </button>
                      </div>

                      <div className="font-serif font-bold text-sm text-stone-900 tabular-nums">
                        ₹{item.price * item.quantity}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Calculations and Checkout */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-stone-200 bg-white space-y-3">
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-stone-900 tabular-nums">₹{cartTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="tabular-nums">
                    {isFreeShipping ? (
                      <span className="text-emerald-700 font-semibold uppercase text-[11px]">Free</span>
                    ) : (
                      '₹60'
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-100">
                  <span>Estimated Total</span>
                  <span className="font-serif text-lg text-amber-900 tabular-nums">
                    ₹{cartTotal + (isFreeShipping ? 0 : 60)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3 px-4 bg-amber-900 hover:bg-amber-950 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>Direct Mill Freshness Guaranteed · Cash on Delivery & UPI</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
