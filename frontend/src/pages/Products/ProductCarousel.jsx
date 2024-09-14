import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import { FaBox, FaClock, FaShoppingCart, FaStar, FaStore } from "react-icons/fa";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: true,
    infinite: true,
    speed: 600, // Smoother transitions
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000, // Slower autoplay for readability
  };

  return (
    <div className="mb-6 mx-auto max-w-screen-md px-4">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Slider {...settings}>
          {products.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <div key={_id} className="bg-black shadow-md rounded-lg overflow-hidden">
                <img
                  src={image}
                  alt={name}
                  className="w-full object-cover h-[15rem] sm:h-[12rem] md:h-[14rem] lg:h-[16rem] rounded-t-lg transition-transform duration-300 hover:scale-105"
                />

                <div className="p-4">
                  <h2 className="text-lg font-bold text-pink-500">{name}</h2>
                  <p className="text-md font-semibold text-pink-400 mb-1">$ {price}</p>
                  <p className="text-sm text-gray-200 mb-2">
                    {description.length > 120
                      ? description.substring(0, 120) + "..."
                      : description}
                  </p>

                  <div className="flex flex-wrap justify-between text-gray-300">
                    <div className="w-full sm:w-1/2 mb-1">
                      <p className="flex items-center mb-1">
                        <FaStore className="mr-2 text-pink-400" /> Brand: {brand}
                      </p>
                      <p className="flex items-center mb-1">
                        <FaClock className="mr-2 text-pink-400" /> Added:{" "}
                        {moment(createdAt).fromNow()}
                      </p>
                      <p className="flex items-center">
                        <FaStar className="mr-2 text-yellow-500" /> Reviews: {numReviews}
                      </p>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <p className="flex items-center mb-1">
                        <FaStar className="mr-2 text-yellow-500" /> Rating:{" "}
                        {Math.round(rating)}
                      </p>
                      <p className="flex items-center mb-1">
                        <FaShoppingCart className="mr-2 text-pink-400" /> Quantity: {quantity}
                      </p>
                      <p className="flex items-center">
                        <FaBox className="mr-2 text-pink-400" /> In Stock: {countInStock}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
