import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mb-4 lg:block xl:block md:block">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Slider
          {...settings}
          className="xl:w-[28rem]  lg:w-[25rem] md:w-[20rem] sm:w-[15rem] sm:block bg-pink-50 hover:bg-pink-200 duration-300 p-4 rounded-lg"
        >
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
              <div key={_id}>
                <img
                  src={`http://localhost:5000${image}`}
                  alt={name}
                  className="w-full rounded-lg object-cover "
                />

                <div className="mt-4  flex justify-between">
                  <div className="one w-1/2 font-bold text-black">
                    <h2>{name}</h2>
                    <p> $ {price}</p> <br /> <br />
                    <p className="">
                      {description.substring(0, 115)} ...
                    </p>
                  </div>

                  <div className="flex flex-col justify-between font-bold text-pink-800">
                    
                      <div className="flex items-center ">
                        <FaStore className="mr-1 text-pink-800" /> Brand: {brand}
                      </div>
                      <h1 className="flex items-center ">
                        <FaClock className="mr-1 text-pink-800" /> Added:{" "}
                        {moment(createdAt).fromNow()}
                      </h1>
                      <h1 className="flex items-center ">
                        <FaStar className="mr-1 text-pink-800" /> Reviews:
                        {numReviews}
                      </h1>
                    

                    
                      <h1 className="flex items-center ">
                        <FaStar className="mr-1 text-pink-800" />{" "}
                        {Math.round(rating)}
                      </h1>
                      <h1 className="flex items-center ">
                        <FaShoppingCart className="mr-1 text-pink-800" /> Qty {" "}
                        {quantity}
                      </h1>
                      <h1 className="flex items-center">
                        <FaBox className="mr-1 text-pink-800" />Stock {" "}
                        {countInStock}
                      </h1>
                    
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