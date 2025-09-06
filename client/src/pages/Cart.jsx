import React, { useState, useCallback } from "react";

// ---------- Utility: cn ----------
function cn(...classes) {
  return classes.flat().filter(Boolean).join(" ");
}

// ---------- Button ----------
function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  children,
  ...props
}) {
  const Comp = asChild ? "span" : "button";
  const base =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus:ring-2 focus:ring-offset-1";

  const variantClasses = {
    default: "bg-[#007BFF] text-[#FFFFFF] hover:bg-[#005FCC]",
    destructive: "bg-[#EF4444] text-[#FFFFFF] hover:bg-[#FF0000]",
    outline:
      "border border-[#333333] bg-transparent text-[#FFFFFF] hover:bg-[#1a1a1a]",
    secondary: "bg-[#1a1a1a] text-[#FFFFFF] hover:bg-[#333333]",
    ghost: "bg-transparent hover:bg-[#1a1a1a] text-[#FFFFFF]",
    link: "text-[#007BFF] underline hover:text-[#005FCC]",
  };

  const sizeClasses = {
    default: "h-9 px-4 py-2",
    sm: "h-8 px-3 py-1",
    lg: "h-10 px-6 py-3",
    icon: "h-9 w-9 p-0",
  };

  return (
    <Comp
      className={cn(base, variantClasses[variant], sizeClasses[size], className)}
      {...props}
    >
      {children}
    </Comp>
  );
}

// ---------- Input ----------
function Input({ className, type = "text", ...props }) {
  return (
    <input
      type={type}
      className={cn(
        "border border-[#333333] rounded-md px-3 py-1 text-base w-full outline-none focus:ring-2 focus:ring-[#007BFF] disabled:opacity-50 text-[#FFFFFF] placeholder-[#9CA3AF]",
        className
      )}
      {...props}
    />
  );
}

// ---------- Skeleton ----------
function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn("bg-[#333333] animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

// ---------- Empty cart icon ----------
function ShoppingBagIcon() {
  return (
    <svg
      className="w-12 h-12 text-[#9CA3AF]"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M6 2L3 6v16h18V6l-3-4H6zM6 6h12l1.5 2H4.5L6 6zm-1 4h14v12H5V10z" />
    </svg>
  );
}

// ---------- CartPage ----------
export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Eco Bag",
      price: 19.99,
      quantity: 2,
      image: "",
      seller: "EcoShop",
    },
    {
      id: 2,
      title: "Reusable Bottle",
      price: 12.49,
      quantity: 1,
      image: "",
      seller: "EcoShop",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(null);

  const updateQuantity = (id, quantity) => {
    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };
  const removeFromCart = (id) =>
    setCartItems((items) => items.filter((item) => item.id !== id));

  const handleQuantityUpdate = useCallback(
    (productId, newQuantity) => {
      if (newQuantity <= 0) {
        removeFromCart(productId);
      } else {
        updateQuantity(productId, newQuantity);
      }
    },
    [cartItems]
  );

  const handleRemoveItem = useCallback(
    (productId) => removeFromCart(productId),
    [cartItems]
  );

  const applyDiscountCode = () => {
    const validCodes = { ECO10: 0.1, SAVE15: 0.15, WELCOME5: 0.05 };
    const discount = validCodes[discountCode.toUpperCase()];
    if (discount)
      setAppliedDiscount({ name: discountCode.toUpperCase(), discount });
  };

  const removeDiscount = () => {
    setAppliedDiscount(null);
    setDiscountCode("");
  };

  const subtotal = cartItems.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );
  const discountAmount = appliedDiscount
    ? subtotal * appliedDiscount.discount
    : 0;
  const total = subtotal + 5.99 - discountAmount;

  if (isLoading) return <Skeleton className="h-40 w-full" />;

  if (cartItems.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] text-[#FFFFFF]">
        <ShoppingBagIcon />
        <h1 className="text-2xl font-bold my-2">Your cart is empty</h1>
        <p className="text-[#9CA3AF] mb-4 text-center">
          Start adding eco-friendly products!
        </p>
        <Button size="lg">Continue Shopping</Button>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] py-8 text-[#FFFFFF]">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-[#1a1a1a] rounded-md border border-[#333333] p-4 flex flex-col sm:flex-row gap-4"
              >
                <div className="w-full sm:w-20 h-20 bg-[#333333] rounded-md overflow-hidden flex-shrink-0">
                  <img
                    src={
                      item.image ||
                      `https://source.unsplash.com/random/400x300/?eco,product&sig=${item.id}`
                    }
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col sm:flex-row sm:justify-between gap-4">
                  <div>
                    <h3 className="font-semibold mb-1 text-[#FFFFFF]">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#9CA3AF] mb-1">
                      Sold by {item.seller}
                    </p>
                    <p className="font-semibold text-[#FFFFFF]">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleQuantityUpdate(item.id, item.quantity - 1)
                        }
                        className="text-[#FFFFFF]"
                      >
                        -
                      </Button>

                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityUpdate(
                            item.id,
                            parseInt(e.target.value) || 1
                          )
                        }
                        className="w-16 text-center text-[#FFFFFF]"
                      />

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleQuantityUpdate(item.id, item.quantity + 1)
                        }
                        className="text-[#FFFFFF]"
                      >
                        +
                      </Button>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1 bg-[#1a1a1a] rounded-md border border-[#333333] p-6 sticky top-8">
            <h2 className="text-xl font-semibold mb-4 text-[#FFFFFF]">
              Order Summary
            </h2>
            <div className="space-y-2 mb-4 text-[#FFFFFF]">
              <div className="flex justify-between">
                Subtotal <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                Shipping <span>$5.99</span>
              </div>
              {appliedDiscount && (
                <div className="flex justify-between text-[#00FF00]">
                  Discount ({appliedDiscount.name}){" "}
                  <span>- ${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t border-[#333333] pt-2 flex justify-between font-semibold">
                Total <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {appliedDiscount ? (
              <div className="flex justify-between items-center bg-[#007BFF]/10 border border-[#007BFF]/20 rounded-md px-3 py-2 mb-4">
                <span className="text-[#007BFF] font-medium">
                  {appliedDiscount.name} Applied
                </span>
                <Button variant="ghost" size="sm" onClick={removeDiscount}>
                  Remove
                </Button>
              </div>
            ) : (
              <div className="flex gap-2 mb-4">
                <Input
                  placeholder="Discount code"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                />
                <Button
                  variant="outline"
                  onClick={applyDiscountCode}
                  disabled={!discountCode.trim()}
                >
                  Apply
                </Button>
              </div>
            )}

            <Button size="lg" className="w-full">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
