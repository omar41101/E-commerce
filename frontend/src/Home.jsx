import { Link } from "react-router-dom";
import { useGetTopProductsQuery } from "./redux/api/productApiSlice";
import Loader from "./components/Loader";
import Message from "./components/Message";
import { FaStar, FaShoppingCart, FaHeart, FaGamepad, FaDesktop, FaMobile } from "react-icons/fa";
import { SiPlaystation, SiXbox, SiNintendo, SiSteam } from "react-icons/si";
import ProductCarousel from "./pages/Products/ProductCarousel";

const Home = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const platformIcons = {
    PC: <FaDesktop className="text-tech-blue" />,
    PlayStation: <SiPlaystation className="text-tech-purple" />,
    Xbox: <SiXbox className="text-tech-emerald" />,
    Nintendo: <SiNintendo className="text-tech-red" />,
    Steam: <SiSteam className="text-tech-cyan" />,
    Mobile: <FaMobile className="text-tech-pink" />,
  };

  return (
    <div className="min-h-screen bg-tech-black text-tech-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-tech-dark via-tech-gray to-tech-black py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-tech-blue/10 via-tech-purple/10 to-tech-pink/10"></div>
        <div className="relative z-10 container mx-auto px-6">
          <div className="text-center space-y-8">
            <h1 className="text-6xl md:text-8xl font-display font-bold gradient-text animate-gradient-x">
              TECH STORE
            </h1>
            <p className="text-xl md:text-2xl text-tech-text-secondary font-tech max-w-3xl mx-auto leading-relaxed">
              Discover the future of gaming with cutting-edge technology and premium digital experiences
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/shop"
                className="tech-btn group relative overflow-hidden"
              >
                <span className="relative z-10">EXPLORE GAMES</span>
                <div className="absolute inset-0 bg-gradient-to-r from-tech-purple to-tech-pink opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link
                to="/register"
                className="tech-btn bg-gradient-to-r from-tech-emerald to-tech-cyan hover:from-tech-cyan hover:to-tech-emerald"
              >
                JOIN NOW
              </Link>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-tech-blue/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-tech-purple/20 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-tech-pink/20 rounded-full blur-xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-tech-dark">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-16 gradient-text">
            WHY CHOOSE US
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="tech-card p-8 text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-tech-blue to-tech-cyan rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaGamepad size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-4 text-tech-blue">Premium Games</h3>
              <p className="text-tech-text-secondary">Access to the latest and greatest games from top developers worldwide</p>
            </div>
            <div className="tech-card p-8 text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-tech-purple to-tech-pink rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaShoppingCart size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-4 text-tech-purple">Instant Delivery</h3>
              <p className="text-tech-text-secondary">Get your games instantly with secure digital delivery</p>
            </div>
            <div className="tech-card p-8 text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-tech-emerald to-tech-cyan rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaHeart size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-4 text-tech-emerald">24/7 Support</h3>
              <p className="text-tech-text-secondary">Round-the-clock customer support for all your gaming needs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stunning Product Carousel */}
      <div className="py-20 bg-tech-black">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-display font-bold gradient-text text-center mb-12">
            TOP PICKS
          </h2>
          <ProductCarousel />
        </div>
      </div>

      {/* Featured Products */}
      <div className="py-20 bg-tech-black">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold gradient-text">
              FEATURED GAMES
            </h2>
            <Link
              to="/shop"
              className="tech-btn bg-gradient-to-r from-tech-orange to-tech-yellow hover:from-tech-yellow hover:to-tech-orange"
            >
              VIEW ALL
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center">
              <Loader />
            </div>
          ) : error ? (
            <Message variant="danger">
              {error?.data?.message || error.error}
            </Message>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products?.map((product) => (
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
                      <Link
                        to={`/product/${product._id}`}
                        className="tech-btn bg-gradient-to-r from-tech-blue to-tech-purple hover:from-tech-purple hover:to-tech-blue text-sm px-4 py-2"
                      >
                        VIEW
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-tech-dark via-tech-gray to-tech-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-tech-blue/5 via-tech-purple/5 to-tech-pink/5"></div>
        <div className="relative z-10 container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 gradient-text">
            READY TO GAME?
          </h2>
          <p className="text-xl text-tech-text-secondary mb-12 max-w-2xl mx-auto">
            Join thousands of gamers and start your digital adventure today
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/register"
              className="tech-btn bg-gradient-to-r from-tech-emerald to-tech-cyan hover:from-tech-cyan hover:to-tech-emerald text-lg px-8 py-4"
            >
              GET STARTED
            </Link>
            <Link
              to="/shop"
              className="tech-btn bg-gradient-to-r from-tech-purple to-tech-pink hover:from-tech-pink hover:to-tech-purple text-lg px-8 py-4"
            >
              BROWSE GAMES
            </Link>
          </div>
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-tech-blue/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-tech-purple/10 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-tech-pink/5 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
      </div>
    </div>
  );
};

export default Home;
