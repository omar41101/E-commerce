import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  saveShippingAddress,
  savePaymentMethod,
} from "../../redux/features/cart/cartSlice";
import ProgressSteps from "../../components/ProgressSteps";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  // Payment
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  return (
    <div className="container mx-auto mt-10 min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-tech-black via-tech-dark to-tech-purple/60 animate-float">
      <ProgressSteps step1 step2 />
      <div className="mt-10 flex justify-center items-center w-full">
        <form onSubmit={submitHandler} className="tech-card w-full max-w-xl p-10 shadow-xl border border-tech-blue/30 backdrop-blur-lg">
          <h1 className="text-3xl font-bold mb-8 gradient-text font-display tracking-wide text-center drop-shadow-lg">Shipping</h1>
          <div className="mb-6">
            <label className="block text-tech-white mb-2 font-semibold">Address</label>
            <input
              type="text"
              className="tech-search w-full p-3 text-lg focus:ring-2 focus:ring-tech-blue transition-all duration-300"
              placeholder="Enter address"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-tech-white mb-2 font-semibold">City</label>
            <input
              type="text"
              className="tech-search w-full p-3 text-lg focus:ring-2 focus:ring-tech-blue transition-all duration-300"
              placeholder="Enter city"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-tech-white mb-2 font-semibold">Postal Code</label>
            <input
              type="text"
              className="tech-search w-full p-3 text-lg focus:ring-2 focus:ring-tech-blue transition-all duration-300"
              placeholder="Enter postal code"
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-tech-white mb-2 font-semibold">Country</label>
            <input
              type="text"
              className="tech-search w-full p-3 text-lg focus:ring-2 focus:ring-tech-blue transition-all duration-300"
              placeholder="Enter country"
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div className="mb-8">
            <label className="block text-tech-text-secondary font-semibold">Select Method</label>
            <div className="mt-3 flex items-center space-x-4">
              <label className="inline-flex items-center cursor-pointer hover-glow transition-all">
                <input
                  type="radio"
                  className="form-radio text-pink-500 focus:ring-tech-pink"
                  name="paymentMethod"
                  value="PayPal"
                  checked={paymentMethod === "PayPal"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="ml-3 text-lg font-tech text-tech-pink">PayPal or Credit Card</span>
              </label>
            </div>
          </div>
          <button
            className="tech-btn w-full text-lg py-3 mt-2 shadow-lg hover:shadow-pink-500/40 transition-all"
            type="submit"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;