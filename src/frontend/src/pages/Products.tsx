import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Link, useSearch } from "@tanstack/react-router";
import { SlidersHorizontal, X } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { CATEGORIES, PRODUCTS } from "../data/products";

export function Products() {
  const search = useSearch({ from: "/products" });
  const initialCategory = (search as { category?: string }).category ?? "All";

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState([0, 400]);
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

        <div className="flex gap-10">
          {/* Sidebar (desktop) */}
          <aside className="hidden lg:block w-60 flex-shrink-0">
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
          {mobileFilterOpen && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
              <div className="absolute bottom-0 left-0 right-0 bg-card border-t border-border rounded-t-2xl p-6">
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
              </div>
            </div>
          )}

          {/* Products grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div
                data-ocid="product.empty_state"
                className="flex flex-col items-center justify-center py-24 text-muted-foreground"
              >
                <p className="font-body text-sm tracking-wider">
                  No products found
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory("All");
                    setPriceRange([0, 400]);
                  }}
                  className="mt-4 font-body text-xs tracking-widest uppercase text-gold hover:underline"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                {filtered.map((product, i) => (
                  <motion.div
                    key={product.id}
                    data-ocid={`product.item.${i + 1}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.45,
                      delay: i * 0.06,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="group"
                  >
                    <Link
                      to="/products/$id"
                      params={{ id: String(product.id) }}
                      className="block"
                    >
                      <div className="relative aspect-[3/4] overflow-hidden bg-card rounded-sm mb-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        {product.badge && (
                          <Badge className="absolute top-2 left-2 bg-gold text-primary-foreground font-body text-xs tracking-wider rounded-none border-0 px-2">
                            {product.badge}
                          </Badge>
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
                      </div>
                      <div>
                        <p className="font-body text-xs tracking-widest uppercase text-muted-foreground">
                          {product.category}
                        </p>
                        <h3 className="font-body font-medium text-sm text-foreground group-hover:text-gold transition-colors duration-200 mt-0.5">
                          {product.name}
                        </h3>
                        <p className="font-display font-semibold text-gold mt-1">
                          ${product.price}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
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
      {/* Categories */}
      <div>
        <h3 className="font-body text-xs font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-4">
          Category
        </h3>
        <div className="flex flex-col gap-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              data-ocid="filter.tab"
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

      {/* Price range */}
      <div>
        <h3 className="font-body text-xs font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-4">
          Price Range
        </h3>
        <Slider
          min={0}
          max={400}
          step={5}
          value={priceRange}
          onValueChange={setPriceRange}
          className="mb-3"
        />
        <div className="flex items-center justify-between font-body text-xs text-muted-foreground">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
}
