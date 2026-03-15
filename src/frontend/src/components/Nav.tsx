import { Link, useLocation } from "@tanstack/react-router";
import { Menu, ShoppingBag, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

export function Nav() {
  const { itemCount, setIsOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = useLocation({ select: (l) => l.pathname });

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname drives intentional reset
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 md:w-12 md:h-12">
              <img
                src="/assets/generated/1seven-lion-logo-transparent.dim_400x400.png"
                alt="1seven lion logo"
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <span
              className="font-display font-bold text-xl md:text-2xl tracking-widest text-foreground"
              style={{ letterSpacing: "0.2em" }}
            >
              1SEVEN
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: "Home", to: "/" },
              { label: "Products", to: "/products" },
              { label: "About", to: "/#about" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-ocid="nav.link"
                className="relative font-body text-sm font-medium tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-200 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              type="button"
              data-ocid="nav.cart_button"
              onClick={() => setIsOpen(true)}
              className="relative p-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
              aria-label={`Cart, ${itemCount} items`}
            >
              <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gold text-primary-foreground text-xs font-bold flex items-center justify-center"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-background/98 backdrop-blur-md border-b border-border"
          >
            <nav className="flex flex-col px-6 py-6 gap-5">
              {[
                { label: "Home", to: "/" },
                { label: "Products", to: "/products" },
                { label: "About", to: "/#about" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  data-ocid="nav.link"
                  className="font-body text-base font-medium tracking-widest uppercase text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
