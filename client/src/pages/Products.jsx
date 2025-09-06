import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";

const Products = () => {
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://fakestoreapi.com/products");
        setProducts(res.data);

        // Dummy brands for demo
        const fakeBrands = ["EcoMax", "Greenify", "NaturePro", "BioLife", "EcoCo"];
        setBrands(fakeBrands);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((item) => {
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category ? item.category === category : true;
    const matchPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
    // Simple brand filter: assign brand based on id for demo
    const brandIndex = item.id % brands.length;
    const matchBrand =
      selectedBrands.length > 0 ? selectedBrands.includes(brandIndex) : true;

    return matchSearch && matchCategory && matchPrice && matchBrand;
  });

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handleReset = () => {
    setSearch("");
    setCategory("");
    setPriceRange([0, 1000]);
    setSelectedBrands([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] text-white flex">
      {/* Sidebar */}
      <div className="w-64 p-6 border-r border-gray-700">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>

        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-[#1a1a1a] border border-gray-600"
        />

        <h3 className="font-semibold mb-2">Category</h3>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-[#1a1a1a] border border-gray-600"
        >
          <option value="">All</option>
          <option value="men's clothing">Men’s Clothing</option>
          <option value="women's clothing">Women’s Clothing</option>
          <option value="jewelery">Jewelery</option>
          <option value="electronics">Electronics</option>
        </select>

        <h3 className="font-semibold mb-2">Price</h3>
        <input
          type="range"
          min="0"
          max="1000"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, Number(e.target.value)])}
          className="w-full mb-2"
        />
        <p className="text-sm mb-4">Up to ${priceRange[1]}</p>

        <h3 className="font-semibold mb-2">Brands</h3>
        {brands.map((brand, index) => (
          <label key={brand} className="block mb-1">
            <input
              type="checkbox"
              checked={selectedBrands.includes(index)}
              onChange={() =>
                selectedBrands.includes(index)
                  ? setSelectedBrands(selectedBrands.filter((b) => b !== index))
                  : setSelectedBrands([...selectedBrands, index])
              }
              className="mr-2"
            />
            {brand}
          </label>
        ))}

        <button
          onClick={handleReset}
          className="mt-4 w-full py-2 bg-red-500 hover:bg-red-600 rounded"
        >
          Reset
        </button>
      </div>

      {/* Products Grid */}
      <div className="flex-1 p-6">
        {currentProducts.length === 0 ? (
          <p className="text-gray-400">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentProducts.map((product) => (
              <div
                key={product.id}
                className="bg-[#1a1a1a] rounded-lg p-4 shadow hover:shadow-lg transition"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-40 w-full object-contain mb-3"
                />
                <h3 className="text-sm font-semibold line-clamp-2">{product.title}</h3>
                <p className="text-gray-400 text-sm">${product.price}</p>
                <button
                  onClick={() => addToCart(product)}
                  className="mt-3 w-full py-2 bg-[#007BFF] hover:bg-[#005FCC] rounded text-white"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}

        {filteredProducts.length > itemsPerPage && (
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
