import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return <>
    <div className="tech-card max-w-sm ml-8 p-0 relative rounded-xl shadow-lg hover:shadow-xl transition-all bg-tech-dark border border-tech-blue/10">
      <div className="relative">
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-t-xl border-b border-tech-blue/10" />
        <HeartIcon product={product} />
      </div>
      <div className="p-6">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center mb-2">
            <span className="text-lg font-semibold text-tech-white font-display truncate">{product.name}</span>
            <span className="bg-tech-blue/10 text-tech-blue text-sm font-semibold px-3 py-1 rounded-full shadow-md ml-2">
              ${product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  </>
}

export default Product