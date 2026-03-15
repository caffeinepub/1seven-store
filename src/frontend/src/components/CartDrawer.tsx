import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "../context/CartContext";

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQty, total } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsOpen(false);
    navigate({ to: "/checkout" });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-card border-l border-border flex flex-col shadow-2xl"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-gold" />
                <span className="font-display text-lg font-semibold tracking-widest uppercase">
                  Cart
                </span>
                {items.length > 0 && (
                  <span className="w-6 h-6 rounded-full bg-gold text-primary-foreground text-xs font-bold flex items-center justify-center">
                    {items.reduce((s, i) => s + i.quantity, 0)}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-muted-foreground">
                  <ShoppingBag className="w-16 h-16 opacity-20" />
                  <p className="font-body text-sm tracking-wider uppercase">
                    Your cart is empty
                  </p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((item, i) => (
                    <li
                      key={`${item.product.id}-${item.size}`}
                      className="flex gap-4 py-4 border-b border-border last:border-0"
                    >
                      <div className="w-20 h-24 rounded overflow-hidden flex-shrink-0 bg-secondary">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-body font-medium text-sm text-foreground truncate">
                          {item.product.name}
                        </p>
                        <p className="font-body text-xs text-muted-foreground mt-0.5">
                          Size: {item.size}
                        </p>
                        <p className="font-display font-semibold text-gold mt-1">
                          ${item.product.price}
                        </p>
                        <div className="flex items-center gap-3 mt-3">
                          <div className="flex items-center border border-border rounded">
                            <button
                              type="button"
                              onClick={() =>
                                updateQty(
                                  item.product.id,
                                  item.size,
                                  item.quantity - 1,
                                )
                              }
                              className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 font-body text-sm min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQty(
                                  item.product.id,
                                  item.size,
                                  item.quantity + 1,
                                )
                              }
                              className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button
                            type="button"
                            data-ocid={`cart.delete_button.${i + 1}`}
                            onClick={() =>
                              removeItem(item.product.id, item.size)
                            }
                            className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-border bg-card">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-body text-sm text-muted-foreground tracking-wider uppercase">
                    Subtotal
                  </span>
                  <span className="font-display text-xl font-semibold text-gold">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <Separator className="mb-4" />
                <Button
                  data-ocid="cart.primary_button"
                  onClick={handleCheckout}
                  className="w-full bg-gold text-primary-foreground hover:bg-gold/90 font-body font-semibold tracking-widest uppercase text-sm h-12 rounded-none transition-all duration-200 hover:shadow-gold"
                >
                  Proceed to Checkout
                </Button>
                <p className="text-center text-xs text-muted-foreground mt-3 font-body">
                  Payments powered by Stripe
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
