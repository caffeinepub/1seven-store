import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;

export interface Product {
    id: bigint;
    name: string;
    description: string;
    price: bigint;
    category: string;
    stockQuantity: bigint;
    tags: string[];
}

export interface CartItem {
    productId: bigint;
    quantity: bigint;
}

export interface Order {
    id: bigint;
    buyer: Principal;
    items: CartItem[];
    total: bigint;
    createdAt: bigint;
}

export interface backendInterface {
    getProducts: () => Promise<Product[]>;
    getProductsByCategory: (category: string) => Promise<Product[]>;
    getProduct: (id: bigint) => Promise<Option<Product>>;
    addToCart: (productId: bigint, quantity: bigint) => Promise<boolean>;
    removeFromCart: (productId: bigint) => Promise<boolean>;
    updateCartItem: (productId: bigint, quantity: bigint) => Promise<boolean>;
    getCart: () => Promise<CartItem[]>;
    placeOrder: () => Promise<Option<bigint>>;
    getMyOrders: () => Promise<Order[]>;
}
