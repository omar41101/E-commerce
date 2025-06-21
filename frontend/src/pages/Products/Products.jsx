import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Rating from "./Rating";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { addToCart } from "../../redux/features/cart/cartSlice";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import ProductTabs from "./Tabs";
import HeartIcon from "./HeartIcon";

const Product = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-tech-black text-tech-white">
        <div>
          <Link
            className="text-tech-blue font-semibold hover:underline ml-[10rem]"
            to="/"
          >
            Go Back
          </Link>
        </div>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <>
            <div className="flex flex-wrap relative items-between mt-[2rem] ml-[10rem]">
              <div>
                <div className="tech-card border-4 border-tech-blue/20 rounded-xl shadow-lg p-2 bg-tech-dark">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full xl:w-[50rem] lg:w-[45rem] md:w-[30rem] sm:w-[20rem] mr-[2rem] object-cover rounded-md border border-tech-blue/10"
                  />
                  <HeartIcon product={product} />
                </div>
              </div>
              <div className="flex flex-col justify-between ml-8">
                <h2 className="text-3xl font-bold text-tech-white font-display">{product.name}</h2>

                <p className="my-4 xl:w-[35rem] lg:w-[35] md:w-[30rem] text-tech-text-secondary text-lg leading-relaxed">
                  {product.description}
                </p>
                <p className="text-5xl my-4 font-extrabold text-tech-blue">${product.price}</p>
                {/* --------------------------------------------------- */}

                <div className="flex items-center justify-between w-[20rem]">
                  <div className="one">
                    <h1 className="flex items-center mb-6 text-tech-text-secondary">
                      <FaStore className="mr-2 text-tech-blue" /> Brand: {product.brand}
                    </h1>
                    <h1 className="flex items-center mb-6 text-tech-text-secondary">
                      <FaClock className="mr-2 text-tech-blue" /> Added: {moment(product.createdAt).fromNow()}
                    </h1>
                    <h1 className="flex items-center mb-6 text-tech-text-secondary">
                      <FaStar className="mr-2 text-yellow-500" /> Reviews: {product.numReviews}
                    </h1>
                  </div>

                  <div className="two">
                    <h1 className="flex items-center mb-6 text-tech-text-secondary">
                      <FaStar className="mr-2 text-yellow-500" /> Ratings: {product.rating}
                    </h1>
                    <h1 className="flex items-center mb-6 text-tech-text-secondary">
                      <FaShoppingCart className="mr-2 text-tech-blue" /> Quantity: {product.quantity}
                    </h1>
                    <h1 className="flex items-center mb-6 text-tech-text-secondary">
                      <FaBox className="mr-2 text-tech-blue" /> In Stock: {product.countInStock}
                    </h1>
                  </div>
                </div>

                <div className="flex justify-between flex-wrap items-center mt-4">
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />

                  {product.countInStock > 0 && (
                    <div className="">
                      <select
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                        className="p-2 w-[6rem] rounded-lg bg-tech-dark border border-tech-blue/20 text-tech-white focus:ring focus:ring-tech-blue"
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1} className="text-black">
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                <div className="btn-container mt-4">
                  <button
                    onClick={addToCartHandler}
                    disabled={product.countInStock === 0}
                    className={`tech-btn ${
                      product.countInStock > 0
                        ? "bg-tech-blue hover:bg-tech-blue/80"
                        : "bg-gray-500 cursor-not-allowed"
                    } text-white py-2 px-6 rounded-lg font-medium transition`}
                  >
                    Add To Cart
                  </button>
                </div>
                {/* --------------------------------------------------- */}
              </div>
            </div>

            <div className="mt-[5rem] container flex flex-wrap items-start justify-between ml-[10rem]">
              <ProductTabs
                loadingProductReview={loadingProductReview}
                userInfo={userInfo}
                submitHandler={submitHandler}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                product={product}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Product;