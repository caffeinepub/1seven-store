export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  sizes: string[];
  featured: boolean;
  badge?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Essential White Tee",
    category: "Tops",
    price: 45,
    description:
      "Our flagship Essential Tee is crafted from 220gsm Supima cotton. Ultra-soft, structured collar, reinforced stitching. Designed to wear alone or layered \u2014 a foundational piece for the modern man.",
    image: "/assets/generated/product-white-tee.dim_600x700.jpg",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    featured: true,
    badge: "Bestseller",
  },
  {
    id: 2,
    name: "Premium Black Hoodie",
    category: "Tops",
    price: 120,
    description:
      "Heavyweight 400gsm French terry fleece. Dropped shoulder silhouette, dual front pockets, ribbed cuffs and hem. This hoodie is built to outlast trends and weather seasons.",
    image: "/assets/generated/product-black-hoodie.dim_600x700.jpg",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    featured: true,
    badge: "New",
  },
  {
    id: 3,
    name: "Slim Fit Chinos",
    category: "Bottoms",
    price: 85,
    description:
      "Italian stretch cotton blend with a slim tapered cut. These chinos move with you through the day \u2014 from boardroom to bar \u2014 without losing their sharp silhouette.",
    image: "/assets/generated/product-slim-chinos.dim_600x700.jpg",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    featured: true,
  },
  {
    id: 4,
    name: "Cargo Pants",
    category: "Bottoms",
    price: 95,
    description:
      "Urban utility meets refined tailoring. Six-pocket cargo cut in a durable ripstop fabric. The kind of pants that look intentional, not accidental.",
    image: "/assets/generated/product-cargo-pants.dim_600x700.jpg",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    featured: true,
    badge: "Limited",
  },
  {
    id: 5,
    name: "Leather Bomber Jacket",
    category: "Outerwear",
    price: 280,
    description:
      "Full-grain cognac leather, YKK zipper, satin lining. A legacy piece \u2014 worn once, remembered forever. The Leather Bomber is the cornerstone of any serious wardrobe.",
    image: "/assets/generated/product-leather-bomber.dim_600x700.jpg",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    featured: true,
    badge: "Signature",
  },
  {
    id: 6,
    name: "Wool Overcoat",
    category: "Outerwear",
    price: 320,
    description:
      "80% merino wool, single-breasted, peak lapel. Long silhouette that commands presence. This overcoat transforms any outfit into a statement and keeps you warm without compromise.",
    image: "/assets/generated/product-wool-overcoat.dim_600x700.jpg",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    featured: false,
    badge: "Luxury",
  },
  {
    id: 7,
    name: "Leather Belt",
    category: "Essentials",
    price: 55,
    description:
      "Full-grain black leather with a precision-milled brass buckle. 35mm width. The belt that holds everything together \u2014 literally and aesthetically.",
    image: "/assets/generated/product-leather-belt.dim_600x700.jpg",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    featured: false,
  },
  {
    id: 8,
    name: "Canvas Tote Bag",
    category: "Essentials",
    price: 65,
    description:
      "18oz waxed canvas with leather handles and brass rivets. Fits a 15-inch laptop, gym clothes, and weekend essentials. Built for the man who moves with purpose.",
    image: "/assets/generated/product-canvas-tote.dim_600x700.jpg",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    featured: false,
  },
];

export const CATEGORIES = ["All", "Tops", "Bottoms", "Outerwear", "Essentials"];
