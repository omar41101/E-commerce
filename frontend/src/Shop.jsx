import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "./redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "./redux/api/categoryApiSlice";
import { toast } from "react-toastify";

import {
  setCategories,
  setProducts,
  setChecked,
} from "./redux/features/shop/shopSlice";
import Loader from "./components/Loader";
import ProductCard from "./pages/Products/ProductCard";
import { addToCart } from "./redux/features/cart/cartSlice";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProductsQuery = useGetFilteredProductsQuery({
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
      if (!filteredProductsQuery.isLoading) {
        const filteredProducts = filteredProductsQuery.data.filter(
          (product) => {
            // Search filter
            const matchesSearch =
              product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));
            // Price filter
            const matchesPrice =
              product.price.toString().includes(priceFilter) ||
              product.price === parseInt(priceFilter, 10);

            return matchesSearch && matchesPrice;
          }
        );
        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter, searchTerm]);

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
    // Update the price filter state when the user types in the input filed
    setPriceFilter(e.target.value);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-tech-black via-tech-dark to-tech-blue py-8">
        <div className="container mx-auto flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full md:w-72 bg-black/60 backdrop-blur-lg rounded-2xl shadow-2xl p-6 sticky top-8 h-fit mb-8 md:mb-0 border border-tech-blue/40">
            <h2 className="text-2xl font-bold text-tech-blue text-center mb-8 tracking-wider">Filters</h2>
            <div className="mb-10">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 mb-4 bg-tech-black text-tech-white border border-tech-blue/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-tech-blue/60 placeholder:text-tech-text-secondary"
              />
            </div>
            <div className="mb-10">
              <h3 className="text-tech-white font-semibold mb-3">Categories</h3>
              <div className="flex flex-col gap-3">
                {categories?.map((c) => (
                  <label key={c._id} className="flex items-center gap-3 cursor-pointer group hover:text-tech-blue transition-colors">
                    <input
                      type="checkbox"
                      checked={checked.includes(c._id)}
                      onChange={(e) => handleCheck(e.target.checked, c._id)}
                      className="accent-tech-blue w-5 h-5 rounded focus:ring focus:ring-tech-blue border-2 border-tech-blue/40 group-hover:border-tech-blue/80 transition-all"
                    />
                    <span className="text-base text-tech-white font-medium group-hover:text-tech-blue transition-colors">{c.name}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="mb-10">
              <h3 className="text-tech-white font-semibold mb-3">Brands</h3>
              <div className="flex flex-col gap-3">
                {uniqueBrands?.map((brand) => (
                  <label key={brand} className="flex items-center gap-3 cursor-pointer group hover:text-tech-blue transition-colors">
                    <input
                      type="radio"
                      name="brand"
                      onChange={() => handleBrandClick(brand)}
                      className="accent-tech-blue w-5 h-5 rounded-full focus:ring focus:ring-tech-blue border-2 border-tech-blue/40 group-hover:border-tech-blue/80 transition-all"
                    />
                    <span className="text-base text-tech-white font-medium group-hover:text-tech-blue transition-colors">{brand}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="mb-10">
              <h3 className="text-tech-white font-semibold mb-3">Price</h3>
              <input
                type="text"
                placeholder="Enter Price"
                value={priceFilter}
                onChange={handlePriceChange}
                className="w-full px-4 py-2 bg-tech-black text-tech-white border border-tech-blue/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-tech-blue/60 placeholder:text-tech-text-secondary"
              />
            </div>
            <button
              className="w-full tech-btn bg-gradient-to-r from-tech-blue to-tech-pink hover:from-tech-pink hover:to-tech-blue text-white py-2 px-4 rounded-lg font-bold shadow-lg transition-all duration-300"
              onClick={() => window.location.reload()}
            >
              Reset Filters
            </button>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-tech-white tracking-wide">{products?.length} Products</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.length === 0 ? (
                <Loader />
              ) : (
                products?.map((p) => (
                  <div key={p._id} className="">
                    {/* Enhanced Product Card */}
                    <div className="relative group bg-tech-dark/80 backdrop-blur-lg rounded-2xl shadow-xl border border-tech-blue/30 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-tech-blue/80">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-4 right-4 z-10">
                        {/* You can add a HeartIcon here if you want */}
                      </div>
                      {p.discount > 0 && (
                        <span className="absolute top-4 left-4 bg-gradient-to-r from-tech-pink to-tech-blue text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                          -{p.discount}%
                        </span>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-tech-black/90 via-tech-dark/60 to-transparent p-4">
                        <h3 className="text-lg font-bold text-tech-white">{p.name}</h3>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-2xl font-extrabold text-tech-blue">${p.price}</span>
                          {p.oldPrice && (
                            <span className="line-through text-tech-text-secondary">${p.oldPrice}</span>
                          )}
                        </div>
                        <button
                          className="mt-4 tech-btn bg-tech-blue hover:bg-tech-pink text-white px-6 py-2 rounded-lg shadow transition-all duration-300"
                          onClick={() => {
                            dispatch(addToCart({ ...p, qty: 1 }));
                            toast.success("Item added to cart");
                          }}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Shop;