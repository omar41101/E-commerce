import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  saveShippingAddress,
  savePaymentMethod,
} from "../../redux/features/cart/cartSlice";
import ProgressSteps from "../../components/ProgressSteps";
import { FaMapMarkerAlt, FaCity, FaMailBulk, FaGlobe, FaCreditCard, FaPaypal } from "react-icons/fa";

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
    <div className="min-h-screen bg-tech-black text-tech-white py-8">
      <div className="container mx-auto px-6">
        <ProgressSteps step1 step2 />
        
        <div className="mt-16 flex justify-center">
          <div className="w-full max-w-2xl">
            <div className="tech-card p-8">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-display font-bold mb-4 gradient-text">
                  SHIPPING DETAILS
                </h1>
                <p className="text-tech-text-secondary">
                  Enter your shipping information to continue with your order
                </p>
              </div>

              <form onSubmit={submitHandler} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label className="block text-tech-blue font-display font-semibold mb-3 uppercase tracking-wider">
                      <FaMapMarkerAlt className="inline mr-2" />
                      Address
                    </label>
                    <input
                      type="text"
                      className="tech-search w-full"
                      placeholder="Enter your address"
                      value={address}
                      required
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  <div className="relative">
                    <label className="block text-tech-purple font-display font-semibold mb-3 uppercase tracking-wider">
                      <FaCity className="inline mr-2" />
                      City
                    </label>
                    <input
                      type="text"
                      className="tech-search w-full"
                      placeholder="Enter your city"
                      value={city}
                      required
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>

                  <div className="relative">
                    <label className="block text-tech-cyan font-display font-semibold mb-3 uppercase tracking-wider">
                      <FaMailBulk className="inline mr-2" />
                      Postal Code
                    </label>
                    <input
                      type="text"
                      className="tech-search w-full"
                      placeholder="Enter postal code"
                      value={postalCode}
                      required
                      onChange={(e) => setPostalCode(e.target.value)}
                    />
                  </div>

                  <div className="relative">
                    <label className="block text-tech-emerald font-display font-semibold mb-3 uppercase tracking-wider">
                      <FaGlobe className="inline mr-2" />
                      Country
                    </label>
                    <input
                      type="text"
                      className="tech-search w-full"
                      placeholder="Enter your country"
                      value={country}
                      required
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </div>
                </div>

                <div className="tech-card p-6 bg-gradient-to-r from-tech-blue/10 to-tech-purple/10 border-tech-blue/20">
                  <label className="block text-tech-blue font-display font-semibold mb-4 uppercase tracking-wider">
                    <FaCreditCard className="inline mr-2" />
                    Payment Method
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-3 cursor-pointer group">
                      <input
                        type="radio"
                        className="w-5 h-5 text-tech-blue bg-transparent border-2 border-tech-blue rounded-full focus:ring-tech-blue focus:ring-2"
                        name="paymentMethod"
                        value="PayPal"
                        checked={paymentMethod === "PayPal"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <div className="flex items-center space-x-2">
                        <FaPaypal className="text-tech-blue text-xl" />
                        <span className="font-display font-semibold group-hover:text-tech-blue transition-colors duration-300">
                          PayPal or Credit Card
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

                <button
                  className="tech-btn w-full text-lg py-4 bg-gradient-to-r from-tech-emerald to-tech-cyan hover:from-tech-cyan hover:to-tech-emerald"
                  type="submit"
                >
                  <span className="relative z-10">CONTINUE TO PAYMENT</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipping;