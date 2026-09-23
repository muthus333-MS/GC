import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductVariant, CartItem, Order } from '../types';
import { INITIAL_PRODUCTS } from '../data/initialProducts';

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  activeModalProduct: Product | null;
  setActiveModalProduct: (p: Product | null) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  latestOrder: Order | null;
  setLatestOrder: (order: Order | null) => void;
  isInventoryOpen: boolean;
  setIsInventoryOpen: (open: boolean) => void;
  isCertificatesOpen: boolean;
  setIsCertificatesOpen: (open: boolean) => void;
  notification: string | null;
  setNotification: (msg: string | null) => void;
  
  // Cart operations
  addToCart: (product: Product, variant: ProductVariant, quantity?: number) => boolean;
  removeFromCart: (sku: string) => void;
  updateCartQuantity: (sku: string, newQty: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;

  // Inventory operations
  updateProductStock: (productId: string, sku: string, newStock: number) => void;
  updateProductPrice: (productId: string, sku: string, newPrice: number) => void;
  addProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  resetProductsToDefault: () => void;

  // Orders
  placeOrder: (orderDetails: {
    customerName: string;
    phone: string;
    email?: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    paymentMethod: 'cod' | 'upi' | 'card';
    notes?: string;
    shippingFee: number;
    discount: number;
  }) => Order;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const PRODUCTS_STORAGE_KEY = 'golden_crystal_products_v1';
const CART_STORAGE_KEY = 'golden_crystal_cart_v1';
const ORDERS_STORAGE_KEY = 'golden_crystal_orders_v1';

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products state with localStorage initialization
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Failed to load products from storage', e);
    }
    return INITIAL_PRODUCTS;
  });

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load cart from storage', e);
    }
    return [];
  });

  // Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load orders from storage', e);
    }
    return [];
  });

  // UI States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [isCertificatesOpen, setIsCertificatesOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Sync products to storage
  useEffect(() => {
    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products', e);
    }
  }, [products]);

  // Sync cart to storage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart', e);
    }
  }, [cart]);

  // Sync orders to storage
  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders', e);
    }
  }, [orders]);

  // Temporary notification dismisser
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Cart calculations
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Add to cart
  const addToCart = (product: Product, variant: ProductVariant, quantity: number = 1): boolean => {
    if (variant.stock <= 0) {
      setNotification(`Sorry, ${product.name} (${variant.size}) is currently out of stock.`);
      return false;
    }

    setCart(prev => {
      const existing = prev.find(item => item.sku === variant.sku);
      if (existing) {
        const targetQty = existing.quantity + quantity;
        if (targetQty > variant.stock) {
          setNotification(`Only ${variant.stock} units available for ${variant.size}.`);
          return prev.map(item => item.sku === variant.sku ? { ...item, quantity: variant.stock } : item);
        }
        return prev.map(item => item.sku === variant.sku ? { ...item, quantity: targetQty } : item);
      } else {
        const targetQty = Math.min(quantity, variant.stock);
        return [
          ...prev,
          {
            productId: product.id,
            productName: product.name,
            productImage: product.image,
            categoryLabel: product.categoryLabel,
            variantSize: variant.size,
            price: variant.price,
            sku: variant.sku,
            quantity: targetQty,
            maxStock: variant.stock
          }
        ];
      }
    });

    setNotification(`Added ${product.name} (${variant.size}) to your bag`);
    return true;
  };

  const removeFromCart = (sku: string) => {
    setCart(prev => prev.filter(item => item.sku !== sku));
  };

  const updateCartQuantity = (sku: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(sku);
      return;
    }
    setCart(prev =>
      prev.map(item => {
        if (item.sku === sku) {
          const clamped = Math.min(newQty, item.maxStock);
          if (clamped < newQty) {
            setNotification(`Max available stock reached (${item.maxStock})`);
          }
          return { ...item, quantity: clamped };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Inventory modifications
  const updateProductStock = (productId: string, sku: string, newStock: number) => {
    const validStock = Math.max(0, Math.floor(newStock));
    setProducts(prev =>
      prev.map(prod => {
        if (prod.id === productId) {
          return {
            ...prod,
            variants: prod.variants.map(v => v.sku === sku ? { ...v, stock: validStock } : v)
          };
        }
        return prod;
      })
    );
    // Also update any item in cart to not exceed new stock
    setCart(prev =>
      prev.map(item => {
        if (item.sku === sku) {
          return {
            ...item,
            maxStock: validStock,
            quantity: Math.min(item.quantity, validStock)
          };
        }
        return item;
      }).filter(item => item.quantity > 0)
    );
    setNotification(`Updated stock for SKU ${sku} to ${validStock} units.`);
  };

  const updateProductPrice = (productId: string, sku: string, newPrice: number) => {
    const validPrice = Math.max(1, Math.round(newPrice));
    setProducts(prev =>
      prev.map(prod => {
        if (prod.id === productId) {
          return {
            ...prod,
            variants: prod.variants.map(v => v.sku === sku ? { ...v, price: validPrice } : v)
          };
        }
        return prod;
      })
    );
    setCart(prev =>
      prev.map(item => item.sku === sku ? { ...item, price: validPrice } : item)
    );
    setNotification(`Updated price for SKU ${sku} to ₹${validPrice}`);
  };

  const addProduct = (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
    setNotification(`Added new product "${newProduct.name}" to inventory.`);
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    setNotification(`Product removed from catalog.`);
  };

  const resetProductsToDefault = () => {
    setProducts(INITIAL_PRODUCTS);
    setNotification(`Inventory restored to initial factory catalog.`);
  };

  // Order placement & stock decrement
  const placeOrder = (orderDetails: {
    customerName: string;
    phone: string;
    email?: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    paymentMethod: 'cod' | 'upi' | 'card';
    notes?: string;
    shippingFee: number;
    discount: number;
  }): Order => {
    const generatedId = `GC-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const subtotal = cartTotal;
    const finalTotal = subtotal + orderDetails.shippingFee - orderDetails.discount;

    const newOrder: Order = {
      orderId: generatedId,
      date: new Date().toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short'
      }),
      items: [...cart],
      subtotal,
      shippingFee: orderDetails.shippingFee,
      discount: orderDetails.discount,
      total: Math.max(0, finalTotal),
      customerName: orderDetails.customerName,
      phone: orderDetails.phone,
      email: orderDetails.email,
      address: orderDetails.address,
      city: orderDetails.city,
      state: orderDetails.state,
      pincode: orderDetails.pincode,
      paymentMethod: orderDetails.paymentMethod,
      notes: orderDetails.notes,
      status: 'Received'
    };

    // Deduct stock in real-time
    setProducts(prev =>
      prev.map(prod => {
        const updatedVariants = prod.variants.map(v => {
          const purchasedItem = cart.find(c => c.sku === v.sku);
          if (purchasedItem) {
            return {
              ...v,
              stock: Math.max(0, v.stock - purchasedItem.quantity)
            };
          }
          return v;
        });
        return { ...prod, variants: updatedVariants };
      })
    );

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setLatestOrder(newOrder);
    setIsCheckoutOpen(false);
    return newOrder;
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        orders,
        isCartOpen,
        setIsCartOpen,
        activeModalProduct,
        setActiveModalProduct,
        isCheckoutOpen,
        setIsCheckoutOpen,
        latestOrder,
        setLatestOrder,
        isInventoryOpen,
        setIsInventoryOpen,
        isCertificatesOpen,
        setIsCertificatesOpen,
        notification,
        setNotification,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartCount,
        updateProductStock,
        updateProductPrice,
        addProduct,
        deleteProduct,
        resetProductsToDefault,
        placeOrder
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
