import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "@tanstack/react-router";
import {
  Building2,
  CheckCircle2,
  CreditCard,
  Lock,
  ShoppingBag,
  Smartphone,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useCart } from "../context/CartContext";

type PaymentMethod = "upi" | "card" | "netbanking";

export function Checkout() {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");
  const [upiId, setUpiId] = useState("");
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

  const shipping = total > 3999 ? 0 : 199;
  const orderTotal = total + shipping;

  const PAYMENT_METHODS: {
    id: PaymentMethod;
    label: string;
    icon: React.ElementType;
    desc: string;
  }[] = [
    {
      id: "upi",
      label: "UPI",
      icon: Smartphone,
      desc: "Pay via UPI ID or any UPI app",
    },
    {
      id: "card",
      label: "Card",
      icon: CreditCard,
      desc: "Debit / Credit card",
    },
    {
      id: "netbanking",
      label: "Net Banking",
      icon: Building2,
      desc: "All major Indian banks",
    },
  ];

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
                A confirmation will be sent to{" "}
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
                  className="lg:col-span-3 space-y-8"
                >
                  {/* Contact */}
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
                          placeholder="Arjun Sharma"
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
                          placeholder="arjun@example.com"
                          className="bg-card border-border font-body text-sm h-12 rounded-none focus:border-gold focus:ring-gold/20"
                        />
                      </div>
                    </div>
                  </section>

                  {/* Shipping */}
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
                          placeholder="42 MG Road"
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
                            placeholder="Mumbai"
                            className="bg-card border-border font-body text-sm h-12 rounded-none focus:border-gold focus:ring-gold/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="zip"
                            className="font-body text-xs tracking-wider uppercase text-muted-foreground"
                          >
                            PIN Code
                          </Label>
                          <Input
                            id="zip"
                            name="zip"
                            data-ocid="checkout.input"
                            value={form.zip}
                            onChange={handleChange}
                            required
                            placeholder="400001"
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
                          placeholder="India"
                          className="bg-card border-border font-body text-sm h-12 rounded-none focus:border-gold focus:ring-gold/20"
                        />
                      </div>
                    </div>
                  </section>

                  {/* Payment */}
                  <section>
                    <h2 className="font-body text-xs font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-5">
                      Payment Method
                    </h2>

                    {/* Razorpay badge */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1.5 bg-[#2d6ae0]/10 border border-[#2d6ae0]/30 px-3 py-1.5 rounded-sm">
                        <div className="w-2 h-2 rounded-full bg-[#2d6ae0]" />
                        <span className="font-body text-xs font-semibold text-[#2d6ae0] tracking-wide">
                          Secured by Razorpay
                        </span>
                      </div>
                      <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="font-body text-xs text-muted-foreground">
                        256-bit SSL
                      </span>
                    </div>

                    {/* Method selector */}
                    <div className="grid grid-cols-3 gap-2 mb-5">
                      {PAYMENT_METHODS.map(({ id, label, icon: Icon }) => (
                        <button
                          key={id}
                          type="button"
                          data-ocid={`checkout.${id}_tab`}
                          onClick={() => setPaymentMethod(id)}
                          className={`flex flex-col items-center gap-1.5 py-3 px-2 border transition-all duration-200 ${
                            paymentMethod === id
                              ? "border-gold bg-gold/10 text-gold"
                              : "border-border text-muted-foreground hover:border-gold/40 hover:text-foreground"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="font-body text-xs tracking-wider uppercase font-medium">
                            {label}
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* UPI */}
                    {paymentMethod === "upi" && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-4"
                      >
                        <div className="space-y-2">
                          <Label className="font-body text-xs tracking-wider uppercase text-muted-foreground">
                            UPI ID
                          </Label>
                          <Input
                            data-ocid="checkout.upi_input"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="yourname@upi"
                            className="bg-card border-border font-body text-sm h-12 rounded-none focus:border-gold focus:ring-gold/20"
                          />
                          <p className="font-body text-xs text-muted-foreground">
                            Enter your UPI ID linked to GPay, PhonePe, Paytm, or
                            any UPI app.
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="h-px flex-1 bg-border" />
                          <span className="font-body text-xs text-muted-foreground uppercase tracking-wider">
                            UPI apps accepted
                          </span>
                          <div className="h-px flex-1 bg-border" />
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {["GPay", "PhonePe", "Paytm", "BHIM"].map((app) => (
                            <span
                              key={app}
                              className="font-body text-xs border border-border px-3 py-1.5 text-muted-foreground bg-card"
                            >
                              {app}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Card */}
                    {paymentMethod === "card" && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-4"
                      >
                        <div className="space-y-2">
                          <Label className="font-body text-xs tracking-wider uppercase text-muted-foreground">
                            Card Number
                          </Label>
                          <Input
                            data-ocid="checkout.card_input"
                            placeholder="1234 5678 9012 3456"
                            className="bg-card border-border font-body text-sm h-12 rounded-none focus:border-gold focus:ring-gold/20"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="font-body text-xs tracking-wider uppercase text-muted-foreground">
                              Expiry
                            </Label>
                            <Input
                              placeholder="MM / YY"
                              className="bg-card border-border font-body text-sm h-12 rounded-none focus:border-gold focus:ring-gold/20"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="font-body text-xs tracking-wider uppercase text-muted-foreground">
                              CVV
                            </Label>
                            <Input
                              placeholder="•••"
                              type="password"
                              maxLength={4}
                              className="bg-card border-border font-body text-sm h-12 rounded-none focus:border-gold focus:ring-gold/20"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Net Banking */}
                    {paymentMethod === "netbanking" && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-3"
                      >
                        {[
                          "SBI",
                          "HDFC Bank",
                          "ICICI Bank",
                          "Axis Bank",
                          "Kotak Bank",
                        ].map((bank) => (
                          <label
                            key={bank}
                            className="flex items-center gap-3 p-3 border border-border hover:border-gold/40 cursor-pointer group transition-all duration-200"
                          >
                            <input
                              type="radio"
                              name="bank"
                              className="accent-[#c9a84c]"
                            />
                            <span className="font-body text-sm text-foreground group-hover:text-gold transition-colors">
                              {bank}
                            </span>
                          </label>
                        ))}
                      </motion.div>
                    )}
                  </section>

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
                      `Pay ₹${orderTotal.toLocaleString()} via ${paymentMethod === "upi" ? "UPI" : paymentMethod === "card" ? "Card" : "Net Banking"}`
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

                    {/* 20% off badge */}
                    <div className="flex items-center gap-2 mb-4 bg-gold/10 border border-gold/30 px-3 py-2">
                      <span className="font-body text-xs font-bold text-gold tracking-wider">
                        20% OFF
                      </span>
                      <span className="font-body text-xs text-muted-foreground">
                        applied to all items
                      </span>
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
                              <div className="flex items-center gap-2 mt-1">
                                <p className="font-display font-semibold text-gold">
                                  ₹
                                  {(
                                    item.product.price * item.quantity
                                  ).toLocaleString()}
                                </p>
                                {"originalPrice" in item.product && (
                                  <p className="font-body text-xs text-muted-foreground line-through">
                                    ₹
                                    {(
                                      (
                                        item.product as {
                                          originalPrice: number;
                                        }
                                      ).originalPrice * item.quantity
                                    ).toLocaleString()}
                                  </p>
                                )}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}

                    <Separator className="mb-4" />
                    <div className="space-y-2 font-body text-sm">
                      <div className="flex justify-between text-muted-foreground">
                        <span>Subtotal</span>
                        <span>₹{total.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Shipping</span>
                        <span>
                          {shipping === 0 ? (
                            <span className="text-gold">Free</span>
                          ) : (
                            `₹${shipping.toLocaleString()}`
                          )}
                        </span>
                      </div>
                      <Separator className="my-3" />
                      <div className="flex justify-between font-semibold text-base">
                        <span className="font-body">Total</span>
                        <span className="font-display text-gold">
                          ₹{orderTotal.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <p className="font-body text-xs text-muted-foreground mt-4 text-center">
                      Free delivery on orders over ₹3,999
                    </p>
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
