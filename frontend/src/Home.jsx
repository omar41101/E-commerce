import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "./redux/api/productApiSlice";
import Loader from "./components/Loader";
import Message from "./components/Message";
import Header from "./components/Header";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 mx-auto">
      {!keyword && <Header />}

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">{isError?.data?.message || "An error occurred"}</Message>
      ) : (
        <div className="container mx-auto px-6 py-8">
          {/* Top Section */}
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 ml-20">Top Products</h1>
            <Link
              to="/shop"
              className="bg-pink-600 text-white font-bold rounded-full py-2 px-6 hover:bg-pink-700 transition-transform transform hover:scale-105"
            >
              View All Products
            </Link>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 ml-10 gap-6">
            {data?.products.map((product) => (
              <div
                key={product._id}
                className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                style={{ height: '380px' }} // Ensures all cards are the same height
              >
                {/* Product Image */}
                <div className="relative h-1/2 w-full overflow-hidden border-b border-gray-200">
                  <img
                    src={product.image || "https://via.placeholder.com/300"}
                    alt={product.name}
                    className="object-cover object-center w-full h-full transition-transform duration-300 hover:scale-105"
                  />
                </div>

                {/* Product Info */}
                <div className="p-4 h-1/2 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
                    <p className="text-gray-600 mt-1 font-medium">${product.price.toFixed(2)}</p>
                    <p className="text-gray-500 text-sm mt-2 truncate">{product.description.substring(0, 60)}</p>
                  </div>

                  <Link
                    to={`/product/${product._id}`}
                    className="text-pink-600 hover:text-pink-800 text-sm mt-2 inline-block"
                  >
                    More details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
