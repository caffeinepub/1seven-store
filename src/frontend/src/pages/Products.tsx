import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useSearch } from "@tanstack/react-router";
import { ShoppingBag, SlidersHorizontal, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";
import { CATEGORIES, PRODUCTS } from "../data/products";

export function Products() {
  const search = useSearch({ from: "/products" });
  const initialCategory = (search as { category?: string }).category ?? "All";

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState([0, 25000]);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const catMatch =
        activeCategory === "All" || p.category === activeCategory;
      const priceMatch = p.price >= priceRange[0] && p.price <= priceRange[1];
      return catMatch && priceMatch;
    });
  }, [activeCategory, priceRange]);

  return (
    <main className="pt-24 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="py-12 border-b border-border mb-10"
        >
          <p className="font-body text-xs tracking-[0.4em] uppercase text-gold mb-2">
            1seven
          </p>
          <h1 className="font-display font-bold text-4xl md:text-5xl">
            All Products
          </h1>
          <p className="font-body text-muted-foreground mt-3">
            {filtered.length} item{filtered.length !== 1 ? "s" : ""}
          </p>
        </motion.div>

        {/* Horizontal category tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              data-ocid="products.tab"
              onClick={() => setActiveCategory(cat)}
              className={`font-body text-xs tracking-widest uppercase px-5 py-2.5 border transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-gold text-primary-foreground border-gold"
                  : "border-border text-muted-foreground hover:border-gold/50 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex gap-10">
          {/* Sidebar (desktop) */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <FilterPanel
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
            />
          </aside>

          {/* Mobile filter toggle */}
          <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
            <Button
              type="button"
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="bg-gold text-primary-foreground font-body font-semibold tracking-widest uppercase text-xs h-11 px-6 rounded-full shadow-gold"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Mobile filter drawer */}
          <AnimatePresence>
            {mobileFilterOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              >
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                  className="absolute bottom-0 left-0 right-0 bg-card border-t border-border rounded-t-2xl p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-body font-semibold tracking-wider uppercase text-sm">
                      Filters
                    </h3>
                    <button
                      type="button"
                      onClick={() => setMobileFilterOpen(false)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <FilterPanel
                    activeCategory={activeCategory}
                    setActiveCategory={(c) => {
                      setActiveCategory(c);
                      setMobileFilterOpen(false);
                    }}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Products grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div
                data-ocid="products.empty_state"
                className="flex flex-col items-center justify-center py-24 text-muted-foreground"
              >
                <p className="font-body text-sm tracking-wider">
                  No products found
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory("All");
                    setPriceRange([0, 25000]);
                  }}
                  className="mt-4 font-body text-xs tracking-widest uppercase text-gold hover:underline"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5"
              >
                <AnimatePresence mode="popLayout">
                  {filtered.map((product, i) => (
                    <ProductGridCard
                      key={product.id}
                      product={product}
                      index={i}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function ProductGridCard({
  product,
  index,
}: { product: (typeof PRODUCTS)[0]; index: number }) {
  const { addItem } = useCart();
  const [hovered, setHovered] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, "M");
    toast.success(`${product.name} added to cart`, {
      description: `Size M — ₹${product.price.toLocaleString()}`,
    });
  };

  return (
    <motion.div
      layout
      data-ocid={`products.item.${index + 1}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.35,
        delay: index * 0.04,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-card rounded-sm mb-3 shadow-md hover:shadow-xl transition-shadow duration-300">
        <motion.img
          src={product.image}
          alt={product.name}
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {product.badge && (
          <Badge className="absolute top-2 left-2 bg-gold text-primary-foreground font-body text-xs tracking-wider rounded-none border-0 px-2">
            {product.badge}
          </Badge>
        )}
        <Badge className="absolute top-2 right-2 bg-destructive text-white font-body text-xs tracking-wider rounded-none border-0 px-2">
          40% OFF
        </Badge>
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 12 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-x-0 bottom-0 p-3"
        >
          <button
            type="button"
            data-ocid={`products.add_button.${index + 1}`}
            onClick={handleAdd}
            className="w-full bg-gold text-primary-foreground font-body font-semibold text-xs tracking-widest uppercase py-2.5 flex items-center justify-center gap-2 hover:bg-gold/90 transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Quick Add
          </button>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
      <div>
        <p className="font-body text-xs tracking-widest uppercase text-muted-foreground">
          {product.category}
        </p>
        <h3 className="font-body font-medium text-sm text-foreground group-hover:text-gold transition-colors duration-200 mt-0.5">
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

function FilterPanel({
  activeCategory,
  setActiveCategory,
  priceRange,
  setPriceRange,
}: {
  activeCategory: string;
  setActiveCategory: (c: string) => void;
  priceRange: number[];
  setPriceRange: (r: number[]) => void;
}) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-body text-xs font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-4">
          Category
        </h3>
        <div className="flex flex-col gap-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              data-ocid="products.tab"
              onClick={() => setActiveCategory(cat)}
              className={`text-left font-body text-sm py-1.5 px-3 rounded-sm transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-gold/10 text-gold font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-body text-xs font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-4">
          Price Range
        </h3>
        <Slider
          min={0}
          max={25000}
          step={500}
          value={priceRange}
          onValueChange={setPriceRange}
          className="mb-3"
        />
        <div className="flex items-center justify-between font-body text-xs text-muted-foreground">
          <span>₹{priceRange[0].toLocaleString()}</span>
          <span>₹{priceRange[1].toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
