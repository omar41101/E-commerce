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
    <div className="min-h-screen bg-tech-black text-tech-white">
      {/* Hero Section */}
      <div className="py-20 px-6 rounded-lg shadow-xl bg-tech-dark/60 border-b border-tech-blue/10">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-display font-bold tracking-wider text-tech-blue">
            Your Favorite Products
          </h1>
          <p className="mt-4 text-lg text-tech-text-secondary">
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
              className="tech-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all bg-tech-dark border border-tech-blue/10"
            >
              <div className="h-52 bg-tech-dark flex items-center justify-center p-4 border-b border-tech-blue/10">
                <img
                  src={product.image || 'https://via.placeholder.com/300'}
                  alt={product.name}
                  className="h-full object-contain"
                />
              </div>

              <div className="p-6">
                <h2 className="text-xl font-semibold text-tech-white font-display">
                  {product.name}
                </h2>
                <p className="mt-2 text-sm text-tech-text-secondary">
                  {product.description.substring(0, 60)}...
                </p>
              </div>

              <div className="px-6 py-4 flex items-center justify-between gap-2">
                <button className="tech-btn bg-tech-blue hover:bg-tech-blue/80 text-white py-2 px-4 text-base font-medium focus:outline-none rounded-lg transition-colors duration-150">
                  View Details
                </button>

                <button className="tech-btn bg-tech-dark hover:bg-tech-blue/20 text-white py-2 px-4 text-base font-medium border border-tech-blue/20 focus:outline-none rounded-lg transition-colors duration-150">
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
          className={`tech-btn bg-tech-dark hover:bg-tech-blue/20 text-white px-6 py-3 rounded-full shadow-md transition-colors duration-150 ${
            currentPage === 1 && 'opacity-50 cursor-not-allowed'
          }`}
        >
          Previous
        </button>

        <span className="px-4 py-2 text-lg font-semibold text-tech-white">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`tech-btn bg-tech-dark hover:bg-tech-blue/20 text-white px-6 py-3 rounded-full shadow-md transition-colors duration-150 ${
            currentPage === totalPages && 'opacity-50 cursor-not-allowed'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Favorites;
