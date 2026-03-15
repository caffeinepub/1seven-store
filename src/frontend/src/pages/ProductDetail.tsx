import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, Minus, Plus, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";
import { PRODUCTS } from "../data/products";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export function ProductDetail() {
  const { id } = useParams({ from: "/products/$id" });
  const navigate = useNavigate();
  const { addItem } = useCart();

  const product = PRODUCTS.find((p) => p.id === Number(id));

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [sizeError, setSizeError] = useState(false);

  if (!product) {
    return (
      <div className="pt-32 text-center text-muted-foreground min-h-screen">
        <p className="font-body text-sm tracking-wider">Product not found.</p>
        <button
          type="button"
          onClick={() =>
            navigate({ to: "/products", search: { category: undefined } })
          }
          className="mt-4 font-body text-xs tracking-widest uppercase text-gold hover:underline"
        >
          Back to products
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      toast.error("Please select a size");
      return;
    }
    addItem(product, selectedSize, qty);
    toast.success(`${product.name} added to cart`);
  };

  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id,
  ).slice(0, 3);

  return (
    <main className="pt-24 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="py-6 flex items-center gap-2"
        >
          <button
            type="button"
            onClick={() =>
              navigate({ to: "/products", search: { category: undefined } })
            }
            className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-gold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Products
          </button>
          <span className="text-muted-foreground">/</span>
          <span className="font-body text-sm text-foreground">
            {product.name}
          </span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 mt-4">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-card rounded-sm">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <Badge className="absolute top-4 left-4 bg-gold text-primary-foreground font-body text-xs tracking-wider rounded-none border-0 px-3 py-1">
                  {product.badge}
                </Badge>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col"
          >
            <p className="font-body text-xs tracking-[0.35em] uppercase text-muted-foreground mb-2">
              {product.category}
            </p>
            <h1 className="font-display font-bold text-3xl md:text-4xl mb-4">
              {product.name}
            </h1>
            <p className="font-display text-3xl font-semibold text-gold mb-6">
              ${product.price}
            </p>
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Size selector */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="font-body text-xs font-semibold tracking-[0.3em] uppercase text-muted-foreground">
                  Size
                </span>
                {sizeError && (
                  <span
                    data-ocid="product.error_state"
                    className="font-body text-xs text-destructive"
                  >
                    Please select a size
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => {
                      setSelectedSize(size);
                      setSizeError(false);
                    }}
                    aria-pressed={selectedSize === size}
                    className={`w-12 h-12 font-body text-sm font-medium border transition-all duration-200 ${
                      selectedSize === size
                        ? "border-gold bg-gold/10 text-gold"
                        : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Qty selector */}
            <div className="mb-8">
              <span className="font-body text-xs font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-3 block">
                Quantity
              </span>
              <div className="flex items-center border border-border w-fit">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-12 h-12 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 h-12 flex items-center justify-center font-body font-medium text-foreground">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  className="w-12 h-12 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <Button
              data-ocid="product.primary_button"
              onClick={handleAddToCart}
              className="w-full bg-gold text-primary-foreground hover:bg-gold/90 font-body font-semibold tracking-widest uppercase text-sm h-14 rounded-none shadow-gold transition-all duration-300 hover:scale-[1.01]"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>

            <p className="text-center font-body text-xs text-muted-foreground mt-4">
              Free shipping on orders over $150
            </p>

            <div className="mt-8 border-t border-border pt-6 space-y-4">
              <div className="border-b border-border pb-4">
                <h4 className="font-body text-xs font-semibold tracking-[0.3em] uppercase text-muted-foreground">
                  Materials &amp; Care
                </h4>
                <p className="font-body text-sm text-muted-foreground mt-2 leading-relaxed">
                  Machine wash cold. Tumble dry low. Do not bleach. Made with
                  premium quality materials sourced responsibly.
                </p>
              </div>
              <div>
                <h4 className="font-body text-xs font-semibold tracking-[0.3em] uppercase text-muted-foreground">
                  Shipping &amp; Returns
                </h4>
                <p className="font-body text-sm text-muted-foreground mt-2 leading-relaxed">
                  Free standard shipping on orders over $150. Express delivery
                  available. Returns accepted within 30 days.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {related.length > 0 && (
          <section className="mt-24">
            <h2 className="font-display font-bold text-2xl mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {related.map((rp, i) => (
                <motion.div
                  key={rp.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="group"
                >
                  <Link
                    to="/products/$id"
                    params={{ id: String(rp.id) }}
                    className="block"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden bg-card rounded-sm mb-3">
                      <img
                        src={rp.image}
                        alt={rp.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <p className="font-body text-xs tracking-widest uppercase text-muted-foreground">
                      {rp.category}
                    </p>
                    <h3 className="font-body font-medium text-sm group-hover:text-gold transition-colors mt-0.5">
                      {rp.name}
                    </h3>
                    <p className="font-display font-semibold text-gold mt-1">
                      ${rp.price}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
