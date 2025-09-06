import React from "react";

const FilterSection = ({
  search,
  setSearch,
  brand,
  setBrand,
  category,
  setCategory,
  priceRange,
  setPriceRange,
}) => {
  const categories = ["All", "Bags", "Bottles", "Toothbrush", "Lights"];
  const brands = ["All", "EcoCo", "GreenLife", "NaturePure"];

  return (
    <div className="bg-gray-100 mt-10 p-4 rounded-md h-max w-64">
      {/* Search */}
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-white p-2 w-full rounded-md border-gray-400 border-2"
      />

      {/* Category */}
      <h1 className="mt-5 font-semibold text-xl">Category</h1>
      <div className="flex flex-col gap-2 mt-3">
        {categories.map((item, index) => (
          <label key={index} className="flex items-center gap-2">
            <input
              type="radio"
              name="category"
              value={item}
              checked={category === item}
              onChange={(e) => setCategory(e.target.value)}
            />
            <span className="uppercase">{item}</span>
          </label>
        ))}
      </div>

      {/* Brand */}
      <h1 className="mt-5 font-semibold text-xl mb-3">Brand</h1>
      <select
        className="bg-white w-full p-2 border-gray-200 border-2 rounded-md"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
      >
        {brands.map((item, index) => (
          <option value={item} key={index}>
            {item}
          </option>
        ))}
      </select>

      {/* Price Range */}
      <h1 className="mt-5 font-semibold text-xl mb-3">Price Range</h1>
      <label>
        ${priceRange[0]} - ${priceRange[1]}
      </label>
      <input
        type="range"
        min="0"
        max="50"
        value={priceRange[1]}
        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
        className="w-full"
      />

      {/* Reset */}
      <button
        className="bg-red-500 text-white rounded-md px-3 py-1 mt-5 cursor-pointer w-full"
        onClick={() => {
          setSearch("");
          setCategory("All");
          setBrand("All");
          setPriceRange([0, 50]);
        }}
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterSection;
