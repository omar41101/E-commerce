import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import { FaBox, FaClock, FaShoppingCart, FaStar, FaStore } from "react-icons/fa";

const ProductCarousel = ({ products }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600, // Smoother transitions
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000, // 5 seconds per slide
  };

  return (
    <div className="mb-10 mx-auto max-w-5xl px-4">
      {!products || products.length === 0 ? null : (
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
              <div
                key={_id}
                className="relative bg-tech-dark rounded-2xl shadow-2xl overflow-hidden border-2 border-tech-blue/30 hover:border-tech-blue/80 transition-all duration-300 group"
                style={{ minHeight: '36rem' }}
              >
                {/* Removed glassmorphism overlay for clear image */}
                <img
                  src={image}
                  alt={name}
                  className="w-full object-cover h-[34rem] rounded-2xl transition-transform duration-500 group-hover:scale-105 z-0"
                  style={{ objectPosition: 'center' }}
                />

                {/* Details card, hidden by default, slides up on hover */}
                <div
                  className="absolute left-0 right-0 bottom-0 z-20 px-8 pb-8 opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"
                  style={{ pointerEvents: 'none' }}
                >
                  <div className="bg-tech-black/95 rounded-2xl p-10 shadow-2xl border-2 border-tech-blue/40 flex flex-col items-center gap-4 backdrop-blur-2xl pointer-events-auto">
                    <h2 className="text-4xl font-extrabold text-tech-blue drop-shadow-lg mb-2 text-center">{name}</h2>
                    <span className="text-3xl font-bold text-white bg-tech-blue/20 px-8 py-2 rounded-full shadow-lg mb-3 border border-tech-blue/40">
                      ${price}
                    </span>
                    <p className="text-tech-text-secondary text-center text-lg mb-3">
                      {description.length > 120 ? description.substring(0, 120) + "..." : description}
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 w-full text-tech-white text-lg">
                      <div className="flex items-center gap-2">
                        <FaStore className="text-tech-blue" /> {brand}
                      </div>
                      <div className="flex items-center gap-2">
                        <FaClock className="text-tech-blue" /> {moment(createdAt).fromNow()}
                      </div>
                      <div className="flex items-center gap-2">
                        <FaStar className="text-yellow-400" /> {rating} ({numReviews} reviews)
                      </div>
                      <div className="flex items-center gap-2">
                        <FaShoppingCart className="text-tech-blue" /> {quantity} pcs
                      </div>
                      <div className="flex items-center gap-2">
                        <FaBox className="text-tech-blue" /> {countInStock} in stock
                      </div>
                    </div>
                  </div>
                </div>
                {/* Neon glow effect */}
                <div className="absolute inset-0 rounded-2xl pointer-events-none z-0 group-hover:shadow-[0_0_40px_10px_rgba(0,255,255,0.3)] transition-all duration-500" />
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
