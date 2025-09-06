import React from "react";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <img
        src={product.image}
        alt={product.title}
        className="h-48 w-full object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{product.title}</h2>
        <p className="text-gray-600">${product.price}</p>
        <button
          onClick={() => addToCart(product)}
          className="mt-3 px-4 py-2 bg-[#007BFF] text-white rounded-md hover:bg-[#0066CC] transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
