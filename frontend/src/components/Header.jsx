import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h1 className="text-center text-red-600 font-bold">Something went wrong. Please try again later.</h1>;
  }

  return (
    <div className="flex flex-col lg:flex-row  justify-between items-center gap-8 p-6 ">
      {/* Small Product Grid */}
      <div className="grid grid-cols-2 lg:w-3/5 gap-4 lg:grid-cols-2 xl:grid-cols-2 flex-1">
        {data.map((product) => (
          <SmallProduct key={product._id} product={product} />
        ))}
      </div>

      {/* Carousel Section */}
      <div className="w-full lg:w-2/5">
        <ProductCarousel />
      </div>
    </div>
  );
};

export default Header;
