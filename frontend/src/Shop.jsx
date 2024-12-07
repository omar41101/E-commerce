import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "./redux/api/productApiSlice.js";
import { useFetchCategoriesQuery } from "./redux/api/categoryApiSlice.js";
import { useGetProductsQuery } from "./redux/api/productApiSlice.js";

import {
  setCategories,
  setProducts,
  setChecked,
} from "./redux/features/shop/shopSlice";
import Loader from "./components/Loader";
import ProductCard from "./pages/Products/ProductCard.jsx";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");

  // Ensure we return an empty array if no data
  const filteredProductsQuery = useGetProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading && filteredProductsQuery.data) {
        // Filter products based on both checked categories and price filter
        const filteredProducts = filteredProductsQuery.data.filter(
          (product) => {
            return (
              product.price.toString().includes(priceFilter) ||
              product.price === parseInt(priceFilter, 10)
            );
          }
        );

        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  // Add "All Brands" option to uniqueBrands
  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full md:w-1/4">
            {/* Categories */}
            <h2 className="text-lg text-center font-semibold text-white mb-4">
              Filter by Categories
            </h2>
            <div className="space-y-3">
              {categories?.map((c) => (
                <div key={c._id} className="flex items-center">
                  <input
                    type="checkbox"
                    onChange={(e) => handleCheck(e.target.checked, c._id)}
                    className="w-4 h-4 text-pink-600 bg-gray-200 rounded focus:ring-pink-500"
                  />
                  <label className="ml-3 text-sm text-gray-300">{c.name}</label>
                </div>
              ))}
            </div>

            {/* Brands */}
            <h2 className="text-lg text-center font-semibold text-white mt-8 mb-4">
              Filter by Brands
            </h2>
            <div className="space-y-3">
              {uniqueBrands?.map((brand) => (
                <div key={brand} className="flex items-center">
                  <input
                    type="radio"
                    id={brand}
                    name="brand"
                    onChange={() => handleBrandClick(brand)}
                    className="w-4 h-4 text-pink-600 bg-gray-200 rounded focus:ring-pink-500"
                  />
                  <label className="ml-3 text-sm text-gray-300">{brand}</label>
                </div>
              ))}
            </div>

            {/* Price Filter */}
            <h2 className="text-lg text-center font-semibold text-white mt-8 mb-4">
              Filter by Price
            </h2>
            <input
              type="text"
              placeholder="Enter Price"
              value={priceFilter}
              onChange={handlePriceChange}
              className="w-full px-4 py-2 text-gray-800 bg-white rounded-lg focus:ring focus:ring-pink-400 focus:outline-none"
            />

            {/* Reset Button */}
            <div className="mt-6">
              <button
                className="w-full px-4 py-2 text-white bg-pink-600 hover:bg-pink-700 rounded-lg focus:ring focus:ring-pink-400"
                onClick={() => window.location.reload()}
              >
                Reset
              </button>
            </div>
          </div>

          {/* Products */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
              {products?.length} Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products?.length === 0 ? (
                <Loader />
              ) : (
                products?.map((p) => (
                  <div className="bg-white rounded-lg shadow-md p-4" key={p._id}>
                    <ProductCard p={p} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
