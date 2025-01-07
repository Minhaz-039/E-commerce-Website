/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  return (
    <div className="p-3 flex bg-pink-50 hover:bg-pink-200 hover:shadow-md duration-500 text-black rounded-lg flex-col items-center">
      <div className=" relative">
        <img
          src={`http://localhost:5000${product.image}`}
          alt={product.name}
          className="h-64 object-cover rounded"
        />
        <HeartIcon product={product} />
      </div>

      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between gap-2 items-center">
            <div className="font-bold" >{product.name}</div>
            <span className="bg-pink-100 text-pink-800 text-xs gap-1 font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
              ${product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default SmallProduct;