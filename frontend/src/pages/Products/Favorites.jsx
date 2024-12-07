import { useState } from "react";
import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Calculate total pages
  const totalPages = Math.ceil(favorites.length / productsPerPage);

  // Get current products for the page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = favorites.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="  py-20 px-6 rounded-lg shadow-xl">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold tracking-wider">
            Your Favorite Products
          </h1>
          <p className="mt-4 text-lg">
            Browse your handpicked favorite items, personalized just for you.
          </p>
        </div>
      </div>

      {/* Product Grid Section */}
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {currentProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl"
            >
              <div className="h-52 bg-gray-200 flex items-center justify-center p-4">
                <img
                  src={product.image || "https://via.placeholder.com/300"}
                  alt={product.name}
                  className="h-full object-contain"
                />
              </div>

              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {product.name}
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  {product.description.substring(0, 60)}...
                </p>
              </div>

              <div className="px-6 py-4 flex items-center justify-between">
                <button className="bg-gradient-to-r from-teal-400 to-blue-500 text-white py-2 px-4 rounded-lg shadow-sm hover:bg-gradient-to-l from-teal-500 to-blue-600 transition-all duration-300 text-base font-medium focus:outline-none">
                  View Details
                </button>

                <button className="bg-gradient-to-r from-pink-400 to-red-500 text-white py-2 px-2 rounded-lg shadow-sm hover:bg-gradient-to-l from-pink-500 to-red-600 transition-all duration-300 text-base font-medium focus:outline-none">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-4 py-10">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-700 text-white rounded-full shadow-md hover:bg-gradient-to-l from-gray-600 to-gray-800 transition-all duration-300 ${
            currentPage === 1 && "opacity-50 cursor-not-allowed"
          }`}
        >
          Previous
        </button>

        <span className="px-4 py-2 text-lg font-semibold text-gray-900">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-700 text-white rounded-full shadow-md hover:bg-gradient-to-l from-gray-600 to-gray-800 transition-all duration-300 ${
            currentPage === totalPages && "opacity-50 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Favorites;
