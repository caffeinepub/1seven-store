import { Link } from "@tanstack/react-router";
import { SiFacebook, SiInstagram, SiX } from "react-icons/si";

export function Footer() {
  const year = new Date().getFullYear();
  const hostname = window.location.hostname;

  return (
    <footer className="bg-card border-t border-border mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/assets/generated/1seven-lion-logo-transparent.dim_400x400.png"
                alt="1seven"
                className="w-10 h-10 object-contain"
              />
              <span
                className="font-display font-bold text-2xl tracking-widest"
                style={{ letterSpacing: "0.2em" }}
              >
                1SEVEN
              </span>
            </div>
            <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-xs">
              Premium men's clothing and essentials. Built for those who wear
              the crown without asking for permission.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <Link
                to="/instagram"
                aria-label="Instagram"
                className="text-muted-foreground hover:text-gold transition-colors duration-200"
              >
                <SiInstagram className="w-5 h-5" />
              </Link>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X / Twitter"
                className="text-muted-foreground hover:text-gold transition-colors duration-200"
              >
                <SiX className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-muted-foreground hover:text-gold transition-colors duration-200"
              >
                <SiFacebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-body text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">
              Shop
            </h4>
            <ul className="space-y-2.5">
              {[
                "All Products",
                "Tops",
                "Bottoms",
                "Outerwear",
                "Essentials",
              ].map((item) => (
                <li key={item}>
                  <Link
                    to="/products"
                    search={{ category: undefined }}
                    className="font-body text-sm text-muted-foreground hover:text-gold transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-body text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">
              Info
            </h4>
            <ul className="space-y-2.5">
              {["About", "Size Guide", "Shipping", "Returns", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      to="/"
                      className="font-body text-sm text-muted-foreground hover:text-gold transition-colors duration-200"
                    >
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-muted-foreground">
            &copy; {year} 1SEVEN. All rights reserved.
          </p>
          <p className="font-body text-xs text-muted-foreground">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
