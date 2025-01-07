import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <div>
      <div className=" max-w-7xl mx-auto">
        <h1 className="text-lg font-bold ml-[3rem]  mb-[3rem] pt-8">
          FAVORITE PRODUCTS
        </h1>

        <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {favorites.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;