const products = [
  {
    id: 1,
    name: "iPhone 17 Pro",
    description:
      "Premium smartphone with a powerful processor and advanced camera system.",
    price: 2500000,
    category: "Smartphones",
    image: "https://picsum.photos/seed/iphone-17-pro/600/600",
  },
  {
    id: 2,
    name: "Samsung Galaxy S25 Ultra",
    description:
      "Flagship Android smartphone with an impressive display and camera.",
    price: 3200000,
    category: "Smartphones",
    image: "https://picsum.photos/seed/galaxy-s25-ultra/600/600",
  },
  {
    id: 3,
    name: "Google Pixel 10",
    description:
      "Smartphone with clean Android software and an excellent camera.",
    price: 2100000,
    category: "Smartphones",
    image: "https://picsum.photos/seed/pixel-10/600/600",
  },
  {
    id: 4,
    name: "OnePlus 13",
    description: "High-performance smartphone with a smooth AMOLED display.",
    price: 1850000,
    category: "Smartphones",
    image: "https://picsum.photos/seed/oneplus-13/600/600",
  },
  {
    id: 5,
    name: "Xiaomi 15 Pro",
    description:
      "Powerful smartphone combining performance, battery life, and style.",
    price: 1750000,
    category: "Smartphones",
    image: "https://picsum.photos/seed/xiaomi-15-pro/600/600",
  },
  {
    id: 6,
    name: "MacBook Pro 14",
    description:
      "Professional laptop designed for development, creativity, and productivity.",
    price: 4800000,
    category: "Laptops",
    image: "https://picsum.photos/seed/macbook-pro-14/600/600",
  },
  {
    id: 7,
    name: "Dell XPS 15",
    description:
      "Premium Windows laptop with a powerful processor and beautiful display.",
    price: 3900000,
    category: "Laptops",
    image: "https://picsum.photos/seed/dell-xps-15/600/600",
  },
  {
    id: 8,
    name: "HP Spectre x360",
    description:
      "Convertible premium laptop with a flexible touchscreen design.",
    price: 3500000,
    category: "Laptops",
    image: "https://picsum.photos/seed/hp-spectre-x360/600/600",
  },
  {
    id: 9,
    name: "Lenovo ThinkPad X1 Carbon",
    description:
      "Lightweight business laptop with excellent keyboard and durability.",
    price: 3300000,
    category: "Laptops",
    image: "https://picsum.photos/seed/thinkpad-x1/600/600",
  },
  {
    id: 10,
    name: "ASUS ROG Strix G16",
    description:
      "Gaming laptop built for demanding games and high-performance workloads.",
    price: 4200000,
    category: "Gaming",
    image: "https://picsum.photos/seed/rog-strix-g16/600/600",
  },
  {
    id: 11,
    name: "iPad Pro 13",
    description:
      "Large premium tablet for creativity, entertainment, and productivity.",
    price: 2800000,
    category: "Tablets",
    image: "https://picsum.photos/seed/ipad-pro/600/600",
  },
  {
    id: 12,
    name: "Samsung Galaxy Tab S10",
    description:
      "Premium Android tablet with a vivid display and powerful hardware.",
    price: 1900000,
    category: "Tablets",
    image: "https://picsum.photos/seed/galaxy-tab-s10/600/600",
  },
  {
    id: 13,
    name: "Xiaomi Pad 7",
    description:
      "Affordable tablet with a sharp display and strong performance.",
    price: 950000,
    category: "Tablets",
    image: "https://picsum.photos/seed/xiaomi-pad-7/600/600",
  },
  {
    id: 14,
    name: "Apple Watch Series 11",
    description:
      "Modern smartwatch with fitness tracking and smart notifications.",
    price: 1100000,
    category: "Smartwatches",
    image: "https://picsum.photos/seed/apple-watch/600/600",
  },
  {
    id: 15,
    name: "Samsung Galaxy Watch 8",
    description:
      "Stylish smartwatch with health, fitness, and connectivity features.",
    price: 850000,
    category: "Smartwatches",
    image: "https://picsum.photos/seed/galaxy-watch/600/600",
  },
  {
    id: 16,
    name: "Sony WH-1000XM6",
    description:
      "Premium wireless headphones with advanced noise cancellation.",
    price: 950000,
    category: "Audio",
    image: "https://picsum.photos/seed/sony-xm6/600/600",
  },
  {
    id: 17,
    name: "AirPods Pro 3",
    description:
      "Wireless earbuds with immersive sound and active noise cancellation.",
    price: 750000,
    category: "Audio",
    image: "https://picsum.photos/seed/airpods-pro/600/600",
  },
  {
    id: 18,
    name: "JBL Charge 6",
    description:
      "Portable Bluetooth speaker with powerful sound and long battery life.",
    price: 420000,
    category: "Audio",
    image: "https://picsum.photos/seed/jbl-charge/600/600",
  },
  {
    id: 19,
    name: "Sony WH-CH720N",
    description: "Comfortable wireless headphones with noise cancellation.",
    price: 350000,
    category: "Audio",
    image: "https://picsum.photos/seed/sony-ch720n/600/600",
  },
  {
    id: 20,
    name: "JBL Tune Buds",
    description: "Compact wireless earbuds designed for everyday listening.",
    price: 180000,
    category: "Audio",
    image: "https://picsum.photos/seed/jbl-tune-buds/600/600",
  },
  {
    id: 21,
    name: "PlayStation 5 Slim",
    description:
      "Compact next-generation gaming console with fast SSD storage.",
    price: 1650000,
    category: "Gaming",
    image: "https://picsum.photos/seed/ps5-slim/600/600",
  },
  {
    id: 22,
    name: "Xbox Series X",
    description: "Powerful gaming console designed for high-resolution gaming.",
    price: 1750000,
    category: "Gaming",
    image: "https://picsum.photos/seed/xbox-series-x/600/600",
  },
  {
    id: 23,
    name: "Nintendo Switch 2",
    description:
      "Versatile gaming console for handheld and home entertainment.",
    price: 1450000,
    category: "Gaming",
    image: "https://picsum.photos/seed/nintendo-switch-2/600/600",
  },
  {
    id: 24,
    name: "PlayStation DualSense Controller",
    description:
      "Wireless controller with immersive haptic feedback and adaptive triggers.",
    price: 220000,
    category: "Gaming",
    image: "https://picsum.photos/seed/dualsense/600/600",
  },
  {
    id: 25,
    name: "Logitech G Pro X Superlight",
    description:
      "Lightweight wireless gaming mouse designed for competitive gaming.",
    price: 350000,
    category: "Gaming",
    image: "https://picsum.photos/seed/g-pro-mouse/600/600",
  },
  {
    id: 26,
    name: "Nike Air Max 270",
    description: "Comfortable lifestyle sneakers with modern cushioning.",
    price: 320000,
    category: "Fashion",
    image: "https://picsum.photos/seed/nike-air-max/600/600",
  },
  {
    id: 27,
    name: "Adidas Ultraboost",
    description: "Performance running shoes with responsive cushioning.",
    price: 380000,
    category: "Fashion",
    image: "https://picsum.photos/seed/adidas-ultraboost/600/600",
  },
  {
    id: 28,
    name: "Puma RS-X",
    description: "Stylish everyday sneakers with a bold modern design.",
    price: 280000,
    category: "Fashion",
    image: "https://picsum.photos/seed/puma-rsx/600/600",
  },
  {
    id: 29,
    name: "Levi's 501 Jeans",
    description: "Classic denim jeans with a timeless straight-leg fit.",
    price: 180000,
    category: "Fashion",
    image: "https://picsum.photos/seed/levis-501/600/600",
  },
  {
    id: 30,
    name: "Classic Leather Backpack",
    description:
      "Durable backpack suitable for work, school, and everyday travel.",
    price: 150000,
    category: "Fashion",
    image: "https://picsum.photos/seed/leather-backpack/600/600",
  },
  {
    id: 31,
    name: "Canon EOS R50",
    description:
      "Compact mirrorless camera for photography and content creation.",
    price: 2100000,
    category: "Cameras",
    image: "https://picsum.photos/seed/canon-r50/600/600",
  },
  {
    id: 32,
    name: "Sony Alpha A6700",
    description:
      "Advanced mirrorless camera with excellent autofocus and video features.",
    price: 3500000,
    category: "Cameras",
    image: "https://picsum.photos/seed/sony-a6700/600/600",
  },
  {
    id: 33,
    name: "GoPro HERO 13",
    description:
      "Rugged action camera built for outdoor adventures and travel.",
    price: 1200000,
    category: "Cameras",
    image: "https://picsum.photos/seed/gopro-hero13/600/600",
  },
  {
    id: 34,
    name: "DJI Mini 4 Pro",
    description:
      "Compact camera drone with advanced flight and video capabilities.",
    price: 2800000,
    category: "Cameras",
    image: "https://picsum.photos/seed/dji-mini-4-pro/600/600",
  },
  {
    id: 35,
    name: "Canon RF 50mm Lens",
    description:
      "Compact prime lens ideal for portraits and everyday photography.",
    price: 850000,
    category: "Cameras",
    image: "https://picsum.photos/seed/canon-50mm/600/600",
  },
  {
    id: 36,
    name: "Anker PowerCore 20K",
    description:
      "High-capacity portable power bank for charging devices on the go.",
    price: 120000,
    category: "Accessories",
    image: "https://picsum.photos/seed/anker-powerbank/600/600",
  },
  {
    id: 37,
    name: "UGREEN 100W Charger",
    description:
      "Fast USB-C charger designed for phones, tablets, and laptops.",
    price: 180000,
    category: "Accessories",
    image: "https://picsum.photos/seed/ugreen-charger/600/600",
  },
  {
    id: 38,
    name: "USB-C Hub 8-in-1",
    description: "Multi-port USB-C hub for expanding laptop connectivity.",
    price: 140000,
    category: "Accessories",
    image: "https://picsum.photos/seed/usb-c-hub/600/600",
  },
  {
    id: 39,
    name: "Wireless Charging Pad",
    description:
      "Minimal wireless charger for compatible smartphones and earbuds.",
    price: 75000,
    category: "Accessories",
    image: "https://picsum.photos/seed/wireless-charger/600/600",
  },
  {
    id: 40,
    name: "Mechanical RGB Keyboard",
    description:
      "Responsive mechanical keyboard with customizable RGB lighting.",
    price: 250000,
    category: "Accessories",
    image: "https://picsum.photos/seed/mechanical-keyboard/600/600",
  },
  {
    id: 41,
    name: "Samsung 55-inch 4K TV",
    description:
      "Large 4K smart television with vivid colors and smart features.",
    price: 1800000,
    category: "Electronics",
    image: "https://picsum.photos/seed/samsung-55-tv/600/600",
  },
  {
    id: 42,
    name: "LG 50-inch 4K Smart TV",
    description: "Smart 4K television with a slim modern design.",
    price: 1500000,
    category: "Electronics",
    image: "https://picsum.photos/seed/lg-50-tv/600/600",
  },
  {
    id: 43,
    name: "Amazon Echo Dot",
    description: "Compact smart speaker with voice assistant functionality.",
    price: 180000,
    category: "Electronics",
    image: "https://picsum.photos/seed/echo-dot/600/600",
  },
  {
    id: 44,
    name: "Philips Air Fryer",
    description: "Convenient kitchen appliance for healthier fried meals.",
    price: 350000,
    category: "Home",
    image: "https://picsum.photos/seed/philips-air-fryer/600/600",
  },
  {
    id: 45,
    name: "Samsung Microwave Oven",
    description: "Compact microwave oven for quick and convenient cooking.",
    price: 420000,
    category: "Home",
    image: "https://picsum.photos/seed/samsung-microwave/600/600",
  },
  {
    id: 46,
    name: "Electric Coffee Maker",
    description: "Simple coffee maker designed for convenient home brewing.",
    price: 160000,
    category: "Home",
    image: "https://picsum.photos/seed/coffee-maker/600/600",
  },
  {
    id: 47,
    name: "Smart LED Desk Lamp",
    description: "Modern adjustable desk lamp with smart lighting controls.",
    price: 95000,
    category: "Home",
    image: "https://picsum.photos/seed/smart-desk-lamp/600/600",
  },
  {
    id: 48,
    name: "Ergonomic Office Chair",
    description: "Comfortable office chair designed for long working sessions.",
    price: 450000,
    category: "Furniture",
    image: "https://picsum.photos/seed/office-chair/600/600",
  },
  {
    id: 49,
    name: "Minimalist Computer Desk",
    description:
      "Modern desk with a clean design for home offices and gaming setups.",
    price: 380000,
    category: "Furniture",
    image: "https://picsum.photos/seed/computer-desk/600/600",
  },
  {
    id: 50,
    name: "Premium Travel Suitcase",
    description: "Durable lightweight suitcase designed for modern travelers.",
    price: 320000,
    category: "Travel",
    image: "https://picsum.photos/seed/travel-suitcase/600/600",
  },
];

export default products;
