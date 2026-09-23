import React, { useState } from 'react';
import { X, ShieldCheck, Truck, Check, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const FREE_SHIPPING_THRESHOLD = 999;

export const CheckoutModal: React.FC = () => {
  const { cart, cartTotal, isCheckoutOpen, setIsCheckoutOpen, placeOrder } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '',
    paymentMethod: 'cod' as 'cod' | 'upi' | 'card',
    notes: '',
    sendWhatsAppAlert: true
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const isFreeShipping = cartTotal >= FREE_SHIPPING_THRESHOLD;
  const shippingFee = isFreeShipping ? 0 : 60;
  const grandTotal = cartTotal + shippingFee;

  const validate = () => {
    const err: Record<string, string> = {};
    if (!formData.name.trim()) err.name = 'Please enter your full name';
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      err.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (!formData.address.trim()) err.address = 'Please enter complete delivery address';
    if (!formData.pincode.trim() || !/^\d{6}$/.test(formData.pincode.trim())) {
      err.pincode = 'Please enter valid 6-digit postal pincode';
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const placedOrder = placeOrder({
        customerName: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        paymentMethod: formData.paymentMethod,
        notes: formData.notes,
        shippingFee,
        discount: 0
      });

      if (formData.sendWhatsAppAlert) {
        const itemsSummary = placedOrder.items
          .map(i => `• ${i.productName} (${i.variantSize}) x${i.quantity} = ₹${i.price * i.quantity}`)
          .join('\n');
        const text = encodeURIComponent(
          `*New Order Placed with Golden Crystal*\nOrder ID: ${placedOrder.orderId}\nCustomer: ${formData.name}\nPhone: ${formData.phone}\nAddress: ${formData.address}, ${formData.city} - ${formData.pincode}\nPayment: ${formData.paymentMethod.toUpperCase()}\n\n*Items Ordered:*\n${itemsSummary}\n\n*Total Payable: ₹${placedOrder.total}*`
        );
        window.open(`https://wa.me/919241114333?text=${text}`, '_blank');
      }

      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#FAF9F5] border border-stone-200 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative my-auto">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-white">
          <div>
            <span className="text-[11px] uppercase tracking-wider font-semibold text-amber-900">
              Direct Mill Dispatch
            </span>
            <h2 className="font-serif text-xl font-bold text-stone-900">
              Complete Your Order
            </h2>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-md hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Order Snapshot */}
          <div className="bg-white border border-stone-200 rounded-xl p-4">
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
              Order Summary ({cart.length} unique items)
            </h3>
            <div className="space-y-1.5 text-xs text-stone-600 max-h-28 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.sku} className="flex justify-between items-center py-1 border-b border-stone-100 last:border-none">
                  <span className="truncate pr-2">
                    {item.productName} <span className="text-stone-400">({item.variantSize}) x{item.quantity}</span>
                  </span>
                  <span className="font-semibold text-stone-900 tabular-nums shrink-0">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 mt-2 border-t border-stone-200 flex justify-between items-center text-sm font-bold text-stone-900">
              <span>Total Payable</span>
              <span className="font-serif text-amber-900 text-lg tabular-nums">₹{grandTotal}</span>
            </div>
          </div>

          {/* Customer & Address Details */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              1. Delivery Address & Contact
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sundaramurthy K"
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs text-stone-800 focus:outline-none focus:border-amber-800"
                />
                {errors.name && <p className="text-[11px] text-red-600 mt-0.5">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="10-digit mobile number"
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs text-stone-800 focus:outline-none focus:border-amber-800"
                />
                {errors.phone && <p className="text-[11px] text-red-600 mt-0.5">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                House / Street Address *
              </label>
              <textarea
                rows={2}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Door No, Street Name, Landmark"
                className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs text-stone-800 focus:outline-none focus:border-amber-800"
              />
              {errors.address && <p className="text-[11px] text-red-600 mt-0.5">{errors.address}</p>}
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  City / Town *
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs text-stone-800 focus:outline-none focus:border-amber-800"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  State *
                </label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs text-stone-800 focus:outline-none focus:border-amber-800"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Pincode *
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  placeholder="600001"
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs text-stone-800 focus:outline-none focus:border-amber-800"
                />
                {errors.pincode && <p className="text-[11px] text-red-600 mt-0.5">{errors.pincode}</p>}
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              2. Select Payment Method
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'cod', title: 'Cash on Delivery', desc: 'Pay when delivered to door' },
                { id: 'upi', title: 'UPI / Google Pay', desc: 'Instant QR / VPA payment' },
                { id: 'card', title: 'Card / NetBanking', desc: 'All debit & credit cards' }
              ].map((opt) => {
                const active = formData.paymentMethod === opt.id;
                return (
                  <label
                    key={opt.id}
                    className={`p-3 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                      active
                        ? 'border-amber-900 bg-amber-50/70 ring-1 ring-amber-900'
                        : 'border-stone-300 bg-white hover:border-stone-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-900">{opt.title}</span>
                      <input
                        type="radio"
                        name="payment"
                        checked={active}
                        onChange={() => setFormData({ ...formData, paymentMethod: opt.id as any })}
                        className="text-amber-900 focus:ring-amber-800"
                      />
                    </div>
                    <span className="text-[11px] text-stone-500 mt-1">{opt.desc}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* WhatsApp option */}
          <div className="bg-stone-100 rounded-xl p-3 flex items-center gap-3">
            <input
              type="checkbox"
              id="whatsapp-check"
              checked={formData.sendWhatsAppAlert}
              onChange={(e) => setFormData({ ...formData, sendWhatsAppAlert: e.target.checked })}
              className="w-4 h-4 rounded text-amber-900 focus:ring-amber-800 cursor-pointer"
            />
            <label htmlFor="whatsapp-check" className="text-xs text-stone-700 cursor-pointer">
              Send instant WhatsApp copy to Sathyam Food Products dispatch team for prioritized handling
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 bg-amber-900 hover:bg-amber-950 text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Confirming Order...</span>
              ) : (
                <>
                  <span>Place Order (₹{grandTotal})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
            <p className="text-[11px] text-center text-stone-500 mt-2">
              By confirming, you agree to receive dispatch updates via SMS / WhatsApp.
            </p>
          </div>

        </form>

      </div>
    </div>
  );
};
