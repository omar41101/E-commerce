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
      <div className="min-h-screen bg-tech-black text-tech-white">
        <div className="max-w-screen-xl mx-auto px-6 py-8">
          <Link
            to="/"
            className="text-tech-blue font-medium hover:underline inline-block mb-4"
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
              {/* Product Image in Tech Card */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="tech-card border-4 border-tech-blue/20 rounded-xl shadow-lg p-2 bg-tech-dark">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full object-cover rounded-md border border-tech-blue/10"
                  />
                </div>
              </div>

              {/* Product Details */}
              <div className="lg:col-span-6 flex flex-col space-y-6">
                <h1 className="text-3xl font-bold text-tech-white font-display">
                  {product.name}
                </h1>
                <p className="text-tech-text-secondary text-lg leading-relaxed">
                  {product.description}
                </p>
                <p className="text-4xl font-bold text-tech-blue">
                  ${product.price}
                </p>

                <div className="grid grid-cols-2 gap-6 mt-6">
                  <div>
                    <p className="flex items-center text-tech-text-secondary">
                      <FaStore className="mr-2 text-tech-blue" /> Brand: {product.brand}
                    </p>
                    <p className="flex items-center text-tech-text-secondary">
                      <FaClock className="mr-2 text-tech-blue" />
                      Added: {moment(product.createAt).fromNow()}
                    </p>
                    <p className="flex items-center text-tech-text-secondary">
                      <FaStar className="mr-2 text-yellow-500" />
                      Reviews: {product.numReviews}
                    </p>
                  </div>
                  <div>
                    <p className="flex items-center text-tech-text-secondary">
                      <FaStar className="mr-2 text-yellow-500" />
                      Ratings: {product.rating}
                    </p>
                    <p className="flex items-center text-tech-text-secondary">
                      <FaShoppingCart className="mr-2 text-tech-blue" />
                      Quantity: {product.quantity}
                    </p>
                    <p className="flex items-center text-tech-text-secondary">
                      <FaBox className="mr-2 text-tech-blue" />
                      In Stock: {product.countInStock}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  {product.countInStock > 0 && (
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      className="p-2 bg-tech-dark border border-tech-blue/20 text-tech-white rounded-lg focus:ring focus:ring-tech-blue"
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1} className="text-black">
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  )}

                  <button
                    onClick={addToCartHandler}
                    disabled={product.countInStock === 0}
                    className={`tech-btn ${
                      product.countInStock > 0
                        ? "bg-tech-blue hover:bg-tech-blue/80"
                        : "bg-gray-500 cursor-not-allowed"
                    } text-white py-2 px-6 rounded-lg font-medium transition`}
                  >
                    Add to Cart
                  </button>

                  {/* Favorite Icon Beside Add to Cart */}
                  <HeartIcon
                    product={product}
                    className="text-tech-blue hover:text-tech-blue/80"
                  />
                </div>

                <Ratings
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </div>

              {/* Product Tabs */}
              <div className="lg:col-span-12 mt-8">
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
      </div>
    </>
  );
};

export default ProductDetails;
