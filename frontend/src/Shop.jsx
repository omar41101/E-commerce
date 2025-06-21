import { useState, useEffect } from "react";
import { useGetProductsQuery } from "./redux/api/productApiSlice";
import { FaStar, FaShoppingCart, FaHeart, FaGamepad, FaDesktop, FaMobile, FaSearch, FaFilter } from "react-icons/fa";
import { SiPlaystation, SiXbox, SiNintendo, SiSteam } from "react-icons/si";
import { Link } from "react-router-dom";
import Loader from "./components/Loader";
import Message from "./components/Message";
import { addToCart } from "./redux/features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  const dispatch = useDispatch();
  const { data: products, isLoading, error } = useGetProductsQuery();

  const platformIcons = {
    PC: <FaDesktop className="text-tech-blue" />,
    PlayStation: <SiPlaystation className="text-tech-purple" />,
    Xbox: <SiXbox className="text-tech-emerald" />,
    Nintendo: <SiNintendo className="text-tech-red" />,
    Steam: <SiSteam className="text-tech-cyan" />,
    Mobile: <FaMobile className="text-tech-pink" />,
  };

  const categories = ["Action", "Adventure", "RPG", "Strategy", "Sports", "Racing", "Puzzle", "Horror"];
  const platforms = ["PC", "PlayStation", "Xbox", "Nintendo", "Steam", "Mobile"];

  // Filter and search products
  const filteredProducts = products?.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesPlatform = !selectedPlatform || product.platform?.includes(selectedPlatform);
    
    return matchesSearch && matchesCategory && matchesPlatform;
  }) || [];

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0;
    }
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const addToCartHandler = (product) => {
    dispatch(addToCart({ ...product, qty: 1 }));
    toast.success("Item added to cart");
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedPlatform("");
    setSortBy("");
    setCurrentPage(1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedPlatform, sortBy]);

  return (
    <div className="min-h-screen bg-tech-black text-tech-white py-8">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 gradient-text">
            GAME STORE
          </h1>
          <p className="text-xl text-tech-text-secondary">
            Discover the latest and greatest games from top developers
          </p>
        </div>

        {/* Search and Filters */}
        <div className="tech-card p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-tech-text-secondary" />
              <input
                type="text"
                placeholder="Search games..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="tech-search w-full pl-12"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="tech-search"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* Platform Filter */}
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="tech-search"
            >
              <option value="">All Platforms</option>
              {platforms.map((platform) => (
                <option key={platform} value={platform}>
                  {platform}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="tech-search"
            >
              <option value="">Sort By</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name</option>
              <option value="rating">Rating</option>
            </select>
          </div>

          {/* Clear Filters */}
          {(searchTerm || selectedCategory || selectedPlatform || sortBy) && (
            <div className="mt-4 flex justify-center">
              <button
                onClick={clearFilters}
                className="tech-btn bg-gradient-to-r from-tech-orange to-tech-yellow hover:from-tech-yellow hover:to-tech-orange text-sm px-6 py-2"
              >
                <FaFilter className="mr-2" />
                CLEAR FILTERS
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-tech-text-secondary">
            Showing {currentProducts.length} of {filteredProducts.length} games
          </p>
          {filteredProducts.length > 0 && (
            <p className="text-tech-blue font-display font-semibold">
              {filteredProducts.length} games found
            </p>
          )}
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader />
          </div>
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : currentProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gradient-to-r from-tech-purple to-tech-pink rounded-full flex items-center justify-center mx-auto mb-6">
              <FaGamepad size={48} className="text-white" />
            </div>
            <h2 className="text-2xl font-display font-semibold mb-4 text-tech-white">
              No games found
            </h2>
            <p className="text-tech-text-secondary mb-8">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <button
              onClick={clearFilters}
              className="tech-btn bg-gradient-to-r from-tech-blue to-tech-purple hover:from-tech-purple hover:to-tech-blue"
            >
              CLEAR ALL FILTERS
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentProducts.map((product) => (
                <div key={product._id} className="tech-card group overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {product.discount > 0 && (
                      <div className="absolute top-4 left-4 tech-discount">
                        -{product.discount}%
                      </div>
                    )}
                    <div className="absolute top-4 right-4 flex gap-2">
                      {product.platform?.map((platform) => (
                        <div key={platform} className="tech-platform">
                          {platformIcons[platform] || <FaGamepad />}
                        </div>
                      ))}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-tech-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-display font-semibold text-tech-white group-hover:text-tech-blue transition-colors duration-300">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-1">
                        <FaStar className="tech-rating" />
                        <span className="text-sm text-tech-text-secondary">
                          {product.rating?.toFixed(1) || "N/A"}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-4">
                      {product.category && (
                        <span className="tech-category-tag">
                          {product.category}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {product.oldPrice && (
                          <span className="tech-price-old">
                            ${product.oldPrice}
                          </span>
                        )}
                        <span className="tech-price">
                          ${product.price}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Link
                          to={`/product/${product._id}`}
                          className="tech-btn bg-gradient-to-r from-tech-blue to-tech-purple hover:from-tech-purple hover:to-tech-blue text-sm px-3 py-2"
                        >
                          VIEW
                        </Link>
                        <button
                          onClick={() => addToCartHandler(product)}
                          className="tech-btn bg-gradient-to-r from-tech-emerald to-tech-cyan hover:from-tech-cyan hover:to-tech-emerald text-sm px-3 py-2"
                        >
                          <FaShoppingCart size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="tech-pagination mt-12">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="tech-btn bg-gradient-to-r from-tech-gray to-tech-light hover:from-tech-light hover:to-tech-gray disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`tech-btn ${
                      currentPage === page
                        ? "bg-gradient-to-r from-tech-blue to-tech-purple"
                        : "bg-gradient-to-r from-tech-gray to-tech-light hover:from-tech-light hover:to-tech-gray"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="tech-btn bg-gradient-to-r from-tech-gray to-tech-light hover:from-tech-light hover:to-tech-gray disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Shop;
