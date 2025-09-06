import React, { useState, useCallback } from "react";
import { useCart } from "../context/CartContext"; 
import { useNavigate } from "react-router-dom"; // ✅ import useNavigate

// ---------- Button ----------
function Button({ children, className = "", variant = "default", size = "default", ...props }) {
  const base = "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all";
  const variantClasses = {
    default: "bg-[#007BFF] text-white hover:bg-[#005FCC]",
    destructive: "bg-[#EF4444] text-white hover:bg-red-600",
    outline: "border border-[#333333] bg-transparent text-white hover:bg-[#1a1a1a]",
    ghost: "bg-transparent hover:bg-[#1a1a1a] text-white",
  };
  const sizeClasses = {
    default: "h-9 px-4 py-2",
    sm: "h-8 px-3 py-1",
    lg: "h-10 px-6 py-3",
  };
  return (
    <button className={`${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`} {...props}>
      {children}
    </button>
  );
}

// ---------- Input ----------
function Input({ className = "", ...props }) {
  return (
    <input
      className={`border border-[#333333] rounded-md px-3 py-1 text-white w-full bg-[#1a1a1a] ${className}`}
      {...props}
    />
  );
}

// ---------- Skeleton ----------
function Skeleton({ className = "" }) {
  return <div className={`bg-[#333333] animate-pulse rounded-md ${className}`} />;
}

// ---------- Empty cart icon ----------
function ShoppingBagIcon() {
  return (
    <svg className="w-12 h-12 text-[#9CA3AF]" fill="currentColor" viewBox="0 0 24 24">
      <path d="M6 2L3 6v16h18V6l-3-4H6zM6 6h12l1.5 2H4.5L6 6zm-1 4h14v12H5V10z" />
    </svg>
  );
}

// ---------- CartPage ----------
export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const navigate = useNavigate(); // ✅ initialize navigate

  const handleQuantityUpdate = useCallback(
    (productId, newQuantity) => {
      if (newQuantity <= 0) removeFromCart(productId);
      else updateQuantity(productId, newQuantity);
    },
    [updateQuantity, removeFromCart]
  );

  const applyDiscountCode = () => {
    const validCodes = { ECO10: 0.1, SAVE15: 0.15, WELCOME5: 0.05 };
    const discount = validCodes[discountCode.toUpperCase()];
    if (discount) setAppliedDiscount({ name: discountCode.toUpperCase(), discount });
  };

  const removeDiscount = () => {
    setAppliedDiscount(null);
    setDiscountCode("");
  };

  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const discountAmount = appliedDiscount ? subtotal * appliedDiscount.discount : 0;
  const total = subtotal + 5.99 - discountAmount;

  if (cartItems.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] text-white">
        <ShoppingBagIcon />
        <h1 className="text-2xl font-bold my-2">Your cart is empty</h1>
        <p className="text-[#9CA3AF] mb-4 text-center">Start adding products!</p>
        <Button size="lg" onClick={() => navigate("/products")}>
          Continue Shopping
        </Button>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] py-8 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-[#1a1a1a] rounded-md border border-[#333333] p-4 flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-20 h-20 bg-[#333333] rounded-md overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col sm:flex-row sm:justify-between gap-4">
                  <div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-[#9CA3AF] mb-1">Sold by {item.seller || "EcoShop"}</p>
                    <p className="font-semibold">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center">
                      <Button variant="outline" size="sm" onClick={() => handleQuantityUpdate(item.id, item.quantity - 1)}>-</Button>
                      <Input type="number" value={item.quantity} onChange={(e) => handleQuantityUpdate(item.id, parseInt(e.target.value) || 1)} className="w-16 text-center" />
                      <Button variant="outline" size="sm" onClick={() => handleQuantityUpdate(item.id, item.quantity + 1)}>+</Button>
                    </div>
                    <Button variant="destructive" size="sm" onClick={() => handleQuantityUpdate(item.id, 0)}>Remove</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1 bg-[#1a1a1a] rounded-md border border-[#333333] p-6 sticky top-8">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">Subtotal <span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between">Shipping <span>$5.99</span></div>
              {appliedDiscount && <div className="flex justify-between text-green-500">Discount ({appliedDiscount.name}) <span>- ${discountAmount.toFixed(2)}</span></div>}
              <div className="border-t border-[#333333] pt-2 flex justify-between font-semibold">Total <span>${total.toFixed(2)}</span></div>
            </div>

            {appliedDiscount ? (
              <div className="flex justify-between items-center bg-[#007BFF]/10 border border-[#007BFF]/20 rounded-md px-3 py-2 mb-4">
                <span className="text-[#007BFF] font-medium">{appliedDiscount.name} Applied</span>
                <Button variant="ghost" size="sm" onClick={removeDiscount}>Remove</Button>
              </div>
            ) : (
              <div className="flex gap-2 mb-4">
                <Input placeholder="Discount code" value={discountCode} onChange={(e) => setDiscountCode(e.target.value)} />
                <Button variant="outline" onClick={applyDiscountCode} disabled={!discountCode.trim()}>Apply</Button>
              </div>
            )}

            <Button size="lg" className="w-full">Proceed to Checkout</Button>
          </div>
        </div>
      </div>
    </div>
  );
}