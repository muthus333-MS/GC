import React from 'react';
import { CheckCircle2, PackageCheck, Printer, ArrowRight, MessageCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const OrderSuccessModal: React.FC = () => {
  const { latestOrder, setLatestOrder } = useStore();

  if (!latestOrder) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppHelp = () => {
    const text = encodeURIComponent(
      `Hi Golden Crystal Support, regarding my recent Order #${latestOrder.orderId}: Could you please confirm estimated delivery date? Thank you!`
    );
    window.open(`https://wa.me/919241114333?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#FAF9F5] border border-stone-200 rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl relative my-auto">
        
        {/* Top Banner */}
        <div className="bg-emerald-800 text-white p-6 text-center">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
            <CheckCircle2 className="w-7 h-7 text-white" />
          </div>
          <h2 className="font-serif text-2xl font-bold">Order Successfully Placed!</h2>
          <p className="text-xs text-emerald-100 mt-1">
            Thank you for choosing Golden Crystal from Sathyam Food Products.
          </p>
        </div>

        {/* Receipt Content */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          
          {/* Order Meta */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-stone-100 rounded-xl text-xs text-stone-700">
            <div>
              <span className="text-stone-500">Order Number:</span>
              <p className="font-mono font-bold text-stone-900">{latestOrder.orderId}</p>
            </div>
            <div>
              <span className="text-stone-500">Date & Time:</span>
              <p className="font-medium text-stone-900">{latestOrder.date}</p>
            </div>
            <div>
              <span className="text-stone-500">Payment:</span>
              <p className="font-bold text-amber-900 uppercase">{latestOrder.paymentMethod}</p>
            </div>
          </div>

          {/* Items Summary */}
          <div>
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
              Purchased Essentials
            </h4>
            <div className="divide-y divide-stone-200 border-t border-b border-stone-200">
              {latestOrder.items.map((item) => (
                <div key={item.sku} className="py-2.5 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-semibold text-stone-900">{item.productName}</p>
                    <p className="text-stone-500">{item.variantSize} × {item.quantity} qty</p>
                  </div>
                  <span className="font-mono font-bold text-stone-900 tabular-nums">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Financials */}
          <div className="space-y-1.5 text-xs text-stone-600">
            <div className="flex justify-between">
              <span>Items Subtotal</span>
              <span className="tabular-nums">₹{latestOrder.subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Packaging & Delivery</span>
              <span className="tabular-nums">
                {latestOrder.shippingFee === 0 ? 'FREE' : `₹${latestOrder.shippingFee}`}
              </span>
            </div>
            <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
              <span>Total Paid / Due on Delivery</span>
              <span className="font-serif text-amber-900 text-lg tabular-nums">
                ₹{latestOrder.total}
              </span>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="bg-white border border-stone-200 rounded-xl p-3 text-xs">
            <span className="text-stone-500 font-medium">Shipping Destination:</span>
            <p className="font-bold text-stone-900 mt-0.5">{latestOrder.customerName} ({latestOrder.phone})</p>
            <p className="text-stone-600">{latestOrder.address}, {latestOrder.city}, {latestOrder.state} - {latestOrder.pincode}</p>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={() => setLatestOrder(null)}
              className="flex-1 py-3 px-4 bg-stone-900 hover:bg-stone-950 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleWhatsAppHelp}
              className="py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Dispatch</span>
            </button>

            <button
              onClick={handlePrint}
              className="py-3 px-3 bg-stone-200 hover:bg-stone-300 text-stone-700 text-xs font-semibold rounded-xl flex items-center justify-center cursor-pointer"
              title="Print Receipt"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
