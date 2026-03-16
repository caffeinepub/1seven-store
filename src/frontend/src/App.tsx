import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { CartDrawer } from "./components/CartDrawer";
import { Footer } from "./components/Footer";
import { Nav } from "./components/Nav";
import { CartProvider } from "./context/CartContext";
import { Checkout } from "./pages/Checkout";
import { Home } from "./pages/Home";
import { Instagram } from "./pages/Instagram";
import { ProductDetail } from "./pages/ProductDetail";
import { Products } from "./pages/Products";

const queryClient = new QueryClient();

// Root layout
const rootRoute = createRootRoute({
  component: () => (
    <CartProvider>
      <Nav />
      <CartDrawer />
      <Outlet />
      <Footer />
      <Toaster
        theme="dark"
        toastOptions={{
          classNames: {
            toast: "bg-card border border-border font-body text-foreground",
            title: "text-foreground font-medium",
          },
        }}
      />
    </CartProvider>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products",
  component: Products,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      category: search.category as string | undefined,
    };
  },
});

const productDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products/$id",
  component: ProductDetail,
});

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout",
  component: Checkout,
});

const instagramRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/instagram",
  component: Instagram,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  productsRoute,
  productDetailRoute,
  checkoutRoute,
  instagramRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
