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
  const currentProducts = favorites.slice(indexOfFirstProduct, indexOfLastProduct);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-16 shadow-lg">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold tracking-wider">Your Favorite Products</h1>
          <p className="mt-4 text-lg">Browse your handpicked favorite items, personalized just for you.</p>
        </div>
      </div>

      {/* Product Grid Section */}
      <div className="container mx-auto px-6 py-10 ml-8 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {currentProducts.map((product) => (
            <div 
              key={product._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
              
              <div className="h-52 bg-gray-200 flex items-center justify-center">
                <img
                  src={product.image || "https://via.placeholder.com/300"}
                  alt={product.name}
                  className="h-full object-contain p-4"
                />
              </div>
              
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900">{product.name}</h2>
                <p className="mt-2 text-sm text-gray-500">{product.description.substring(0, 60)}...</p>
              </div>
              
              <div className="px-6 py-4">
                <button
                  className="bg-indigo-600 text-white py-2 px-4 rounded-lg shadow hover:bg-indigo-500 transition-all"
                >
                  View Details
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
          className={`px-5 py-3 bg-gray-800 text-white rounded-full ${currentPage === 1 && "opacity-50 cursor-not-allowed"}`}
        >
          Previous
        </button>
        
        <span className="px-4 py-2 text-lg font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-5 py-3 bg-gray-800 text-white rounded-full ${currentPage === totalPages && "opacity-50 cursor-not-allowed"}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Favorites;
