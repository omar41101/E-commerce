import { Link } from "react-router-dom";

const SmallProduct = ({ product }) => {
  return (
    <div className="w-[12rem] ml-[6rem] p-2 m-4 bg-black shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={product.image}
          alt={product.name}
          className="h-[8rem] w-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>

      <div className="p-2 text-center">
        <Link to={`/product/${product._id}`}>
          <h2 className="text-md font-semibold text-white-900 mb-1">
            {product.name}
          </h2>
        </Link>
        <div className="bg-pink-500 text-white text-xs font-bold py-1 px-2 rounded-full inline-block mb-1">
          ${product.price}
        </div>
        <div className=" text-xs text-white">
          <p className="mb-1">
            <span className="font-semibold text-pink-600 ">Brand:</span> {product.brand}
          </p>
          <p className="mb-1">
            <span className="font-semibold text-pink-600">Rating:</span> {product.rating} ⭐
          </p>
          <p className="mb-1">
            <span className="font-semibold text-pink-600">In Stock:</span> {product.countInStock}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SmallProduct;
