export type ProductCategory = 
  | 'all'
  | 'edible-oils'
  | 'pooja-oils'
  | 'grains-millets'
  | 'kitchen-essentials';

export interface ProductVariant {
  size: string;
  price: number;
  originalPrice?: number;
  sku: string;
  stock: number;
  unit: string;
}

export interface Product {
  id: string;
  name: string;
  tamilName?: string;
  brand: 'Golden Crystal' | 'Sathyam Food Products';
  category: 'edible-oils' | 'pooja-oils' | 'grains-millets' | 'kitchen-essentials';
  categoryLabel: string;
  shortDesc: string;
  description: string;
  image: string;
  variants: ProductVariant[];
  extractionMethod?: string;
  smokePointOrBurning?: string;
  shelfLife: string;
  keyBenefits: string[];
  ingredients: string[];
  rating: number;
  reviewCount: number;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  certifications: string[];
  fssaiNumber?: string;
}

export interface CartItem {
  productId: string;
  productName: string;
  productImage: string;
  categoryLabel: string;
  variantSize: string;
  price: number;
  sku: string;
  quantity: number;
  maxStock: number;
}

export interface Order {
  orderId: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  customerName: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: 'cod' | 'upi' | 'card';
  notes?: string;
  status: 'Received' | 'Packed' | 'Shipped' | 'Delivered';
}
