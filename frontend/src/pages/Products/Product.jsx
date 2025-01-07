/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
      {/* Image Section */}
      <div className="relative">
        <img
          src={`http://localhost:5000${product.image}`}
          alt={product.name}
          className="w-full h-[100px] sm:h-[200px] object-cover rounded-t-lg"
        />
        <HeartIcon product={product} />
      </div>

      {/* Content Section */}
      <div className="p-2 rounded-b-lg h-fit bg-pink-200">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center text-sm font-normal">
            <div className="bg-pink-200 pr-2 font-bold text-pink-800">{product.name}</div>
            <span className="bg-pink-100 text-pink-800 text-sm font-medium px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300 flex gap-1">
              <div>$</div> {product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Product;
