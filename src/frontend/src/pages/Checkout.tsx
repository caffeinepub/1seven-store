import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "@tanstack/react-router";
import { CheckCircle2, Lock, ShoppingBag } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useCart } from "../context/CartContext";

export function Checkout() {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    country: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
      clearCart();
    }, 1800);
  };

  const shipping = total > 150 ? 0 : 12.99;
  const orderTotal = total + shipping;

  return (
    <main className="pt-24 pb-20 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              data-ocid="checkout.success_state"
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="relative mb-8">
                <div className="absolute inset-0 rounded-full bg-gold/20 blur-2xl animate-pulse" />
                <CheckCircle2 className="relative w-24 h-24 text-gold" />
              </div>
              <h1 className="font-display font-bold text-4xl md:text-5xl mb-4">
                Order Confirmed!
              </h1>
              <p className="font-body text-muted-foreground text-lg mb-2">
                Thank you for shopping with 1SEVEN.
              </p>
              <p className="font-body text-muted-foreground mb-10">
                A confirmation email will be sent to{" "}
                <span className="text-gold">{form.email || "your email"}</span>.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() =>
                    navigate({
                      to: "/products",
                      search: { category: undefined },
                    })
                  }
                  className="bg-gold text-primary-foreground hover:bg-gold/90 font-body font-semibold tracking-widest uppercase text-sm h-12 px-8 rounded-none shadow-gold"
                >
                  Continue Shopping
                </Button>
                <Button
                  onClick={() => navigate({ to: "/" })}
                  variant="outline"
                  className="border-border text-muted-foreground hover:border-gold hover:text-gold font-body font-medium tracking-widest uppercase text-sm h-12 px-8 rounded-none bg-transparent"
                >
                  Back to Home
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="py-10 border-b border-border mb-10">
                <p className="font-body text-xs tracking-[0.4em] uppercase text-gold mb-2">
                  1seven
                </p>
                <h1 className="font-display font-bold text-4xl">Checkout</h1>
              </div>

              <div className="grid lg:grid-cols-5 gap-12">
                {/* Form */}
                <form
                  onSubmit={handleSubmit}
                  className="lg:col-span-3 space-y-6"
                >
                  <section>
                    <h2 className="font-body text-xs font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-5">
                      Contact Information
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="name"
                          className="font-body text-xs tracking-wider uppercase text-muted-foreground"
                        >
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          data-ocid="checkout.input"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="Marcus King"
                          className="bg-card border-border font-body text-sm h-12 rounded-none focus:border-gold focus:ring-gold/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="email"
                          className="font-body text-xs tracking-wider uppercase text-muted-foreground"
                        >
                          Email
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          data-ocid="checkout.input"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="marcus@example.com"
                          className="bg-card border-border font-body text-sm h-12 rounded-none focus:border-gold focus:ring-gold/20"
                        />
                      </div>
                    </div>
                  </section>

                  <section>
                    <h2 className="font-body text-xs font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-5">
                      Shipping Address
                    </h2>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="address"
                          className="font-body text-xs tracking-wider uppercase text-muted-foreground"
                        >
                          Street Address
                        </Label>
                        <Input
                          id="address"
                          name="address"
                          data-ocid="checkout.input"
                          value={form.address}
                          onChange={handleChange}
                          required
                          placeholder="123 Crown Street"
                          className="bg-card border-border font-body text-sm h-12 rounded-none focus:border-gold focus:ring-gold/20"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label
                            htmlFor="city"
                            className="font-body text-xs tracking-wider uppercase text-muted-foreground"
                          >
                            City
                          </Label>
                          <Input
                            id="city"
                            name="city"
                            data-ocid="checkout.input"
                            value={form.city}
                            onChange={handleChange}
                            required
                            placeholder="New York"
                            className="bg-card border-border font-body text-sm h-12 rounded-none focus:border-gold focus:ring-gold/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="zip"
                            className="font-body text-xs tracking-wider uppercase text-muted-foreground"
                          >
                            ZIP Code
                          </Label>
                          <Input
                            id="zip"
                            name="zip"
                            data-ocid="checkout.input"
                            value={form.zip}
                            onChange={handleChange}
                            required
                            placeholder="10001"
                            className="bg-card border-border font-body text-sm h-12 rounded-none focus:border-gold focus:ring-gold/20"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="country"
                          className="font-body text-xs tracking-wider uppercase text-muted-foreground"
                        >
                          Country
                        </Label>
                        <Input
                          id="country"
                          name="country"
                          data-ocid="checkout.input"
                          value={form.country}
                          onChange={handleChange}
                          required
                          placeholder="United States"
                          className="bg-card border-border font-body text-sm h-12 rounded-none focus:border-gold focus:ring-gold/20"
                        />
                      </div>
                    </div>
                  </section>

                  {/* Stripe placeholder */}
                  <div className="border border-gold/30 bg-gold/5 p-4 flex items-center gap-3">
                    <Lock className="w-4 h-4 text-gold flex-shrink-0" />
                    <p className="font-body text-xs text-muted-foreground">
                      Payments are secure and encrypted.{" "}
                      <span className="text-gold font-medium">
                        Powered by Stripe
                      </span>
                      . Your payment information is never stored.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    data-ocid="checkout.submit_button"
                    disabled={isLoading}
                    className="w-full bg-gold text-primary-foreground hover:bg-gold/90 font-body font-semibold tracking-widest uppercase text-sm h-14 rounded-none shadow-gold transition-all duration-300 disabled:opacity-60"
                  >
                    {isLoading ? (
                      <span
                        data-ocid="checkout.loading_state"
                        className="flex items-center gap-2"
                      >
                        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </span>
                    ) : (
                      "Place Order"
                    )}
                  </Button>
                </form>

                {/* Order Summary */}
                <div className="lg:col-span-2">
                  <div className="bg-card border border-border p-6 sticky top-28">
                    <div className="flex items-center gap-2 mb-6">
                      <ShoppingBag className="w-4 h-4 text-gold" />
                      <h2 className="font-body text-xs font-semibold tracking-[0.3em] uppercase text-muted-foreground">
                        Order Summary
                      </h2>
                    </div>

                    {items.length === 0 ? (
                      <p className="font-body text-sm text-muted-foreground">
                        No items in cart
                      </p>
                    ) : (
                      <ul className="space-y-4 mb-6">
                        {items.map((item) => (
                          <li
                            key={`${item.product.id}-${item.size}`}
                            className="flex gap-3"
                          >
                            <div className="w-16 h-20 rounded-sm overflow-hidden flex-shrink-0 bg-secondary">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-body text-sm font-medium text-foreground truncate">
                                {item.product.name}
                              </p>
                              <p className="font-body text-xs text-muted-foreground">
                                {item.size} × {item.quantity}
                              </p>
                              <p className="font-display font-semibold text-gold mt-1">
                                $
                                {(item.product.price * item.quantity).toFixed(
                                  2,
                                )}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}

                    <Separator className="mb-4" />
                    <div className="space-y-2 font-body text-sm">
                      <div className="flex justify-between text-muted-foreground">
                        <span>Subtotal</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Shipping</span>
                        <span>
                          {shipping === 0 ? (
                            <span className="text-gold">Free</span>
                          ) : (
                            `$${shipping.toFixed(2)}`
                          )}
                        </span>
                      </div>
                      <Separator className="my-3" />
                      <div className="flex justify-between font-semibold text-base">
                        <span className="font-body">Total</span>
                        <span className="font-display text-gold">
                          ${orderTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
