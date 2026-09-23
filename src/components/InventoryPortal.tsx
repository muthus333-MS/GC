import React, { useState } from 'react';
import {
  X,
  Package,
  AlertTriangle,
  TrendingUp,
  Plus,
  RefreshCw,
  Search,
  Check,
  Edit2,
  FileSpreadsheet,
  Clock,
  Trash2,
  ChevronDown
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product, ProductCategory } from '../types';

export const InventoryPortal: React.FC = () => {
  const {
    products,
    updateProductStock,
    updateProductPrice,
    addProduct,
    deleteProduct,
    resetProductsToDefault,
    orders,
    isInventoryOpen,
    setIsInventoryOpen
  } = useStore();

  const [activeTab, setActiveTab] = useState<'inventory' | 'orders' | 'add-product'>('inventory');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'low' | 'out' | 'healthy'>('all');
  const [editingSku, setEditingSku] = useState<string | null>(null);
  const [editPriceVal, setEditPriceVal] = useState<number>(0);
  const [editStockVal, setEditStockVal] = useState<number>(0);

  // New product form state
  const [newProduct, setNewProduct] = useState<{
    name: string;
    tamilName: string;
    category: 'edible-oils' | 'pooja-oils' | 'grains-millets' | 'kitchen-essentials';
    shortDesc: string;
    image: string;
    size: string;
    price: number;
    stock: number;
  }>({
    name: '',
    tamilName: '',
    category: 'edible-oils',
    shortDesc: '',
    image: '/src/assets/images/cold_pressed_bottles_1790167768223.jpg',
    size: '1 Litre',
    price: 320,
    stock: 50
  });

  if (!isInventoryOpen) return null;

  // Flatten product variants for inventory table
  const allVariantsList = products.flatMap(product =>
    product.variants.map(variant => ({
      productId: product.id,
      productName: product.name,
      tamilName: product.tamilName,
      categoryLabel: product.categoryLabel,
      image: product.image,
      ...variant
    }))
  );

  // Summary metrics
  const totalSkus = allVariantsList.length;
  const totalUnits = allVariantsList.reduce((sum, v) => sum + v.stock, 0);
  const totalValuation = allVariantsList.reduce((sum, v) => sum + v.price * v.stock, 0);
  const lowStockCount = allVariantsList.filter(v => v.stock > 0 && v.stock <= 8).length;
  const outOfStockCount = allVariantsList.filter(v => v.stock === 0).length;

  // Filter variants
  const filteredVariants = allVariantsList.filter(v => {
    const matchesSearch =
      v.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.sku.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    if (statusFilter === 'out') return v.stock === 0;
    if (statusFilter === 'low') return v.stock > 0 && v.stock <= 8;
    if (statusFilter === 'healthy') return v.stock > 8;
    return true;
  });

  const handleStartEdit = (sku: string, currentPrice: number, currentStock: number) => {
    setEditingSku(sku);
    setEditPriceVal(currentPrice);
    setEditStockVal(currentStock);
  };

  const handleSaveEdit = (productId: string, sku: string) => {
    updateProductPrice(productId, sku, editPriceVal);
    updateProductStock(productId, sku, editStockVal);
    setEditingSku(null);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name.trim()) return;

    const sku = `GC-${newProduct.category.slice(0, 3).toUpperCase()}-${Date.now().toString().slice(-4)}`;
    const categoryLabels: Record<string, string> = {
      'edible-oils': 'Cold-Pressed Edible Oil',
      'pooja-oils': 'Ritual Pooja Oil',
      'grains-millets': 'Organic Grains & Millets',
      'kitchen-essentials': 'Kitchen Essentials'
    };

    const created: Product = {
      id: `prod-${Date.now()}`,
      name: newProduct.name,
      tamilName: newProduct.tamilName || undefined,
      brand: 'Golden Crystal',
      category: newProduct.category,
      categoryLabel: categoryLabels[newProduct.category] || 'Kitchen Essentials',
      shortDesc: newProduct.shortDesc || 'Manufactured by Sathyam Food Products.',
      description: newProduct.shortDesc || 'Authentic traditional food product produced under stringent quality guidelines.',
      image: newProduct.image,
      variants: [
        {
          size: newProduct.size,
          price: Number(newProduct.price),
          sku,
          stock: Number(newProduct.stock),
          unit: 'Pack'
        }
      ],
      shelfLife: '9 Months',
      keyBenefits: ['100% Pure and traditional preparation', 'Direct mill freshness guarantee'],
      ingredients: [newProduct.name],
      rating: 5.0,
      reviewCount: 1,
      certifications: ['FSSAI Certified', 'Sathyam Food Quality Checked'],
      fssaiNumber: '12421008000412'
    };

    addProduct(created);
    setActiveTab('inventory');
    setNewProduct({
      name: '',
      tamilName: '',
      category: 'edible-oils',
      shortDesc: '',
      image: '/src/assets/images/cold_pressed_bottles_1790167768223.jpg',
      size: '1 Litre',
      price: 320,
      stock: 50
    });
  };

  const handleExportCSV = () => {
    const headers = ['SKU', 'Product Name', 'Category', 'Variant Size', 'Price (INR)', 'Stock Units'];
    const rows = allVariantsList.map(v => [
      v.sku,
      `"${v.productName}"`,
      `"${v.categoryLabel}"`,
      `"${v.size}"`,
      v.price,
      v.stock
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `golden_crystal_inventory_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-6 overflow-y-auto">
      <div className="bg-[#FAF9F5] border border-stone-200 rounded-2xl max-w-6xl w-full overflow-hidden shadow-2xl relative my-auto flex flex-col max-h-[95vh]">
        
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-white shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-amber-800" />
              <h2 className="font-serif text-xl font-bold text-stone-900">
                Sathyam Food Products · Warehouse & Inventory Portal
              </h2>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Real-time stock management, price updates, SKU controls, and dispatch tracking for Golden Crystal.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-lg cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-700" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={() => setIsInventoryOpen(false)}
              className="p-1.5 text-stone-500 hover:text-stone-900 rounded-md hover:bg-stone-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Metric Ribbons */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-4 bg-stone-100 border-b border-stone-200 shrink-0 text-xs">
          <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-2xs">
            <span className="text-stone-500 uppercase tracking-wider text-[10px]">Active SKUs</span>
            <p className="font-serif text-xl font-bold text-stone-900 tabular-nums mt-0.5">{totalSkus}</p>
          </div>

          <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-2xs">
            <span className="text-stone-500 uppercase tracking-wider text-[10px]">Total Stock Units</span>
            <p className="font-serif text-xl font-bold text-stone-900 tabular-nums mt-0.5">{totalUnits.toLocaleString('en-IN')}</p>
          </div>

          <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-2xs">
            <span className="text-stone-500 uppercase tracking-wider text-[10px]">Inventory Value</span>
            <p className="font-serif text-xl font-bold text-amber-900 tabular-nums mt-0.5">₹{totalValuation.toLocaleString('en-IN')}</p>
          </div>

          <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-2xs">
            <span className="text-stone-500 uppercase tracking-wider text-[10px]">Low Stock (&le; 8)</span>
            <p className="font-serif text-xl font-bold text-amber-700 tabular-nums mt-0.5">{lowStockCount}</p>
          </div>

          <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-2xs">
            <span className="text-stone-500 uppercase tracking-wider text-[10px]">Out of Stock</span>
            <p className="font-serif text-xl font-bold text-red-600 tabular-nums mt-0.5">{outOfStockCount}</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between px-4 pt-3 border-b border-stone-200 bg-white shrink-0">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('inventory')}
              className={`pb-3 text-xs font-bold border-b-2 transition-all cursor-pointer ${
                activeTab === 'inventory'
                  ? 'border-amber-900 text-amber-950'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              Stock Management ({filteredVariants.length})
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`pb-3 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'orders'
                  ? 'border-amber-900 text-amber-950'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              <span>Customer Orders</span>
              <span className="bg-stone-200 text-stone-700 px-1.5 py-0.2 rounded-full text-[10px] tabular-nums">
                {orders.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('add-product')}
              className={`pb-3 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1 ${
                activeTab === 'add-product'
                  ? 'border-amber-900 text-amber-950'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Product / SKU</span>
            </button>
          </div>

          <button
            onClick={resetProductsToDefault}
            className="text-[11px] text-stone-500 hover:text-red-700 flex items-center gap-1 cursor-pointer pb-2"
            title="Restore original factory catalog"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset Defaults</span>
          </button>
        </div>

        {/* Tab 1: Live Stock Table */}
        {activeTab === 'inventory' && (
          <div className="flex-1 overflow-y-auto p-4 flex flex-col space-y-4">
            
            {/* Search and Status Filters */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between shrink-0">
              <div className="relative max-w-sm flex-1">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by SKU or Product name..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-amber-800"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
                {[
                  { id: 'all', label: 'All Statuses' },
                  { id: 'low', label: 'Low Stock' },
                  { id: 'out', label: 'Out of Stock' },
                  { id: 'healthy', label: 'Adequate Stock' }
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setStatusFilter(st.id as any)}
                    className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                      statusFilter === st.id
                        ? 'bg-stone-900 text-white'
                        : 'bg-stone-200/70 text-stone-700 hover:bg-stone-300'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Warehouse Table */}
            <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-stone-700 divide-y divide-stone-200">
                  <thead className="bg-stone-50 text-[11px] font-bold uppercase tracking-wider text-stone-500">
                    <tr>
                      <th className="px-4 py-3">Product / SKU</th>
                      <th className="px-3 py-3">Category</th>
                      <th className="px-3 py-3">Size Variant</th>
                      <th className="px-3 py-3 text-right">Selling Price</th>
                      <th className="px-4 py-3 text-center">Current Stock</th>
                      <th className="px-4 py-3 text-right">Quick Stock Replenish</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filteredVariants.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-8 text-stone-400">
                          No matching SKUs found in warehouse records.
                        </td>
                      </tr>
                    ) : (
                      filteredVariants.map((item) => {
                        const isEditing = editingSku === item.sku;
                        const isOutOfStock = item.stock === 0;
                        const isLow = item.stock > 0 && item.stock <= 8;

                        return (
                          <tr key={item.sku} className="hover:bg-stone-50/80 transition-colors">
                            
                            {/* Product & SKU */}
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                <img
                                  src={item.image}
                                  alt={item.productName}
                                  referrerPolicy="no-referrer"
                                  className="w-10 h-10 rounded-md object-cover bg-stone-100 shrink-0"
                                />
                                <div>
                                  <p className="font-bold text-stone-900 line-clamp-1">{item.productName}</p>
                                  <span className="font-mono text-[10px] text-stone-500">{item.sku}</span>
                                </div>
                              </div>
                            </td>

                            {/* Category */}
                            <td className="px-3 py-3 whitespace-nowrap text-stone-600">
                              {item.categoryLabel}
                            </td>

                            {/* Variant */}
                            <td className="px-3 py-3 whitespace-nowrap font-medium text-stone-800">
                              {item.size}
                            </td>

                            {/* Price */}
                            <td className="px-3 py-3 whitespace-nowrap text-right">
                              {isEditing ? (
                                <div className="inline-flex items-center gap-1 justify-end">
                                  <span className="text-stone-400">₹</span>
                                  <input
                                    type="number"
                                    value={editPriceVal}
                                    onChange={(e) => setEditPriceVal(Number(e.target.value))}
                                    className="w-16 px-1.5 py-0.5 text-right border border-amber-800 rounded font-bold"
                                  />
                                </div>
                              ) : (
                                <span className="font-serif font-bold text-stone-900 tabular-nums">
                                  ₹{item.price}
                                </span>
                              )}
                            </td>

                            {/* Stock status & count */}
                            <td className="px-4 py-3 text-center whitespace-nowrap">
                              {isEditing ? (
                                <input
                                  type="number"
                                  value={editStockVal}
                                  onChange={(e) => setEditStockVal(Number(e.target.value))}
                                  className="w-16 px-1.5 py-0.5 text-center border border-amber-800 rounded font-bold"
                                />
                              ) : (
                                <div className="inline-flex items-center gap-1.5">
                                  <span
                                    className={`w-2 h-2 rounded-full ${
                                      isOutOfStock
                                        ? 'bg-red-600'
                                        : isLow
                                        ? 'bg-amber-600'
                                        : 'bg-emerald-600'
                                    }`}
                                  />
                                  <span className="font-bold tabular-nums text-stone-800">
                                    {item.stock} {item.unit || 'units'}
                                  </span>
                                </div>
                              )}
                            </td>

                            {/* Actions */}
                            <td className="px-4 py-3 text-right whitespace-nowrap">
                              {isEditing ? (
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    onClick={() => handleSaveEdit(item.productId, item.sku)}
                                    className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-[11px] font-semibold flex items-center gap-1"
                                  >
                                    <Check className="w-3 h-3" />
                                    <span>Save</span>
                                  </button>
                                  <button
                                    onClick={() => setEditingSku(null)}
                                    className="px-2 py-1 bg-stone-200 text-stone-600 hover:bg-stone-300 rounded text-[11px]"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              ) : (
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    onClick={() => updateProductStock(item.productId, item.sku, item.stock + 10)}
                                    className="px-2 py-1 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded text-[11px] font-semibold text-stone-700"
                                    title="Add 10 units"
                                  >
                                    +10
                                  </button>
                                  <button
                                    onClick={() => updateProductStock(item.productId, item.sku, item.stock + 50)}
                                    className="px-2 py-1 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded text-[11px] font-semibold text-stone-700"
                                    title="Add 50 units"
                                  >
                                    +50
                                  </button>
                                  <button
                                    onClick={() => handleStartEdit(item.sku, item.price, item.stock)}
                                    className="p-1.5 text-stone-500 hover:text-stone-900 rounded hover:bg-stone-100"
                                    title="Edit price or stock count"
                                  >
                                    <Edit2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              )}
                            </td>

                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Orders Log */}
        {activeTab === 'orders' && (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {orders.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <Clock className="w-8 h-8 text-stone-400 mx-auto" />
                <h3 className="font-serif text-lg font-bold text-stone-800">No Orders Placed Yet</h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  When customers place orders on the storefront, full transaction and dispatch logs will appear here.
                </p>
              </div>
            ) : (
              orders.map((ord) => (
                <div key={ord.orderId} className="bg-white border border-stone-200 rounded-xl p-4 shadow-2xs space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-2.5">
                    <div>
                      <span className="font-mono font-bold text-xs text-stone-900">{ord.orderId}</span>
                      <span className="text-stone-400 text-xs ml-2">· {ord.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                        Payment: {ord.paymentMethod.toUpperCase()}
                      </span>
                      <span className="text-[11px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900">
                        Status: {ord.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <p className="font-semibold text-stone-800">Customer Details:</p>
                      <p className="text-stone-600">{ord.customerName} ({ord.phone})</p>
                      <p className="text-stone-500">{ord.address}, {ord.city} - {ord.pincode}</p>
                    </div>

                    <div>
                      <p className="font-semibold text-stone-800">Purchased Items:</p>
                      <ul className="text-stone-600 space-y-0.5">
                        {ord.items.map((i) => (
                          <li key={i.sku}>
                            {i.productName} ({i.variantSize}) × {i.quantity} = ₹{i.price * i.quantity}
                          </li>
                        ))}
                      </ul>
                      <p className="font-bold text-stone-900 mt-1">Total: ₹{ord.total}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 3: Add New Product / SKU Form */}
        {activeTab === 'add-product' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            <form onSubmit={handleCreateProduct} className="max-w-2xl mx-auto bg-white border border-stone-200 rounded-2xl p-6 space-y-4 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-stone-900 border-b border-stone-200 pb-2">
                Register New Product in Catalog
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Product English Name *</label>
                  <input
                    type="text"
                    required
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    placeholder="e.g. Organic Kodo Millet (Varagu)"
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-amber-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Tamil Heritage Name</label>
                  <input
                    type="text"
                    value={newProduct.tamilName}
                    onChange={(e) => setNewProduct({ ...newProduct, tamilName: e.target.value })}
                    placeholder="e.g. இயற்கை வரகு அரிசி"
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-amber-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Product Category *</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white focus:outline-none focus:border-amber-800"
                  >
                    <option value="edible-oils">Cold-Pressed Edible Oils</option>
                    <option value="pooja-oils">Sacred Ritual Pooja Oils</option>
                    <option value="grains-millets">Organic Grains & Millets</option>
                    <option value="kitchen-essentials">Kitchen Essentials & Salts</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Default Packaging Size *</label>
                  <input
                    type="text"
                    required
                    value={newProduct.size}
                    onChange={(e) => setNewProduct({ ...newProduct, size: e.target.value })}
                    placeholder="e.g. 1 Litre or 1 kg"
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-amber-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Selling Price (INR ₹) *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-amber-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Initial Stock Units *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-amber-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Short Description / Benefits</label>
                <textarea
                  rows={2}
                  value={newProduct.shortDesc}
                  onChange={(e) => setNewProduct({ ...newProduct, shortDesc: e.target.value })}
                  placeholder="Describe extraction method, nutritional points, or usage..."
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-amber-800"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('inventory')}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-amber-900 hover:bg-amber-950 rounded-lg shadow-sm"
                >
                  Create & List SKU
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
