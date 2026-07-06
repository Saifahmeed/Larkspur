/* ==========================================
   Larkspur - Central State Management
   ========================================== */

// --- Default Categories ---
export const CATEGORIES = [
  { id: 'electronics', name: 'Electronics', icon: 'cpu', count: 6, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80' },
  { id: 'fashion', name: 'Fashion', icon: 'shirt', count: 6, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80' },
  { id: 'home', name: 'Home Decor', icon: 'home', count: 6, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop&q=80' },
  { id: 'fitness', name: 'Fitness', icon: 'dumbbell', count: 6, image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80' }
];

// --- Promo Codes ---
export const PROMO_CODES = {
  'LARK20': { type: 'percent', value: 0.20, description: '20% off your entire order' },
  'WELCOME10': { type: 'percent', value: 0.10, description: '10% off for new customers' },
  'FREESHIP': { type: 'free_shipping', value: 0.00, description: 'Free shipping on any order' }
};

// --- High Quality Unsplash Images for Mock Data ---
const IMAGES = {
  // Electronics
  smartwatch: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format&fit=crop&q=80',
  earbuds: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=80',
  keyboard: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500&auto=format&fit=crop&q=80',
  mouse: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=80',
  headphones: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80',
  speaker: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=500&auto=format&fit=crop&q=80',
  
  // Fashion
  jacket: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop&q=80',
  watch: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80',
  backpack: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=80',
  sunglasses: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&auto=format&fit=crop&q=80',
  scarf: 'https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?w=500&auto=format&fit=crop&q=80',
  shoes: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=80',
  
  // Home Decor
  vase: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=500&auto=format&fit=crop&q=80',
  lamp: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&auto=format&fit=crop&q=80',
  candle: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=500&auto=format&fit=crop&q=80',
  blanket: 'https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?w=500&auto=format&fit=crop&q=80',
  art: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&auto=format&fit=crop&q=80',
  planter: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&auto=format&fit=crop&q=80',
  
  // Fitness
  yogamat: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&auto=format&fit=crop&q=80',
  dumbbell: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop&q=80',
  waterbottle: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop&q=80',
  bands: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop&q=80', // using related gym pic
  roller: 'https://images.unsplash.com/photo-1600881333168-2ef49b341f30?w=500&auto=format&fit=crop&q=80',
  gymbag: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=80' // bag related
};

// --- Default Reviews Helper (3+ comprehensive comments per item) ---
const defaultReviewsFor = (productName) => [
  { id: 'r1', author: 'Liam Vance', rating: 5, comment: `This ${productName} is absolutely stellar. Exceeded my high expectations for design and performance. The craftsmanship is immediately apparent the moment you unbox it.`, date: '2026-06-28T14:32:00Z' },
  { id: 'r2', author: 'Sophia Gray', rating: 4, comment: 'Very premium build and materials. Feels robust in hand. Packaging was super sleek and eco-friendly. Shipping was lightning fast. Will buy again!', date: '2026-07-02T09:15:00Z' },
  { id: 'r3', author: 'Noah Patel', rating: 5, comment: `I've been searching for a ${productName} for months and this exceeded every expectation. The attention to detail is remarkable and customer service was helpful when I had questions.`, date: '2026-07-04T16:20:00Z' }
];

// --- Default 24 Products ---
const DEFAULT_PRODUCTS = [
  // Electronics (6)
  {
    id: 'e1',
    brand: 'AeroSync',
    name: 'AeroSync Active Smartwatch',
    price: 199.99,
    category: 'electronics',
    image: IMAGES.smartwatch,
    stock: 25,
    tag: 'Best Seller',
    description: 'Track your fitness, receive notifications, and express your style with the premium AeroSync Smartwatch. Built with an aerospace-grade aluminum casing and crystal-clear AMOLED display.',
    colors: ['#000000', '#4a5568', '#e2e8f0'],
    colorNames: ['Obsidian Black', 'Space Gray', 'Sleek Silver'],
    sizes: ['40mm', '44mm'],
    specs: { 'Brand': 'AeroSync', 'Display': '1.78" AMOLED', 'Battery Life': 'Up to 7 days', 'Water Resistance': '5ATM (50m)', 'Connectivity': 'Bluetooth 5.2, GPS' },
    reviewsList: [
      { id: 're1_1', author: 'Marcus Aurelius', rating: 5, comment: 'Phenomenal watch! The screen clarity is stunning and battery life is exactly 7 days. Tracking accuracy is top-tier.', date: '2026-07-01T18:30:00Z' },
      { id: 're1_2', author: 'Emma Stone', rating: 4, comment: 'Sleek design, looks beautiful on my wrist. The 40mm size is perfect. Notification response is fast.', date: '2026-07-03T11:45:00Z' },
      { id: 're1_3', author: 'Lucius Verus', rating: 5, comment: 'Amazing value for money. Best smart watch I have ever owned. High-contrast display makes outdoor viewing excellent.', date: '2026-07-04T12:00:00Z' }
    ]
  },
  {
    id: 'e2',
    name: 'SonicWave Pro Wireless Earbuds',
    price: 129.99,
    category: 'electronics',
    image: IMAGES.earbuds,
    stock: 40,
    tag: 'Popular',
    description: 'Immerse yourself in high-fidelity audio with active noise-canceling technology. The SonicWave Pro Earbuds offer crystal-clear calls and ergonomic secure fit for workouts.',
    colors: ['#ffffff', '#000000'],
    sizes: ['Standard'],
    specs: { 'Noise Cancelling': 'Active (ANC)', 'Battery Life': '6h (earbuds) + 24h (case)', 'Waterproof': 'IPX4', 'Driver Size': '10mm Dynamic' },
    reviewsList: defaultReviewsFor('SonicWave Pro Earbuds')
  },
  {
    id: 'e3',
    name: 'TactileKey Pro Mechanical Keyboard',
    price: 149.99,
    category: 'electronics',
    image: IMAGES.keyboard,
    stock: 12,
    tag: 'New',
    description: 'A minimalist 75% layout wireless mechanical keyboard featuring hot-swappable tactile switches, double-shot PBT keycaps, and customizable RGB backlighting.',
    colors: ['#1a202c', '#edf2f7'],
    sizes: ['Linear Switches', 'Tactile Switches'],
    specs: { 'Layout': '75% Compact', 'Switch Type': 'Gateron Brown (Tactile)', 'Battery': '4000mAh', 'Backlight': 'RGB' },
    reviewsList: defaultReviewsFor('TactileKey Pro Keyboard')
  },
  {
    id: 'e4',
    name: 'SwiftGlide Wireless Gaming Mouse',
    price: 79.99,
    category: 'electronics',
    image: IMAGES.mouse,
    stock: 30,
    tag: '',
    description: 'Ultra-lightweight gaming mouse weighing only 58g. Equipped with an optical 26K DPI sensor and optical switch buttons for zero latency clicks.',
    colors: ['#000000', '#ffffff'],
    sizes: ['Standard'],
    specs: { 'Sensor': '26,000 DPI Optical', 'Weight': '58 grams', 'Polling Rate': '1000Hz (up to 4000Hz)', 'Battery': 'Up to 80 hours' },
    reviewsList: defaultReviewsFor('SwiftGlide Gaming Mouse')
  },
  {
    id: 'e5',
    name: 'AuraSound ANC Headphones',
    price: 299.99,
    category: 'electronics',
    image: IMAGES.headphones,
    stock: 15,
    tag: 'Premium',
    description: 'Crafted with premium materials for maximum comfort during long listening sessions. Studio-grade sound quality combined with industry-leading hybrid active noise cancellation.',
    colors: ['#1a202c', '#cbd5e1', '#b7b4a7'],
    sizes: ['Standard'],
    specs: { 'Driver': '40mm Custom Bio-Cellulose', 'ANC Depth': '-40dB', 'Battery': 'Up to 45 hours', 'Codecs': 'AAC, LDAC, SBC' },
    reviewsList: [
      { id: 're5_1', author: 'Tony Stark', rating: 5, comment: 'Sound cancellation is superb. I wear it in my lab and it isolates external noise perfectly. Sound signature is balanced.', date: '2026-07-04T09:00:00Z' }
    ]
  },
  {
    id: 'e6',
    name: 'Lumina Smart Voice Speaker',
    price: 89.99,
    category: 'electronics',
    image: IMAGES.speaker,
    stock: 22,
    tag: '',
    description: 'A compact smart speaker filling your home with rich 360-degree audio. Features a sleek mesh fabric design and integrates with smart home appliances seamlessly.',
    colors: ['#f1f5f9', '#334155'],
    sizes: ['Standard'],
    specs: { 'Sound Output': '360° Omnidirectional', 'Smart Assist': 'Google / Alexa Compatible', 'Dimensions': '12cm x 12cm x 14cm', 'Weight': '650g' },
    reviewsList: defaultReviewsFor('Lumina Smart Speaker')
  },

  // Fashion (6)
  {
    id: 'f1',
    name: 'Vintage Biker Leather Jacket',
    price: 249.99,
    category: 'fashion',
    image: IMAGES.jacket,
    stock: 8,
    tag: 'Premium',
    description: 'Handcrafted from soft, full-grain sheepskin leather. This classic asymmetrical biker design gets better with age and features heavy-duty metallic zippers.',
    colors: ['#000000', '#2d1e18'],
    sizes: ['S', 'M', 'L', 'XL'],
    specs: { 'Material': '100% Genuine Full-grain Leather', 'Lining': '100% Satin Polyester', 'Hardware': 'YKK Metal Zippers', 'Fit': 'Regular Slim Fit' },
    reviewsList: [
      { id: 'rf1_1', author: 'Bruce Wayne', rating: 5, comment: 'Top shelf leather quality. Thick but remarkably flexible. Double stitching is immaculate. Fit runs slightly small.', date: '2026-06-30T22:15:00Z' }
    ]
  },
  {
    id: 'f2',
    name: 'Minimalist Horizon Wristwatch',
    price: 119.99,
    category: 'fashion',
    image: IMAGES.watch,
    stock: 18,
    tag: 'Best Seller',
    description: 'Clean, elegant, and timeless. Features a 38mm brushed steel casing, sapphire crystal face glass, and an interchangeable genuine Italian leather strap.',
    colors: ['#dfd6c8', '#000000'],
    sizes: ['38mm', '42mm'],
    specs: { 'Movement': 'Japanese Citizen Quartz', 'Glass': 'Scratch-resistant Sapphire', 'Case Material': '316L Stainless Steel', 'Waterproof': '3 ATM' },
    reviewsList: defaultReviewsFor('Horizon Wristwatch')
  },
  {
    id: 'f3',
    name: 'Rover Commuter Canvas Backpack',
    price: 69.99,
    category: 'fashion',
    image: IMAGES.backpack,
    stock: 25,
    tag: 'Popular',
    description: 'Made from heavy-duty water-resistant waxed canvas and detailed with top-grain leather straps. Includes a padded 15.6-inch laptop compartment and multiple utility pockets.',
    colors: ['#4b5320', '#1a202c', '#a1a1a1'],
    sizes: ['20L', '28L'],
    specs: { 'Material': '18oz Waxed Cotton Canvas', 'Laptop Pocket': 'Up to 16" MacBook Pro', 'Capacity': '22 Liters', 'Water Resistance': 'High' },
    reviewsList: defaultReviewsFor('Rover Canvas Backpack')
  },
  {
    id: 'f4',
    name: 'Apollo Polarized Acetate Sunglasses',
    price: 89.99,
    category: 'fashion',
    image: IMAGES.sunglasses,
    stock: 35,
    tag: '',
    description: 'Timeless square frame sunglasses made from lightweight hand-polished Italian acetate. Polarized lenses offer 100% UVA/UVB protection and reduce water/road glare.',
    colors: ['#5c4033', '#000000'],
    sizes: ['Standard'],
    specs: { 'Frame Material': 'Handmade Cellulose Acetate', 'Lenses': 'Polarized TAC', 'UV Protection': 'UV400', 'Gender': 'Unisex' },
    reviewsList: defaultReviewsFor('Apollo Sunglasses')
  },
  {
    id: 'f5',
    name: 'Soft Merino Wool Winter Scarf',
    price: 49.99,
    category: 'fashion',
    image: IMAGES.scarf,
    stock: 14,
    tag: '',
    description: 'Woven in Scotland from 100% fine Merino wool. Incredibly soft, warm, breathable, and naturally odor-resistant. Features classic fringed ends.',
    colors: ['#cbd5e1', '#1e293b', '#991b1b'],
    sizes: ['Standard (180x30cm)'],
    specs: { 'Material': '100% Merino Wool', 'Weave': 'Soft Twill Weave', 'Origin': 'Made in Scotland', 'Care': 'Dry Clean Recommended' },
    reviewsList: defaultReviewsFor('Merino Scarf')
  },
  {
    id: 'f6',
    name: 'Velocity Ultra Running Shoes',
    price: 139.99,
    category: 'fashion',
    image: IMAGES.shoes,
    stock: 20,
    tag: 'Best Seller',
    description: 'Designed for marathon comfort and street style. The Velocity running shoes feature a responsive nitrogen-infused foam midsole and breathable engineered mesh upper.',
    colors: ['#ef4444', '#000000', '#3b82f6'],
    sizes: ['8', '9', '10', '11'],
    specs: { 'Midsole': 'Nitro-Foam Cushioning', 'Upper': 'Engineered Mesh', 'Weight': '235g (Size 9)', 'Drop': '8mm' },
    reviewsList: defaultReviewsFor('Velocity Running Shoes')
  },

  // Home Decor (6)
  {
    id: 'h1',
    name: 'Nordic Ribbed Ceramic Vase',
    price: 34.99,
    category: 'home',
    image: IMAGES.vase,
    stock: 18,
    tag: '',
    description: 'Add geometric elegance to your shelves. This high-temperature fired ceramic vase features a hand-textured ribbed finish and a matte neutral beige color.',
    colors: ['#f5ebe0', '#d6ccc2'],
    sizes: ['Small (18cm)', 'Large (25cm)'],
    specs: { 'Material': 'Matt Glazed Ceramic', 'Finishing': 'Hand-grooved Ribs', 'Waterproof': 'Yes', 'Weight': '820g' },
    reviewsList: defaultReviewsFor('Ribbed Ceramic Vase')
  },
  {
    id: 'h2',
    name: 'Horizon Minimalist Desk Lamp',
    price: 79.99,
    category: 'home',
    image: IMAGES.lamp,
    stock: 15,
    tag: 'Popular',
    description: 'Sleek arching aluminum desk lamp featuring step-less dimming control and adjustable color temperatures (warm, natural, cool). Casts a flicker-free diffused light.',
    colors: ['#000000', '#e2e8f0'],
    sizes: ['Standard'],
    specs: { 'Material': 'Anodized Aluminum & Steel', 'Brightness': 'Max 650 Lumens', 'Power': '10W LED', 'Controls': 'Capacitive Touch Slider' },
    reviewsList: defaultReviewsFor('Horizon Desk Lamp')
  },
  {
    id: 'h3',
    name: 'Scented Soy Candle Premium Set',
    price: 29.99,
    category: 'home',
    image: IMAGES.candle,
    stock: 45,
    tag: 'Best Seller',
    description: 'Set of three hand-poured natural soy wax candles in amber glass jars. Fragrances include Lavender & Sage, Sandalwood & Amber, and Sweet Fig.',
    colors: ['#f59e0b'],
    sizes: ['Set of 3 (8oz each)'],
    specs: { 'Wax Type': '100% Natural Soy Wax', 'Wick': 'Organic Cotton Wick', 'Burn Time': '45 hours per candle', 'Fragrance Oil': '8% Premium Essential Oils' },
    reviewsList: defaultReviewsFor('Soy Candle Set')
  },
  {
    id: 'h4',
    name: 'Cozy Waffle Weave Throw Blanket',
    price: 45.00,
    category: 'home',
    image: IMAGES.blanket,
    stock: 25,
    tag: '',
    description: 'The perfect companion for your couch. Made of long-staple Turkish cotton in a heavy waffle texture, offering unparalleled softness and breathability year-round.',
    colors: ['#e2e8f0', '#708090', '#d8b4fe'],
    sizes: ['50" x 70"'],
    specs: { 'Material': '100% Turkish Cotton', 'Weave': 'Thermal Waffle Weave', 'Weight': '1.2 kg', 'Certificates': 'OEKO-TEX Standard 100' },
    reviewsList: defaultReviewsFor('Waffle Throw Blanket')
  },
  {
    id: 'h5',
    name: 'Abstract Textured Canvas Art',
    price: 119.99,
    category: 'home',
    image: IMAGES.art,
    stock: 6,
    tag: 'New',
    description: 'A hand-painted canvas art piece with raised plaster texturing. Features minimal beige, white, and charcoal sweeps. Stretched on a solid pine frame.',
    colors: ['#ffffff'],
    sizes: ['24" x 36"', '36" x 48"'],
    specs: { 'Medium': 'Acrylic Paint & Plaster on Canvas', 'Frame': 'Internal Natural Pine Frame', 'Style': 'Modern Abstract Minimalist', 'Installation': 'Heavy Duty Hanging Hooks Attached' },
    reviewsList: defaultReviewsFor('Abstract Canvas Art')
  },
  {
    id: 'h6',
    name: 'Terrazzo Self-Watering Planter',
    price: 24.99,
    category: 'home',
    image: IMAGES.planter,
    stock: 30,
    tag: '',
    description: 'Make plant care easy. This stylish terrazzo-patterned pot includes an integrated water reservoir and cotton wick system that waters plants automatically.',
    colors: ['#f1f5f9'],
    sizes: ['Medium (6")', 'Large (8")'],
    specs: { 'Material': 'Recycled Plastic & Composite Stone', 'Feature': 'Self-watering cotton wick', 'Reservoir capacity': '350ml', 'Drainage Hole': 'Yes' },
    reviewsList: defaultReviewsFor('Self-Watering Planter')
  },

  // Fitness (6)
  {
    id: 'fi1',
    name: 'EcoGrip Pro Alignment Yoga Mat',
    price: 59.99,
    category: 'fitness',
    image: IMAGES.yogamat,
    stock: 20,
    tag: 'Best Seller',
    description: 'Improve your postures with laser-engraved alignment lines. Made of eco-friendly, biodegradable natural tree rubber that offers sticky wet-grip performance.',
    colors: ['#4b5320', '#c084fc', '#0284c7'],
    sizes: ['4mm Thick', '6mm Thick'],
    specs: { 'Material': 'Organic Tree Rubber & PU Upper', 'Dimensions': '183cm x 68cm', 'Weight': '2.5 kg', 'Eco-friendly': '100% PVC and Toxin Free' },
    reviewsList: defaultReviewsFor('Alignment Yoga Mat')
  },
  {
    id: 'fi2',
    name: 'HexShield Dumbbell Weight Set',
    price: 189.99,
    category: 'fitness',
    image: IMAGES.dumbbell,
    stock: 10,
    tag: 'Popular',
    description: 'A complete rubber-encased hexagonal dumbbell set. Safe on floors, limits rolling, and features contoured ergonomic knurled chrome steel handles.',
    colors: ['#000000'],
    sizes: ['30 lbs Set', '50 lbs Set'],
    specs: { 'Core Material': 'Solid Cast Iron', 'Coating': 'Impact Resistant Low-odor Rubber', 'Handle': 'Solid Steel with Knurling', 'Included Weights': '2x 10lb, 2x 15lb, 2x 25lb' },
    reviewsList: defaultReviewsFor('Hex Dumbbell Set')
  },
  {
    id: 'fi3',
    name: 'HydroFlow Smart Temp Bottle',
    price: 39.99,
    category: 'fitness',
    image: IMAGES.waterbottle,
    stock: 40,
    tag: '',
    description: 'Keep drinks icy cold for 24 hours. The lid features an LCD touchscreen showing the current temperature and water intake reminders every 2 hours.',
    colors: ['#1e293b', '#db2777', '#0891b2'],
    sizes: ['20 oz (600ml)'],
    specs: { 'Material': 'Double-walled 18/8 Stainless Steel', 'Lid': 'LCD Touchscreen, USB Rechargeable', 'Battery Charge': 'Up to 30 days per charge', 'Insulation': 'Vacuum insulated' },
    reviewsList: defaultReviewsFor('Smart Temp Bottle')
  },
  {
    id: 'fi4',
    name: 'FlexBand Heavy Resistance Set',
    price: 19.99,
    category: 'fitness',
    image: IMAGES.bands,
    stock: 50,
    tag: '',
    description: 'Set of 5 natural latex loop bands with varying resistance levels (from X-Light to X-Heavy). Includes a carry bag and exercise guide.',
    colors: ['#e2e8f0'],
    sizes: ['Set of 5'],
    specs: { 'Material': '100% Eco-friendly Latex', 'Resistance Range': '5 lbs to 40 lbs', 'Band Length': '12 inches', 'Included Accessories': 'Mesh carry pouch, Workout guide' },
    reviewsList: defaultReviewsFor('Resistance Bands')
  },
  {
    id: 'fi5',
    name: 'Density Foam Roller Grid',
    price: 24.99,
    category: 'fitness',
    image: IMAGES.roller,
    stock: 25,
    tag: '',
    description: 'Features a multi-density grid pattern that mimics a massage therapist\'s hands. Perfect for muscle recovery, physical therapy, and warm-ups.',
    colors: ['#000000', '#10b981', '#f59e0b'],
    sizes: ['13" Length', '26" Length'],
    specs: { 'Material': 'High-density EVA foam / ABS core', 'Max Capacity': '500 lbs', 'Diameter': '5.5 inches', 'Weight': '680g' },
    reviewsList: defaultReviewsFor('Grid Foam Roller')
  },
  {
    id: 'fi6',
    name: 'Ventura Gym Duffle Bag',
    price: 49.99,
    category: 'fitness',
    image: IMAGES.gymbag,
    stock: 15,
    tag: 'Popular',
    description: 'A smart gym bag with a dedicated ventilated shoe compartment, dry/wet pockets, and a water bottle holder. Made from ripstop nylon.',
    colors: ['#1e293b', '#cbd5e1'],
    sizes: ['35L Capacity'],
    specs: { 'Material': '1000D Ripstop Ballistic Nylon', 'Shoe Compartment': 'Ventilated, holds up to US size 13', 'Zippers': 'Waterproof YKK', 'Dimensions': '50cm x 26cm x 26cm' },
    reviewsList: defaultReviewsFor('Gym duffle bag')
  }
];

// --- Default 5 Orders to Populate Dashboard Stats ---
const DEFAULT_ORDERS = [
  {
    id: 'ORD-8942',
    date: '2026-07-04T14:23:00Z',
    customer: { name: 'Sarah Connor', email: 'sarah.c@gmail.com', phone: '0101234567', address: '12 Ocean Drive, FL' },
    items: [
      { id: 'e1', name: 'AeroSync Active Smartwatch', price: 199.99, quantity: 2, color: '#000000', size: '44mm', image: IMAGES.smartwatch },
      { id: 'h3', name: 'Scented Soy Candle Premium Set', price: 29.99, quantity: 1, color: '#f59e0b', size: 'Set of 3 (8oz each)', image: IMAGES.candle }
    ],
    subtotal: 429.97,
    discount: 85.99, // 20%
    tax: 27.52,
    shipping: 0.00,
    total: 371.50,
    status: 'delivered',
    paymentMethod: 'Credit Card'
  },
  {
    id: 'ORD-8943',
    date: '2026-07-05T09:12:00Z',
    customer: { name: 'James Carter', email: 'james.carter@yahoo.com', phone: '0112345678', address: '45 Baker St, London' },
    items: [
      { id: 'f6', name: 'Velocity Ultra Running Shoes', price: 139.99, quantity: 1, color: '#ef4444', size: '10', image: IMAGES.shoes }
    ],
    subtotal: 139.99,
    discount: 0.00,
    tax: 11.20,
    shipping: 10.00,
    total: 161.19,
    status: 'shipped',
    paymentMethod: 'PayPal'
  },
  {
    id: 'ORD-8944',
    date: '2026-07-05T12:45:00Z',
    customer: { name: 'Lara Croft', email: 'lara.tomb@outlook.com', phone: '0123456789', address: 'Croft Manor, Surrey' },
    items: [
      { id: 'fi1', name: 'EcoGrip Pro Alignment Yoga Mat', price: 59.99, quantity: 1, color: '#4b5320', size: '6mm Thick', image: IMAGES.yogamat },
      { id: 'fi3', name: 'HydroFlow Smart Temp Bottle', price: 39.99, quantity: 1, color: '#1e293b', size: '20 oz (600ml)', image: IMAGES.waterbottle }
    ],
    subtotal: 99.98,
    discount: 0.00,
    tax: 8.00,
    shipping: 10.00,
    total: 117.98,
    status: 'processing',
    paymentMethod: 'Credit Card'
  },
  {
    id: 'ORD-8945',
    date: '2026-07-05T17:30:00Z',
    customer: { name: 'Tony Stark', email: 'tony@stark.industries', phone: '0159999999', address: '10880 Malibu Point, CA' },
    items: [
      { id: 'e5', name: 'AuraSound ANC Headphones', price: 299.99, quantity: 1, color: '#1a202c', size: 'Standard', image: IMAGES.headphones },
      { id: 'e3', name: 'TactileKey Pro Mechanical Keyboard', price: 149.99, quantity: 1, color: '#1a202c', size: 'Tactile Switches', image: IMAGES.keyboard }
    ],
    subtotal: 449.98,
    discount: 90.00, // LARK20 applied
    tax: 28.80,
    shipping: 0.00,
    total: 388.78,
    status: 'pending',
    paymentMethod: 'Credit Card'
  },
  {
    id: 'ORD-8946',
    date: '2026-07-05T19:00:00Z',
    customer: { name: 'Peter Parker', email: 'spidey@bugle.com', phone: '0100000002', address: '20 Ingram St, Queens, NY' },
    items: [
      { id: 'f3', name: 'Rover Commuter Canvas Backpack', price: 69.99, quantity: 1, color: '#1a202c', size: '20L', image: IMAGES.backpack }
    ],
    subtotal: 69.99,
    discount: 0.00,
    tax: 5.60,
    shipping: 10.00,
    total: 85.59,
    status: 'cancelled',
    paymentMethod: 'Cash on Delivery'
  }
];

// --- Central State Store ---
class GlobalStore {
  constructor() {
    this.state = {
      products: [],
      orders: [],
      cart: [],
      theme: 'light',
      isAdmin: false, // User mode by default
      activePage: 'home', // active route
      selectedProductId: null,
      searchQuery: '',
      // System Audit Log Feed
      logs: [],
      // User Profile details
      userProfile: {
        name: 'Guest Customer',
        email: 'customer@larkspur.co',
        phone: '01012345678',
        addresses: ['123 El-Tahrir Sq, Downtown, Cairo']
      }
    };
    
    this.init();
  }

  init() {
    // 1. Theme initialization
    const savedTheme = localStorage.getItem('vibe_theme');
    if (savedTheme) {
      this.state.theme = savedTheme;
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.state.theme = prefersDark ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', this.state.theme);

    // 2. Products initialization
    const savedProducts = localStorage.getItem('vibe_products');
    if (savedProducts) {
      this.state.products = JSON.parse(savedProducts);
    } else {
      this.state.products = [...DEFAULT_PRODUCTS];
      localStorage.setItem('vibe_products', JSON.stringify(this.state.products));
    }

    // 3. Orders initialization
    const savedOrders = localStorage.getItem('vibe_orders');
    if (savedOrders) {
      this.state.orders = JSON.parse(savedOrders);
    } else {
      this.state.orders = [...DEFAULT_ORDERS];
      localStorage.setItem('vibe_orders', JSON.stringify(this.state.orders));
    }

    // 4. Cart initialization
    const savedCart = localStorage.getItem('vibe_cart');
    if (savedCart) {
      this.state.cart = JSON.parse(savedCart);
    }

    // 5. User Profile initialization
    const savedProfile = localStorage.getItem('vibe_profile');
    if (savedProfile) {
      this.state.userProfile = JSON.parse(savedProfile);
    }

    // 6. ActivePage routing
    const hash = window.location.hash.substring(1);
    const validPages = ['home', 'catalog', 'cart', 'checkout', 'profile', 'dashboard'];
    if (hash && (validPages.includes(hash) || hash.startsWith('product-') || hash.startsWith('admin-'))) {
      this.state.activePage = hash;
    } else {
      this.state.activePage = 'home';
      window.location.hash = 'home';
    }

    // 7. Audit Logs initialization
    const savedLogs = localStorage.getItem('vibe_logs');
    if (savedLogs) {
      this.state.logs = JSON.parse(savedLogs);
    } else {
      // Seed a few initial log entries for dashboard realism
      this.state.logs = [
        { id: `log-${Date.now() - 600000}`, action: 'System initialized with 24 products and 5 orders.', type: 'system', timestamp: new Date(Date.now() - 600000).toISOString() },
        { id: `log-${Date.now() - 300000}`, action: 'Order ORD-8942 marked as delivered.', type: 'order', timestamp: new Date(Date.now() - 300000).toISOString() },
        { id: `log-${Date.now() - 120000}`, action: 'Admin updated inventory stock levels.', type: 'product', timestamp: new Date(Date.now() - 120000).toISOString() }
      ];
      localStorage.setItem('vibe_logs', JSON.stringify(this.state.logs));
    }
  }

  // --- Helper to notify components of updates ---
  notify() {
    // Save state variables
    localStorage.setItem('vibe_cart', JSON.stringify(this.state.cart));
    localStorage.setItem('vibe_products', JSON.stringify(this.state.products));
    localStorage.setItem('vibe_orders', JSON.stringify(this.state.orders));
    localStorage.setItem('vibe_profile', JSON.stringify(this.state.userProfile));
    localStorage.setItem('vibe_theme', this.state.theme);
    localStorage.setItem('vibe_logs', JSON.stringify(this.state.logs));
    
    // Dispatch custom event to trigger page rerender
    const event = new CustomEvent('store-changed', { detail: this.state });
    window.dispatchEvent(event);
  }

  // --- System Audit Log ---
  addLogEntry(action, type = 'system') {
    const entry = {
      id: `log-${Date.now()}`,
      action: action,
      type: type, // 'product' | 'order' | 'cart' | 'review' | 'system'
      timestamp: new Date().toISOString()
    };
    this.state.logs.unshift(entry);
    // Keep log feed capped to 50 entries to avoid bloat
    if (this.state.logs.length > 50) {
      this.state.logs = this.state.logs.slice(0, 50);
    }
    // Note: notify() is intentionally NOT called here to avoid double-render loops.
    // Callers should call notify() or rely on their own state update flow.
    return entry;
  }

  // --- Dynamic Bundle Builder Helpers ---
  
  // Recommend complementary products for a given product (different category, high stock, popular tags)
  getBundleRecommendations(productId, limit = 2) {
    const current = this.state.products.find(p => p.id === productId);
    if (!current) return [];

    // Prefer products from a different category that are popular/best-sellers
    const candidates = this.state.products.filter(p =>
      p.id !== productId &&
      p.category !== current.category &&
      p.stock > 0 &&
      (p.tag === 'Best Seller' || p.tag === 'Popular' || p.tag === 'Premium')
    );

    // Fallback: any in-stock product from a different category
    const fallback = this.state.products.filter(p =>
      p.id !== productId && p.category !== current.category && p.stock > 0
    );

    const pool = candidates.length >= limit ? candidates : fallback;
    return pool.slice(0, limit);
  }

  // Add multiple products to cart as a bundle (returns aggregate result)
  addBundleToCart(bundleItems) {
    // bundleItems: [{ id, quantity, color?, size? }, ...]
    const results = [];
    let allSuccess = true;

    bundleItems.forEach(item => {
      const res = this.addToCart(item.id, item.quantity || 1, item.color, item.size);
      results.push({ id: item.id, success: res && res.success !== false, msg: res && res.msg });
      if (!res || res.success === false) allSuccess = false;
    });

    this.addLogEntry(`Bundle of ${bundleItems.length} items added to cart.`, 'cart');
    this.notify();
    return { success: allSuccess, results };
  }

  // --- Navigation & Routing ---
  setPage(pageId) {
    this.state.activePage = pageId;
    window.location.hash = pageId;
    this.notify();
  }

  toggleTheme() {
    this.state.theme = this.state.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', this.state.theme);
    this.notify();
  }

  setAdminMode(isAdmin) {
    this.state.isAdmin = isAdmin;
    if (isAdmin) {
      this.setPage('dashboard');
    } else {
      this.setPage('home');
    }
    this.notify();
  }

  updateProfile(profileData) {
    this.state.userProfile = {
      ...this.state.userProfile,
      ...profileData
    };
    this.notify();
  }

  // --- Storefront Operations ---
  
  addToCart(productId, quantity = 1, color = null, size = null) {
    const product = this.state.products.find(p => p.id === productId);
    if (!product) return false;

    // Use default color and size if none selected
    const selectedColor = color || (product.colors && product.colors[0]) || 'Standard';
    const selectedSize = size || (product.sizes && product.sizes[0]) || 'Standard';

    // Check if item already exists in cart
    const existingIndex = this.state.cart.findIndex(
      item => item.id === productId && item.color === selectedColor && item.size === selectedSize
    );

    if (existingIndex > -1) {
      const newQuantity = this.state.cart[existingIndex].quantity + quantity;
      if (newQuantity > product.stock) {
        this.state.cart[existingIndex].quantity = product.stock;
        this.notify();
        return { success: false, msg: 'Out of stock limit' };
      }
      this.state.cart[existingIndex].quantity = newQuantity;
    } else {
      if (quantity > product.stock) {
        return { success: false, msg: 'Out of stock limit' };
      }
      this.state.cart.push({
        id: productId,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity: quantity,
        color: selectedColor,
        size: selectedSize
      });
    }

    this.addLogEntry(`Added ${quantity}x ${product.name} to cart.`, 'cart');
    this.notify();
    return { success: true, msg: 'Added to cart!' };
  }

  updateCartQuantity(productId, color, size, quantity) {
    const itemIndex = this.state.cart.findIndex(
      item => item.id === productId && item.color === color && item.size === size
    );
    if (itemIndex === -1) return;

    const product = this.state.products.find(p => p.id === productId);
    if (!product) return;

    if (quantity <= 0) {
      this.removeFromCart(productId, color, size);
      return;
    }

    if (quantity > product.stock) {
      this.state.cart[itemIndex].quantity = product.stock;
      this.notify();
      return;
    }

    this.state.cart[itemIndex].quantity = quantity;
    this.notify();
  }

  removeFromCart(productId, color, size) {
    const removed = this.state.cart.find(i => i.id === productId && i.color === color && i.size === size);
    this.state.cart = this.state.cart.filter(
      item => !(item.id === productId && item.color === color && item.size === size)
    );
    if (removed) this.addLogEntry(`Removed ${removed.name} from cart.`, 'cart');
    this.notify();
  }

  clearCart() {
    this.state.cart = [];
    this.notify();
  }

  placeOrder(customerInfo, paymentMethod = 'Credit Card', promoCode = '') {
    if (this.state.cart.length === 0) return null;

    let subtotal = this.state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Apply promo codes dictionary
    let discount = 0;
    let shipping = subtotal > 150 ? 0.00 : 10.00;
    
    const code = promoCode.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      const promo = PROMO_CODES[code];
      if (promo.type === 'percent') {
        discount = subtotal * promo.value;
      } else if (promo.type === 'free_shipping') {
        shipping = 0.00;
      }
    }

    const discountedSubtotal = subtotal - discount;
    const tax = discountedSubtotal * 0.08;
    const total = discountedSubtotal + tax + shipping;
    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder = {
      id: orderId,
      date: new Date().toISOString(),
      customer: {
        name: customerInfo.name,
        email: customerInfo.email,
        phone: customerInfo.phone,
        address: `${customerInfo.address}, ${customerInfo.city}, ${customerInfo.zip}`
      },
      items: [...this.state.cart],
      subtotal: parseFloat(subtotal.toFixed(2)),
      discount: parseFloat(discount.toFixed(2)),
      tax: parseFloat(tax.toFixed(2)),
      shipping: parseFloat(shipping.toFixed(2)),
      total: parseFloat(total.toFixed(2)),
      status: 'pending',
      paymentMethod: paymentMethod
    };

    // Deduct stock
    this.state.cart.forEach(cartItem => {
      const product = this.state.products.find(p => p.id === cartItem.id);
      if (product) {
        product.stock = Math.max(0, product.stock - cartItem.quantity);
      }
    });

    this.state.orders.unshift(newOrder);
    this.addLogEntry(`New order ${orderId} placed via ${paymentMethod} ($${total.toFixed(2)}).`, 'order');
    this.clearCart();
    this.notify();

    return newOrder;
  }

  // --- Add Product Review ---
  addProductReview(productId, author, rating, comment) {
    const product = this.state.products.find(p => p.id === productId);
    if (!product) return false;

    if (!product.reviewsList) {
      product.reviewsList = [];
    }

    const newReview = {
      id: `rev-${Date.now()}`,
      author: author || 'Anonymous',
      rating: parseInt(rating) || 5,
      comment: comment || '',
      date: new Date().toISOString()
    };

    product.reviewsList.unshift(newReview);
    this.notify();
    return true;
  }

  // --- Admin Operations (CRUD) ---
  
  addProduct(productData) {
    const id = `p${Date.now()}`;
    const newProduct = {
      id,
      name: productData.name,
      price: parseFloat(productData.price) || 0,
      category: productData.category || 'electronics',
      image: productData.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80',
      stock: parseInt(productData.stock) || 0,
      tag: productData.tag || '',
      description: productData.description || '',
      colors: productData.colors || ['#000000'],
      sizes: productData.sizes || ['Standard'],
      specs: productData.specs || {},
      reviewsList: []
    };

    this.state.products.push(newProduct);
    this.addLogEntry(`Admin published new product "${newProduct.name}".`, 'product');
    this.notify();
    return newProduct;
  }

  updateProduct(id, productData) {
    const index = this.state.products.findIndex(p => p.id === id);
    if (index === -1) return false;

    this.state.products[index] = {
      ...this.state.products[index],
      name: productData.name,
      price: parseFloat(productData.price) || 0,
      category: productData.category || 'electronics',
      image: productData.image || this.state.products[index].image,
      stock: parseInt(productData.stock) || 0,
      tag: productData.tag || '',
      description: productData.description || '',
      colors: productData.colors || this.state.products[index].colors,
      sizes: productData.sizes || this.state.products[index].sizes,
      specs: productData.specs || this.state.products[index].specs
    };

    this.addLogEntry(`Admin updated product "${this.state.products[index].name}".`, 'product');
    this.notify();
    return true;
  }

  deleteProduct(id) {
    const prod = this.state.products.find(p => p.id === id);
    this.state.products = this.state.products.filter(p => p.id !== id);
    if (prod) this.addLogEntry(`Admin deleted product "${prod.name}".`, 'product');
    this.notify();
    return true;
  }

  updateOrderStatus(orderId, status) {
    const index = this.state.orders.findIndex(o => o.id === orderId);
    if (index === -1) return false;

    this.state.orders[index].status = status;
    this.addLogEntry(`Order ${orderId} status updated to ${status}.`, 'order');
    this.notify();
    return true;
  }
}

export const store = new GlobalStore();
window.store = store;
