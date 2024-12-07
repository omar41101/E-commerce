import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Rating";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    } catch (error) {
      toast.error(error?.data || error.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <>
      <div className="max-w-screen-xl mx-auto px-6 py-8">
        <Link
          to="/"
          className="text-pink-500 font-medium hover:underline inline-block mb-4"
        >
          Go Back
        </Link>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.message}
          </Message>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Product Image in Pink Box */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="border-4 border-pink-500 rounded-lg shadow-lg p-2 bg-gray-800">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full object-cover rounded-md"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="lg:col-span-6 flex flex-col space-y-6">
              <h1 className="text-3xl font-semibold text-gray-100">
                {product.name}
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed">
                {product.description}
              </p>
              <p className="text-4xl font-bold text-pink-500">
                ${product.price}
              </p>

              <div className="grid grid-cols-2 gap-6 mt-6">
                <div>
                  <p className="flex items-center text-gray-300">
                    <FaStore className="mr-2 text-gray-400" /> Brand:{" "}
                    {product.brand}
                  </p>
                  <p className="flex items-center text-gray-300">
                    <FaClock className="mr-2 text-gray-400" />
                    Added: {moment(product.createAt).fromNow()}
                  </p>
                  <p className="flex items-center text-gray-300">
                    <FaStar className="mr-2 text-gray-400" />
                    Reviews: {product.numReviews}
                  </p>
                </div>
                <div>
                  <p className="flex items-center text-gray-300">
                    <FaStar className="mr-2 text-gray-400" />
                    Ratings: {product.rating}
                  </p>
                  <p className="flex items-center text-gray-300">
                    <FaShoppingCart className="mr-2 text-gray-400" />
                    Quantity: {product.quantity}
                  </p>
                  <p className="flex items-center text-gray-300">
                    <FaBox className="mr-2 text-gray-400" />
                    In Stock: {product.countInStock}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {product.countInStock > 0 && (
                  <select
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    className="p-2 bg-gray-700 text-gray-200 rounded-lg focus:ring focus:ring-pink-500"
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                )}

                <button
                  onClick={addToCartHandler}
                  disabled={product.countInStock === 0}
                  className={`${
                    product.countInStock > 0
                      ? "bg-pink-600 hover:bg-pink-700"
                      : "bg-gray-500 cursor-not-allowed"
                  } text-white py-2 px-6 rounded-lg font-medium transition`}
                >
                  Add to Cart
                </button>

                {/* Favorite Icon Beside Add to Cart */}
                  <HeartIcon
                    product={product}
                    className="text-pink-500 hover:text-pink-600"
                  />
               </div>

              <Ratings
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </div>

            {/* Product Tabs */}
            <div className="lg:col-span-12">
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
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetails;
