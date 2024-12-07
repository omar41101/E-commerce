import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const Ratings = ({ value, text }) => {
  const fullStars = Math.floor(value); // Number of full stars
  const halfStars = value - fullStars >= 0.5 ? 1 : 0; // Check for half star
  const emptyStars = 5 - fullStars - halfStars; // Remaining stars are empty

  return (
    <div className="flex items-center">
      {/* Full Stars */}
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={index} className="text-pink-500 ml-1" />
      ))}

      {/* Half Star */}
      {halfStars === 1 && <FaStarHalfAlt className="text-pink-500 ml-1" />}

      {/* Empty Stars */}
      {[...Array(emptyStars)].map((_, index) => (
        <FaRegStar key={index} className="text-gray-400 ml-1" />
      ))}

      {/* Text */}
      {text && <span className="ml-2 text-pink-500">{text}</span>}
    </div>
  );
};

export default Ratings;
