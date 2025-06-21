import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import ProgressSteps from "../../components/ProgressSteps";
import Loader from "../../components/Loader";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";

const PlaceOrder = () => {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const dispatch = useDispatch();

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <ProgressSteps step1 step2 step3 />
      <div className="container mx-auto mt-12 min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-tech-black via-tech-dark to-tech-purple/60 animate-float">
        {cart.cartItems.length === 0 ? (
          <Message>Your cart is empty</Message>
        ) : (
          <div className="overflow-x-auto w-full max-w-3xl mb-10">
            <table className="w-full border-collapse tech-card shadow-xl backdrop-blur-lg">
              <thead>
                <tr className="bg-gradient-to-r from-tech-blue/20 to-tech-purple/20">
                  <td className="px-3 py-3 text-left font-bold text-tech-blue uppercase tracking-wider">Image</td>
                  <td className="px-3 py-3 text-left font-bold text-tech-blue uppercase tracking-wider">Product</td>
                  <td className="px-3 py-3 text-left font-bold text-tech-blue uppercase tracking-wider">Quantity</td>
                  <td className="px-3 py-3 text-left font-bold text-tech-blue uppercase tracking-wider">Price</td>
                  <td className="px-3 py-3 text-left font-bold text-tech-blue uppercase tracking-wider">Total</td>
                </tr>
              </thead>
              <tbody>
                {cart.cartItems.map((item, index) => (
                  <tr key={index} className="hover:bg-tech-light transition-all">
                    <td className="p-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg shadow-md border border-tech-blue/30"
                      />
                    </td>
                    <td className="p-3">
                      <Link to={`/product/${item.product}`} className="gradient-text font-semibold hover:underline">{item.name}</Link>
                    </td>
                    <td className="p-3 text-center">{item.qty}</td>
                    <td className="p-3 text-center">{item.price.toFixed(2)}</td>
                    <td className="p-3 text-center">$ {(item.qty * item.price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="w-full max-w-3xl">
          <h2 className="text-3xl font-bold mb-6 gradient-text font-display tracking-wide text-center drop-shadow-lg">Order Summary</h2>
          <div className="flex flex-col md:flex-row justify-between flex-wrap gap-8 p-8 tech-card shadow-xl border border-tech-blue/30 backdrop-blur-lg">
            <ul className="text-lg space-y-2">
              <li>
                <span className="font-semibold">Items:</span> $ {cart.itemsPrice}
              </li>
              <li>
                <span className="font-semibold">Shipping:</span> $ {cart.shippingPrice}
              </li>
              <li>
                <span className="font-semibold">Tax:</span> $ {cart.taxPrice}
              </li>
              <li>
                <span className="font-semibold">Total:</span> $ {cart.totalPrice}
              </li>
            </ul>
            {error && <Message variant="danger">{error.data.message}</Message>}
            <div>
              <h2 className="text-xl font-bold mb-2 gradient-text">Shipping</h2>
              <p className="text-tech-white/90">
                <strong>Address:</strong> {cart.shippingAddress.address}, {cart.shippingAddress.city} {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2 gradient-text">Payment Method</h2>
              <strong className="text-tech-pink">Method:</strong> {cart.paymentMethod}
            </div>
          </div>
          <button
            type="button"
            className="tech-btn w-full text-lg py-3 mt-8 shadow-lg hover:shadow-pink-500/40 transition-all"
            disabled={cart.cartItems === 0}
            onClick={placeOrderHandler}
          >
            Place Order
          </button>
          {isLoading && <Loader />}
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;