import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  // 1. EDIBLE COLD PRESSED OILS
  {
    id: 'gc-sesame-oil',
    name: 'Pure Cold-Pressed Sesame Oil (Wood Pressed)',
    tamilName: 'மரச்செக்கு நல்லெண்ணெய்',
    brand: 'Golden Crystal',
    category: 'edible-oils',
    categoryLabel: 'Cold-Pressed Edible Oil',
    shortDesc: 'Traditional Vagai wood-pressed gingelly oil crushed with pure palm jaggery. Unrefined, aroma-rich, zero additives.',
    description: 'Our flagship Golden Crystal Sesame Oil is extracted in traditional Vagai wood chekkus below 38°C to retain all natural polyphenols, sesamol, and sesamolin. Blended with a whisper of organic palm jaggery during pressing to temper bitterness naturally without any chemical refinement.',
    image: '/src/assets/images/cold_pressed_bottles_1790167768223.jpg',
    variants: [
      { size: '500 ml', price: 210, originalPrice: 240, sku: 'GC-SES-500ML', stock: 45, unit: 'Bottle' },
      { size: '1 Litre', price: 410, originalPrice: 470, sku: 'GC-SES-1L', stock: 68, unit: 'Bottle' },
      { size: '2 Litres', price: 810, originalPrice: 930, sku: 'GC-SES-2L', stock: 24, unit: 'Can' },
      { size: '5 Litres', price: 1980, originalPrice: 2280, sku: 'GC-SES-5L', stock: 15, unit: 'Can' },
      { size: '15 Litres', price: 5800, originalPrice: 6500, sku: 'GC-SES-15L', stock: 6, unit: 'Tin' }
    ],
    extractionMethod: 'Traditional Vagai (Albizia Lebbeck) Wooden Marachekku at < 38°C',
    smokePointOrBurning: 'Smoke Point: 210°C (Unrefined)',
    shelfLife: '9 Months from packaging',
    keyBenefits: [
      'Rich in Sesamol and Vitamin E antioxidants',
      'Supports healthy blood pressure & cardiovascular wellness',
      'Ideal for authentic South Indian curries, idli podi, & traditional oil pulling',
      'Zero mineral oils, chemical bleaching, or argemone contamination'
    ],
    ingredients: ['100% Selected First-Grade Black Sesame Seeds', 'Pure Organic Palm Jaggery (Karupatti)'],
    rating: 4.9,
    reviewCount: 148,
    isFeatured: true,
    isBestSeller: true,
    certifications: ['FSSAI Certified', 'AGMARK Grade 1', 'Lab Tested 100% Pure', 'Non-GMO'],
    fssaiNumber: '12421008000412'
  },
  {
    id: 'gc-groundnut-oil',
    name: 'Virgin Cold-Pressed Groundnut Oil',
    tamilName: 'மரச்செக்கு கடலை எண்ணெய்',
    brand: 'Golden Crystal',
    category: 'edible-oils',
    categoryLabel: 'Cold-Pressed Edible Oil',
    shortDesc: 'Wood-pressed from sun-dried Saurashtra groundnuts. Naturally nutty aroma with a high natural smoke point.',
    description: 'Golden Crystal Cold-Pressed Groundnut Oil is extracted through slow rotary wood presses from premium, aflatoxin-tested native peanuts. Free from solvent extraction, hexane, and artificial settling agents. Retains natural phytosterols and monounsaturated fatty acids (MUFA) for heart health.',
    image: '/src/assets/images/cold_pressed_bottles_1790167768223.jpg',
    variants: [
      { size: '500 ml', price: 165, originalPrice: 190, sku: 'GC-GND-500ML', stock: 38, unit: 'Bottle' },
      { size: '1 Litre', price: 310, originalPrice: 350, sku: 'GC-GND-1L', stock: 82, unit: 'Bottle' },
      { size: '2 Litres', price: 610, originalPrice: 690, sku: 'GC-GND-2L', stock: 30, unit: 'Can' },
      { size: '5 Litres', price: 1490, originalPrice: 1700, sku: 'GC-GND-5L', stock: 22, unit: 'Can' },
      { size: '15 Litres', price: 4400, originalPrice: 4950, sku: 'GC-GND-15L', stock: 8, unit: 'Tin' }
    ],
    extractionMethod: 'Slow cold expeller marachekku with zero heat induced friction',
    smokePointOrBurning: 'Smoke Point: 225°C (Perfect for deep frying & sautéing)',
    shelfLife: '9 Months from packaging',
    keyBenefits: [
      'High in Monounsaturated Fatty Acids (MUFA) for cholesterol balance',
      'High smoke point makes it safe for deep frying without toxin breakdown',
      'Golden transparent clarity with authentic nutty crunch flavor',
      'Zero trans-fats and chemical preservatives'
    ],
    ingredients: ['100% Farm-Sourced Sun-Dried Groundnut Kernels'],
    rating: 4.8,
    reviewCount: 112,
    isFeatured: true,
    isBestSeller: true,
    certifications: ['FSSAI Certified', 'Aflatoxin Lab Tested', 'AGMARK Pure'],
    fssaiNumber: '12421008000412'
  },
  {
    id: 'gc-coconut-oil',
    name: 'Pure Cold-Pressed Virgin Coconut Oil',
    tamilName: 'மரச்செக்கு தேங்காய் எண்ணெய்',
    brand: 'Golden Crystal',
    category: 'edible-oils',
    categoryLabel: 'Cold-Pressed Edible Oil',
    shortDesc: 'Sun-dried sulfur-free copra cold pressed for crystalline clarity and natural Lauric acid richness.',
    description: 'Extracted from clean, sulfur-free naturally dried whole coconuts from Pollachi groves. Golden Crystal Coconut Oil is rich in medium-chain triglycerides (MCTs) and Lauric acid. Ideal for wholesome cooking, baby massage, and scalp rejuvenation.',
    image: '/src/assets/images/cold_pressed_bottles_1790167768223.jpg',
    variants: [
      { size: '500 ml', price: 185, originalPrice: 220, sku: 'GC-COC-500ML', stock: 52, unit: 'Bottle' },
      { size: '1 Litre', price: 360, originalPrice: 410, sku: 'GC-COC-1L', stock: 40, unit: 'Bottle' },
      { size: '2 Litres', price: 710, originalPrice: 800, sku: 'GC-COC-2L', stock: 18, unit: 'Can' },
      { size: '5 Litres', price: 1720, originalPrice: 1980, sku: 'GC-COC-5L', stock: 12, unit: 'Can' }
    ],
    extractionMethod: 'Wood-churned Marachekku copra extraction below 35°C',
    smokePointOrBurning: 'Smoke Point: 177°C (Gentle cooking, tempering, & raw consumption)',
    shelfLife: '12 Months from packaging',
    keyBenefits: [
      '50%+ Lauric Acid content for immune system enhancement',
      'Dual-purpose: exceptional culinary staple & nourishing hair/skin therapy',
      'Unrefined, crystal clear, unbleached, and non-deodorized',
      'Naturally aromatic fresh coconut scent'
    ],
    ingredients: ['100% Sulfur-Free Sun-Dried Coconut Copra'],
    rating: 4.9,
    reviewCount: 96,
    isFeatured: true,
    isBestSeller: false,
    certifications: ['FSSAI Certified', '100% Virgin Grade', 'Sulfur Free Test Verified'],
    fssaiNumber: '12421008000412'
  },
  {
    id: 'gc-mustard-oil',
    name: 'Cold-Pressed Raw Kachi Ghani Mustard Oil',
    tamilName: 'மரச்செக்கு கடுகு எண்ணெய்',
    brand: 'Golden Crystal',
    category: 'edible-oils',
    categoryLabel: 'Cold-Pressed Edible Oil',
    shortDesc: 'Pungent, authentic, high-antioxidant cold pressed black mustard oil. Unfiltered purity.',
    description: 'Crushed from the finest Indian black mustard seeds using traditional cold-expelling techniques. Retains its distinct natural pungency (Sinigrin), Allyl Isothiocyanate, and optimal Omega-3 to Omega-6 fatty acid ratio for pickle preservation and north-style curries.',
    image: '/src/assets/images/cold_pressed_bottles_1790167768223.jpg',
    variants: [
      { size: '500 ml', price: 145, originalPrice: 170, sku: 'GC-MUS-500ML', stock: 28, unit: 'Bottle' },
      { size: '1 Litre', price: 280, originalPrice: 320, sku: 'GC-MUS-1L', stock: 35, unit: 'Bottle' },
      { size: '5 Litres', price: 1350, originalPrice: 1550, sku: 'GC-MUS-5L', stock: 8, unit: 'Can' }
    ],
    extractionMethod: 'Kachi Ghani Cold Pressing under controlled temperatures',
    smokePointOrBurning: 'Smoke Point: 250°C',
    shelfLife: '12 Months',
    keyBenefits: [
      'Rich in Alpha-Linolenic Acid (Omega-3)',
      'Natural antifungal & antibacterial properties, ideal for pickles',
      'Zero artificial pungency agents or color enhancers'
    ],
    ingredients: ['100% First-Pick Black Mustard Seeds'],
    rating: 4.7,
    reviewCount: 64,
    isFeatured: false,
    isBestSeller: false,
    certifications: ['FSSAI Certified', 'AGMARK Grade 1'],
    fssaiNumber: '12421008000412'
  },
  {
    id: 'gc-castor-oil',
    name: 'Pure Cold-Pressed Castor Oil (Wood Pressed)',
    tamilName: 'மரச்செக்கு விளக்கெண்ணெய்',
    brand: 'Golden Crystal',
    category: 'edible-oils',
    categoryLabel: 'Cold-Pressed Edible Oil',
    shortDesc: 'Thick, pure, unrefined castor oil. Traditional body coolant, digestive aid, and hair vitality tonic.',
    description: 'Golden Crystal Castor Oil is extracted from wild-collected organic castor seeds without chemical hexane solvents. Valued across generations for its cooling properties in traditional ayurvedic body care and culinary digestive moderation.',
    image: '/src/assets/images/cold_pressed_bottles_1790167768223.jpg',
    variants: [
      { size: '200 ml', price: 95, originalPrice: 115, sku: 'GC-CAS-200ML', stock: 45, unit: 'Bottle' },
      { size: '500 ml', price: 195, originalPrice: 230, sku: 'GC-CAS-500ML', stock: 32, unit: 'Bottle' },
      { size: '1 Litre', price: 380, originalPrice: 440, sku: 'GC-CAS-1L', stock: 20, unit: 'Bottle' }
    ],
    extractionMethod: 'Slow cold mechanical extraction, unbleached',
    smokePointOrBurning: 'Edible therapeutic grade / Internal & External application',
    shelfLife: '18 Months',
    keyBenefits: [
      'Rich in Ricinoleic Acid (90%) for deep cellular nourishment',
      'Traditional internal detox and maternal wellness staple',
      'Deep hair follicle and eyebrow thickening stimulant'
    ],
    ingredients: ['100% Pure Castor Seeds (Ricinus Communis)'],
    rating: 4.8,
    reviewCount: 52,
    isFeatured: false,
    isBestSeller: false,
    certifications: ['FSSAI Certified', 'Cold Press Verified'],
    fssaiNumber: '12421008000412'
  },

  // 2. LONG BURNING CUSTOM RITUAL POOJA OILS
  {
    id: 'gc-pancha-deepam-oil',
    name: 'Sacred Pancha Deepam Long-Burning Ritual Pooja Oil',
    tamilName: 'பஞ்ச தீபம் பூஜை எண்ணெய்',
    brand: 'Golden Crystal',
    category: 'pooja-oils',
    categoryLabel: 'Ritual Pooja Oil',
    shortDesc: 'Auspicious blend of 5 sacred oils with divine temple fragrances. Long burning, soot-free bright golden flame.',
    description: 'Handcrafted following authentic Shastras by Sathyam Food Products, Golden Crystal Pancha Deepam Oil combines the five sacred oils: Pure Sesame (Gingelly), Mahua (Illuppai), Castor (Amanakku), Neem (Vembu), and Pure Cow Ghee & Coconut Oil, infused with delicate temple-grade camphor and sugandh herbs. Yields an even, soot-free flame that purifies the atmosphere and dispels negative energies.',
    image: '/src/assets/images/pooja_deepam_oil_1790167783712.jpg',
    variants: [
      { size: '500 ml', price: 140, originalPrice: 165, sku: 'GC-PNC-500ML', stock: 75, unit: 'Bottle' },
      { size: '1 Litre', price: 260, originalPrice: 300, sku: 'GC-PNC-1L', stock: 120, unit: 'Bottle' },
      { size: '2 Litres', price: 510, originalPrice: 590, sku: 'GC-PNC-2L', stock: 45, unit: 'Can' },
      { size: '5 Litres', price: 1240, originalPrice: 1450, sku: 'GC-PNC-5L', stock: 28, unit: 'Can' }
    ],
    extractionMethod: 'Sacred Ayurvedic cold formulation with holy herbs infusion',
    smokePointOrBurning: 'Burns 40% longer than ordinary lamp oils; zero black soot residue on brass deepams',
    shelfLife: '24 Months',
    keyBenefits: [
      'Authentic 5-sacred oil blend according to Agamic scriptures',
      'Produces a steady, bright golden aura flame for hours',
      'Zero chemical paraffin or waste recycled oil contamination',
      'Infused with gentle soothing divine natural sugandham'
    ],
    ingredients: ['Pure Sesame Oil', 'Mahua (Illuppai) Oil', 'Pure Castor Oil', 'Neem Oil', 'Pure Cow Ghee & Coconut Oil', 'Natural Fragrant Resins'],
    rating: 5.0,
    reviewCount: 230,
    isFeatured: true,
    isBestSeller: true,
    certifications: ['Traditional Agamic Formula', 'Soot-Free Certified', 'Lab Tested Purity'],
    fssaiNumber: '12421008000412'
  },
  {
    id: 'gc-mahua-deepam-oil',
    name: 'Pure Mahua (Illuppai) Auspicious Temple Deepam Oil',
    tamilName: 'தூய இலுப்பை தீப எண்ணெய்',
    brand: 'Golden Crystal',
    category: 'pooja-oils',
    categoryLabel: 'Ritual Pooja Oil',
    shortDesc: 'Auspicious Mahua tree seed oil for Goddess Mahalakshmi pujas. Purifying, divine aroma, calm glow.',
    description: 'Extracted from native Illuppai (Mahua) tree seeds. In ancient tradition, lighting Mahua oil deepams attracts prosperity, peace of mind, and eradicates domestic debt. Burns with a serene, slow flame with natural cooling aura.',
    image: '/src/assets/images/pooja_deepam_oil_1790167783712.jpg',
    variants: [
      { size: '500 ml', price: 160, originalPrice: 190, sku: 'GC-MAH-500ML', stock: 40, unit: 'Bottle' },
      { size: '1 Litre', price: 295, originalPrice: 340, sku: 'GC-MAH-1L', stock: 60, unit: 'Bottle' },
      { size: '5 Litres', price: 1420, originalPrice: 1650, sku: 'GC-MAH-5L', stock: 14, unit: 'Can' }
    ],
    extractionMethod: 'Mechanical cold seed press, non-chemical filtration',
    smokePointOrBurning: 'Sustained burn rate with pleasant earthy floral fragrance',
    shelfLife: '24 Months',
    keyBenefits: [
      'Ideal for Friday Lakshmi pooja, Navaratri, & Karthigai deepam festivals',
      'Natural temple lamp longevity without quick wick drying',
      '100% natural, unadulterated cold pressed seed oil'
    ],
    ingredients: ['100% Pure Wild Mahua (Madhuca Longifolia) Seed Oil'],
    rating: 4.9,
    reviewCount: 88,
    isFeatured: true,
    isBestSeller: false,
    certifications: ['100% Pure Herb Oil', 'Non-Toxic Pure Burn'],
    fssaiNumber: '12421008000412'
  },
  {
    id: 'gc-pure-gingelly-pooja-oil',
    name: 'Heritage Sesame Lamp Oil (Vilakku Nalla Ennai)',
    tamilName: 'விளக்கு நல்லெண்ணெய்',
    brand: 'Golden Crystal',
    category: 'pooja-oils',
    categoryLabel: 'Ritual Pooja Oil',
    shortDesc: 'Traditional pure sesame ritual oil for daily home prayers and temple lamps. Clean flame.',
    description: 'Specially filtered single-origin sesame ritual oil formulated for daily vilakku lighting. Creates a soothing golden white aura that remains steady even in light breezes.',
    image: '/src/assets/images/pooja_deepam_oil_1790167783712.jpg',
    variants: [
      { size: '1 Litre', price: 240, originalPrice: 280, sku: 'GC-POO-SES-1L', stock: 95, unit: 'Bottle' },
      { size: '2 Litres', price: 470, originalPrice: 540, sku: 'GC-POO-SES-2L', stock: 35, unit: 'Can' },
      { size: '5 Litres', price: 1150, originalPrice: 1320, sku: 'GC-POO-SES-5L', stock: 25, unit: 'Can' }
    ],
    extractionMethod: 'Expeller pressed pooja sesame grade',
    smokePointOrBurning: 'Minimum 5+ hours continuous burn in standard brass diya',
    shelfLife: '18 Months',
    keyBenefits: [
      'Steady burn without wick sputtering or crackling',
      'Economical pure oil option for daily twilight pooja rituals',
      'No added recycled kerosene or paraffin mineral grease'
    ],
    ingredients: ['Pure Sesame Oil', 'Natural Fragrance Stabilizer'],
    rating: 4.8,
    reviewCount: 74,
    isFeatured: false,
    isBestSeller: false,
    certifications: ['Purity Guaranteed', 'Lab Verified'],
    fssaiNumber: '12421008000412'
  },

  // 3. ORGANIC GRAINS & MILLETS
  {
    id: 'gc-foxtail-millet',
    name: 'Organic Foxtail Millet (Thinai Arisi)',
    tamilName: 'இயற்கை தினை அரிசி',
    brand: 'Golden Crystal',
    category: 'grains-millets',
    categoryLabel: 'Organic Grains & Millets',
    shortDesc: 'Minimally processed, unpolished golden foxtail millet. High in dietary iron, copper, and plant protein.',
    description: 'Golden Crystal Organic Foxtail Millet (Thinai) is sourced from chemical-free dryland farms in Tamil Nadu. De-husked with utmost care to keep the bran and aleurone layer 100% intact. Delicious in upma, pongal, idli batter, and nutritious kheer.',
    image: '/src/assets/images/organic_millets_grains_1790167801822.jpg',
    variants: [
      { size: '500 g', price: 65, originalPrice: 80, sku: 'GC-FOX-500G', stock: 60, unit: 'Pouch' },
      { size: '1 kg', price: 120, originalPrice: 150, sku: 'GC-FOX-1KG', stock: 85, unit: 'Pouch' },
      { size: '5 kg', price: 580, originalPrice: 720, sku: 'GC-FOX-5KG', stock: 20, unit: 'Bag' }
    ],
    extractionMethod: 'Gentle low-speed rubber roll de-husking with unpolished retention',
    smokePointOrBurning: 'Glycemic Index (GI): ~54 (Low GI Food)',
    shelfLife: '6 Months from packing',
    keyBenefits: [
      'Low Glycemic Index for diabetic-friendly energy release',
      '3x more dietary fiber than polished white rice',
      'High in Magnesium for muscle and nerve relaxation',
      '100% pesticide-free, stone cleaned & vacuum sealed'
    ],
    ingredients: ['100% Unpolished Organic Foxtail Millet (Setaria Italica)'],
    rating: 4.9,
    reviewCount: 104,
    isFeatured: true,
    isBestSeller: true,
    certifications: ['NPOP Organic Certified', 'FSSAI Certified', '100% Whole Grain'],
    fssaiNumber: '12421008000412'
  },
  {
    id: 'gc-barnyard-millet',
    name: 'Organic Barnyard Millet (Kuthiraivali Arisi)',
    tamilName: 'இயற்கை குதிரைவாலி அரிசி',
    brand: 'Golden Crystal',
    category: 'grains-millets',
    categoryLabel: 'Organic Grains & Millets',
    shortDesc: 'Light, fluffy, fiber-dense barnyard millet. Ideal substitute for polished rice in daily meals.',
    description: 'Golden Crystal Barnyard Millet (Kuthiraivali) is rich in digestible protein and lowest in digestible carbohydrates among millets. Cooks fluffy and light, making it the supreme choice for biryani, pulao, and wholesome daily porridge.',
    image: '/src/assets/images/organic_millets_grains_1790167801822.jpg',
    variants: [
      { size: '500 g', price: 70, originalPrice: 85, sku: 'GC-BRN-500G', stock: 50, unit: 'Pouch' },
      { size: '1 kg', price: 130, originalPrice: 160, sku: 'GC-BRN-1KG', stock: 70, unit: 'Pouch' },
      { size: '5 kg', price: 620, originalPrice: 780, sku: 'GC-BRN-5KG', stock: 18, unit: 'Bag' }
    ],
    extractionMethod: 'Unpolished gentle de-hulling',
    smokePointOrBurning: 'Rich in soluble and insoluble prebiotic fiber',
    shelfLife: '6 Months',
    keyBenefits: [
      'Fast-acting digestive wellness & light satiety',
      'Superb bioavailability of plant iron and zinc',
      'Gluten-free nutrient dense staple'
    ],
    ingredients: ['100% Unpolished Organic Barnyard Millet (Echinochloa Frumentacea)'],
    rating: 4.8,
    reviewCount: 78,
    isFeatured: true,
    isBestSeller: false,
    certifications: ['Organic Certified', 'FSSAI Approved'],
    fssaiNumber: '12421008000412'
  },
  {
    id: 'gc-little-millet',
    name: 'Organic Little Millet (Samai Arisi)',
    tamilName: 'இயற்கை சாமை அரிசி',
    brand: 'Golden Crystal',
    category: 'grains-millets',
    categoryLabel: 'Organic Grains & Millets',
    shortDesc: 'Traditional Samai rice loaded with B-vitamins, iron, and minerals. Gentle on the stomach.',
    description: 'Golden Crystal Little Millet is hand-cleaned and minimally de-husked. Its delicate grains absorb flavors beautifully in curd rice, bisibelebath, and sweet pongal.',
    image: '/src/assets/images/organic_millets_grains_1790167801822.jpg',
    variants: [
      { size: '500 g', price: 68, originalPrice: 82, sku: 'GC-LIT-500G', stock: 45, unit: 'Pouch' },
      { size: '1 kg', price: 125, originalPrice: 155, sku: 'GC-LIT-1KG', stock: 65, unit: 'Pouch' },
      { size: '5 kg', price: 600, originalPrice: 750, sku: 'GC-LIT-5KG', stock: 12, unit: 'Bag' }
    ],
    extractionMethod: 'Abrasive-free traditional stone milling',
    smokePointOrBurning: 'Low GI with sustained glucose curve',
    shelfLife: '6 Months',
    keyBenefits: [
      'Abundant in Niacin, Riboflavin, and Thiamine',
      'Zero synthetic fertilizers or fumigants used during storage',
      'Perfect for quick 12-minute cooking'
    ],
    ingredients: ['100% Organic Little Millet (Panicum Sumatrense)'],
    rating: 4.8,
    reviewCount: 65,
    isFeatured: false,
    isBestSeller: false,
    certifications: ['FSSAI Certified', 'Chemical-Free'],
    fssaiNumber: '12421008000412'
  },
  {
    id: 'gc-karuppu-kavuni',
    name: 'Heritage Karuppu Kavuni Black Rice',
    tamilName: 'பாரம்பரிய கருப்பு கவுனி அரிசி',
    brand: 'Golden Crystal',
    category: 'grains-millets',
    categoryLabel: 'Organic Grains & Millets',
    shortDesc: 'The ancient emperor’s forbidden rice from Sathyam Food Products. Extraordinary Anthocyanin antioxidant count.',
    description: 'Revered as the longevity grain of kings, Karuppu Kavuni is naturally deep purple-black due to ultra-high Anthocyanin antioxidants (matching wild blueberries). Imparts a nutty bite and deep royal purple tint to sweet kheer, idlis, and porridge.',
    image: '/src/assets/images/organic_millets_grains_1790167801822.jpg',
    variants: [
      { size: '500 g', price: 110, originalPrice: 135, sku: 'GC-KAV-500G', stock: 35, unit: 'Pouch' },
      { size: '1 kg', price: 210, originalPrice: 260, sku: 'GC-KAV-1KG', stock: 55, unit: 'Pouch' },
      { size: '5 kg', price: 1020, originalPrice: 1250, sku: 'GC-KAV-5KG', stock: 10, unit: 'Bag' }
    ],
    extractionMethod: 'Unpolished heirloom grain retention',
    smokePointOrBurning: 'Extremely high antioxidant Oxygen Radical Absorbance Capacity (ORAC)',
    shelfLife: '12 Months',
    keyBenefits: [
      'Anthocyanin levels rivaling blueberries for cellular regeneration',
      'Assists metabolic detoxification and anti-inflammatory vitality',
      'Sustainably cultivated by organic farm clusters in Chettinad'
    ],
    ingredients: ['100% Heritage Black Rice (Oryza Sativa L. Indica)'],
    rating: 5.0,
    reviewCount: 142,
    isFeatured: true,
    isBestSeller: true,
    certifications: ['Heirloom Seed Verified', 'Lab Purity Tested', 'FSSAI Certified'],
    fssaiNumber: '12421008000412'
  },
  {
    id: 'gc-mappillai-samba',
    name: 'Traditional Mappillai Samba Red Rice',
    tamilName: 'மாப்பிள்ளை சம்பா பாரம்பரிய அரிசி',
    brand: 'Golden Crystal',
    category: 'grains-millets',
    categoryLabel: 'Organic Grains & Millets',
    shortDesc: 'The bridegroom’s rice of ancient Tamil Nadu. Legendary stamina, iron, and gut wellness grain.',
    description: 'Historically consumed by youth to lift the legendary Ilavatta Kal (stone of strength). High in zinc, iron, and fiber, Mappillai Samba strengthens the nervous system and repairs stomach ulcers.',
    image: '/src/assets/images/organic_millets_grains_1790167801822.jpg',
    variants: [
      { size: '1 kg', price: 145, originalPrice: 175, sku: 'GC-MAP-1KG', stock: 40, unit: 'Pouch' },
      { size: '5 kg', price: 690, originalPrice: 850, sku: 'GC-MAP-5KG', stock: 15, unit: 'Bag' }
    ],
    extractionMethod: 'Single-boiled traditional husk removal',
    smokePointOrBurning: 'Rich in dietary fiber and essential micronutrients',
    shelfLife: '9 Months',
    keyBenefits: [
      'Sustained natural physical stamina and endurance',
      'Natural remedy for healing internal gastrointestinal inflammation',
      'Zero chemical polish or paraffin wax glazing'
    ],
    ingredients: ['100% Unpolished Mappillai Samba Red Rice'],
    rating: 4.9,
    reviewCount: 91,
    isFeatured: false,
    isBestSeller: false,
    certifications: ['FSSAI Certified', 'Traditional Seedline'],
    fssaiNumber: '12421008000412'
  },

  // 4. KITCHEN ESSENTIALS & WELLNESS
  {
    id: 'gc-palm-jaggery',
    name: 'Pure Traditional Palm Jaggery (Karupatti)',
    tamilName: 'உடன்குடி பனை கருப்பட்டி',
    brand: 'Golden Crystal',
    category: 'kitchen-essentials',
    categoryLabel: 'Kitchen Essentials',
    shortDesc: 'Pure Udangudi palmyra palm sap simmered traditionally. Unbleached, calcium & iron rich sweetener.',
    description: 'Golden Crystal Palm Jaggery is produced without sodium hydrosulphite or chemical clarifiers. Hand-poured into coconut shells from authentic Udangudi palm sap. Natural alternative to refined white sugar.',
    image: '/src/assets/images/organic_millets_grains_1790167801822.jpg',
    variants: [
      { size: '500 g', price: 175, originalPrice: 210, sku: 'GC-JAG-500G', stock: 40, unit: 'Block' },
      { size: '1 kg', price: 340, originalPrice: 410, sku: 'GC-JAG-1KG', stock: 50, unit: 'Block' }
    ],
    extractionMethod: 'Traditional copper vat wood-fire evaporation',
    smokePointOrBurning: 'Natural low GI sweetener',
    shelfLife: '12 Months',
    keyBenefits: [
      'Superior natural source of bioavailable plant iron & calcium',
      'Zero chemical bleaching or artificial golden tint powders',
      'Essential for authentic sukku coffee, payasam, & tea'
    ],
    ingredients: ['100% Pure Palmyra Palm Neera (Padani)'],
    rating: 4.9,
    reviewCount: 110,
    isFeatured: true,
    isBestSeller: false,
    certifications: ['FSSAI Certified', '100% Natural Clarified'],
    fssaiNumber: '12421008000412'
  },
  {
    id: 'gc-pink-rock-salt',
    name: 'Unrefined Himalayan Pink Rock Salt Crystals',
    tamilName: 'இயற்கை இந்துப்பு படிகங்கள்',
    brand: 'Golden Crystal',
    category: 'kitchen-essentials',
    categoryLabel: 'Kitchen Essentials',
    shortDesc: 'Hand-mined ancient mineral rock salt with 84 trace electrolytes. Zero anti-caking additives.',
    description: 'Unbleached and unprocessed, Golden Crystal Pink Rock Salt provides genuine mineral nourishment with naturally occurring potassium, magnesium, and calcium.',
    image: '/src/assets/images/organic_millets_grains_1790167801822.jpg',
    variants: [
      { size: '1 kg (Granules)', price: 95, originalPrice: 120, sku: 'GC-SLT-1KG', stock: 65, unit: 'Pouch' },
      { size: '1 kg (Whole Crystals)', price: 105, originalPrice: 130, sku: 'GC-SLT-CRY-1KG', stock: 35, unit: 'Pouch' }
    ],
    extractionMethod: 'Hand-selected & gently crushed mineral crystals',
    smokePointOrBurning: 'Natural mineral density',
    shelfLife: '36 Months',
    keyBenefits: [
      'Contains 84 essential trace minerals & electrolytes',
      'Free from chemical anti-caking agents like potassium ferrocyanide',
      'Mild balanced salinity for delicate seasoning'
    ],
    ingredients: ['100% Pure Mineral Pink Rock Salt'],
    rating: 4.8,
    reviewCount: 46,
    isFeatured: false,
    isBestSeller: false,
    certifications: ['FSSAI Approved', '100% Natural Raw'],
    fssaiNumber: '12421008000412'
  }
];
