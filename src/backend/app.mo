import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Hash "mo:base/Hash";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Option "mo:base/Option";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Time "mo:base/Time";

actor {
  type Product = {
    id: Nat;
    name: Text;
    description: Text;
    price: Nat;
    category: Text;
    stockQuantity: Nat;
    tags: [Text];
  };

  type CartItem = {
    productId: Nat;
    quantity: Nat;
  };

  type Order = {
    id: Nat;
    buyer: Principal;
    items: [CartItem];
    total: Nat;
    createdAt: Int;
  };

  stable var nextProductId: Nat = 1;
  stable var nextOrderId: Nat = 1;
  stable var productsEntries: [(Nat, Product)] = [];
  stable var ordersEntries: [(Nat, Order)] = [];

  var products = HashMap.fromIter<Nat, Product>(productsEntries.vals(), 10, Nat.equal, Hash.hash);
  var carts = HashMap.HashMap<Principal, [CartItem]>(10, Principal.equal, Principal.hash);
  var orders = HashMap.fromIter<Nat, Order>(ordersEntries.vals(), 10, Nat.equal, Hash.hash);

  system func preupgrade() {
    productsEntries := Iter.toArray(products.entries());
    ordersEntries := Iter.toArray(orders.entries());
  };

  system func postupgrade() {
    products := HashMap.fromIter<Nat, Product>(productsEntries.vals(), 10, Nat.equal, Hash.hash);
    orders := HashMap.fromIter<Nat, Order>(ordersEntries.vals(), 10, Nat.equal, Hash.hash);
  };

  // Seed products on first call if empty
  func seedProducts() {
    if (products.size() == 0) {
      let seed: [Product] = [
        { id=1; name="Essential Black Tee"; description="Premium heavyweight cotton tee. Relaxed fit with clean finish."; price=4500; category="Tops"; stockQuantity=50; tags=["essential", "basic"] },
        { id=2; name="Graphic Lion Tee"; description="Bold lion graphic on heavyweight cotton. Statement piece."; price=5500; category="Tops"; stockQuantity=30; tags=["graphic", "statement"] },
        { id=3; name="Slim Cargo Pants"; description="Modern cargo silhouette. Multiple pockets, tapered fit."; price=9500; category="Bottoms"; stockQuantity=25; tags=["cargo", "utility"] },
        { id=4; name="Classic Black Chinos"; description="Versatile slim-fit chinos. Dress up or down."; price=8000; category="Bottoms"; stockQuantity=35; tags=["chinos", "classic"] },
        { id=5; name="Low-top Leather Sneakers"; description="Premium leather uppers with clean minimal design."; price=18000; category="Footwear"; stockQuantity=20; tags=["sneakers", "leather"] },
        { id=6; name="Chelsea Boots"; description="Sleek leather Chelsea boots. Essential for every wardrobe."; price=22000; category="Footwear"; stockQuantity=15; tags=["boots", "formal"] },
        { id=7; name="Lion Signet Ring"; description="Gold-plated sterling silver signet ring with lion emblem."; price=6500; category="Accessories"; stockQuantity=40; tags=["ring", "gold"] },
        { id=8; name="Minimalist Leather Belt"; description="Full-grain leather belt with matte gold buckle."; price=4000; category="Accessories"; stockQuantity=45; tags=["belt", "leather"] },
        { id=9; name="Grooming Kit"; description="Complete men's grooming set. Cleanser, moisturizer, beard oil."; price=7500; category="Essentials"; stockQuantity=60; tags=["grooming", "skincare"] },
        { id=10; name="Signature Cologne"; description="Woody and warm 1seven signature fragrance. 100ml EDP."; price=12000; category="Essentials"; stockQuantity=30; tags=["fragrance", "cologne"] },
        { id=11; name="Oversized Hoodie"; description="Premium fleece oversized hoodie. Dropped shoulders, kangaroo pocket."; price=9000; category="Tops"; stockQuantity=40; tags=["hoodie", "oversized"] },
        { id=12; name="Leather Tote Bag"; description="Full-grain leather tote. Spacious and structured."; price=15000; category="Accessories"; stockQuantity=20; tags=["bag", "leather"] }
      ];
      for (p in seed.vals()) {
        products.put(p.id, p);
        nextProductId := p.id + 1;
      };
    };
  };

  public query func getProducts() : async [Product] {
    seedProducts();
    Iter.toArray(products.vals())
  };

  public query func getProductsByCategory(category: Text) : async [Product] {
    seedProducts();
    Array.filter<Product>(Iter.toArray(products.vals()), func(p) { p.category == category })
  };

  public query func getProduct(id: Nat) : async ?Product {
    products.get(id)
  };

  public shared(msg) func addToCart(productId: Nat, quantity: Nat) : async Bool {
    let caller = msg.caller;
    let currentCart = Option.get(carts.get(caller), []);
    let existing = Array.find<CartItem>(currentCart, func(item) { item.productId == productId });
    let newCart = switch (existing) {
      case null {
        Array.append(currentCart, [{ productId; quantity }])
      };
      case (?_) {
        Array.map<CartItem, CartItem>(currentCart, func(item) {
          if (item.productId == productId) { { productId; quantity = item.quantity + quantity } }
          else item
        })
      };
    };
    carts.put(caller, newCart);
    true
  };

  public shared(msg) func removeFromCart(productId: Nat) : async Bool {
    let caller = msg.caller;
    let currentCart = Option.get(carts.get(caller), []);
    carts.put(caller, Array.filter<CartItem>(currentCart, func(item) { item.productId != productId }));
    true
  };

  public shared(msg) func updateCartItem(productId: Nat, quantity: Nat) : async Bool {
    let caller = msg.caller;
    let currentCart = Option.get(carts.get(caller), []);
    if (quantity == 0) {
      carts.put(caller, Array.filter<CartItem>(currentCart, func(item) { item.productId != productId }));
    } else {
      carts.put(caller, Array.map<CartItem, CartItem>(currentCart, func(item) {
        if (item.productId == productId) { { productId; quantity } } else item
      }));
    };
    true
  };

  public shared(msg) func getCart() : async [CartItem] {
    Option.get(carts.get(msg.caller), [])
  };

  public shared(msg) func placeOrder() : async ?Nat {
    let caller = msg.caller;
    let cart = Option.get(carts.get(caller), []);
    if (cart.size() == 0) return null;
    var total: Nat = 0;
    for (item in cart.vals()) {
      switch (products.get(item.productId)) {
        case (?p) { total += p.price * item.quantity; };
        case null {};
      };
    };
    let orderId = nextOrderId;
    nextOrderId += 1;
    orders.put(orderId, { id=orderId; buyer=caller; items=cart; total; createdAt=Time.now() });
    carts.put(caller, []);
    ?orderId
  };

  public shared(msg) func getMyOrders() : async [Order] {
    let caller = msg.caller;
    Array.filter<Order>(Iter.toArray(orders.vals()), func(o) { o.buyer == caller })
  };
};
