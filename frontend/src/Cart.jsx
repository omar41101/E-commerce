import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "./redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/shipping");
  };

  return (
    <>
      <div className="container min-h-screen flex flex-col items-center justify-center mx-auto bg-gradient-to-br from-tech-black via-tech-dark to-tech-purple/60 py-10">
        {cartItems.length === 0 ? (
          <div className="tech-card p-8 text-center text-lg font-semibold shadow-xl border border-tech-blue/30 backdrop-blur-lg">
            Your cart is empty <Link to="/shop" className="gradient-text hover:underline ml-2">Go To Shop</Link>
          </div>
        ) : (
          <div className="flex flex-col w-full max-w-4xl">
            <h1 className="text-3xl font-bold mb-8 gradient-text font-display tracking-wide text-center drop-shadow-lg">Shopping Cart</h1>
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item._id} className="tech-card flex items-center mb-2 p-4 shadow-lg border border-tech-blue/30 backdrop-blur-lg transition-all hover:shadow-pink-500/30">
                  <div className="w-20 h-20">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg shadow-md border border-tech-blue/30"
                    />
                  </div>
                  <div className="flex-1 ml-6">
                    <Link to={`/product/${item._id}`} className="gradient-text font-semibold text-lg hover:underline">
                      {item.name}
                    </Link>
                    <div className="mt-1 text-tech-text-secondary font-tech">{item.brand}</div>
                    <div className="mt-1 text-tech-pink font-bold text-lg">$ {item.price}</div>
                  </div>
                  <div className="w-28 mx-4">
                    <select
                      className="tech-search w-full p-2 text-lg font-tech text-tech-white bg-tech-light border border-tech-blue/30 rounded focus:ring-2 focus:ring-tech-blue transition-all duration-300"
                      value={item.qty}
                      onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1} className="bg-tech-dark text-tech-white">
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    className="ml-4 text-tech-red hover:scale-110 transition-all"
                    onClick={() => removeFromCartHandler(item._id)}
                  >
                    <FaTrash className="w-6 h-6" />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-12 w-full max-w-md mx-auto">
              <div className="tech-card p-8 rounded-lg shadow-xl border border-tech-blue/30 backdrop-blur-lg">
                <h2 className="text-2xl font-bold mb-4 gradient-text font-display tracking-wide text-center">Summary</h2>
                <div className="text-lg font-semibold mb-2 text-tech-white/90 text-center">
                  Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                </div>
                <div className="text-3xl font-bold mb-6 text-tech-pink text-center">
                  ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                </div>
                <button
                  className="tech-btn w-full text-lg py-3 mt-2 shadow-lg hover:shadow-pink-500/40 transition-all"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;