import { useState } from "react";
import { Link } from "react-router-dom";
import Ratings from "./Rating";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import SmallProduct from "./SmallProduct";
import Loader from "../../components/Loader";

const ProductTabs = ({
  loadingProductReview,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  product,
}) => {
  const { data, isLoading } = useGetTopProductsQuery();

  const [activeTab, setActiveTab] = useState(1);

  if (isLoading) {
    return <Loader />;
  }

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="flex flex-col md:flex-row bg-tech-dark rounded-xl p-6 mt-8 shadow-lg border border-tech-blue/10">
      <section className="mr-[5rem] flex flex-col gap-2">
        <div
          className={`flex-1 p-4 cursor-pointer text-lg rounded-lg transition-colors duration-150 ${
            activeTab === 1 ? "bg-tech-blue/20 text-tech-blue font-bold" : "hover:bg-tech-blue/10 text-tech-white"
          }`}
          onClick={() => handleTabClick(1)}
        >
          Write Your Review
        </div>
        <div
          className={`flex-1 p-4 cursor-pointer text-lg rounded-lg transition-colors duration-150 ${
            activeTab === 2 ? "bg-tech-blue/20 text-tech-blue font-bold" : "hover:bg-tech-blue/10 text-tech-white"
          }`}
          onClick={() => handleTabClick(2)}
        >
          All Reviews
        </div>
        <div
          className={`flex-1 p-4 cursor-pointer text-lg rounded-lg transition-colors duration-150 ${
            activeTab === 3 ? "bg-tech-blue/20 text-tech-blue font-bold" : "hover:bg-tech-blue/10 text-tech-white"
          }`}
          onClick={() => handleTabClick(3)}
        >
          Related Products
        </div>
      </section>

      {/* Second Part */}
      <section className="flex-1">
        {activeTab === 1 && (
          <div className="mt-4">
            {userInfo ? (
              <form onSubmit={submitHandler} className="bg-tech-black p-6 rounded-lg shadow-md border border-tech-blue/10">
                <div className="my-2">
                  <label htmlFor="rating" className="block text-xl mb-2 text-tech-white">
                    Rating
                  </label>

                  <select
                    id="rating"
                    required
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="p-2 border border-tech-blue/20 rounded-lg xl:w-[40rem] text-tech-white bg-tech-dark focus:ring focus:ring-tech-blue"
                  >
                    <option value="" className="text-black">Select</option>
                    <option value="1" className="text-black">Inferior</option>
                    <option value="2" className="text-black">Decent</option>
                    <option value="3" className="text-black">Great</option>
                    <option value="4" className="text-black">Excellent</option>
                    <option value="5" className="text-black">Exceptional</option>
                  </select>
                </div>

                <div className="my-2">
                  <label htmlFor="comment" className="block text-xl mb-2 text-tech-white">
                    Comment
                  </label>

                  <textarea
                    id="comment"
                    rows="3"
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="p-2 border border-tech-blue/20 rounded-lg xl:w-[40rem] text-tech-white bg-tech-dark focus:ring focus:ring-tech-blue"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loadingProductReview}
                  className="tech-btn bg-tech-blue hover:bg-tech-blue/80 text-white py-2 px-6 rounded-lg mt-4 font-medium transition"
                >
                  Submit
                </button>
              </form>
            ) : (
              <p className="text-tech-text-secondary">
                Please <Link to="/login" className="text-tech-blue underline">sign in</Link> to write a review
              </p>
            )}
          </div>
        )}
      </section>

      <section className="flex-1">
        {activeTab === 2 && (
          <>
            <div>{product.reviews.length === 0 && <p className="text-tech-text-secondary">No Reviews</p>}</div>

            <div>
              {product.reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-tech-black p-4 rounded-lg xl:ml-[2rem] sm:ml-[0rem] xl:w-[50rem] sm:w-[24rem] mb-5 border border-tech-blue/10 shadow"
                >
                  <div className="flex justify-between">
                    <strong className="text-tech-blue">{review.name}</strong>
                    <p className="text-tech-text-secondary">
                      {review.createdAt.substring(0, 10)}
                    </p>
                  </div>

                  <p className="my-4 text-tech-white">{review.comment}</p>
                  <Ratings value={review.rating} />
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      <section className="flex-1">
        {activeTab === 3 && (
          <section className="ml-[4rem] flex flex-wrap gap-4">
            {!data ? (
              <Loader />
            ) : (
              data.map((product) => (
                <div key={product._id}>
                  <SmallProduct product={product} />
                </div>
              ))
            )}
          </section>
        )}
      </section>
    </div>
  );
};

export default ProductTabs;