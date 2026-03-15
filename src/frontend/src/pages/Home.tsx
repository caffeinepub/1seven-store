import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Crown, Shield, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useCart } from "../context/CartContext";
import { PRODUCTS } from "../data/products";

const CATEGORIES = [
  {
    name: "Tops",
    image: "/assets/generated/product-white-tee.dim_600x700.jpg",
    count: 2,
  },
  {
    name: "Bottoms",
    image: "/assets/generated/product-slim-chinos.dim_600x700.jpg",
    count: 2,
  },
  {
    name: "Outerwear",
    image: "/assets/generated/product-leather-bomber.dim_600x700.jpg",
    count: 2,
  },
  {
    name: "Essentials",
    image: "/assets/generated/product-leather-belt.dim_600x700.jpg",
    count: 2,
  },
];

const FEATURED = PRODUCTS.filter((p) => p.featured);

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: {
    duration: 0.65,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  },
} as const;

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
    icon: Crown,
    title: "The Crown Ethos",
    desc: "Wear it with intention. Wear it with authority.",
  },
];

export function Home() {
  const navigate = useNavigate();
  const { addItem } = useCart();

  return (
    <main>
      {/* HERO */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url('/assets/generated/hero-bg.dim_1920x1080.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
        <div
          className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center mb-8"
          >
            <div className="relative w-28 h-28 md:w-36 md:h-36">
              <div className="absolute inset-0 rounded-full bg-gold/10 blur-2xl animate-pulse" />
              <img
                src="/assets/generated/1seven-lion-logo-transparent.dim_400x400.png"
                alt="1seven lion"
                className="relative w-full h-full object-contain drop-shadow-2xl"
              />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-black text-7xl md:text-[120px] lg:text-[160px] leading-none tracking-widest text-foreground"
            style={{ letterSpacing: "0.18em" }}
          >
            1SEVEN
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-body text-lg md:text-2xl font-light tracking-[0.5em] uppercase text-gold mt-4 mb-10"
          >
            Wear the Crown
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              data-ocid="hero.primary_button"
              onClick={() =>
                navigate({ to: "/products", search: { category: undefined } })
              }
              className="bg-gold text-primary-foreground hover:bg-gold/90 font-body font-semibold tracking-widest uppercase text-sm h-14 px-10 rounded-none shadow-gold transition-all duration-300 hover:shadow-gold hover:scale-[1.02]"
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
              className="border-foreground/30 text-foreground hover:border-gold hover:text-gold font-body font-medium tracking-widest uppercase text-sm h-14 px-10 rounded-none bg-transparent transition-all duration-300"
            >
              Our Story
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-body text-xs tracking-widest uppercase text-muted-foreground">
            Scroll
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent" />
        </motion.div>
      </section>

      {/* CATEGORIES */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-14">
          <p className="font-body text-xs tracking-[0.4em] uppercase text-gold mb-3">
            Explore
          </p>
          <h2 className="font-display font-bold text-4xl md:text-5xl">
            Shop by Category
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                to="/products"
                search={{ category: cat.name }}
                className="group relative block aspect-[3/4] overflow-hidden rounded-sm bg-card"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="font-body text-xs tracking-widest uppercase text-gold mb-1">
                    {cat.count} Styles
                  </p>
                  <h3 className="font-display font-bold text-xl text-foreground">
                    {cat.name}
                  </h3>
                  <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="font-body text-xs text-muted-foreground tracking-wider">
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
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-14">
          <p className="font-body text-xs tracking-[0.4em] uppercase text-gold mb-3">
            Curated
          </p>
          <h2 className="font-display font-bold text-4xl md:text-5xl">
            Featured Collection
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED.map((product, i) => (
            <motion.div
              key={product.id}
              data-ocid={`product.item.${i + 1}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.55,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group"
            >
              <Link
                to="/products/$id"
                params={{ id: String(product.id) }}
                className="block"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-card rounded-sm mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {product.badge && (
                    <Badge className="absolute top-3 left-3 bg-gold text-primary-foreground font-body text-xs tracking-wider rounded-none border-0 px-2">
                      {product.badge}
                    </Badge>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
                <div>
                  <p className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-1">
                    {product.category}
                  </p>
                  <h3 className="font-body font-medium text-foreground group-hover:text-gold transition-colors duration-200">
                    {product.name}
                  </h3>
                  <p className="font-display font-semibold text-gold mt-1">
                    ${product.price}
                  </p>
                </div>
              </Link>
              <button
                type="button"
                onClick={() => addItem(product, "M")}
                className="mt-3 w-full border border-border text-muted-foreground hover:border-gold hover:text-gold font-body text-xs tracking-widest uppercase py-2.5 transition-all duration-200"
              >
                Quick Add
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp} className="text-center mt-12">
          <Button
            type="button"
            onClick={() =>
              navigate({ to: "/products", search: { category: undefined } })
            }
            variant="outline"
            className="border-gold text-gold hover:bg-gold hover:text-primary-foreground font-body font-medium tracking-widest uppercase text-sm h-12 px-10 rounded-none transition-all duration-300"
          >
            View All Products
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-body text-xs tracking-[0.4em] uppercase text-gold mb-4">
              Our Story
            </p>
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-6 leading-tight">
              Born from the
              <br />
              <em className="text-gold not-italic">streets,</em> built
              <br />
              for the throne.
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-4">
              1seven was founded on a single conviction: that a man's clothing
              should speak before he does. Premium materials, precise cuts, and
              zero compromises on quality.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed mb-8">
              Every piece in our collection is crafted for the man who commands
              any room — boardroom, street, or beyond. We call it quiet
              authority. You call it your wardrobe.
            </p>
            <Button
              type="button"
              onClick={() =>
                navigate({ to: "/products", search: { category: undefined } })
              }
              className="bg-gold text-primary-foreground hover:bg-gold/90 font-body font-semibold tracking-widest uppercase text-sm h-12 px-8 rounded-none shadow-gold transition-all duration-300"
            >
              Explore the Collection
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 gap-4"
          >
            {BRAND_PILLARS.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="p-5 bg-background border border-border hover:border-gold/50 transition-colors duration-300 rounded-sm"
              >
                <Icon className="w-6 h-6 text-gold mb-3" />
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

      {/* CTA Banner */}
      <section className="py-24 px-4">
        <motion.div {...fadeUp} className="max-w-4xl mx-auto text-center">
          <div className="relative border border-gold/30 p-12 md:p-20 bg-card overflow-hidden">
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-gold/5 blur-3xl pointer-events-none" />
            <img
              src="/assets/generated/1seven-lion-logo-transparent.dim_400x400.png"
              alt=""
              aria-hidden="true"
              className="w-16 h-16 object-contain mx-auto mb-6 opacity-60"
            />
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-4">
              Ready to wear the crown?
            </h2>
            <p className="font-body text-muted-foreground mb-8 text-lg">
              Explore the full 1seven collection.
            </p>
            <Button
              type="button"
              onClick={() =>
                navigate({ to: "/products", search: { category: undefined } })
              }
              className="bg-gold text-primary-foreground hover:bg-gold/90 font-body font-semibold tracking-widest uppercase text-sm h-14 px-12 rounded-none shadow-gold transition-all duration-300 hover:scale-[1.02]"
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
