import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaTrash, FaArrowLeft, FaCreditCard, FaShoppingCart } from "react-icons/fa";
import { addToCart, removeFromCart } from "./redux/features/cart/cartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
    toast.success("Item removed from cart");
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className="min-h-screen bg-tech-black text-tech-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/shop"
            className="flex items-center gap-2 text-tech-blue hover:text-tech-cyan transition-colors duration-300 font-display"
          >
            <FaArrowLeft size={20} />
            <span>BACK TO SHOP</span>
          </Link>
        </div>

        <h1 className="text-4xl md:text-5xl font-display font-bold mb-8 gradient-text">
          SHOPPING CART
        </h1>

        {cart.cartItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gradient-to-r from-tech-blue to-tech-purple rounded-full flex items-center justify-center mx-auto mb-6">
              <FaShoppingCart size={48} className="text-white" />
            </div>
            <h2 className="text-2xl font-display font-semibold mb-4 text-tech-white">
              Your cart is empty
            </h2>
            <p className="text-tech-text-secondary mb-8">
              Looks like you haven't added any games to your cart yet.
            </p>
            <Link
              to="/shop"
              className="tech-btn bg-gradient-to-r from-tech-emerald to-tech-cyan hover:from-tech-cyan hover:to-tech-emerald"
            >
              START SHOPPING
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cart.cartItems.map((item) => (
                <div key={item._id} className="tech-card p-6">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      {item.discount > 0 && (
                        <div className="absolute -top-2 -right-2 tech-discount text-xs">
                          -{item.discount}%
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-display font-semibold text-tech-white mb-2">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-tech-text-secondary mb-3">
                        {item.category && (
                          <span className="tech-category-tag">
                            {item.category}
                          </span>
                        )}
                        {item.platform && (
                          <span className="tech-category-tag">
                            {item.platform.join(", ")}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4">
                        {item.oldPrice && (
                          <span className="tech-price-old">
                            ${item.oldPrice}
                          </span>
                        )}
                        <span className="tech-price">
                          ${item.price}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-tech-light rounded-lg">
                        <button
                          onClick={() => addToCartHandler(item, item.qty - 1)}
                          disabled={item.qty === 1}
                          className="px-3 py-2 text-tech-blue hover:text-tech-cyan disabled:text-tech-text-secondary disabled:cursor-not-allowed transition-colors duration-300"
                        >
                          -
                        </button>
                        <span className="px-4 py-2 text-tech-white font-display font-semibold">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => addToCartHandler(item, item.qty + 1)}
                          className="px-3 py-2 text-tech-blue hover:text-tech-cyan transition-colors duration-300"
                        >
                          +
                        </button>
                      </div>
                      
                      <button
                        onClick={() => removeFromCartHandler(item._id)}
                        className="p-2 text-tech-red hover:text-red-400 transition-colors duration-300 hover:scale-110"
                      >
                        <FaTrash size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="tech-card p-6 sticky top-8">
                <h2 className="text-2xl font-display font-bold mb-6 text-tech-blue">
                  ORDER SUMMARY
                </h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-tech-text-secondary">Subtotal:</span>
                    <span className="text-tech-white font-display font-semibold">
                      ${cart.itemsPrice}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-tech-text-secondary">Shipping:</span>
                    <span className="text-tech-white font-display font-semibold">
                      ${cart.shippingPrice}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-tech-text-secondary">Tax:</span>
                    <span className="text-tech-white font-display font-semibold">
                      ${cart.taxPrice}
                    </span>
                  </div>
                  <div className="border-t border-tech-light pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-display font-bold text-tech-blue">Total:</span>
                      <span className="text-xl font-display font-bold tech-price">
                        ${cart.totalPrice}
                      </span>
                    </div>
                  </div>
                </div>

                {userInfo ? (
                  <button
                    onClick={checkoutHandler}
                    disabled={cart.cartItems.length === 0}
                    className="w-full tech-btn bg-gradient-to-r from-tech-emerald to-tech-cyan hover:from-tech-cyan hover:to-tech-emerald disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <FaCreditCard size={20} />
                    PROCEED TO CHECKOUT
                  </button>
                ) : (
                  <Link
                    to="/login?redirect=/shipping"
                    className="w-full tech-btn bg-gradient-to-r from-tech-purple to-tech-pink hover:from-tech-pink hover:to-tech-purple flex items-center justify-center gap-2"
                  >
                    <FaCreditCard size={20} />
                    LOGIN TO CHECKOUT
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;