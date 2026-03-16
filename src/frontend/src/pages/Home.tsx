import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Crown, Shield, Star, Truck, Zap } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useCart } from "../context/CartContext";
import { PRODUCTS } from "../data/products";

const HOME_CATEGORIES = [
  {
    name: "Tops",
    image: "/assets/generated/product-white-tee.dim_600x700.jpg",
    count: 4,
  },
  {
    name: "Bottoms",
    image: "/assets/generated/product-slim-chinos.dim_600x700.jpg",
    count: 4,
  },
  {
    name: "Outerwear",
    image: "/assets/generated/product-leather-bomber.dim_600x700.jpg",
    count: 3,
  },
  {
    name: "Suits",
    image: "/assets/generated/product-suit-charcoal.dim_600x700.jpg",
    count: 3,
  },
  {
    name: "Shoes",
    image: "/assets/generated/product-shoes-sneaker-white.dim_600x700.jpg",
    count: 4,
  },
  {
    name: "Essentials",
    image: "/assets/generated/product-leather-belt.dim_600x700.jpg",
    count: 2,
  },
];

const FEATURED = PRODUCTS.filter((p) => p.featured).slice(0, 4);

const YOUTH_IDS = [14, 15, 16, 17, 18, 21];
const YOUTH_PRODUCTS = PRODUCTS.filter((p) => YOUTH_IDS.includes(p.id));

const SUITS_FEATURED = PRODUCTS.filter(
  (p) => p.category === "Suits" && p.featured,
);
const SHOES_FEATURED = PRODUCTS.filter(
  (p) => p.category === "Shoes" && p.featured,
).slice(0, 4);

const STATS = [
  { value: 5800, suffix: "+", label: "Products Sold" },
  { value: 1200, suffix: "+", label: "5-Star Reviews" },
  { value: 48, suffix: "hr", label: "Express Delivery" },
];

const TESTIMONIALS = [
  {
    name: "Arjun Sharma",
    title: "Mumbai",
    rating: 5,
    quote:
      "1seven changed how I dress. The Leather Bomber is the best piece I've ever owned. People stop me everywhere I go.",
    avatar: "AS",
  },
  {
    name: "Vikram Patel",
    title: "Delhi",
    rating: 5,
    quote:
      "Quality is unmatched. The Essential White Tee has survived 50+ washes and still looks brand new. Worth every rupee.",
    avatar: "VP",
  },
  {
    name: "Rahul Mehta",
    title: "Bangalore",
    rating: 5,
    quote:
      "Fast delivery, premium packaging, and the Wool Overcoat is exceptional. 1seven is the only brand I trust.",
    avatar: "RM",
  },
];

const BRAND_PILLARS = [
  {
    icon: Crown,
    title: "Premium Quality",
    desc: "Only the finest fabrics and construction techniques.",
  },
  {
    icon: Shield,
    title: "Built to Last",
    desc: "Timeless silhouettes that outlast seasonal trends.",
  },
  {
    icon: Zap,
    title: "Urban Edge",
    desc: "Street culture meets refined tailoring.",
  },
  {
    icon: Truck,
    title: "Express Delivery",
    desc: "48-hour delivery across all major cities.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: {
    duration: 0.7,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  },
} as const;

function useCounter(end: number, duration = 2000, enabled = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration, enabled]);
  return count;
}

function StatCounter({
  value,
  suffix,
  label,
  delay = 0,
}: {
  value: number;
  suffix: string;
  label: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (inView && !started) {
      const t = setTimeout(() => setStarted(true), delay);
      return () => clearTimeout(t);
    }
  }, [inView, started, delay]);

  const count = useCounter(value, 1800, started);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: delay / 1000,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="text-center"
    >
      <p className="font-display font-bold text-4xl md:text-5xl text-foreground">
        {count.toLocaleString()}
        <span className="text-gold">{suffix}</span>
      </p>
      <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mt-2">
        {label}
      </p>
    </motion.div>
  );
}

function ProductCard({
  product,
  index,
}: { product: (typeof PRODUCTS)[0]; index: number }) {
  const { addItem, setIsOpen } = useCart();
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, "M");
    setIsOpen(true);
  };

  return (
    <motion.div
      key={product.id}
      data-ocid={`products.item.${index + 1}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() =>
        navigate({ to: "/products/$id", params: { id: String(product.id) } })
      }
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-card mb-4">
        <motion.img
          src={product.image}
          alt={product.name}
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <span className="absolute top-3 left-3 font-body text-[10px] tracking-widest uppercase bg-black/70 text-gold border border-gold/40 px-2.5 py-1 backdrop-blur-sm">
          40% OFF
        </span>
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
          transition={{ duration: 0.22 }}
          className="absolute inset-x-0 bottom-0 p-4"
        >
          <button
            type="button"
            data-ocid={`products.add_button.${index + 1}`}
            onClick={handleAdd}
            className="w-full bg-gold text-primary-foreground font-body font-semibold text-[11px] tracking-widest uppercase py-3 hover:bg-gold/90 transition-colors"
          >
            Quick Add
          </button>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />
      </div>
      <div>
        <p className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-1">
          {product.category}
        </p>
        <h3 className="font-body font-medium text-sm text-foreground group-hover:text-gold transition-colors duration-200">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mt-1.5">
          <p className="font-display font-semibold text-gold">
            ₹{product.price.toLocaleString()}
          </p>
          <p className="font-body text-xs text-muted-foreground line-through">
            ₹{product.originalPrice.toLocaleString()}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function YouthProductCard({
  product,
  index,
}: { product: (typeof PRODUCTS)[0]; index: number }) {
  const { addItem, setIsOpen } = useCart();
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, "M");
    setIsOpen(true);
  };

  return (
    <motion.div
      data-ocid={`youth.item.${index + 1}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.09,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() =>
        navigate({ to: "/products/$id", params: { id: String(product.id) } })
      }
    >
      <div className="relative aspect-[3/4] overflow-hidden mb-3 border border-white/8">
        <motion.img
          src={product.image}
          alt={product.name}
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
          transition={{ duration: 0.22 }}
          className="absolute inset-x-0 bottom-0 p-3"
        >
          <button
            type="button"
            data-ocid={`youth.add_button.${index + 1}`}
            onClick={handleAdd}
            className="w-full bg-gold text-primary-foreground font-body font-semibold text-[10px] tracking-widest uppercase py-2.5 hover:bg-gold/90 transition-colors"
          >
            Quick Add
          </button>
        </motion.div>
      </div>
      <div>
        <p className="font-body text-[10px] tracking-[0.3em] uppercase text-gold/60 mb-0.5">
          {product.category}
        </p>
        <h3 className="font-body font-medium text-sm text-white/90 group-hover:text-gold transition-colors duration-200">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <p className="font-display font-semibold text-gold text-sm">
            ₹{product.price.toLocaleString()}
          </p>
          <p className="font-body text-xs text-white/30 line-through">
            ₹{product.originalPrice.toLocaleString()}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function SuitShoeCard({
  product,
  index,
}: { product: (typeof PRODUCTS)[0]; index: number }) {
  const { addItem, setIsOpen } = useCart();
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, product.sizes[2] ?? product.sizes[0]);
    setIsOpen(true);
  };

  return (
    <motion.div
      data-ocid={`suits-shoes.item.${index + 1}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() =>
        navigate({ to: "/products/$id", params: { id: String(product.id) } })
      }
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-card mb-3">
        <motion.img
          src={product.image}
          alt={product.name}
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {product.badge && (
          <span className="absolute top-3 left-3 font-body text-[10px] tracking-widest uppercase bg-gold/90 text-primary-foreground px-2.5 py-1">
            {product.badge}
          </span>
        )}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
          transition={{ duration: 0.22 }}
          className="absolute inset-x-0 bottom-0 p-3"
        >
          <button
            type="button"
            data-ocid={`suits-shoes.add_button.${index + 1}`}
            onClick={handleAdd}
            className="w-full bg-gold text-primary-foreground font-body font-semibold text-[11px] tracking-widest uppercase py-3 hover:bg-gold/90 transition-colors"
          >
            Quick Add
          </button>
        </motion.div>
      </div>
      <div>
        <p className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-0.5">
          {product.category}
        </p>
        <h3 className="font-body font-medium text-sm text-foreground group-hover:text-gold transition-colors duration-200">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <p className="font-display font-semibold text-gold">
            ₹{product.price.toLocaleString()}
          </p>
          <p className="font-body text-xs text-muted-foreground line-through">
            ₹{product.originalPrice.toLocaleString()}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function Home() {
  const navigate = useNavigate();

  return (
    <main>
      {/* SITEWIDE SALE BANNER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        data-ocid="home.sale_banner"
        className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white py-3"
      >
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-center">
          <div className="flex items-center gap-3">
            <span className="text-yellow-300 text-lg font-black">🔥</span>
            <span className="font-black text-sm sm:text-base tracking-widest uppercase">
              SITEWIDE SALE — 40% OFF EVERYTHING
            </span>
            <span className="text-yellow-300 text-lg font-black">🔥</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-white/60 hidden sm:block">|</span>
            <span className="text-yellow-300 font-bold text-xs sm:text-sm tracking-wider">
              USE CODE: 1SEVEN40
            </span>
            <button
              type="button"
              data-ocid="home.sale_banner.primary_button"
              onClick={() =>
                navigate({ to: "/products", search: { category: undefined } })
              }
              className="bg-yellow-300 text-black font-black text-xs px-4 py-1.5 rounded-full tracking-widest uppercase hover:bg-yellow-200 transition-colors"
            >
              SHOP NOW
            </button>
          </div>
        </div>
      </motion.div>

      {/* HERO */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url('/assets/generated/hero-bg.dim_1920x1080.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-background" />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
            className="flex justify-center mb-10"
          >
            <div className="relative w-24 h-24 md:w-32 md:h-32">
              <div className="absolute inset-0 rounded-full bg-gold/15 blur-2xl" />
              <img
                src="/assets/generated/1seven-lion-logo-transparent.dim_400x400.png"
                alt="1seven lion"
                className="relative w-full h-full object-contain"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.75,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold" />
              <p className="font-body text-[11px] tracking-[0.55em] uppercase text-gold">
                Premium Men&apos;s Collection
              </p>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold" />
            </div>

            <h1
              className="font-display font-black leading-none text-foreground"
              style={{
                fontSize: "clamp(3.5rem, 15vw, 12rem)",
                letterSpacing: "0.1em",
              }}
            >
              DEFINE YOUR
            </h1>
            <h1
              className="font-display font-black leading-none text-gold"
              style={{
                fontSize: "clamp(3.5rem, 15vw, 12rem)",
                letterSpacing: "0.1em",
              }}
            >
              STANDARD
            </h1>
          </motion.div>

          {/* Wear the Crown tag */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.38,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex justify-center mt-7"
            data-ocid="hero.wear_the_crown_tag"
          >
            <div className="inline-flex items-center gap-2.5 border border-gold/60 bg-black/40 backdrop-blur-sm px-6 py-2.5">
              <Crown className="w-3.5 h-3.5 text-gold" />
              <span className="font-body font-semibold text-[11px] tracking-[0.4em] uppercase text-gold">
                Wear the Crown
              </span>
              <Crown className="w-3.5 h-3.5 text-gold" />
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
          >
            <Button
              data-ocid="hero.primary_button"
              onClick={() =>
                navigate({ to: "/products", search: { category: undefined } })
              }
              className="bg-gold text-primary-foreground hover:bg-gold/90 font-body font-semibold tracking-widest uppercase text-[11px] h-13 px-10 rounded-none shadow-gold transition-all duration-300"
            >
              Shop Now
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="border-white/30 text-foreground hover:border-gold hover:text-gold font-body font-medium tracking-widest uppercase text-[11px] h-13 px-10 rounded-none bg-transparent transition-all duration-300"
            >
              Our Story
            </Button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-body text-[10px] tracking-widest uppercase text-muted-foreground">
            Scroll
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-gold to-transparent" />
        </motion.div>
      </section>

      {/* STATS BAR */}
      <section className="py-16 bg-card border-y border-border">
        <div className="max-w-3xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-8 divide-x divide-border">
            {STATS.map((stat, i) => (
              <StatCounter
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                delay={i * 200}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-14">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-gold" />
            <p className="font-body text-[11px] tracking-[0.45em] uppercase text-gold">
              Explore
            </p>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-gold" />
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl">
            Shop by Category
          </h2>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {HOME_CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                to="/products"
                search={{ category: cat.name }}
                data-ocid="nav.shop_link"
                className="group relative block aspect-[3/4] overflow-hidden bg-card"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="font-body text-[10px] tracking-[0.3em] uppercase text-gold/80 mb-1">
                    {cat.count} Styles
                  </p>
                  <h3 className="font-display font-bold text-lg text-foreground">
                    {cat.name}
                  </h3>
                  <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="font-body text-[10px] text-gold tracking-wider">
                      Shop Now
                    </span>
                    <ArrowRight className="w-3 h-3 text-gold" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-24 px-4 max-w-7xl mx-auto border-t border-border">
        <motion.div {...fadeUp} className="text-center mb-14">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-gold" />
            <p className="font-body text-[11px] tracking-[0.45em] uppercase text-gold">
              Curated
            </p>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-gold" />
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl">
            Featured Collection
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
        <motion.div {...fadeUp} className="text-center mt-12">
          <Button
            type="button"
            onClick={() =>
              navigate({ to: "/products", search: { category: undefined } })
            }
            variant="outline"
            className="border-gold/50 text-gold hover:bg-gold hover:text-primary-foreground font-body font-medium tracking-widest uppercase text-[11px] h-12 px-10 rounded-none transition-all duration-300"
          >
            View All Products
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>
      </section>

      {/* YOUTH DROP SECTION */}
      <section
        className="relative py-24 overflow-hidden"
        data-ocid="youth.section"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, #0a0a0a 0%, #0f0d07 50%, #0a0a0a 100%)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 65%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <motion.div
            {...fadeUp}
            className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-10 bg-gradient-to-r from-transparent to-gold/60" />
                <span className="font-body text-[11px] tracking-[0.45em] uppercase text-gold/80">
                  New Drop
                </span>
              </div>
              <h2
                className="font-display font-black leading-none text-white"
                style={{
                  fontSize: "clamp(2.5rem, 7vw, 5rem)",
                  letterSpacing: "0.04em",
                }}
              >
                YOUTH DROP
              </h2>
              <p className="font-body text-sm text-white/40 mt-3 tracking-wide">
                Street Meets Style — Only at 1seven
              </p>
            </div>
            <Button
              type="button"
              data-ocid="youth.primary_button"
              onClick={() =>
                navigate({ to: "/products", search: { category: undefined } })
              }
              className="self-start md:self-auto border border-gold/50 bg-transparent text-gold hover:bg-gold hover:text-primary-foreground font-body font-semibold tracking-widest uppercase text-[11px] h-11 px-8 rounded-none transition-all duration-300"
            >
              Shop All
              <ArrowRight className="ml-2 w-3.5 h-3.5" />
            </Button>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {YOUTH_PRODUCTS.map((product, i) => (
              <YouthProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap gap-3 items-center justify-center"
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 border border-gold/70 bg-gold/10 text-gold font-body font-bold text-xs tracking-[0.35em] uppercase">
              <Crown className="w-3.5 h-3.5" />
              Wear the Crown
            </span>
            {["Starting at ₹599", "Street Ready", "Made for India"].map(
              (tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-white/10 text-white/40 font-body text-[10px] tracking-widest uppercase"
                >
                  {tag}
                </span>
              ),
            )}
          </motion.div>
        </div>
      </section>

      {/* SUITS & SHOES — NEW SECTION */}
      <section
        className="py-24 px-4 max-w-7xl mx-auto border-t border-border"
        data-ocid="suits-shoes.section"
      >
        {/* Section heading */}
        <motion.div {...fadeUp} className="text-center mb-14">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-gold" />
            <p className="font-body text-[11px] tracking-[0.45em] uppercase text-gold">
              Dress Sharp
            </p>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-gold" />
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl mb-3">
            Suits &amp; Shoes
          </h2>
          <p className="font-body text-muted-foreground text-sm max-w-xl mx-auto">
            Command every room. From tailored two-piece suits to premium leather
            shoes — complete your look from head to toe.
          </p>
        </motion.div>

        {/* Suits subsection */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-gold" />
              <h3 className="font-display font-bold text-xl tracking-wider uppercase">
                Suits &amp; Blazers
              </h3>
            </div>
            <button
              type="button"
              data-ocid="suits.primary_button"
              onClick={() =>
                navigate({ to: "/products", search: { category: "Suits" } })
              }
              className="flex items-center gap-1.5 font-body text-[11px] tracking-widest uppercase text-gold hover:text-gold/70 transition-colors"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SUITS_FEATURED.map((product, i) => (
              <SuitShoeCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>

        {/* Shoes subsection */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-gold" />
              <h3 className="font-display font-bold text-xl tracking-wider uppercase">
                Footwear
              </h3>
            </div>
            <button
              type="button"
              data-ocid="shoes.primary_button"
              onClick={() =>
                navigate({ to: "/products", search: { category: "Shoes" } })
              }
              className="flex items-center gap-1.5 font-body text-[11px] tracking-widest uppercase text-gold hover:text-gold/70 transition-colors"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SHOES_FEATURED.map((product, i) => (
              <SuitShoeCard
                key={product.id}
                product={product}
                index={SUITS_FEATURED.length + i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* EDITORIAL COLLECTIONS */}
      <section className="py-4 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="group relative overflow-hidden aspect-[4/3] bg-card cursor-pointer"
            onClick={() =>
              navigate({ to: "/products", search: { category: "Tops" } })
            }
          >
            <img
              src="/assets/generated/product-black-hoodie.dim_600x700.jpg"
              alt="The Essentials"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <p className="font-body text-[11px] tracking-[0.4em] uppercase text-gold mb-2">
                Collection 01
              </p>
              <h3
                className="font-display font-black text-foreground leading-none mb-4"
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 3rem)",
                  letterSpacing: "0.05em",
                }}
              >
                THE ESSENTIALS
              </h3>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <span className="font-body text-[11px] tracking-widest uppercase text-gold">
                  Explore Now
                </span>
                <ArrowRight className="w-4 h-4 text-gold" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative overflow-hidden aspect-[4/3] bg-card cursor-pointer"
            onClick={() =>
              navigate({ to: "/products", search: { category: "Outerwear" } })
            }
          >
            <img
              src="/assets/generated/product-wool-overcoat.dim_600x700.jpg"
              alt="Statement Pieces"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <p className="font-body text-[11px] tracking-[0.4em] uppercase text-gold mb-2">
                Collection 02
              </p>
              <h3
                className="font-display font-black text-foreground leading-none mb-4"
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 3rem)",
                  letterSpacing: "0.05em",
                }}
              >
                STATEMENT PIECES
              </h3>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <span className="font-body text-[11px] tracking-widest uppercase text-gold">
                  Explore Now
                </span>
                <ArrowRight className="w-4 h-4 text-gold" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="py-24 bg-card border-y border-border mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-gold" />
              <p className="font-body text-[11px] tracking-[0.45em] uppercase text-gold">
                Our Story
              </p>
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-6 leading-tight">
              Born from the <em className="text-gold not-italic">streets,</em>
              <br />
              built for the throne.
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-4">
              1seven was founded on a single conviction: that a man&apos;s
              clothing should speak before he does. Premium materials, precise
              cuts, and zero compromises on quality.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed mb-8">
              Every piece is crafted for the man who commands any room —
              boardroom, street, or beyond.
            </p>
            <Button
              type="button"
              onClick={() =>
                navigate({ to: "/products", search: { category: undefined } })
              }
              className="bg-gold text-primary-foreground hover:bg-gold/90 font-body font-semibold tracking-widest uppercase text-[11px] h-12 px-8 rounded-none shadow-gold transition-all duration-300"
            >
              Explore the Collection
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 gap-4"
          >
            {BRAND_PILLARS.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="p-5 bg-background border border-border hover:border-gold/40 transition-all duration-300 group"
              >
                <Icon className="w-5 h-5 text-gold mb-3 transition-transform duration-300 group-hover:scale-110" />
                <h4 className="font-body font-semibold text-sm text-foreground mb-1">
                  {title}
                </h4>
                <p className="font-body text-xs text-muted-foreground leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-14">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-gold" />
            <p className="font-body text-[11px] tracking-[0.45em] uppercase text-gold">
              Reviews
            </p>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-gold" />
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl">
            What They&apos;re Saying
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="bg-card border border-border p-6 hover:border-gold/30 transition-all duration-300"
            >
              <div className="flex gap-0.5 mb-4">
                {[1, 2, 3, 4, 5].slice(0, t.rating).map((si) => (
                  <Star
                    key={`star-${si}`}
                    className="w-3.5 h-3.5 fill-gold text-gold"
                  />
                ))}
              </div>
              <p className="font-body text-sm text-foreground/80 leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0">
                  <span className="font-body font-bold text-gold text-[10px]">
                    {t.avatar}
                  </span>
                </div>
                <div>
                  <p className="font-body font-semibold text-sm text-foreground">
                    {t.name}
                  </p>
                  <p className="font-body text-xs text-muted-foreground">
                    {t.title}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-24 px-4">
        <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center">
          <div className="border border-gold/25 p-12 md:p-20 bg-card">
            <img
              src="/assets/generated/1seven-lion-logo-transparent.dim_400x400.png"
              alt=""
              aria-hidden="true"
              className="w-14 h-14 object-contain mx-auto mb-8 opacity-50"
            />
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
              Ready to wear the crown?
            </h2>
            <p className="font-body text-muted-foreground mb-8">
              Free delivery on orders over ₹4,999.
            </p>
            <Button
              type="button"
              onClick={() =>
                navigate({ to: "/products", search: { category: undefined } })
              }
              className="bg-gold text-primary-foreground hover:bg-gold/90 font-body font-semibold tracking-widest uppercase text-[11px] h-12 px-12 rounded-none shadow-gold transition-all duration-300"
            >
              Shop the Collection
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
