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
    <div className="tech-card max-w-sm relative rounded-xl shadow-lg hover:shadow-xl transition-all">
      <section className="relative">
        <Link to={`/product/${p._id}`}>
          <span className="absolute bottom-3 right-3 bg-tech-blue/10 text-tech-blue text-xs font-semibold mr-2 px-3 py-1 rounded-full shadow-md">
            {p?.brand}
          </span>
          <img
            className="cursor-pointer w-full rounded-t-xl border border-tech-blue/10 transition-transform duration-300 hover:scale-105"
            src={p.image}
            alt={p.name}
            style={{ height: "180px", objectFit: "cover" }}
          />
        </Link>
        <HeartIcon product={p} />
      </section>

      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h5 className="text-lg font-semibold text-tech-white font-display truncate">
            {p?.name}
          </h5>
          <span className="text-lg font-bold text-tech-blue">
            {p?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </span>
        </div>

        <p className="mb-4 text-tech-text-secondary text-sm h-12 overflow-hidden">
          {p?.description?.substring(0, 60)}...
        </p>

        <section className="flex justify-between items-center">
          <Link
            to={`/product/${p._id}`}
            className="tech-btn bg-tech-blue hover:bg-tech-blue/80 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors duration-150"
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
            className="p-3 bg-tech-blue hover:bg-tech-blue/80 text-white rounded-full shadow-md transition-colors duration-150"
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
