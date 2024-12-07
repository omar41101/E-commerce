import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added to cart", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  return (
    <div className="max-w-sm relative bg-gradient-to-b from-[#1A1A1A] to-[#2A2A2A] rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
      <section className="relative">
        <Link to={`/product/${p._id}`}>
          <span className="absolute bottom-3 right-3 bg-pink-600 text-white text-xs font-medium mr-2 px-3 py-1 rounded-full shadow-md">
            {p?.brand}
          </span>
          <img
            className="cursor-pointer w-full rounded-t-lg transition-transform duration-300 hover:scale-110"
            src={p.image}
            alt={p.name}
            style={{ height: "180px", objectFit: "cover" }}
          />
        </Link>
        <HeartIcon product={p} />
      </section>

      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h5 className="text-lg font-semibold text-gray-100 truncate">
            {p?.name}
          </h5>
          <p className="text-lg font-bold text-pink-400">
            {p?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
        </div>

        <p className="mb-4 text-gray-400 text-sm h-12 overflow-hidden">
          {p?.description?.substring(0, 60)}...
        </p>

        <section className="flex justify-between items-center">
          <Link
            to={`/product/${p._id}`}
            className="inline-flex items-center px-5 py-2 bg-pink-600 text-white text-sm font-medium rounded-lg hover:bg-pink-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            Read More
            <svg
              className="w-4 h-4 ml-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14m0 0l-6-6m6 6l-6 6"
              />
            </svg>
          </Link>

          <button
            className="p-3 bg-gray-700 hover:bg-gray-600 text-white rounded-full shadow-md transition duration-300"
            onClick={() => addToCartHandler(p, 1)}
          >
            <AiOutlineShoppingCart size={20} />
          </button>
        </section>
      </div>
    </div>
  );
};

export default ProductCard;
